// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";

contract Marketplace is IERC721Receiver {
    struct Bid {
        uint animalId;
        uint price;
        address owner;
    }

    event OnSale(Bid bid, address seller);
    event RemoveFromSale(Bid bid);
    event Bought(Bid bid, address buyer);

    ERC721 private animalNftContract;
    Bid[] private bids;

    constructor(ERC721 _animalNftContract) {
        animalNftContract = _animalNftContract;
    }

    modifier mustBeOwnerOf(uint _tokenId) {
        require(animalNftContract.ownerOf(_tokenId) == msg.sender, "Not owner of this token id.");
        _;
    }

    modifier bidMustExistsForAnimalId(uint _tokenId) {
        require(getBidForAnimalId(_tokenId).animalId != 0, "This animal is not on sale.");
        _;
    }

    /**
     * @notice Put a NFT on sale, the seller must approve the Marketplace to make transfers of the NFT.
     * @param _animalId Token of the animal to put on sale.
     * @param _price Wei amount to buy the token
     */
    function putOnSale(uint _animalId, uint _price) external mustBeOwnerOf(_animalId) {
        require(_price > 0, "Price must be greater than 0.");

        animalNftContract.safeTransferFrom(msg.sender, address(this), _animalId);

        Bid memory bid = Bid({animalId: _animalId, price: _price, owner: msg.sender});
        bids.push(bid);

        emit OnSale(bid, msg.sender);
    }

    function removeFromSale(uint _animalId) public bidMustExistsForAnimalId(_animalId) {
        require(getBidForAnimalId(_animalId).owner == msg.sender, "Not the owner of the bid");

        Bid memory bid = getBidForAnimalId(_animalId);
        animalNftContract.safeTransferFrom(address(this), bid.owner, bid.animalId);
        removeBid(bid);
        emit RemoveFromSale(bid);
    }

    /**
     * @dev Attention à la reeentrency
     */
    function buy(uint _animalId) external payable bidMustExistsForAnimalId(_animalId) {
        require(msg.value == getBidForAnimalId(_animalId).price, "Sent a different amount of ethers than the animal price");

        Bid memory bid = getBidForAnimalId(_animalId);
        animalNftContract.safeTransferFrom(address(this), msg.sender, bid.animalId);
        removeBid(bid);
        emit RemoveFromSale(bid);
    }

    function removeBid(Bid memory _bid) internal {
        // Bid[] storage newBids;
        bool activateReordering;

        for (uint i = 0; i < bids.length; i++) {
            if (bids[i].animalId != _bid.animalId) {
                delete bids[i];
                activateReordering = true;
            }

            if (activateReordering) {
                if (bids[i + 1].animalId != 0) {
                    bids[i] = bids[i + 1];
                }
            }
        }

        // bids = newBids;
    }

    // function removeItemByIndex(uint[] memory arr, uint index) public {
    //     require(index < arr.length, "Index out of bounds");

    //     for (uint i = index; i < arr.length - 1; i++) {
    //         arr[i] = arr[i + 1];
    //     }

    //     arr.pop();
    // }

    function getBids() external view returns (Bid[] memory) {
        return bids;
    }

    function getBidForAnimalId(uint _animalId) internal view returns (Bid memory bid) {
        for (uint i = 0; i < bids.length; i++) {
            if (bids[i].animalId == _animalId) {
                return bids[i];
            }
        }
    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
