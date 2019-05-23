import zerorpc
import os
import sys
import socket
print("###########################################################")
print("#														 #")
print("#	Socket script for Blockchain to KUKA interaction	 #")
print("#														 #")
print("###########################################################")

# Creation of ZeroRPC Client
socketClient = zerorpc.Client()
socketClient.connect('tcp://89.144.27.100:4242')
print('Successful Connection to the ZeroRPC Server...')

# Create the tcp socket and send the Blockchain information to the client
# On successful connection execute the advanceContract function and send info back
serverSocket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
serverSocket.bind(('89.144.27.100', 5252))
serverSocket.listen(1)
conn, addr = serverSocket.accept()
while 1:
    data = conn.recv(1024)
    print socketClient.advanceContract()
    if not data:
        break
    conn.sendall(data)
conn.close()