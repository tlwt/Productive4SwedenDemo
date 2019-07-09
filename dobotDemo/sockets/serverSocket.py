import zerorpc
import os
import sys
import socket
print("###########################################################")
print("#														 #")
print("#	Socket script for Blockchain to KUKA interaction	 #")
print("#														 #")
print("###########################################################")

# Creation of ZeroRPC Client for Blockchain Interaction 
socketClient = zerorpc.Client()
socketClient.connect('tcp://89.144.27.100:4242')
print('Successful Connection to the ZeroRPC Server...')

# Creation of ZeroRPC Server for Dobot Interaction
class dobotContract():
    def newConnection():
    # Creating the client socket to connect to the external server and receive the relevant Blockchain information
        socketClient = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        socketClient.connect(('192.168.178.108', 50001))
        print('Sucessful connection to the dobot Server')
    # Sending the command byte message
        MESSAGE = "\x01\x00\x0f\x6d\x61\x67\x6e\x65\x74\x5f\x74\x65\x73\x74\x2e\x62\x69\x6e"
        socketClient.sendall(MESSAGE)
        return("Successful Blockchain interaction...")

s = zerorpc.Server(dobotContract())
s.bind("tcp://0.0.0.0:3232")
s.run()

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
