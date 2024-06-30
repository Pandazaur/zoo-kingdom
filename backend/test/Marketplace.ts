import { expect } from 'chai'
import hre from 'hardhat'
import RACES from '../metadata/races'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { parseEther } from 'ethers'

describe('Marketplace', function () {
    async function deployAnimalContract() {
        const [owner, otherAccount] = await hre.ethers.getSigners()

        const animalContract = await hre.ethers.deployContract('AnimalNFT')

        await animalContract.waitForDeployment()

        for (const race of RACES) {
            await animalContract.createNewRace(race.id, BigInt(race.maxChildrenCount), `ipfs://${race.id}`)

            // Odd tokenId = Owner, Event tokenId = OtherAccount
            await animalContract.safeMintAnimal(race.id)
            await animalContract.connect(otherAccount).safeMintAnimal(race.id)
        }

        return { owner, otherAccount, animalContract }
    }

    async function deployMarketplace() {
        const { owner, otherAccount, animalContract } = await loadFixture(deployAnimalContract)

        const marketplaceContract = await hre.ethers.deployContract('Marketplace', [await animalContract.getAddress()])

        return {
            owner,
            otherAccount,
            animalContract,
            marketplaceContract
        }
    }

    async function deployMarketplaceWithAnAnimalMinted() {
        const { owner, otherAccount, animalContract } = await loadFixture(deployAnimalContract)

        const marketplaceContract = await hre.ethers.deployContract('Marketplace', [await animalContract.getAddress()])

        await animalContract.safeMintAnimal(RACES[0].id)
        const lastTokenId = await animalContract.getLastTokenId()

        return {
            owner,
            otherAccount,
            animalContract,
            marketplaceContract,
            lastTokenId
        }
    }

    describe('Deployment', () => {
        it('should be deployed', async () => {
            const { animalContract } = await loadFixture(deployMarketplace)

            expect(await animalContract.getAddress()).to.exist
        })
    })

    describe('Put on sale', () => {
        it('should NOT be able to sell a token that does not exist', async () => {
            const { animalContract, marketplaceContract, lastTokenId } = await loadFixture(
                deployMarketplaceWithAnAnimalMinted
            )

            await expect(marketplaceContract.putOnSale(lastTokenId + 1n, 1n)).to.be.revertedWithCustomError(
                animalContract,
                'ERC721NonexistentToken'
            )
        })

        it('should NOT be able to sell an animal not owned', async () => {
            const { marketplaceContract, otherAccount, lastTokenId } = await loadFixture(
                deployMarketplaceWithAnAnimalMinted
            )

            await expect(marketplaceContract.connect(otherAccount).putOnSale(lastTokenId, 100000n)).to.be.revertedWith(
                'Not owner of this token id.'
            )
        })

        it('should NOT be able to sell an animal at 0 ETH', async () => {
            const { marketplaceContract, animalContract } = await loadFixture(deployMarketplace)

            await animalContract.safeMintAnimal(RACES[0].id)
            const lastTokenId = await animalContract.getLastTokenId()

            await expect(marketplaceContract.putOnSale(lastTokenId, 0n)).to.be.revertedWith(
                'Price must be greater than 0.'
            )
        })

        it('should be able to put an animal on sale (with approve)', async () => {
            const { animalContract, marketplaceContract, lastTokenId, owner } = await loadFixture(
                deployMarketplaceWithAnAnimalMinted
            )
            const PRICE = hre.ethers.parseEther('1')

            const bidsBefore = await marketplaceContract.getBids()

            await animalContract.setApprovalForAll(await marketplaceContract.getAddress(), true)
            const putOnSalePromise = marketplaceContract.putOnSale(lastTokenId, PRICE)

            await putOnSalePromise

            const bidsAfter = await marketplaceContract.getBids()
            const lastBid = bidsAfter.toReversed()[0]

            expect(putOnSalePromise).to.emit(marketplaceContract, 'OnSale').withArgs([lastBid, lastBid.owner])
            expect(bidsBefore.length + 1).to.eq(bidsAfter.length)
            expect(lastBid.animalId).to.eq(lastTokenId)
            expect(lastBid.price).to.eq(PRICE)
            expect(lastBid.owner).to.eq(owner)
        })
    })

    describe('Remove from sale', () => {
        async function deployMarketplaceWithAnimalOnSale() {
            const { owner, otherAccount, animalContract } = await loadFixture(deployAnimalContract)

            const marketplaceContract = await hre.ethers.deployContract('Marketplace', [
                await animalContract.getAddress()
            ])

            const markerplaceAddress = await marketplaceContract.getAddress()

            await animalContract.safeMintAnimal(RACES[0].id)
            const tokenId = await animalContract.getLastTokenId()
            await animalContract.setApprovalForAll(markerplaceAddress, true)
            await marketplaceContract.putOnSale(tokenId, parseEther('0.1'))

            await animalContract.connect(otherAccount).safeMintAnimal(RACES[0].id)
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

        it('should NOT be able to remove an inexisting bid', async () => {
            const { marketplaceContract, otherAccountTokenId, tokenId } = await loadFixture(
                deployMarketplaceWithAnimalOnSale
            )

            await expect(marketplaceContract.removeFromSale(tokenId + 100n)).to.revertedWith(
                'This animal is not on sale.'
            )
        })

        it('should NOT be able to remove from sale some one else bid', async () => {
            const { marketplaceContract, otherAccountTokenId } = await loadFixture(deployMarketplaceWithAnimalOnSale)

            await expect(marketplaceContract.removeFromSale(otherAccountTokenId)).to.revertedWith(
                'Not the owner of the bid'
            )
        })

        it('should be able to remove from sale a bid', async () => {
            const { marketplaceContract, animalContract, tokenId, owner } = await loadFixture(
                deployMarketplaceWithAnimalOnSale
            )

            const bidsBeforeRemoving = await marketplaceContract.getBids()
            const bidToBeRemoved = bidsBeforeRemoving.find((bid) => bid.animalId === tokenId)

            const removeFromSalePromise = await marketplaceContract.removeFromSale(tokenId)
            const bidsAfterRemoved = await marketplaceContract.getBids()

            expect(removeFromSalePromise).to.emit(marketplaceContract, 'RemoveFromSale').withArgs([bidToBeRemoved])
            expect(animalContract.ownerOf(tokenId)).to.eq(bidToBeRemoved?.owner)
            expect(bidsAfterRemoved.some((bid) => bid.animalId === tokenId)).to.eq(false)
        })
    })
})
