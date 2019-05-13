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

var STATE_CONTRACT = new web3.eth.Contract(
    config.JSON_INTERFACE_STATE,
    config.CONTRACT_ADDRESS_STATE,
);

//web3.eth.personal.importRawKey("eaa2e6c97bf0c2d3ba761c7de6bb13e55f120162c94ffc0830e2e79d3282bcd8", "nxppoachain");
web3.eth.personal.unlockAccount(config.CONTRACT_ACCOUNT_STATE, "nxppoachain");
STATE_CONTRACT.options.defaultAccount = config.CONTRACT_ACCOUNT_STATE;

var TRANSACTION_GAS = 1000000;


function advanceContractState(contract) {
    contract.methods.setStateToOrdered.call()
        .send({
            from: config.CONTRACT_ACCOUNT_STATE,
            gas: TRANSACTION_GAS
        })
        .on('transactionHash', hash => {
            console.log('advanceContractState transactionHash ' + hash);
        })
        .on('error', error => {
            console.error('error ' + error);
        })
        .then((error, result) => {
            if (!error) {
                console.log('advanceContractState then ' + JSON.stringify(result));
                // INFO: all events are handled by the registered event handler
                // only do the error handling here
            } else {
                console.error(error);
            }
        });
}
advanceContractState(STATE_CONTRACT);