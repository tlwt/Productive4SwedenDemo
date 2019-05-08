var autobahn = require("autobahn");
var payload = require("./payloadCreation");

var connection = new autobahn.Connection({
    url: "ws://crossbar.distributedledger.systems:8080/ws",
    realm: "realm1"
});

connection.onopen = function (session) {
    var counter = 0;

    setInterval(function () {
        console.log(
            "publishing to topic 'SwedenDemo': " + payload.returnHash() + counter
        );
        session.publish("SwedenDemo", [payload.returnHash()]);
        //document.getElementById('WAMPEvent').innerHTML =  "Event: Hello World "+counter;
        counter += 1;
    }, 1000);
};

connection.open();