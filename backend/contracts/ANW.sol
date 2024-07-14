// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ANW is ERC20, Ownable {
    constructor() ERC20("Anima World", "ANW") Ownable(msg.sender) {}
}
