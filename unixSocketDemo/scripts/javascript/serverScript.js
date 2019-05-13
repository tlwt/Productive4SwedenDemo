/**
 *
 *  Server side script for allowing the iMX to interact with the Blockchain and
 *  Smart contract functionality, by removing the web3 module
 *
 */

var Web3 = require("web3");
var zerorpc = require("zerorpc");
var config = require("../../config/config");

const web3 = new Web3(
    new Web3.providers.WebsocketProvider("ws://89.144.27.100:8484")
);

var SC_CONTRACT = new web3.eth.Contract(
    config.JSON_INTERFACE_SC,
    config.CONTRACT_ADDRESS_SC,
);

web3.eth.personal.unlockAccount(config.CONTRACT_ACCOUNT_SC, "nxppoachain");
SC_CONTRACT.options.defaultAccount = config.CONTRACT_ACCOUNT_SC;


var TRANSACTION_GAS = 1000000;

var CALLBACKS = [];

function setNewContractRegister(func) {
    if (!CALLBACKS) {
        CALLBACKS = [];
    }

    CALLBACKS.push(func);
    return CALLBACKS;
}

function advanceContractState(state, contract) {
    let methods = [{
            "method": contract.methods.setStatusOrdered,
            "from": config.CONTRACT_ACCOUNT_SC,
            "args": [config.CONTRACT_ACCOUNT_SC_TEST]
        },
        {
            "method": contract.methods.setStatusToSelected,
            "from": config.CONTRACT_ACCOUNT_SC,
            "args": [config.CONTRACT_ACCOUNT_SC]
        },
        {
            "method": contract.methods.setStatusToRegistered,
            "from": config.CONTRACT_ACCOUNT_SC,
            "args": []
        },
        {
            "method": contract.methods.setStatusToDelivery,
            "from": config.CONTRACT_ACCOUNT_SC,
            "args": []
        },
        {
            "method": contract.methods.setStatusToOnSite,
            "from": config.CONTRACT_ACCOUNT_SC,
            "args": []
        },
        {
            "method": contract.methods.setStatusToReceived,
            "from": config.CONTRACT_ACCOUNT_SC,
            "args": []
        }
    ];
    if (state < methods.length) {
        let m = methods[state];
        console.log('calling method from: ' + m.from);
        m.method.apply(null, m.args)
            .send({
                from: m.from,
                gas: TRANSACTION_GAS
            })
            .on('transactionHash', hash => {
                console.log('advanceContractState transactionHash ' + hash);
            })
            .on('error', error => {
                console.error('error ' + error);
            })
            .then(result => {
                console.log('advanceContractState then ' + JSON.stringify(result));
                // INFO: all events are handled by the registered event handler
                // only do the error handling here
            });
    }
}

//-----------------------------------
// communication with contract events
//-----------------------------------
setNewContractRegister(contract => {
    console.log('Registering callback for status changed events')
    SC_CONTRACT.events.statusChanged({
            fromBlock: 0
        })
        .on('data', event => {
            console.log('setNewContract data ' + event); // same results as the optional callback above
            let _status = Number(event.returnValues._status);
            io.emit('status changed', {
                address: event.address,
                step: _status,
                timestamp: new Date().getTime()
            });
            if (_status == STATE_AUTO_ADVANCE) {
                console.log('Auto advance state');
                advanceContractState(_status + 1, SC_CONTRACT);
            }
            if (_status == STATE_START_TRUCK) {
                console.log('Start truck');
            }
        })
        .on('changed', event => {
            console.log('setNewContract changed ' + event); // same results as the optional callback above
        })
        .on('error', console.error);
});





// /**
//  *
//  *  exporting the modules in order to make them callable via zerorpc
//  *
//  */
// var server = new zerorpc.Server({
//     /**
//      * @function checkFunction // check any random function of the smart contract regarding functionality
//      * @param {*} reply // generic reply for zerorpc
//      */
//     checkFunction: function (reply) {
//         /**
//          * Defining the smart contract
//          */
//         const web3 = new Web3(
//             new Web3.providers.WebsocketProvider("ws://89.144.27.100:8484")
//         );

//         const SC_CONTRACT = new web3.eth.Contract(
//             config.JSON_INTERFACE_SC,
//             config.CONTRACT_ADDRESS_SC
//         );
//         SC_CONTRACT.options.defaultAccount = config.CONTRACT_ACCOUNT_SC;
//         console.log(SC_CONTRACT.options);

//         var TRANSACTION_GAS = 1000000;

//         /**
//          * Defining the smart contract methods
//          */
//         let methods = [{
//                 "method": SC_CONTRACT.methods.setStatusOrdered,
//                 "from": config.CONTRACT_ACCOUNT_SC,
//                 "args": [config.CONTRACT_ACCOUNT_SC_TEST]
//             },
//             {
//                 "method": SC_CONTRACT.methods.setStatusToSelected,
//                 "from": config.CONTRACT_ACCOUNT_SC,
//                 "args": [config.CONTRACT_ACCOUNT_SC]
//             },
//             {
//                 "method": SC_CONTRACT.methods.setStatusToRegistered,
//                 "from": config.CONTRACT_ACCOUNT_SC,
//                 "args": []
//             },
//             {
//                 "method": SC_CONTRACT.methods.setStatusToDelivery,
//                 "from": config.CONTRACT_ACCOUNT_SC,
//                 "args": []
//             },
//             {
//                 "method": SC_CONTRACT.methods.setStatusToOnSite,
//                 "from": config.CONTRACT_ACCOUNT_SC,
//                 "args": []
//             },
//             {
//                 "method": SC_CONTRACT.methods.setStatusToReceived,
//                 "from": config.CONTRACT_ACCOUNT_SC,
//                 "args": []
//             }
//         ];
//         /**
//          * Advancing the contract state by calling the next method
//          */

//         SC_CONTRACT.methods.setStatusOrdered.call()
//             .send({
//                 from: config.CONTRACT_ACCOUNT_SC,
//                 gas: TRANSACTION_GAS
//             })
//             .on('transactionHash', hash => {
//                 console.log('advanceContractState transactionHash ' + hash);
//                 ackMsg(io, hash);
//             })
//             .on('error', error => {
//                 console.error('error ' + error);
//             })
//             .then(result => {
//                 console.log('advanceContractState then ' + JSON.stringify(result));
//                 reply(null, result);
//                 // INFO: all events are handled by the registered event handler
//                 // only do the error handling here
//                 if (result && result.gasUsed == TRANSACTION_GAS) {
//                     errMsg(io, 'Transaction failed');
//                 }
//             });
//     },
// });

// server.bind("tcp://0.0.0.0:4242");