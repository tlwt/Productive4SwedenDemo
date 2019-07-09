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
socketClient = zerorpc.Client()
socketClient.connect('tcp://89.144.27.100:3232')
print('Successful Connection to the ZeroRPC Server...')
print socketClient.newConnection()


