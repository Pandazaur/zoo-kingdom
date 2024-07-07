import hre from 'hardhat'
import { parseEther } from 'ethers'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import RACES from '../../metadata/races'

const nonPremiumRaces = RACES.filter((race) => !race.isPremium)

export async function deployAnimalContract() {
    const [owner, otherAccount] = await hre.ethers.getSigners()
    const zooPassContract = await hre.ethers.deployContract('ZooPass')
    await zooPassContract.waitForDeployment()
    const animalContract = await hre.ethers.deployContract('AnimalNFT', [await zooPassContract.getAddress()])

    await animalContract.waitForDeployment()

    for (const race of RACES) {
        await animalContract.createNewRace(
            race.id,
            BigInt(race.maxChildrenCount),
            `ipfs://${race.id}`,
            race.isPremium ?? false
        )

        if (!race.isPremium) {
            // Odd tokenId = Owner, Event tokenId = OtherAccount
            await animalContract.safeMintAnimal(race.id)
            await animalContract.connect(otherAccount).safeMintAnimal(race.id)
        }
    }

    return { owner, otherAccount, animalContract }
}

export async function deployMarketplace() {
    const { owner, otherAccount, animalContract } = await loadFixture(deployAnimalContract)
    await animalContract.waitForDeployment()
    const marketplaceContract = await hre.ethers.deployContract('Marketplace', [await animalContract.getAddress()])
    return {
        owner,
        otherAccount,
        animalContract,
        marketplaceContract
    }
}

export async function deployMarketplaceWithAnAnimalMinted() {
    const { owner, otherAccount, animalContract } = await loadFixture(deployAnimalContract)
    await animalContract.waitForDeployment()
    const marketplaceContract = await hre.ethers.deployContract('Marketplace', [await animalContract.getAddress()])

    await animalContract.safeMintAnimal(nonPremiumRaces[0].id)
    const lastTokenId = await animalContract.getLastTokenId()

    return {
        owner,
        otherAccount,
        animalContract,
        marketplaceContract,
        lastTokenId
    }
}

export async function deployMarketplaceWithAnimalOnSale() {
    const { owner, otherAccount, animalContract } = await loadFixture(deployAnimalContract)
    await animalContract.waitForDeployment()
    const marketplaceContract = await hre.ethers.deployContract('Marketplace', [await animalContract.getAddress()])

    const markerplaceAddress = await marketplaceContract.getAddress()

    await animalContract.safeMintAnimal(nonPremiumRaces[0].id)
    const tokenId = await animalContract.getLastTokenId()
    await animalContract.setApprovalForAll(markerplaceAddress, true)
    await marketplaceContract.putOnSale(tokenId, parseEther('0.1'))

    await animalContract.connect(otherAccount).safeMintAnimal(nonPremiumRaces[0].id)
    const otherAccountTokenId = await animalContract.connect(otherAccount).getLastTokenId()
    await animalContract.connect(otherAccount).setApprovalForAll(markerplaceAddress, true)
    await marketplaceContract.connect(otherAccount).putOnSale(otherAccountTokenId, parseEther('0.2'))

    const bids = await marketplaceContract.getBids()

    return {
        owner,
        otherAccount,
        animalContract,
        marketplaceContract,
        tokenId,
        otherAccountTokenId,
        bid: bids.toReversed()[1],
        otherAccountBid: bids.toReversed()[0]
    }
}
