const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');
var zmq = require('zeromq');

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8501"));

const input = fs.readFileSync('statusContract.sol');
const output = solc.compile(input.toString(), 1);
//error message handling to be defined
//console.log(JSON.stringify(output));
const bytecode = output.contracts[':statusContract'].bytecode;
const abi = JSON.parse(output.contracts[':statusContract'].interface);

var statusContract = new web3.eth.Contract(abi, {
    from: '0xcaf241c39d6567e2a8b10fab1b313bd63699fce6' // default from address
});

// deploying the contract instance
var contractAddress;
var contractAbi;
var _status;

statusContract.deploy({
    data: '0x' + bytecode,
}).send({
    from: '0xcaf241c39d6567e2a8b10fab1b313bd63699fce6',
    gas: 1500000,
}).on('receipt', function(receipt){
    console.log(receipt.contractAddress);
    contractAddress = receipt.contractAddress;// contains the new contract address
}).on('confirmation', function(confirmationNumber, receipt){
    contractAddress = receipt.contractAddress;
}).then(function(newContractInstance) {
    console.log(newContractInstance.options.address)
    contractAddress = newContractInstance.options.address;
    //console.log(newContractInstance.options.jsonInterface)
    //contractAbi = newContractInstance.options.jsonInterface;
    var statusContract = new web3.eth.Contract(abi, contractAddress, {
        from: '0xcaf241c39d6567e2a8b10fab1b313bd63699fce6' // default from address
    });

    //ZMQ INstance
    // socket to talk to clients
    var responder = zmq.socket('rep');
    var packetResponder = zmq.socket('rep');

    responder.on('message', function(request) {
        console.log("Received request: [", request.toString(), "]");
        // do some 'work'
        var statusContract = new web3.eth.Contract(abi, contractAddress, {
            from: '0xcaf241c39d6567e2a8b10fab1b313bd63699fce6' // default from address
        });
        // send reply back to client.
        responder.send("Success");
    });

    responder.bind('tcp://*:5558', function(err) {
        if (err) {
            console.log(err);
        } else {
            responder.send("1");
        }
    });

    packetResponder.bind('tcp://*:5559', function(err) {
        if (err) {
            console.log(err);
        }
    })

    packetResponder.on('message', function(request) {
        console.log("Received request: [", request.toString(), "]");
        setInterval(function() {
            statusContract.methods.getStatus().call().then(console.log);
        }, 3000);
        // do some 'work'
        var statusContract = new web3.eth.Contract(abi, contractAddress, {
            from: '0xcaf241c39d6567e2a8b10fab1b313bd63699fce6' // default from address
        });
        // send reply back to client.
        packetResponder.send("ACK");
        //statusContract.methods.getStatus().call().then(console.log);
        statusContract.methods.getStatus().call().then(_status = statusContract.methods.getStatus().call()._bitField);
        if(_status = 0) {statusContract.methods.setStatusToContracted().send({from:web3.eth.coinbase});}
        if(_status = 1) {statusContract.methods.setStatusToSent().send({from:web3.eth.coinbase});}
        else { console.log("Check your Package Status");};
    });

    process.on('SIGINT', function() {
        responder.close();
        packetResponder.close();
    });
});
