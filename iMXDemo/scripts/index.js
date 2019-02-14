// including the requirements 
const Web3 = require('web3');
const config = require('../config/config');
const demoMovements = require('../config/demoMovements');

// connecting to the Blockchain RPC Provider
const web3 = new Web3(new Web3.providers.HttpProvider("http://89.144.27.100:8484"));

// defining global variables 
var CURRENT_BALANCE;

// defining positions: 
var neutralPosition = demoMovements.neutralPosition;
var moveToBox = demoMovements.moveToBox;
var pickUpBox = demoMovements.pickUpBox;
var moveBox = demoMovements.moveBox;
var putBoxDown = demoMovements.putDownBox;
var releaseBox = demoMovements.releaseBox;

// define timeout function for interval between functions
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds) {
            break;
        }
    }
};

// demo movement for robot
// sleep(5000);
// moveToBox();
// sleep(5000);
// pickUpBox();
// sleep(5000);
// moveBox();
// sleep(5000);
// putBoxDown();
// sleep(5000);
// releaseBox();
// sleep(5000);
// neutralPosition();

/*
 *  Blockchain Interaction
 */

// function for checking balance of account and moving the robot accordingly:
// function getBalance

function getBalance(addr) {
    web3.eth.getBalance(addr, function(err, res) {
        if (!err) {
            let balance = JSON.stringify(res.bitfield);
            return balance;
        } else console.error(err);
    })
};

function addBalance(amount) {
    web3.eth.sendTransaction({
        from: config.DEFAULT_ADDRESS,
        to: config.TEST_ACCOUNT,
        value: amount
    }, function(error, result) {
        if (!error) console.log(result);
        else console.error(error);
    });
};

function removeBalance(amount) {
    web3.eth.personal.unlockAccount(config.TEST_ACCOUNT, "nxppoachain", 500).then(console.log("Account Unlocked!"))
    if (amount === 'all') {
        let balance = getBalance(config.TEST_ACCOUNT);
        console.log(balance);
        web3.eth.sendTransaction({
            from: config.TEST_ACCOUNT,
            to: config.DEFAULT_ADDRESS,
            value: 10
        }, function(error, res) {
            if (!error) console.log(res);
            else console.error(error);
        });
    } else {
        web3.eth.sendTransaction({
            from: config.TEST_ACCOUNT,
            to: config.DEFAULT_ADDRESS,
            value: amount
        }, function(error, res) {
            if (!error) console.log(res);
            else console.error(error);
        });
    }
}

// initialising ERC20 Token Smart contract instance 
var OZ_ERC20Token = new web3.eth.Contract(config.JSON_INTERFACE, config.CONTRACT_ADDRESS);
OZ_ERC20Token.options.defaultAccount = config.CONTRACT_ACCOUNT;



// adding token to the test account and moving the robot arm accordingly
OZ_ERC20Token.methods.balanceOf(config.TEST_ACCOUNT).call(function(error, result) {
    if (!error) {
        CURRENT_BALANCE = result;
        console.log("The current balance of token on the Robot's account is: " + CURRENT_BALANCE);
        if (CURRENT_BALANCE == 10) {
            // demo movement for robot
            sleep(5000);
            moveToBox();
            sleep(5000);
            pickUpBox();
            sleep(5000);
            moveBox();
            sleep(5000);
            putBoxDown();
            sleep(5000);
            releaseBox();
            sleep(5000);
            neutralPosition();
        }
    } else console.error(error);
});