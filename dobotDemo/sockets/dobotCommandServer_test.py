import os
import sys
import socket
import zerorpc
import time
import threading
print("###########################################################")
print("#                                                         #")
print("#    Socket script for santaro to KUKA interaction        #")
print("#                                                         #")
print("###########################################################")



# Connection to central logic and the transfer of the relevant information
# Will have to change the socket name and the flow of information
# serversocket will have to be the dobot otherwise I will have to many separate instances
# Creation of ZeroRPC Server for Dobot Interaction
# Initial calling via ZeroRPC

# Create a TCP/IP socket
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Connect the socket to the port where the server is listening
server_address = ('89.144.27.103', 5252)
print >>sys.stderr, 'connecting to %s port %s' % server_address
sock.connect(server_address)


def initialMovement():
    # Creating the client socket to connect to the external server and receive the relevant Blockchain information
    #socketClient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    #socketClient.connect(('192.168.178.108', 50001))
    #print('Sucessful connection to the dobot Server')
    # Sending the command byte message
    #MESSAGE = "\x01\x00\x0f\x6d\x61\x67\x6e\x65\x74\x5f\x74\x65\x73\x74\x2e\x62\x69\x6e"
    #socketClient.sendall(MESSAGE)
    #return("Successful Blockchain interaction...")
    # for debugging:
    print("initialFunction execution")

def secondMovement():
        # Creating the client socket to connect to the external server and receive the relevant Blockchain information
    #socketClient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    #socketClient.connect(('192.168.178.108', 50002))
    #print('Sucessful connection to the dobot Server')
    # Sending the command byte message
    #MESSAGE = "\x01\x00\x0f\x6d\x61\x67\x6e\x65\x74\x5f\x74\x65\x73\x74\x2e\x62\x69\x6e"
    #socketClient.sendall(MESSAGE)
    #return("Successful Blockchain interaction...")
    # for debugging:
    print("Second Function execution")

def set_interval(func, sec):
    def func_wrapper():
        set_interval(func, sec)
        func()
    t = threading.Timer(sec, func_wrapper)
    t.start()
    return t

def demoStart():
    # Create a TCP/IP socket
    #sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

    # Connect the socket to the port where the server is listening
    #server_address = ('89.144.27.103', 5252)
    #print >>sys.stderr, 'connecting to %s port %s' % server_address
    #sock.connect(server_address)
    while True:
        data = sock.recv(16)
        print(data)
        if data == 'NewConnection\n':
            demoStart()
        if data == 'Processed\n':
            #sock.sendall("confirmed\n")
            initialMovement()
            # only for debugging
            time.sleep(15)
            secondMovement()
	    time.sleep(5)
	    demoStart()
	
#set_interval(demoStart, 30)

demoStart()

