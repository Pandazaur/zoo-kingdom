// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error NoRaceFound(string race);

/**
 * @title Every animal in the zoo is a "Animal" NFT.
 * @author Alexandre B.
 * @notice This contract manage everything that refers to an Animal
 * @dev ERC721Enumerable: to show collected NFT by account
 *      ERC721Burnable: to allow burning some animals (no animal injured)
 */
contract AnimalNFT is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    struct Race {
        string id;
        uint maxChildrenCount;
        string metadataUri;
    }

    struct Animal {
        Race race;
        uint childCount;
    }

    uint256 private _nextTokenId;
    mapping(uint => Animal) public animalForTokenId;
    Race[] public races;

    event RaceCreated(Race race);
    event AnimalCreated(Animal animal);

    constructor(address initialOwner) ERC721("Animal", "kANIMAL") Ownable(initialOwner) {}

    // function safeMint(address to) public onlyOwner {
    //     uint256 tokenId = _nextTokenId++;
    //     _safeMint(to, tokenId);
    // }

    function createNewRace(
        string calldata _id,
        uint _maxChildrenCount,
        string calldata _metadataUri
    ) external onlyOwner {
        Race memory newRace = Race({id: _id, maxChildrenCount: _maxChildrenCount, metadataUri: _metadataUri});

        races.push(newRace);
        emit RaceCreated(newRace);
    }

    function safeMintAnimal(string calldata _raceId) external {
        Race memory race = getRaceById(_raceId);
        uint256 tokenId = _nextTokenId++;

        _safeMint(msg.sender, tokenId);
        animalForTokenId[tokenId] = Animal({race: race, childCount: 0});
    }

    function getRaceById(string calldata _raceId) internal view returns (Race memory race) {
        for (uint i = 0; i < races.length; i++) {
            if (compareStrings(races[i].id, _raceId)) {
                return races[i];
            }
        }

        revert NoRaceFound(_raceId);
    }

    function compareStrings(string memory a, string memory b) internal pure returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    // -------------------------------------------------------------------------------
    // The following functions are overrides required by Solidity.

    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
