import zerorpc
import os
import sys
import socket
print("###########################################################")
print("#														 #")
print("#	Socket script for Blockchain to KUKA interaction	 #")
print("#														 #")
print("###########################################################")

# defining global index for capturing the states


c = zerorpc.Client()
c.connect("tcp://127.0.0.1:4242")
print('Successful connection to the zerorpc server!')

# crating the unix domain socket in order to start the Kuka demo applications


def waitingForConnection(sock, state):
    while True:
        print >> sys.stderr, 'waiting for a connection'
        connection, client_address = sock.accept()
        try:
            print >> sys.stderr, 'connection from', client_address
            while True:
                connection.send('blockchainConfirmed')
                print c.advanceContract(state)
            else:
                print >> sys.stderr, 'no more confirmation possible', client_address
                break
        finally:
            print('All information was sent, waiting for new connection...')
            newConnection(state+1)


def newConnection(_state):
    if _state == 5:
        print('The smart contract has been fulfilled, shutting down connections...')
        sys.exit()
    print('The current state of the Smart Contract: ', _state)
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
    waitingForConnection(sock, _state)


newConnection(1)


# TODO: configure the zerorpc functionality, interval function for checking the current status, and on change call the next one
