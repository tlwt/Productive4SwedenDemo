import os
import sys
import socket
import zerorpc
print("###########################################################")
print("#                                                         #")
print("#    Socket script for santaro to KUKA interaction        #")
print("#                                                         #")
print("###########################################################")



# Connection to central logic and the transfer of the relevant information
# Will have to change the socket name and the flow of information 
# serversocket will have to be the dobot otherwise I will have to many separate instances
class dobotContract(object):
    def newConnection():
    # Creating the client socket to connect to the external server and receive the relevant Blockchain information
    socketClient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    socketClient.connect(('192.168.178.108', 50001))

    # Sending the command byte message
        MESSAGE = "\x01\x00\x0f\x6d\x61\x67\x6e\x65\x74\x5f\x74\x65\x73\x74\x2e\x62\x69\x6e"
        socketClient.sendall(MESSAGE)
    return("Successful Blockchain interaction...")

s = zerorpc.Server(dobotContract())
s.bind("tcp://0.0.0.0:4242")
s.run()

