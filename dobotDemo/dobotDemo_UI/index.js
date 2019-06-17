/***
 * 
 * Dobot Demo index.js 
 * Also including the option of two different inputs for the smart contract they want to execute
 * 
 */


const config = require("./config/config.js");
const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const zerorpc = require("zerorpc");

const fs = require("fs");
const solc = require("solc");
const Web3 = require("web3");

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://89.144.27.100:8484")
);
//const zmq = require('zeromq');

console.log("customer " + config.ACCOUNT_CUSTOMER);
console.log("seller " + config.ACCOUNT_SELLER);
console.log("delivery " + config.ACCOUNT_DELIVERYSERVICE);

// global instance of the one contract that's active
var CONTRACT;
var CONTRACT_COMPILED;
var TRANSACTION_GAS = 1000000;

// unlocking config and functional account
//web3.eth.personal.importRawKey(
//  "eaa2e6c97bf0c2d3ba761c7de6bb13e55f120162c94ffc0830e2e79d3282bcd8",
//  "nxppoachain"
//);
web3.eth.personal.unlockAccount(config.MINER_NODE, "nxppoachain");

//var TRUCK = zmq.socket('rep');

const STATE_SELLER = 1;
const TAG_SELLER = "Seller7597";
const STATE_DELIVERY = 2;
const TAG_DELIVERY = "DeliveryService7597";
const STATE_HOME = 4;
const TAG_HOME = "Home7597";

const STATE_START_TRUCK = 3;
const STATE_AUTO_ADVANCE = STATE_DELIVERY;

var NFC_TAGS_TO_STATE = {};
NFC_TAGS_TO_STATE[TAG_SELLER] = STATE_SELLER;
NFC_TAGS_TO_STATE[TAG_DELIVERY] = STATE_DELIVERY;
NFC_TAGS_TO_STATE[TAG_HOME] = STATE_HOME;

var CALLBACKS = [];
function setNewContract(contract) {
  console.log("setting new contract");
  CONTRACT = contract;
  if (CALLBACKS) {
    CALLBACKS.forEach(v => {
      console.log("calling callback");
      v(contract);
    });
  }
}

function setNewContractRegister(func) {
  if (!CALLBACKS) {
    CALLBACKS = [];
  }

  CALLBACKS.push(func);
  return CALLBACKS;
}

// serve the pre-built ui application
app.use(express.static(config.STATIC_FILES));

// FAKE: emit event steps every xx ms
function walkThrough(socket, step) {
  const timeout = 1000;
  let reset = false;
  let nextStep = () => {
    socket.emit("data", { step: step, timestamp: reset ? null : new Date() });
    console.log({ step: step, timestamp: new Date() });
    if (step == 0 && reset) {
      reset = false;
    } else {
      step = step + 1;
    }
    if (step > 5) {
      step = 0;
      reset = true;
    }
    setTimeout(nextStep, timeout);
  };
  setTimeout(nextStep, timeout);
}

function isWeb3Connected() {
  return web3.accounts.length > 0;
}

function compileContract(contract) {
  let input = fs.readFileSync(String(contract));
  let output = solc.compile(input.toString(), 1);
  if (output.errors) {
    throw output.errors;
  }
  return output.contracts[":OrderContract"];
}

let deployContract = (socket, compiled_contract) =>
  new Promise(resolve => {
    console.log("deployContract");
    const bytecode = compiled_contract.bytecode;
    const abi = JSON.parse(compiled_contract.interface);

    let contract = new web3.eth.Contract(abi);

    console.log("deploying contract from: " + config.ACCOUNT_CUSTOMER);
    contract
      .deploy({ data: "0x" + bytecode })
      .send({
        from: config.ACCOUNT_CUSTOMER,
        gas: TRANSACTION_GAS
      })
      .on("error", error => {
        console.error(error);
      })
      .on("transactionHash", hash => {
        console.log("transactionHash " + hash);
        ackMsg(socket, hash);
      })
      .on("receipt", receipt => {
        console.log("receipt received " + receipt.contractAddress);
        console.log(receipt);
        // on receipt send out confirmation to the dobot servers
      })
      .on("confirmation", (confirmationNumber, receipt) => {
        // debug
        // console.log('confirmation received ' + receipt.contractAddress);
      })
      .then(contract => {
        console.log(
          "contract successfully deployed " + contract.options.address
        );
        setNewContract(contract);
        return resolve(contract);
        // send out confirmation of final validation
      });
  });

function emitContract(socket, contract) {
  console.log("emitting new contract");
  contract.methods
    .status()
    .call()
    .then(status => {
      let c = {
        address: contract.options.address,
        step: Number(status),
        timestamp: new Date().getTime()
      };
      console.log("emitting new contract " + JSON.stringify(c));
      socket.emit("new contract", c);
    });
}

function createNewContract() {
  console.log("createNewContract");
  CONTRACT = null;

  deployContract(io, CONTRACT_COMPILED)
    .then(contract => {
      console.log("New contract created");
      emitContract(io, contract);
      // advance to the first state
      advanceContractState(0, contract);
    })
    .catch(error => console.error(error));
}

function advanceContractState(state, contract) {
  /***
   * critical to get the sequencing of the calls, after stage one which is automatically triggered
   */

  console.log("advanceContractState");
  if (!contract) {
    console.error("contract not yet initialized");
    return;
  }
  let methods = [
    {
      method: contract.methods.setStatusOrdered,
      from: config.MINER_NODE,
      args: [config.MINER_NODE]
    },
    {
      method: contract.methods.setStatusToSelected,
      from: config.MINER_NODE,
      args: [config.MINER_NODE]
    },
    {
      method: contract.methods.setStatusToRegistered,
      from: config.MINER_NODE,
      args: []
    },
    {
      method: contract.methods.setStatusToDelivery,
      from: config.MINER_NODE,
      args: []
    },
    {
      method: contract.methods.setStatusToOnSite,
      from: config.MINER_NODE,
      args: []
    },
    {
      method: contract.methods.setStatusToReceived,
      from: config.MINER_NODE,
      args: []
    }
  ];
  if (state < methods.length) {
    let m = methods[state];
    console.log("calling method from: " + m.from);
    m.method
      .apply(null, m.args)
      .send({
        from: m.from,
        gas: TRANSACTION_GAS
      })
      .on("transactionHash", hash => {
        console.log("advanceContractState transactionHash " + hash);
        ackMsg(io, hash);
      })
      .on("error", error => {
        console.error("error " + error);
      })
      .then(result => {
        console.log("advanceContractState then " + JSON.stringify(result));
        // INFO: all events are handled by the registered event handler
        // only do the error handling here
        if (result && result.gasUsed == TRANSACTION_GAS) {
          errMsg(io, "Transaction failed");
        }
      });
  }
}

function errMsg(socket, msg) {
  socket.emit("ERR", msg);
}

function ackMsg(socket, msg) {
  socket.emit("ACK", msg);
}

function initBrowserCommunication() {
  //---------------------------
  // communication with browser
  //---------------------------
  io.on("connection", socket => {
    console.log("new connection");
    if (CONTRACT) {
      emitContract(socket, CONTRACT);
    }
    // debug
    // walkThrough(socket, 0);

    //--------------------
    // client places order
    //--------------------
    socket.on("place order", () => {
      console.log("order placed");
      createNewContract();
      ackMsg(socket, "place order");
    });

    socket.on("advance", state => {
      console.log("advance");
      advanceContractState(state, CONTRACT);
      ackMsg(socket, "advance");
    });
  });

  //-----------------------------------
  // communication with contract events
  //-----------------------------------
  setNewContractRegister(contract => {
    console.log("Registering callback for status changed events");
    contract.events
      .statusChanged({ fromBlock: 0 })
      .on("data", event => {
        console.log("setNewContract data " + event); // same results as the optional callback above
        let _status = Number(event.returnValues._status);
        io.emit("status changed", {
          address: event.address,
          step: _status,
          timestamp: new Date().getTime()
        });
      })
      .on("changed", event => {
        console.log("setNewContract changed " + event); // same results as the optional callback above
      })
      .on("error", console.error);
  });

  //-------------------------
  // communication with truck
  //-------------------------
  //TRUCK.bind('tcp://*:5558', err => {
  //    if (err) {
  //        console.log(err);
  //    }
  //});

  //---------------------------
  // communication with scanner
  //---------------------------
  //var scanner = zmq.socket('rep');
  //scanner.bind('tcp://*:5559', err => {
  //    if (err) {
  //        console.log(err);
  //    }
  // });

  //scanner.on('message', request => {
  //  let tag = request.toString().replace(/\0*$/g, '').trim();
  //  console.log("Received request: [" + tag + "]" + NFC_TAGS_TO_STATE[tag] + " " + tag.length);
  //  console.log(NFC_TAGS_TO_STATE);
  //  if (NFC_TAGS_TO_STATE[tag] !== undefined) {
  //   scanner.send("Success");
  //    advanceContractState(NFC_TAGS_TO_STATE[tag], CONTRACT);
  //    return;
  //  }
  //  scanner.send("Ignored");
  //});

  //--------
  // cleanup
  //--------
  //process.on('SIGINT', () => {
  //    TRUCK.close();
  //    scanner.close();
  //});
}

http.listen(config.PORT, () =>
  console.log("Last Mile app listening on port http://localhost:3000/")
);

CONTRACT_COMPILED = compileContract(config.CONTRACT);

initBrowserCommunication();



//TODO: Update the advanceContract function exposure to ensure the consecution of function calls according to the smart contract
//TODO: Change the advanceContract function and divide them into separate zerorpc calls 
var server = new zerorpc.Server({
  // zerorpc server for seperate server setup to control the flow  of Blockchain information
  // also have to divide them into individual calls --> currently only one call to trigger all transactions

  advanceContractToOrdered: function advanceContract(reply) {
    advanceContractState(2, CONTRACT);
    reply(null, "Transaction confirmed... Creating Order!");
  },

  advanceContractToProcess: function advanceContract(reply) {
    advanceContractState(2, CONTRACT);
    reply(null, "Transaction confirmed... Processing Order!");
  },

  advanceContractToFinalization: function advanceContract(reply) {
    advanceContractState(3, CONTRACT);
    reply(null, "Transaction confirmed... Finalizing Order!");
  },
  
  advanceContractToCompletion: function advanceContract(reply) {
    advanceContractState(4, CONTRACT);
    reply(null, "Transaction confirmed... Order completed!");
  },

});

server.bind("tcp://0.0.0.0:4242");

//TODO: integrate async await functions for the correct progression of the smart contract
//TODO: Future: integration of smart oracles using secure elements