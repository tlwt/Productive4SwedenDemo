import socket
import sys

# Create a UDS socket
sock = socket.socket(socket.AF_UNIX, socket.SOCK_STREAM)

# Connect the socket to the port where the server is listening
server_address = '/tmp/blockchainSocket.sock'
print >>sys.stderr, 'connecting to %s' % server_address
try:
    sock.connect(server_address)
except socket.error, msg:
    print >>sys.stderr, msg
    sys.exit(1)

# Receive confirmation data
data = sock.recv(19)
print >>sys.stderr, 'received "%s"' % data

print >> sys.stderr, 'closing client connection...'
sock.close()
