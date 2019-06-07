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

#ifndef DOBOT_SERVER_H_
#define DOBOT_SERVER_H_

#include "Library/DobotType.h"

/* Fire Arm Positioner settings */
#define TP_MAGICNO        0x5470AA01
#define TP_VERSION_1_ID   0x00000100
#define TP_VERSION_1_LBL  "0.1.0"
#define TP_VERSION_2_ID   0x00010000
#define TP_VERSION_2_LBL  "1.0.0"
#define QSTRING_EMPTY_LEN 0xffffffff

/* Dobot settings */
#define DOBOT_VELOCITY            (100)
#define DOBOT_ACCELERATION        (100)
#define DOBOT_VELOCITY_RATIO       (50)
#define DOBOT_ACCELERATION_RATIO   (50)
#define DOBOT_JUMPHEIGHT           (20)
#define DOBOT_ZLIMIT              (150)
#define DOBOT_ENDEFFECTOR_XBIAS (71.6f)

/* Server settings */
#define EXECUTION_TIMEOUT_S         (1)
#define HOMING_TIMEOUT_S            (1)
#define RETRY_TIMEOUT_US     (200*1000)
#define DEVINFO_LEN (25)
#define SOCKFLAGS                   (0)
#define SERVERPORT              (50001)
#define BACKLOG                    (10)
#define LOCK_PREFIX   "/var/lock/LCK.."

/* Protocol */
#define MSG_HEADER_SIZE (3)
#define MSG_DATA_BUFFER_SIZE (128)

/* type definitions */
typedef enum DBSvr_enum {
  DBSVR_OK = 0,
  DBSVR_ERR,
  DBSVR_ERR_FILENAME,
  DBSVR_ERR_FILEFORMAT,
  DBSVR_ERR_FILEVERSION,
  DBSVR_ERR_MEMORY,
  DBSVR_ERR_TIMEOUT,
}DBSvr_t;

typedef struct DeviceInfo_struct {
   char serial[DEVINFO_LEN];
   char name[DEVINFO_LEN];
   struct {
     uint8_t major;
	 uint8_t minor;
	 uint8_t revision;
   } version;
} DeviceInfo_t;

typedef enum MsgTag_enum {
  /* request tags */
  MSG_TAG_RESERVED = 0,
  MSG_TAG_EXECUTE_LIST,
  
  /* response tags */
  MSG_TAG_RESP_RESERVED = 0x80,
  MSG_TAG_RESP_EXECUTE_LIST,
}MsgTag_t;

typedef enum MsgStatus_enum {
  /* status codes */
  MSG_STAT_OK = 0x00,
  MSG_STAT_ERR,
}MsgStatus_t;

typedef struct tp_struct {
  double   x;        /* x position */
  double   y;        /* y position */
  double   z;        /* z position */
  double   r;        /* rotation */
  double   a;        /* joint alpha angle */
  double   b;        /* joint beta angle */
  double   g;        /* joint gamma angle */
  double   d;        /* joint delta angle */
  uint32_t delay;    /* delay in ms */
  uint32_t ioStatus; /* switch I/O status */
  uint8_t  tool;     /* tool enable (bool) */
  char *   label;    /* label */
  struct tp_struct *next;/* next item in list */
} tp_t;

/**/

#endif /* DOBOT_SERVER_H_ */