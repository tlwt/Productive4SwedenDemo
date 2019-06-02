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
socketClient.sendall('blockchainTrigger');
data = socketClient.recv(1024)
socketClient.close()
print 'Received', repr(data)

# creating the unix domain socket and write out the trigger for the UI
def waitingForConnection(sock):
    while True:
        print >> sys.stderr, 'waiting for a connection'
        connection, client_address = sock.accept()
        try:
            print >> sys.stderr, 'connection from', client_address
            while True:
                connection.send('blockchainTrigger')
                # print c.advanceContract(state)
            else:
                print >> sys.stderr, 'no more confirmation possible', client_address
                break
        finally:
            print('All information was sent, waiting for new connection...')
            newConnection()


def newConnection():
    print('The current state of the Smart Contract: confirmed')
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
