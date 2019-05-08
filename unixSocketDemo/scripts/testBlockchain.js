//jshint esversion:6

const zerorpc = require("zerorpc");

var timeout = 50000;
var client = new zerorpc.Client(timeout);
client.connect("tcp://89.144.27.100:4242");

client.invoke("checkBalance", function (error, res, more) {
    console.log(res);
});