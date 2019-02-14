/*******************************************************************************
 *                                                                              *
 *                 Script for ZMQ Function calling                              *
 *                 between python and JS                                        *
 *                                                                              *
 *******************************************************************************/

var zerorpc = require("zerorpc");


module.exports = {

    moveServoOne: function moveServoOne(pulse) {
        var client = new zerorpc.Client();
        client.connect("tcp://172.20.10.10:4242");

        client.invoke("moveServoOne", pulse, function(error, res, more) {
            console.log(res);
        });
    },


    moveServoTwo: function moveServoTwo(pulse) {
        var client = new zerorpc.Client();
        client.connect("tcp://172.20.10.10:4242");

        client.invoke("moveServoTwo", pulse, function(error, res, more) {
            console.log(res);
        });
    },


    moveServoThree: function moveServoThree(pulse) {
        var client = new zerorpc.Client();
        client.connect("tcp://172.20.10.10:4242");

        client.invoke("moveServoThree", pulse, function(error, res, more) {
            console.log(res);
        });
    },


    moveServoFour: function moveServoFour(pulse) {
        var client = new zerorpc.Client();
        client.connect("tcp://172.20.10.10:4242");

        client.invoke("moveServoFour", pulse, function(error, res, more) {
            console.log(res);
        });
    },


    moveServoFive: function moveServoFive(pulse) {
        var client = new zerorpc.Client();
        client.connect("tcp://172.20.10.10:4242");

        client.invoke("moveServoFive", pulse, function(error, res, more) {
            console.log(res);
        });
    },


    moveServoSix: function moveServoSix(pulse) {
        var client = new zerorpc.Client();
        client.connect("tcp://172.20.10.10:4242");

        client.invoke("moveServoSix", pulse, function(error, res, more) {
            console.log(res);
        });
    },

}