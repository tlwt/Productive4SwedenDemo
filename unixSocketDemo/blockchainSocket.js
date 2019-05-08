//jshint esversion:6

/**
 *  blockchainSocket server
 *
 */
const Web3 = require("web3");
const config = require("./config/config");
const net = require("net"),
    port = 5000,
    unixsocket = "/tmp/blockchainSocket.sock";
const zerorpc = require("zerorpc");

/*******************************************
 *
 *   Socket Interface for Robot communication
 *
 ********************************************/

var client = new zerorpc.Client();
client.connect("tcp://89.144.27.100:4242");

var log = function (who, what) {
    return function () {
        var args = Array.prototype.slice.call(arguments);
        console.log("[%s on %s]", who, what, args);
    };
};

var echo = function (socket) {
    /**
     *  net.Socket (http://nodejs.org/api/net.html#net_class_net_socket)
     *  events: end, data, end, timeout, drain, error, close
     *  methods:
     */
    client.invoke("checkBalance", function (error, res, more) {
        console.log(res);
        if (res == "1000000000000000000000000") {
            socket.write("blockchainConfirmation\n");
            console.log("Blockchain confirmation received, executing Demo");
        }
    });
    socket.on("end", function () {
        // exec'd when socket other end of connection sends FIN packet
        console.log("[socket on end]");
    });
    socket.on("data", function (data) {
        // data is a Buffer object
        console.log("[socket on data]", data);
    });
    socket.on("end", function () {
        // emitted when the other end sends a FIN packet
    });

    socket.on("timeout", log("socket", "timeout"));

    socket.on("drain", function () {
        // emitted when the write buffer becomes empty
        console.log("[socket on drain]");
    });
    socket.on("error", log("socket", "error"));
    socket.on("close", log("socket", "close"));
    socket.pipe(socket);
};

/**
 *  net.Server (http://nodejs.org/api/net.html#net_class_net_server)
 *  events: listening, connections, close, err
 *  methods: listen, address, getConnections,
 */
var server = net.createServer(echo);
server.listen(unixsocket); // port or unix socket, cannot listen on both with one server

server.on("listening", function () {
    var ad = server.address();
    if (typeof ad === "string") {
        console.log("[server on listening] %s", ad);
    } else {
        console.log(
            "[server on listening] %s:%s using %s",
            ad.address,
            ad.port,
            ad.family
        );
    }
    client.invoke("checkBalance", function (error, res, more) {
        console.log("The current Balance of your account: " + res);
        if (res == "1000000000000000000000000") {
            //   socket.write("blockchainConfirmed\n");
        }
    });
});

server.on("connection", function (socket) {
    server.getConnections(function (err, count) {
        console.log("%d open connections!", count);
    });

    // socket.write('blockchainConfirmed\n');
    // // for debugging
    // socket.write(ACCOUNT_BALANCE);
    // if (ACCOUNT_BALANCE == "1000000000000000000000000") {
    //     socket.write("blockchainConfirmed\n");
    // }
});

server.on("close", function () {
    console.log("[server on close]");
});
server.on("err", function (err) {
    console.log(err);
    server.close(function () {
        console.log("shutting down the server!");
    });
});