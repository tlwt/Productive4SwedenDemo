pragma solidity ^0.5.1;

contract OrderContract {

    enum STATE {
        ORDERED,
        SELECTED,
        REGISTERED,
        DELIVERY,
        ON_SITE,
        DELIVERED
    }

    STATE public status;
    
    function getState() public view returns (uint) {
        return uint(status);
    }
    
    function setStateToOrdered() public returns (uint) {
        status = STATE.ORDERED;
        return uint(status);
    }
    
    function setStateToSelected() public returns (uint) {
        status = STATE.SELECTED;
        return uint(status);
    }
    
    function setStateToRegistered() public returns (uint) {
        status = STATE.REGISTERED;
        return uint(status);
    }
    
    function setStateToDelivery() public returns (uint) {
        status = STATE.DELIVERY;
        return uint(status);
    }
    
    function setStateToOnsite() public returns (uint) {
        status = STATE.ON_SITE;
        return uint(status);
    }
    
    function setStateToDelivered() public returns (uint) {
        status = STATE.DELIVERED;
        return uint(status);
    }

}