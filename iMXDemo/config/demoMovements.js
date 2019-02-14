const moveServo = require('../scripts/moveServos');

// defining the servos: 
var moveServoOne = moveServo.moveServoOne;
var moveServoTwo = moveServo.moveServoTwo;
var moveServoThree = moveServo.moveServoThree;
var moveServoFour = moveServo.moveServoFour;
var moveServoFive = moveServo.moveServoFive;
var moveServoSix = moveServo.moveServoSix;

// exporting the initial functions 
module.exports = {
    neutralPosition: function neutralPosition() {
        moveServoOne(307);
        moveServoSix(300);
        moveServoFive(180);
        moveServoThree(106);
        moveServoFour(106);
    },
    moveToBox: function moveToBox() {
        moveServoOne(307);
        moveServoSix(106);
        moveServoFive(410);
        moveServoThree(106);
        moveServoFour(200);
    },
    pickUpBox: function pickUpBox() {
        moveServoOne(450);
    },
    moveBox: function moveBox() {
        moveServoOne(450);
        moveServoSix(450);
        moveServoFive(300);
        moveServoThree(106);
        moveServoFour(200);
    },
    putDownBox: function putBoxDown() {
        // set of Movements for plaacing Box in spot 2 
        moveServoOne(450);
        moveServoSix(450);
        moveServoFive(410);
        moveServoThree(106);
        moveServoFour(200);
    },
    releaseBox: function releaseBox() {
        moveServoOne(307);
    },
}