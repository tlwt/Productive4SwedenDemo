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

