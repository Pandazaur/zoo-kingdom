// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title The marketplace contract to trade animals
 * @notice Provide functions to sell animals, buy animals or cancel an offer on the marketplace
 * @author Alexandre Borel
 */
contract Marketplace is IERC721Receiver, ReentrancyGuard {
    struct Bid {
        uint animalId;
        uint price;
        address owner;
    }

    enum MarketplaceAction {
        SELL,
        REMOVE,
        BUY
    }

    event OnSale(Bid bid, address seller);
    event RemoveFromSale(Bid bid);
    event Bought(Bid bid, address buyer);

    event MarketplaceChange(MarketplaceAction action, Bid bid, address sender, uint date); 

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
        emit MarketplaceChange(MarketplaceAction.SELL, bid, msg.sender, block.timestamp);
    }

    /**
     * @notice Remove an animal from the Marketplace,
     * @param _animalId Token of the animal to remove from sale.
     */
    function removeFromSale(uint _animalId) external bidMustExistsForAnimalId(_animalId) {
        require(getBidForAnimalId(_animalId).owner == msg.sender, "Not the owner of the bid");

        Bid memory bid = getBidForAnimalId(_animalId);
        animalNftContract.safeTransferFrom(address(this), bid.owner, bid.animalId);
        removeBid(bid);
        emit RemoveFromSale(bid);
        emit MarketplaceChange(MarketplaceAction.REMOVE, bid, msg.sender, block.timestamp);
    }

    /**
     * @notice Buy an animal on the marketplace
     * @param _animalId Token of the animal to buy.
     */
    function buy(uint _animalId) external payable nonReentrant bidMustExistsForAnimalId(_animalId) {
        Bid memory bid = getBidForAnimalId(_animalId);

        require(bid.owner != msg.sender, "Cannot buy your own bid");
        require(msg.value == bid.price, "Sent a different amount of ethers than the animal price");

        animalNftContract.safeTransferFrom(address(this), msg.sender, bid.animalId);

        (bool success, ) = payable(bid.owner).call{value: msg.value}("");

        require(success, "Could not pay the bid");

        removeBid(bid);
        emit Bought(bid, msg.sender);
        emit MarketplaceChange(MarketplaceAction.BUY, bid, msg.sender, block.timestamp);
    }

    /**
     * @notice Remove an animal offer from the marketplace
     * @param _bid Bid to remove
     */
    function removeBid(Bid memory _bid) internal {
        bool hasDeletedBid;
        uint bidLength = bids.length;

        for (uint i = 0; i < bidLength; i++) {
            if (hasDeletedBid) {
                bids[i-1] = bids[i];
            }

            if (bids[i].animalId == _bid.animalId) {
                delete bids[i];
                hasDeletedBid = true;
            }
        }

        if (hasDeletedBid) {
            bids.pop();
        }
    }

    /**
     * @notice Get the lost of marketplace offers
     * @return Offer list available on the marketplace
     * @custom:improvements Should implement a pagination with params "uint fromIndex, uint count" to prevent DoS Gas Limit
     */
    function getBids() external view returns (Bid[] memory) {
        return bids;
    }

    // Version améliorée à implémenter:
    // function getBids(uint fromIndex, uint count) external view returns (Bid[] memory) {
    //     Bid[] memory bidsPage = new Bid[](count);
    //     Bid[] memory memoryBids = bids;

    //     for (uint i = fromIndex; i < fromIndex + count; i++){
    //         bidsPage[i - fromIndex] = memoryBids[i];
    //     } 
    //     return bids;
    // }

    /**
     * @notice Get an offer corresponding to an animal id.
     * @param _animalId Animal id linked to the offer
     * @return bid the marketplace offer
     */
    function getBidForAnimalId(uint _animalId) public view returns (Bid memory bid) {
        uint bidsLength = bids.length;

        for (uint i = 0; i < bidsLength; i++) {
            if (bids[i].animalId == _animalId) {
                return bids[i];
            }
        }
    }

    /**
     * @notice Allow the smart contracts to receive NFTs
     */
    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) external override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }
}
