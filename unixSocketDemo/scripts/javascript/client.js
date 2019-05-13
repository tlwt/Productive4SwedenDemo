// jshint esversion:6

const zerorpc = require('zerorpc');

var client = new zerorpc.Client();
client.connect("tcp://89.144.27.100:4242");

client.invoke("checkFunction", function (err, res, more) {
    console.log(res);
});