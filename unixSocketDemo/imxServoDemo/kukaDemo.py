import zerorpc
import os
import sys
import socket
print("###########################################################")
print("#														 #")
print("#	Socket script for Blockchain to KUKA interaction	 #")
print("#														 #")
print("###########################################################")


c = zerorpc.Client()
c.connect("tcp://89.144.27.100:4242")

# crating the unix domain socket in order to start the Kuka demo applications
server_address = '/tmp/blockchainSocket.sock'

try:
    os.unlink(server_address)
except OSError:
    if os.path.exists(server_address):
        raise

sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

print >> sys.stderr, 'starting up on %s' % server_address
sock.bind(server_address)

# function calling the zerorpc socket function for calling the web3 interaction
print(c.checkBalance())

sock.listen(1)

while True:
    print >> sys.stderr, 'waiting for a connection'
    sock.send("blockchainSocket")
    connection, client_address = sock.accept()
    try:
        print >> sys.stderr, 'connection from', client_address
        while True:
            data = conection.recv(16)
            print >> sys.stderr, 'received "%s"' % data
            connection.sendall(data)
        else:
            print >> sys.stderr, 'no more data from', client_address
            break
    finally:
        connection.close()

# TODO: ensure the socket stays open for incoming connections. currently still breaking after initial client response
# TODO: client application for testing the reliability of the socket connection
