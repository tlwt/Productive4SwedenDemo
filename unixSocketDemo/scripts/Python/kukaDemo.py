import zerorpc
import os
import sys
import socket
print("###########################################################")
print("#														 #")
print("#	Socket script for Blockchain to KUKA interaction	 #")
print("#														 #")
print("###########################################################")


#c = zerorpc.Client()
# c.connect("tcp://89.144.27.100:4242")
# print c.advanceContract(4)

# crating the unix domain socket in order to start the Kuka demo applications


def waitingForConnection(sock):
    while True:
        print >> sys.stderr, 'waiting for a connection'
        connection, client_address = sock.accept()
        try:
            print >> sys.stderr, 'connection from', client_address
            while True:
                connection.send('blockchainConfirmed')
            else:
                print >> sys.stderr, 'no more confirmation possible', client_address
                break
        finally:
            print('All information was sent, waiting for new connection...')
            newConnection()


def newConnection():
    server_address = '/tmp/blockchainSocket.sock'
    try:
        os.unlink(server_address)
    except OSError:
        if os.path.exists(server_address):
            raise
    sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)
    print >> sys.stderr, 'starting up on %s' % server_address
    sock.bind(server_address)
    sock.listen(1)
    waitingForConnection(sock)


newConnection()


# TODO: ensure the socket stays open for incoming connections. currently still breaking after initial client response
# TODO: client application for testing the reliability of the socket connection
# TODO: set timeout or interval function to allow for continuous calling of the advance function
# TODO: optimally with counter and check for unix domain socket, write in the confirmation on contract creation
