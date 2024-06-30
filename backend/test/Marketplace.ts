import { loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'
import { getAddress, parseGwei } from 'viem'
import RACES from '../metadata/races'

describe('Marketplace', function () {
    let mintedAnimals = 0

    async function deployAnimalContract() {
        const [owner, otherAccount] = await hre.viem.getWalletClients()

        const animalContract = await hre.viem.deployContract('AnimalNFT')

        for (const race of RACES) {
            await animalContract.write.createNewRace([
                race.id,
                BigInt(race.maxChildrenCount),
                `ipfs://${race.id}`,
            ])

            // Odd tokenId = Owner, Event tokenId = OtherAccount
            await animalContract.write.safeMintAnimal([race.id])
            await animalContract.write.safeMintAnimal([race.id], {
                account: otherAccount.account,
            })

            mintedAnimals += 2
        }

        return { owner, animalContract }
    }

    async function deployMarketplace() {
        const { owner, animalContract } =
            await loadFixture(deployAnimalContract)
        // const [owner, otherAccount] = await hre.viem.getWalletClients()

        const marketplace = await hre.viem.deployContract('Marketplace', [
            animalContract.address,
        ])

        const publicClient = await hre.viem.getPublicClient()

        return {
            owner,
            marketplace,
            publicClient,
        }
    }

    describe('Deployment', () => {
        it('should be deployed', async () => {
            const { marketplace } = await loadFixture(deployMarketplace)

            expect(marketplace.address).to.exist
        })

        describe('Put on sale', () => {
            it('should NOT be able to sell a token that does not exist', async () => {
                const { marketplace } = await loadFixture(deployMarketplace)

                await expect(
                    marketplace.write.putOnSale([
                        BigInt(mintedAnimals + 1),
                        1n,
                    ]),
                ).to.be.revertedWith('ERC721NonexistentToken')
            })

            it('should NOT be that is not owned', async () => {
                const { marketplace } = await loadFixture(deployMarketplace)

                // await marketplace.write.putOnSale([2n, 100000n])
            })
        })
    })
})
