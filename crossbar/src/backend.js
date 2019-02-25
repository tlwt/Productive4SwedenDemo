var autobahn = require('autobahn');

var connection = new autobahn.Connection({
    url: 'ws://autobahn.distributedledger.systems:9000/ws',
    realm: 'realm1'
});

connection.onopen = function (session) {

    var counter = 0;

    setInterval(function () {
        console.log("publishing to topic 'com.myapp.hello': " + "Hello World " + counter);
        session.publish('com.myapp.hello', ['Hello World ' + counter]);
        //document.getElementById('WAMPEvent').innerHTML =  "Event: Hello World "+counter;
        counter += 1;
    }, 1000);
};

connection.open();