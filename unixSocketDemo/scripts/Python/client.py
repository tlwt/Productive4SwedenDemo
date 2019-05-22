import socket
import sys
import threading


class ThreadJob(threading.Thread):
    def __init__(self, callback, event, interval):
        '''runs the callback function after interval seconds

        :param callback:  callback function to invoke
        :param event: external event for controlling the update operation
        :param interval: time in seconds after which are required to fire the callback
        :type callback: function
        :type interval: int
        '''
        self.callback = callback
        self.event = event
        self.interval = interval
        super(ThreadJob, self).__init__()

    def run(self):
        while not self.event.wait(self.interval):
            self.callback()


event = threading.Event()


# Create a UDS socket and connect to blockchain server socket

def clientConnection():
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


k = ThreadJob(clientConnection, event, 5)
k.start()

print "It is non-blocking"
