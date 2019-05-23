import os
import sys
import socket
print("###########################################################")
print("#														 #")
print("#	Socket script for santaro to KUKA interaction	     #")
print("#														 #")
print("###########################################################")

# Creating the client socket to connect to the external server and receive the relevant Blockchain information
socketClient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
socketClient.connect(('89.144.27.100', 5252))
socketClient.sendall('Hello, world')
data = socketClient.recv(1024)
socketClient.close()
print 'Received', repr(data)