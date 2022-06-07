// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Locker is Ownable {

    uint256 public totalFunds;
    address public pay;
    bool public isReleased;

    constructor(address _pay) payable {
        totalFunds = msg.value;
        pay = _pay;
        isReleased = false;
    }


    function withdrawFunds() public onlyOwner {
        isReleased = true;
        payable(pay).transfer(totalFunds);
    }
}