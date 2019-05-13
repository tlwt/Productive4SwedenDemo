// jshint esversion:6


/**
 * 
 * Test script for demo client debugging
 * 
 */
const zerorpc = require('zerorpc');

var client = new zerorpc.Client();
client.connect("tcp://89.144.27.100:4242");

client.invoke("getState", function (error, res, more) {
    console.log(error, res);
});