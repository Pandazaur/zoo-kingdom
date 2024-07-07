import { expect } from 'chai'
import hre from 'hardhat'
import RACES from '../metadata/races'
import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import {
    deployMarketplace,
    deployMarketplaceWithAnAnimalMinted,
    deployMarketplaceWithAnimalOnSale
} from './fixtures/marketplace.fixtures'

const nonPremiumRaces = RACES.filter((race) => !race.isPremium)

describe('Marketplace', function () {
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

            await animalContract.safeMintAnimal(nonPremiumRaces[0].id)
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
            expect(await animalContract.ownerOf(tokenId)).to.eq(bidToBeRemoved?.owner)
            expect(bidsAfterRemoved.some((bid) => bid.animalId === tokenId)).to.eq(false)
        })
    })

    describe('Buy', () => {
        it('should NOT be able to buy my own bid', async () => {
            const { marketplaceContract, tokenId } = await loadFixture(deployMarketplaceWithAnimalOnSale)

            await expect(marketplaceContract.buy(tokenId)).to.be.revertedWith('Cannot buy your own bid')
        })

        it('should NOT be able to buy with too MUCH ethers', async () => {
            const {
                marketplaceContract,
                tokenId,
                otherAccount: buyerAccount
            } = await loadFixture(deployMarketplaceWithAnimalOnSale)

            const bid = await marketplaceContract.getBidForAnimalId(tokenId)

            await expect(
                marketplaceContract.connect(buyerAccount).buy(tokenId, { value: bid.price + 1n })
            ).to.be.revertedWith('Sent a different amount of ethers than the animal price')
        })

        it('should NOT be able to buy with too FEW ethers', async () => {
            const {
                marketplaceContract,
                tokenId,
                otherAccount: buyerAccount
            } = await loadFixture(deployMarketplaceWithAnimalOnSale)

            await expect(marketplaceContract.connect(buyerAccount).buy(tokenId, { value: 0 })).to.be.revertedWith(
                'Sent a different amount of ethers than the animal price'
            )
        })

        it('should be able to buy the NFT (buyer get the NFT, seller the ethers)', async () => {
            const {
                marketplaceContract,
                animalContract,
                tokenId,
                owner,
                otherAccount: buyerAccount
            } = await loadFixture(deployMarketplaceWithAnimalOnSale)

            const bid = await marketplaceContract.getBidForAnimalId(tokenId)
            const ownerOfNftBeforeBuy = await animalContract.ownerOf(tokenId)

            const buyPromise = marketplaceContract.connect(buyerAccount).buy(tokenId, { value: bid.price })
            expect(buyPromise).to.emit(marketplaceContract, 'Bought').withArgs([bid, buyerAccount.address])

            await buyPromise

            const ownerOfNftAfterBuy = await animalContract.ownerOf(tokenId)

            expect(ownerOfNftBeforeBuy).to.eq(await marketplaceContract.getAddress())
            expect(ownerOfNftAfterBuy).to.eq(await buyerAccount.address)
            await expect(buyPromise).to.changeEtherBalances([owner, buyerAccount], [bid.price, -bid.price], {
                includingFee: true
            })
        })
    })
})
