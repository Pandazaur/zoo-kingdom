// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";


error RaceAlreadyExisting(string race);
error NeedPremiumAccess();
error MaxChildrenReached(uint animalTokenId);

/**
 * @title Every animal in the zoo is a "Animal" NFT.
 * @author Alexandre B.
 * @notice This contract manage everything that refers to an Animal
 * @dev ERC721Enumerable: to show collected NFT by account
 *      ERC721Burnable: to allow burning some animals (no animal injured)
 */
contract AnimalNFT is ERC721, ERC721Enumerable, ERC721Burnable, Ownable {
    /**
     * @notice Animal gender determined "randomly" when minting
     */
    enum Gender {
        MALE,
        FEMALE
    }

    /**
     * @title Animal Race
     * @notice Animal race used to define an Animal. Every animal has a "Race"
     */
    struct Race {
        string id;
        uint maxChildrenCount;
        string metadataUri;
        bool isPremium;
    }

    /**
     * @title Animal
     * @notice Animal structure unique for each NFT.
     */
    struct Animal {
        uint tokenId;
        Race race;
        uint childCount;
        Gender gender;
    }

    ERC721 public zooPass;
    uint256 private _nextTokenId;
    mapping(uint => Animal) private animalForTokenId;
    Race[] private races;

    event RaceCreated(Race race);
    event AnimalCreated(Animal animal, uint tokenId);
    event Breed(uint parentA, uint parentB);

    /**
     * @param _zooPassAddress The address of the "Zoo Pass" (NFT contract) needed to access premium features
     */
    constructor(address _zooPassAddress) ERC721("Animal", "kANIMAL") Ownable(msg.sender) {
        _nextTokenId = 1;
        zooPass = ERC721(_zooPassAddress);
    }

    /**
     * @notice Create a new animal race that is mintable for players.
     * @param _raceId Race slug of the new animal race
     * @param _maxChildrenCount Maximum count of children each animal can produce
     * @param _metadataUri Metadara URI do get informations about the race (uploaded on IPFS)
     * @param _isPremium If the minter needs to have a premium access (using a NFT)
     */
    function createNewRace(string calldata _raceId, uint _maxChildrenCount, string calldata _metadataUri, bool _isPremium) external onlyOwner {
        if (!Strings.equal(getRaceById(_raceId).id, "")) {
            revert RaceAlreadyExisting(_raceId);
        }

        Race memory newRace = Race({id: _raceId, maxChildrenCount: _maxChildrenCount, metadataUri: _metadataUri, isPremium: _isPremium});

        races.push(newRace);
        emit RaceCreated(newRace);
    }

    /**
     * @notice Mint an animal to the caller of the function
     * @param _raceId Slug of the race we want to mint
     * @custom:security We should use a Chainlink VRF Random generator for the gender. Gender manipulation has low impact
     */
    function safeMintAnimal(string memory _raceId) public {
        Race memory race = getRaceById(_raceId);
        require(!Strings.equal(getRaceById(_raceId).id, ""), "Undefined race");

        if (race.isPremium == true && zooPass.balanceOf(msg.sender) == 0) {
            revert NeedPremiumAccess();
        }

        uint256 tokenId = _nextTokenId++;

        Gender animalGender = uint(keccak256(abi.encodePacked(_raceId, block.timestamp, block.number, tokenId, _nextTokenId))) % 2 == 0 ? Gender.MALE : Gender.FEMALE;
        animalForTokenId[tokenId] = Animal({tokenId: tokenId, race: race, childCount: 0, gender: animalGender});
        _safeMint(msg.sender, tokenId);
        emit AnimalCreated(animalForTokenId[tokenId], tokenId);
    }

    /**
     * @notice Get a race by its "id"
     * @param _raceId Id of the race to get
     * @return race the "race" matching the race id, otherwise an empty race
     */
    function getRaceById(string memory _raceId) public view returns (Race memory race) {
        uint raceLength = races.length;

        for (uint i = 0; i < raceLength; i++) {
            if (Strings.equal(races[i].id, _raceId)) {
                return races[i];
            }
        }
    }

    /**
     * @notice Get the animal list for an address and returns it
     * @param _addr Address target to check
     * @return Array containing the animals
     */
    function getAnimalsForAddress(address _addr) external view returns (Animal[] memory) {
        uint addressAnimalCount = balanceOf(_addr);

        Animal[] memory animals = new Animal[](addressAnimalCount);

        for (uint i = 0; i < addressAnimalCount; i++) {
            uint tokenId = tokenOfOwnerByIndex(_addr, i);
            animals[i] = animalForTokenId[tokenId];
        }

        return animals;
    }

    /**
     * @notice Create a baby from two animals
     * @param tokenIdA Token id of the first parent
     * @param tokenIdB Token id of the second parent
     * @custom:improvements Needs 200 "game tokens" to breed
     */
    function breedAnimals(uint tokenIdA, uint tokenIdB) external {
        require(msg.sender == ownerOf(tokenIdA), "Not your NFT");
        require(ownerOf(tokenIdB) == ownerOf(tokenIdA), "You don't own both NFTs.");

        Animal storage animalA = animalForTokenId[tokenIdA];
        Animal storage animalB = animalForTokenId[tokenIdB];

        require(Strings.equal(animalA.race.id, animalB.race.id), "Animals are from different races");

        if (animalA.childCount >= animalA.race.maxChildrenCount) {
            revert MaxChildrenReached(animalA.tokenId);
        }

        if (animalB.childCount >= animalB.race.maxChildrenCount) {
            revert MaxChildrenReached(animalB.tokenId);
        }

        animalA.childCount++;
        animalB.childCount++;

        safeMintAnimal(animalA.race.id);
        emit Breed(tokenIdA, tokenIdB);
    }

    /**
     * @notice Get the animal races available in the game
     * @return Array containing the races
     * @custom:improvements Should implement a pagination with params "uint fromIndex, uint count" to preven DoS Gas Limit
     */
    function getRaces() external view returns (Race[] memory) {
        return races;
    }

    /**
     * @notice Get the animal data linked to the token id.
     * @param _tokenId Token id to check
     * @return Array containing the races
     */
    function getAnimal(uint _tokenId) external view returns (Animal memory) {
        return animalForTokenId[_tokenId];
    }

    /**
     * @notice Get the last token id generated when minted animals
     * @return The last token used.
     */
    function getLastTokenId() external view returns (uint) {
        return _nextTokenId - 1;
    }

    // -------------------------------------------------------------------------------
    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth) internal override(ERC721, ERC721Enumerable) returns (address) {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value) internal override(ERC721, ERC721Enumerable) {
        super._increaseBalance(account, value);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
