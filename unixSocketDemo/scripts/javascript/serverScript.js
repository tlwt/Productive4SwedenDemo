//jshint esversion:6

/**
 *
 *  Server side script for allowing the iMX to interact with the Blockchain and
 *  Smart contract functionality, by removing the web3 module
 *
 */

var Web3 = require("web3");
var zerorpc = require("zerorpc");
var config = require("../../config/config");

/**
 * Creating the web3 instance and the smart contract for function calls
 */

const web3 = new Web3(
    new Web3.providers.WebsocketProvider("ws://89.144.27.100:8484")
);

var STATE_CONTRACT = new web3.eth.Contract(
    config.CONTRACT_ABI_FINAL,
    config.CONTRACT_ADDRESS_FINAL,
);

/**
 * unlocking functional smart contract account
 */

//web3.eth.personal.importRawKey("eaa2e6c97bf0c2d3ba761c7de6bb13e55f120162c94ffc0830e2e79d3282bcd8", "nxppoachain");
web3.eth.personal.unlockAccount(config.CONTRACT_ACCOUNT_FINAL, "nxppoachain");
STATE_CONTRACT.options.defaultAccount = config.CONTRACT_ACCOUNT_FINAL;

/**
 * Function for getting the current state of the smart contracts supply chain
 */

function getState() {
    var returnState = "";
    STATE_CONTRACT.methods.getState().call().then((error, result) => {
        if (!error) {
            returnState = result;
            console.log(returnState);
        } else {
            console.error(error);
        }
        return returnState;
    });
}

/**
 * Function for call smart contract methods
 */
STATE_CONTRACT.methods.setStateToOrdered().send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
    }).on('transactionHash', hash => {
        console.log('advanceContractState transactionHash ' + hash);
    })
    .on('error', error => {
        console.error('error ' + error);
    })
    .then((error, result) => {
        if (!error) {
            console.log('advanceContractState then ' + JSON.stringify(result));
            getState();
            // INFO: all events are handled by the registered event handler
            // only do the error handling here
        } else console.error(error);
    });

/**
 * Function for call smart contract methods
 */
STATE_CONTRACT.methods.setStateToRegistered().send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
    }).on('transactionHash', hash => {
        console.log('advanceContractState transactionHash ' + hash);
    })
    .on('error', error => {
        console.error('error ' + error);
    })
    .then((error, result) => {
        if (!error) {
            console.log('advanceContractState then ' + JSON.stringify(result));
            getState();
            // INFO: all events are handled by the registered event handler
            // only do the error handling here
        } else console.error(error);
    });

/**
 * Function for call smart contract methods
 */
STATE_CONTRACT.methods.setStateToSelected().send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
    }).on('transactionHash', hash => {
        console.log('advanceContractState transactionHash ' + hash);
    })
    .on('error', error => {
        console.error('error ' + error);
    })
    .then((error, result) => {
        if (!error) {
            console.log('advanceContractState then ' + JSON.stringify(result));
            getState();
            // INFO: all events are handled by the registered event handler
            // only do the error handling here
        } else console.error(error);
    });

/**
 * Function for call smart contract methods
 */
STATE_CONTRACT.methods.setStateToDelivery().send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
    }).on('transactionHash', hash => {
        console.log('advanceContractState transactionHash ' + hash);
    })
    .on('error', error => {
        console.error('error ' + error);
    })
    .then((error, result) => {
        if (!error) {
            console.log('advanceContractState then ' + JSON.stringify(result));
            getState();
            // INFO: all events are handled by the registered event handler
            // only do the error handling here
        } else console.error(error);
    });

/**
 * Function for call smart contract methods
 */
STATE_CONTRACT.methods.setStateToOnsite().send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
    }).on('transactionHash', hash => {
        console.log('advanceContractState transactionHash ' + hash);
    })
    .on('error', error => {
        console.error('error ' + error);
    })
    .then((error, result) => {
        if (!error) {
            console.log('advanceContractState then ' + JSON.stringify(result));
            getState();
            // INFO: all events are handled by the registered event handler
            // only do the error handling here
        } else console.error(error);
    });

/**
 * Function for call smart contract methods
 */
STATE_CONTRACT.methods.setStateToDelivered().send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
    }).on('transactionHash', hash => {
        console.log('advanceContractState transactionHash ' + hash);
    })
    .on('error', error => {
        console.error('error ' + error);
    })
    .then((error, result) => {
        if (!error) {
            console.log('advanceContractState then ' + JSON.stringify(result));
            getState();
            // INFO: all events are handled by the registered event handler
            // only do the error handling here
        } else console.error(error);
    });