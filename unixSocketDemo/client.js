// jshint esversion:6

const net = require('net');
const fs = require('fs');
const socketPath = '/tmp/blockchainSocket.sock';

var client = net.createConnection(socketPath);

client.on("connect", function () {
    console.log('Connection established...');

});

client.on("data", function (data) {

});