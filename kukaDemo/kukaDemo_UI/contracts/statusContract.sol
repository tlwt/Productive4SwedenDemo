pragma solidity ^0.4.16;

contract OrderContract {

    event statusChanged(uint indexed _status);

    enum STATE {
        PACKAGE_ORDERED,
        PACKAGE_SELECTED,
        PACKAGE_REGISTERED,
        PACKAGE_DELIVERY,
        PACKAGE_ON_SITE,
        PACKAGE_DELIVERED,
        PACKAGE_UNINITIALIZED
    }

    STATE public status;

    address public seller;
    address public delivery;
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlySeller() {
        require(msg.sender == seller);
        _;
    }

    modifier onlyDelivery() {
        require(msg.sender == delivery);
        _;
    }

    constructor() public {
        owner = msg.sender;
        status = STATE.PACKAGE_UNINITIALIZED;
    }

    function emitStatus() private returns (uint) {
        emit statusChanged(uint(status));
        return uint(status);
    }

    function setStatus(STATE _status) private {
        // make sure status doesn't jump arbitrarily
        if (!(status == STATE.PACKAGE_UNINITIALIZED && _status == STATE.PACKAGE_ORDERED)) {
            require(STATE(uint(status) + 1) == _status);
        }
        status = _status;
    }

    function setStatusOrdered(address _seller) public onlyOwner returns (uint) {
        setStatus(STATE.PACKAGE_ORDERED);
        seller = _seller;
        return emitStatus();
    }

    function setStatusToSelected(address _delivery) public onlySeller returns (uint) {
        setStatus(STATE.PACKAGE_SELECTED);
        delivery = _delivery;
        return emitStatus();
    }

    function setStatusToRegistered() public onlyDelivery returns (uint) {
        setStatus(STATE.PACKAGE_REGISTERED);
        return emitStatus();
    }

    function setStatusToDelivery() public onlyDelivery returns (uint) {
        setStatus(STATE.PACKAGE_DELIVERY);
        return emitStatus();
    }

    function setStatusToSent() public onlyDelivery returns (uint) {
        setStatus(STATE.PACKAGE_REGISTERED);
        return emitStatus();
    }

    function setStatusToOnSite() public onlyDelivery returns (uint) {
        setStatus(STATE.PACKAGE_ON_SITE);
        return emitStatus();
    }

    function setStatusToReceived() public onlyOwner returns (uint) {
        setStatus(STATE.PACKAGE_DELIVERED);
        return emitStatus();
    }

}
