// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract TipJar {
    address public owner;

    struct Tip {
        address from;
        uint amount;
        string message;
    }

    Tip[] public tips;

    event NewTip(address indexed from, uint amount, string message);

    constructor() {
        owner = msg.sender;
    }

    function tip(string memory _message) public payable {
        require(msg.value > 0, "Debes enviar ETH");

        tips.push(Tip(msg.sender, msg.value, _message));
        emit NewTip(msg.sender, msg.value, _message);
    }

    function withdraw() public {
        require(msg.sender == owner, "Solo el owner puede retirar");
        uint256 balance = address(this).balance;
        require(balance > 0, "No hay fondos para retirar");
        payable(owner).transfer(balance);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getAllTips() public view returns (Tip[] memory) {
        return tips;
    }
}
