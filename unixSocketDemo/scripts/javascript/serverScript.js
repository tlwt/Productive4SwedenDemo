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

var currentState = "";

/**
 * Creating the web3 instance and the smart contract for function calls
 */

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://89.144.27.100:8484")
);

var STATE_CONTRACT = new web3.eth.Contract(
  config.CONTRACT_ABI_FINAL,
  config.CONTRACT_ADDRESS_FINAL
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

setInterval(function getState() {
  STATE_CONTRACT.methods
    .getState()
    .call()
    .then((error, result) => {
      if (!error) {
        currentState = JSON.stringify(result.toString("hex"));
        console.log(currentState);
        //return currentState;
      } else {
        console.error(error);
      }
    });
  console.log(currentState);
}, 1000);

var server = new zerorpc.Server({
  /**
   * Function for call smart contract methods
   */

  currentState: function currentState() {
    STATE_CONTRACT.methods
      .getState()
      .call()
      .then((error, result) => {
        if (!error) {
          currentState = JSON.stringify(result.toString("hex"));
          console.log(currentState);
          //return currentState;
        } else {
          console.error(error);
        }
      });
  },

  setStateToOrdered: function setStateToOrdered() {
    STATE_CONTRACT.methods
      .setStateToOrdered()
      .send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
      })
      .on("transactionHash", hash => {
        console.log("advanceContractState transactionHash " + hash);
      })
      .on("error", error => {
        console.error("error " + error);
      })
      .then((error, result) => {
        if (!error) {
          console.log("advanceContractState then " + JSON.stringify(result));
          currentState = 0;
          // INFO: all events are handled by the registered event handler
          // only do the error handling here
        } else console.error(error);
      });
  },

  /**
   * Function for call smart contract methods
   */
  setStateToRegistered: function setStateToRegistered() {
    STATE_CONTRACT.methods
      .setStateToRegistered()
      .send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
      })
      .on("transactionHash", hash => {
        console.log("advanceContractState transactionHash " + hash);
      })
      .on("error", error => {
        console.error("error " + error);
      })
      .then((error, result) => {
        if (!error) {
          console.log("advanceContractState then " + JSON.stringify(result));
          currentState = 1;
          // INFO: all events are handled by the registered event handler
          // only do the error handling here
        } else console.error(error);
      });
  },

  /**
   * Function for call smart contract methods
   */
  setStateToSelected: function setStateToSelected() {
    STATE_CONTRACT.methods
      .setStateToSelected()
      .send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
      })
      .on("transactionHash", hash => {
        console.log("advanceContractState transactionHash " + hash);
      })
      .on("error", error => {
        console.error("error " + error);
      })
      .then((error, result) => {
        if (!error) {
          console.log("advanceContractState then " + JSON.stringify(result));
          currentState = 2;
          // INFO: all events are handled by the registered event handler
          // only do the error handling here
        } else console.error(error);
      });
  },

  /**
   * Function for call smart contract methods
   */
  setStateToDelivery: function setStateToDelivery() {
    STATE_CONTRACT.methods
      .setStateToDelivery()
      .send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
      })
      .on("transactionHash", hash => {
        console.log("advanceContractState transactionHash " + hash);
      })
      .on("error", error => {
        console.error("error " + error);
      })
      .then((error, result) => {
        if (!error) {
          console.log("advanceContractState then " + JSON.stringify(result));
          currentState = 3;
          // INFO: all events are handled by the registered event handler
          // only do the error handling here
        } else console.error(error);
      });
  },

  /**
   * Function for call smart contract methods
   */
  setStateToOnsite: function setStateToOnsite() {
    STATE_CONTRACT.methods
      .setStateToOnsite()
      .send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
      })
      .on("transactionHash", hash => {
        console.log("advanceContractState transactionHash " + hash);
      })
      .on("error", error => {
        console.error("error " + error);
      })
      .then((error, result) => {
        if (!error) {
          console.log("advanceContractState then " + JSON.stringify(result));
          currentState = 4;
          // INFO: all events are handled by the registered event handler
          // only do the error handling here
        } else console.error(error);
      });
  },

  /**
   * Function for call smart contract methods
   */
  setStateToDelivered: function setStateToDelivered() {
    STATE_CONTRACT.methods
      .setStateToDelivered()
      .send({
        from: config.CONTRACT_ACCOUNT_FINAL,
        gas: 100000
      })
      .on("transactionHash", hash => {
        console.log("advanceContractState transactionHash " + hash);
      })
      .on("error", error => {
        console.error("error " + error);
      })
      .then((error, result) => {
        if (!error) {
          console.log("advanceContractState then " + JSON.stringify(result));
          currentState = 5;
          // INFO: all events are handled by the registered event handler
          // only do the error handling here
        } else console.error(error);
      });
    currentState = 5;
  }
});

server.bind("tcp://0.0.0.0:4242");

//TODO: make the functions exportable via zerorpc
//TODO: create client and ui application
