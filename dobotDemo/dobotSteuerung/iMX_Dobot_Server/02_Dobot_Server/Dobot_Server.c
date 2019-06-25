/******************************************************************************
 * Dobot Track Point List Tool
 * 
 * Author:         Jan Griessbach
 * Version:        0.2
 * Project status: active
 * Changelog:      2018-04-05 - Creation
 *                 2018-08-01 - added "u" switch
 *
 *****************************************************************************/

/* comment to disable debug info / status messages */
#define DBG_INFO
 
#include <stdio.h>
#include <unistd.h>     /* usleep */
#include <stdlib.h>     /* NULL */
#include <signal.h>     /* sigfillset */
#include <string.h>     /* memset */
#include <setjmp.h>     /* siglongjmp, sitsetjmp */
#include <sys/types.h>  /* socket, bind */
#include <sys/socket.h> /* socket, bind */
#include <arpa/inet.h>  /* htons */
#include <errno.h>

#include "Dobot_Server.h"
#include "Library/myDobotDll.h"

#define OPTSTRING           "d:p:uih"
#define FALSE               (0)
#define TRUE                (!FALSE)
#define REVERSE_TYPE(x,y,l) {unsigned int i; uint8_t *REVERSE_TYPE_a = (uint8_t*) (x), *REVERSE_TYPE_b = (uint8_t*) (y); for(i=0; i<(l); i++) REVERSE_TYPE_a[i] = REVERSE_TYPE_b[(l)-1-i];}
#define MSG_HEADER_TAG(x)    (*x)
#define MSG_HEADER_LENGTH(x) (*((uint16_t*)(x+1)))

/* local functions */
static void sigintHandler(int signal);
static void usage(const char *prog);

/* functions */
void    initDobot(DeviceInfo_t *devInfo);
DBSvr_t parseFile(const char* fname, tp_t **tpListBegin, const char **vLbl);
void    clearTPList( tp_t** tpListBegin);
DBSvr_t executeTPList(tp_t *tpListBegin);
DBSvr_t goToHomePosition( void );

/* globals */
static sig_atomic_t   flag = TRUE;
static sigjmp_buf     jmpLoc;


int main(int argc, char**argv)
{
  char               *pname = NULL;
  int                opt, sock, sockCL, setHome = FALSE, delLockFile = FALSE;
  DeviceInfo_t       devInfo;
  unsigned short     serverPort = SERVERPORT;
  struct sockaddr_in server;
  
  /* evaluate command line arguments */
  while( (opt = getopt(argc, argv, OPTSTRING)) != -1 ) {
    switch( opt ) {
      case 'p': serverPort = atoi(optarg); break;
	  case 'i': setHome = TRUE; break;
	  case 'd': pname = optarg; break;
	  case 'u': delLockFile = TRUE; break;
      case 'h':
      default:  usage(argv[0]); return EXIT_FAILURE;
    }
  }

  /* limit checks */
  if(   (pname == NULL) 
//      ||(pname == NULL)
    ){ usage(argv[0]); return EXIT_FAILURE; }
  
  /* delete lock file */
  if(delLockFile == TRUE) {
    /* allocate memory */
	int fpSize = strlen(pname) + strlen(LOCK_PREFIX) + 1;
	char *fp = (char*) malloc(fpSize * sizeof(char));
	if(fp == NULL){
	  fprintf(stderr,"Out of memory.\n");
      return EXIT_FAILURE;
	}
	
	/* concatenate path */
	memset(fp, 0x00, fpSize);
	strcpy(fp, LOCK_PREFIX);
	strcat(fp, pname);
	
	/* delete file */
	if(unlink(fp) < 0) {
	  if(errno == ENOENT)
	    fprintf(stderr, "Could not delete lock file: file does not exist.\n");
	  else
	    fprintf(stderr, "Could not delete lock file.\n");
	}

	free(fp);
  }
  
  /* Connect to DoBot */
  if(ConnectDobot(pname, 115200, NULL, NULL ) != DobotConnect_NoError){
    fprintf(stderr,"Can't connect to DoBot.\n");
    return EXIT_FAILURE;
  }
  
  /* init DoBot */
  initDobot(&devInfo);
#ifdef DBG_INFO
  printf("\nDevice info:\n------------\nName:\t%s\nS/N:\t%s\nVer.:\t%d.%d.%d\n\n",
         devInfo.name, devInfo.serial,
		 devInfo.version.major, devInfo.version.minor, devInfo.version.revision
		);
#endif
		
  /* go to home position */
  if(setHome == TRUE)
    if(DBSVR_OK != goToHomePosition())
	  return EXIT_FAILURE;
  
  /* setup server address */
  memset(&server, 0x00, sizeof(server));
  server.sin_family      = AF_INET;
  server.sin_addr.s_addr = INADDR_ANY;
  server.sin_port        = htons(serverPort);
 
  /* setup server socket */
  sock = socket(AF_INET, SOCK_STREAM, SOCKFLAGS);
  if( sock < 0 ) {
    fprintf(stderr, "Can't create socket.\n");
    return EXIT_FAILURE;
  }
  if( bind(sock,(struct sockaddr*) &server, sizeof(server)) ) {
    fprintf(stderr, "Can't bind socket.\n");
    return EXIT_FAILURE;
  }
  if( listen(sock, BACKLOG) ) {
    fprintf(stderr, "Can't set socket to connection mode (listen).\n");
    return EXIT_FAILURE;
  }
#ifdef DBG_INFO
  printf("Server is listening on port %u.\n", serverPort);
#endif

  /* register signal handlers */
  signal(SIGINT, sigintHandler);
  signal(SIGTERM, sigintHandler);
  
  /* jump here after CTRL-C occured */ 
  sigsetjmp(jmpLoc, 0);

  /* wait for incoming connections */ 
  while(flag) {
    struct sockaddr_in clientAddr;
    socklen_t          clientAddrLen = sizeof(struct sockaddr_in);
	int                nob;
	uint8_t            msgHeader[MSG_HEADER_SIZE], msgDataBuffer[MSG_DATA_BUFFER_SIZE];
		
	/* wait for client to connect (will block until connection is established or refused) */
    sockCL = accept(sock, (struct sockaddr *) &clientAddr, &clientAddrLen);
    if (sockCL < 0) {
      fprintf(stderr, "accept() failed.\n");
	  continue;
	}
#ifdef DBG_INFO
	printf("New client connection from %d.%d.%d.%d.\n",(clientAddr.sin_addr.s_addr >>  0) & 0x000000ff,
                                                       (clientAddr.sin_addr.s_addr >>  8) & 0x000000ff,
                                                       (clientAddr.sin_addr.s_addr >> 16) & 0x000000ff,
                                                       (clientAddr.sin_addr.s_addr >> 24) & 0x000000ff);
#endif

    /* read tag and length */
	nob = read(sockCL, msgHeader, MSG_HEADER_SIZE);
    /* if read doesn't block, but no data can be read, the connection has been closed */
	if((nob == 0) || ((nob < 0) && (errno == ECONNRESET))){
#ifdef DBG_INFO
	  printf("Connection to client closed.\n");
#endif
	  shutdown(sockCL, SHUT_RDWR);
      close(sockCL);
	  continue;
    } else if( nob < 0) { /* unexpected error */
      printf("Unexpected error: %s\n", strerror(errno));
	  return EXIT_FAILURE;
    }
	MSG_HEADER_LENGTH(msgHeader) = ntohs(MSG_HEADER_LENGTH(msgHeader)); /* convert length field */
#ifdef DBG_INFO
	printf("Message header received. Tag: 0x%02X, Length: %u\n", MSG_HEADER_TAG(msgHeader), MSG_HEADER_LENGTH(msgHeader));
#endif
	
	/* read data if available */
	if(MSG_HEADER_LENGTH(msgHeader) > 0) {
	  nob = read(sockCL, &msgDataBuffer, MSG_HEADER_LENGTH(msgHeader));
      /* if read doesn't block, but no data can be read, the connection has been closed */
	  if((nob == 0) || ((nob < 0) && (errno == ECONNRESET))){
#ifdef DBG_INFO
	    printf("Connection to client closed.\n");
#endif
	    shutdown(sockCL, SHUT_RDWR);
        close(sockCL);
	    continue;
      } else if( nob < 0) { /* unexpected error */
        printf("Unexpected error: %s\n", strerror(errno));
	    return EXIT_FAILURE;
      }
	}
		  
	/* handle request */
	switch(((MsgTag_t)MSG_HEADER_TAG(msgHeader))) {
	case MSG_TAG_EXECUTE_LIST: {
	  tp_t *tpListBegin = NULL;
	  uint8_t response[MSG_HEADER_SIZE+1];
	  const char *versionLabel;
	  
	  /* initialize result value: general error */
	  response[MSG_HEADER_SIZE] = MSG_STAT_ERR;
	  
	  /* message payload is filename as string */
	  msgDataBuffer[MSG_HEADER_LENGTH(msgHeader)] = '\0'; // terminate
#ifdef DBG_INFO
	  printf("Loading file: %s\n", msgDataBuffer);
#endif

	  /* load track point file */
      if(DBSVR_OK == parseFile((char *)msgDataBuffer, &tpListBegin, &versionLabel)) {
	    /* execute Track Point List */
        if( DBSVR_OK == executeTPList(tpListBegin) )
          response[MSG_HEADER_SIZE] = MSG_STAT_OK;
	  }
#ifdef DBG_INFO
	  if(versionLabel != NULL)
		printf("File version was: %s\n", versionLabel);
#endif

	  /* notify client */
	  MSG_HEADER_TAG(response)    = MSG_TAG_RESP_EXECUTE_LIST;
	  MSG_HEADER_LENGTH(response) = htons(1);
	  nob = write(sockCL, response, MSG_HEADER_SIZE + 1);
	  if(nob < 0){
        printf("Connection to client unexpectedly closed.\n");
        /* connection will be closed anyways after message handling */
      }
  
      /* free track point list */
      clearTPList(&tpListBegin);
	} break;
	case MSG_TAG_RESERVED:
	default:               break;
	}
	
	
	/* terminate connection after handling request */
	shutdown(sockCL, SHUT_RDWR);
    close(sockCL);
#ifdef DBG_INFO
	printf("Connection to client closed.\n");
#endif
  }
  
  /*   |   This section is reached when the server receives the SIGINT signal   |
       V   ( CTRL-C or 'kill -s SIGINT <PID>' )                                 V   */
  
  /* terminate all connections and remove clients */
  shutdown(sockCL, SHUT_RDWR);
  close(sockCL);
  shutdown(sock, SHUT_RDWR);
  close(sock);	

  return EXIT_SUCCESS;
}

static void sigintHandler(int signal)
{
  signal = signal; /* suppress warning */
  flag   = FALSE;
  siglongjmp(jmpLoc, 0);
}

static void usage(const char *prog)
{
  fprintf(stderr, "\n\tUSAGE:\t %s -d DEVICE [-p PORT] [-i] [-h]\n"
                  "\n\tOPTIONS: -d\tDevice name e.g. COM1\n"
				  "\t\t -p\tServer port number. Default %d.\n"
				  "\t\t -i\tmove robot to home position first\n"
				  "\t\t -u\tdelete lock file (%sxxx) on startup\n"
                  "\t\t -h\tThis help text.\n\n"
                  , prog, SERVERPORT, LOCK_PREFIX);
}


void initDobot(DeviceInfo_t *devInfo)
{
  int                 i;
  EndEffectorParams   endEffectorParams = {0};
  JOGJointParams      jogJointParams;
  JOGCoordinateParams jogCoordinateParams;
  JOGCommonParams     jogCommonParams;
  PTPCoordinateParams ptpCoordinateParams;
  PTPJumpParams       ptpJumpParams;
  PTPJointParams      ptpJointParams;

  /* get device info */
  if(devInfo != NULL) {
    GetDeviceSN( devInfo->serial, DEVINFO_LEN );
    GetDeviceName( devInfo->name, DEVINFO_LEN );
    GetDeviceVersion( &(devInfo->version.major), &(devInfo->version.minor), &(devInfo->version.revision) );
  }

  /* set parameters */
  endEffectorParams.xBias             = DOBOT_ENDEFFECTOR_XBIAS;
  jogCommonParams.velocityRatio       = DOBOT_VELOCITY_RATIO;
  jogCommonParams.accelerationRatio   = DOBOT_ACCELERATION_RATIO;
  ptpCoordinateParams.xyzVelocity     = DOBOT_VELOCITY;
  ptpCoordinateParams.xyzAcceleration = DOBOT_ACCELERATION;
  ptpCoordinateParams.rVelocity       = DOBOT_VELOCITY;
  ptpCoordinateParams.rAcceleration   = DOBOT_ACCELERATION;
  ptpJumpParams.jumpHeight            = DOBOT_JUMPHEIGHT;
  ptpJumpParams.zLimit                = DOBOT_ZLIMIT;
  for( i = 0; i < 4; i++ ) {
    jogJointParams.velocity[i]          = DOBOT_VELOCITY;
    jogJointParams.acceleration[i]      = DOBOT_ACCELERATION;
	jogCoordinateParams.velocity[i]     = DOBOT_VELOCITY;
    jogCoordinateParams.acceleration[i] = DOBOT_ACCELERATION;
	ptpJointParams.velocity[i]          = DOBOT_VELOCITY;
    ptpJointParams.acceleration[i]      = DOBOT_ACCELERATION;
  }
   
  /* Apply settings */ 
  SetQueuedCmdClear();
  SetEndEffectorParams( &endEffectorParams, false, NULL );
  SetJOGJointParams( &jogJointParams, false, NULL );
  SetJOGCoordinateParams( &jogCoordinateParams, false, NULL );
  SetPTPJointParams( &ptpJointParams, false, NULL );
  SetJOGCommonParams( &jogCommonParams, false, NULL );
  SetPTPCoordinateParams( &ptpCoordinateParams, false, NULL );
  SetPTPJumpParams( &ptpJumpParams, false, NULL );
}

DBSvr_t parseFile(const char* fname, tp_t** tpListBegin, const char **vLbl)
{
  FILE *fp;
  int retval;
  tp_t *tpListCurrent;
  uint32_t temp, magicno, version;
  
  /*open file */
  if((fname == NULL) || ((fp = fopen(fname, "r")) == NULL)) {
    fprintf(stderr, "Can't open file.\n");
	return DBSVR_ERR_FILENAME;
  }
  
  /* read track point list */
  retval = fread(&temp, sizeof(uint32_t), 1, fp);
  REVERSE_TYPE(&magicno, &temp, sizeof(uint32_t));
  if(magicno != TP_MAGICNO){
    fprintf(stderr, "TP file format mismatch %d.\n", temp);
	fclose(fp);
	return DBSVR_ERR_FILEFORMAT;
  }
  retval &= fread(&temp, sizeof(uint32_t), 1, fp);
  REVERSE_TYPE(&version, &temp, sizeof(uint32_t));
  
  switch(version) {
  case TP_VERSION_1_ID: if(vLbl != NULL) *vLbl = TP_VERSION_1_LBL; break;
  case TP_VERSION_2_ID: if(vLbl != NULL) *vLbl = TP_VERSION_2_LBL; break;
  default: {
    fprintf(stderr, "TP file version mismatch.\n");
	fclose(fp);
	return DBSVR_ERR_FILEVERSION;
  }
  }

  while(retval){
    tp_t *tp;
	double x, y, z, r, a, b, g, d;
	uint32_t temp, delay, ioState, lblLen = QSTRING_EMPTY_LEN;
	uint8_t tool;
	char *label = NULL;
	
	/* read parameters */
    retval &= fread(&x, sizeof(double), 1, fp);
	retval &= fread(&y, sizeof(double), 1, fp);
	retval &= fread(&z, sizeof(double), 1, fp);
	retval &= fread(&r, sizeof(double), 1, fp);
	retval &= fread(&a, sizeof(double), 1, fp);
	retval &= fread(&b, sizeof(double), 1, fp);
	retval &= fread(&g, sizeof(double), 1, fp);
    retval &= fread(&d, sizeof(double), 1, fp);
    retval &= fread(&delay, sizeof(uint32_t), 1, fp);
	retval &= fread(&tool, sizeof(uint8_t), 1, fp);
    retval &= fread(&temp, sizeof(uint32_t), 1, fp);
	REVERSE_TYPE(&lblLen, &temp, sizeof(uint32_t));
    
	/* if not empty, read label (UTF-16; only LSB / ASCII is processed)  */
	if((lblLen != QSTRING_EMPTY_LEN) && (lblLen != 0)){
	  unsigned int i;
	
	  /* get actual length */
	  lblLen >>= 1;
	  
	  /* allocate memory for label */
      if((label = (char*) malloc((lblLen+1) * sizeof(char))) == NULL) {
	    fprintf(stderr, "Can't allocate memory.\n");
		fclose(fp);
	    return DBSVR_ERR_MEMORY;
	  }
	  
	  /* read label */
	  for(i=0; i<lblLen; i++){
	    fseek(fp, sizeof(char), SEEK_CUR); /* skip MSB */
	    retval &= fread(label+i, sizeof(char), 1, fp); /* read LSB */
	  }
	  label[lblLen] = '\0';
	}
	
	/* read switch IO status from version 2 onwards */
	if(version != TP_VERSION_1_ID)
		retval &= fread(&ioState, sizeof(uint32_t), 1, fp);
	
	/* assume end of list on read error */
	if(retval != 1)
		break;
	
	/* allocate memory for track point item */
    if((tp = (tp_t*) malloc(sizeof(tp_t))) == NULL) {
	  fprintf(stderr, "Can't allocate memory.\n");
	  fclose(fp);
	  return DBSVR_ERR_MEMORY;
	}
	/* set beginning of list */
	if(*tpListBegin == NULL){
	  *tpListBegin = tp;
	  tpListCurrent = tp;
	}
	
	/* set values */
	tp->next  = NULL;
	tp->label = label;
	tp->tool  = tool;
	REVERSE_TYPE(&(tp->x), &x, sizeof(double));
	REVERSE_TYPE(&(tp->y), &y, sizeof(double));
	REVERSE_TYPE(&(tp->z), &z, sizeof(double));
	REVERSE_TYPE(&(tp->r), &r, sizeof(double));
	REVERSE_TYPE(&(tp->a), &a, sizeof(double));
	REVERSE_TYPE(&(tp->b), &b, sizeof(double));
	REVERSE_TYPE(&(tp->g), &g, sizeof(double));
	REVERSE_TYPE(&(tp->d), &d, sizeof(double));
	REVERSE_TYPE(&(tp->delay), &delay, sizeof(uint32_t));
	if(version != TP_VERSION_1_ID)
		REVERSE_TYPE(&(tp->ioStatus), &ioState, sizeof(uint32_t));
	
	/* queue track point item */
	tpListCurrent->next = tp;
	tpListCurrent       = tp;
  }
  
  fclose(fp);
  return DBSVR_OK;
}

void clearTPList( tp_t** tpListBegin)
{
  tp_t *last;
  
  while (*tpListBegin != NULL) {
    last         = *tpListBegin;
	*tpListBegin = (*tpListBegin)->next;
    free(last->label);
	free(last);
  }
}

DBSvr_t executeTPList(tp_t *tpListBegin)
{
  tp_t     *tpListCurrent = tpListBegin;
  PTPCmd   ptpCmd;
  WAITCmd  waitCmd;
  uint64_t currentIndex, ui64cnt;
  
  /* preparing queue */
  SetQueuedCmdClear();
  SetQueuedCmdStartExec();
#ifdef DBG_INFO
  printf("\nQueuing Track Points:\n---------------------------------------------------------------"
         "--------------------------------------------------------------------------------------\n"
         "X-Position\tY-Position\tZ-Position\tRotation\tAlpha-Angle\tBeta-Angle\tGamma-Angle\tDelta-Angle\tDelay\tTool\tLabel\n\n"
		);
#endif

  /* queue commands */
  while(tpListCurrent != NULL && flag) {
    /* prepare commands */
    ptpCmd.ptpMode = PTPMOVJXYZMode;
    ptpCmd.x       = tpListCurrent->x;
    ptpCmd.y       = tpListCurrent->y;
    ptpCmd.z       = tpListCurrent->z;
    ptpCmd.r       = tpListCurrent->r;
    waitCmd.timeout = tpListCurrent->delay;
	
	/* set position */
    switch( SetPTPCmd( &ptpCmd, true, &ui64cnt) ) {
	case DobotCommunicate_BufferFull:
	  usleep(RETRY_TIMEOUT_US);
      continue; //retry after timeout
	case DobotCommunicate_Timeout:
	  fprintf(stderr, "Timeout while queuing track points!\n");
	  return DBSVR_ERR_TIMEOUT;
	}

	/* set wait time */
    switch( SetWAITCmd( &waitCmd, true, &ui64cnt) ) {
	case DobotCommunicate_BufferFull:
	  usleep(RETRY_TIMEOUT_US);
      continue; //retry after timeout
	case DobotCommunicate_Timeout:
	  fprintf(stderr, "Timeout while queuing track points!\n");
	  return DBSVR_ERR_TIMEOUT;
	}

    /* set tool parameters (suction cup) */	
    switch( SetEndEffectorSuctionCup(true, tpListCurrent->tool, true, &ui64cnt) ) {
	case DobotCommunicate_BufferFull:
	  usleep(RETRY_TIMEOUT_US);
      continue; //retry after timeout
	case DobotCommunicate_Timeout:
	  fprintf(stderr, "Timeout while queuing track points!\n");
	  return DBSVR_ERR_TIMEOUT;
	}

#ifdef DBG_INFO
	/* display position */
    printf("%lf,\t%lf,\t%lf,\t%lf,\t%lf,\t%lf,\t%lf,\t%lf,\t%d,\t%d,\t%s\n",
	       tpListCurrent->x, tpListCurrent->y, tpListCurrent->z, tpListCurrent->r, 
		   tpListCurrent->a, tpListCurrent->b, tpListCurrent->g, tpListCurrent->d,
           tpListCurrent->delay, tpListCurrent->tool, tpListCurrent->label
		  );
#endif

	/* next item */
    tpListCurrent = tpListCurrent->next;
  }
#ifdef DBG_INFO
  printf("---------------------------------------------------------------------------"
         "--------------------------------------------------------------------------\n");
#endif

  /* wait until last item has been executed */
#ifdef DBG_INFO
  printf("Wait until last track point is executed ... ");
  fflush(stdout);
#endif
  do {
	sleep(EXECUTION_TIMEOUT_S);
    if( DobotCommunicate_NoError != GetQueuedCmdCurrentIndex( &currentIndex ))
	  return DBSVR_ERR;
  } while( ui64cnt != currentIndex );
#ifdef DBG_INFO
  printf("done!\n");
#endif
  return DBSVR_OK;
}

DBSvr_t goToHomePosition( void )
{
    HOMECmd  hc  = {0};
    uint64_t currentIndex, qci = 0;
    int      retval;

    retval  = SetQueuedCmdClear();
    retval |= SetQueuedCmdStartExec();
    retval |= SetHOMECmd(&hc, true, &qci);
	if( retval != DobotCommunicate_NoError )
      return DBSVR_ERR;
	
    /* wait until homing command has been executed */
#ifdef DBG_INFO
    printf("\nMoving to HOME position...  ");
    fflush(stdout);
#endif
    do {
	  sleep(HOMING_TIMEOUT_S);
      if( DobotCommunicate_NoError != GetQueuedCmdCurrentIndex( &currentIndex ))
	    return DBSVR_ERR;
    } while( qci != currentIndex );
#ifdef DBG_INFO
    printf("done!\n");
#endif

	return DBSVR_OK;
}
