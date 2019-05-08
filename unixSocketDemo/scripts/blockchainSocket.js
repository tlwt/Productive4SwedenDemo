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

var ACCOUNT_BALANCE;

/*******************************************
 *
 *   Blockchain interface and SC Data
 *
 ********************************************/

const web3 = new Web3(
    new Web3.providers.WebsocketProvider("ws://89.144.27.100:8484")
);

var OZ_ERC20Token = new web3.eth.Contract(
    config.JSON_INTERFACE,
    config.CONTRACT_ADDRESS
);
//console.log(OZ_ERC20Token);
OZ_ERC20Token.options.defaultAccount = config.CONTRACT_ACCOUNT;

OZ_ERC20Token.methods
    .balanceOf(config.CONTRACT_ACCOUNT)
    .call()
    .then(function (r, e) {
        if (!e) {
            // console.log(JSON.stringify(r));
            ACCOUNT_BALANCE = r;
            console.log(ACCOUNT_BALANCE);
        } else console.error(e);
    });

/*******************************************
 *
 *   Socket Interface for Robot communication
 *
 ********************************************/
//var echo, log, server;
var rpcserver = new zerorpc.Server({
    createServer: function () {

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
             * * methods:
             */
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


        // rpcserver.bind("tcp://0.0.0.0:4242");

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
        });

        server.on("connection", function (socket) {
            server.getConnections(function (err, count) {
                console.log("%d open connections!", count, ACCOUNT_BALANCE);
            });
            socket.write('blockchainConfirmed\n');
            // for debugging
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
    }

});

rpcserver.bind("tcp://0.0.0.0:4242");