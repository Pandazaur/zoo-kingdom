// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title A NFT that users can buy to access premium features.
 * @author Alexandre Borel
 * @notice This contract will only be used, to determine whether a user can access premium features or not.
 */
contract ZooPass is ERC721, ERC721Burnable, Ownable {
    uint256 private _nextTokenId;
    uint public zooPassPrice = 10000000000000000 wei; // = 0.01 ETH

    constructor() ERC721("Zoo Pass", "kPASS") Ownable(msg.sender) {}

    /**
     * @notice Owner of the contract will be able to change the price.
     * @param _newPriceInWei the price of the Zoo pass
     */
    function changeZooPrice(uint _newPriceInWei) external onlyOwner {
        require(_newPriceInWei > 0, "Price cannot be 0.");
        zooPassPrice = _newPriceInWei;
    }

    /**
     * @notice Users can buy this zoo pass
     * @param _to The address of the recipient of the NFT.
     */
    function buyZooPass(address _to) external payable {
        require(balanceOf(_to) == 0, "You already have a Zoo Pass");
        require(msg.value == zooPassPrice, "Invalid price paid");

        uint256 tokenId = _nextTokenId++;
        _safeMint(_to, tokenId);
    }
}
