import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import RACES, { Race } from '../metadata/races'

const nonPremiumRace: Race = RACES.find((race) => !race.isPremium)!
const premiumRace: Race = RACES.find((race) => race.isPremium)!

describe('AnimalNFT', () => {
    async function deployContractsWithoutRaces() {
        const [owner, otherAccount] = await ethers.getSigners()
        const zooPass = await ethers.deployContract('ZooPass')

        const animalNFT = await ethers.deployContract('AnimalNFT', [await zooPass.getAddress()])

        return {
            owner,
            otherAccount,
            animalNFT,
            zooPass
        }
    }

    async function deployContracts() {
        const [owner, otherAccount] = await ethers.getSigners()
        const zooPass = await ethers.deployContract('ZooPass')

        const animalNFT = await ethers.deployContract('AnimalNFT', [await zooPass.getAddress()])

        for await (const race of [nonPremiumRace, premiumRace]) {
            await animalNFT.createNewRace(race.id, race.maxChildrenCount, 'ipfs://', race.isPremium ?? false)
        }

        return {
            owner,
            otherAccount,
            animalNFT,
            zooPass
        }
    }

    async function deployContractsWithPremiumAccessForOwner() {
        const params = await deployContracts()

        await params.zooPass.buyZooPass(params.owner.address, { value: await params.zooPass.zooPassPrice() })

        return {
            ...params,
            nonPremiumAccount: params.otherAccount
        }
    }

    describe('Initial state', () => {
        it('should be init with the "Zoo Pass"', async () => {
            const { animalNFT, zooPass } = await loadFixture(deployContracts)

            expect(await animalNFT.zooPass()).to.eq(await zooPass.getAddress())
        })
    })

    describe('createNewRace()', function () {
        it('should create a new race when called by owner', async function () {
            const { animalNFT } = await loadFixture(deployContracts)

            const raceId = 'CAT'
            const maxChildrenCount = 3
            const metadataUri = 'ipfs://...'
            const isPremium = false

            await animalNFT.createNewRace(raceId, maxChildrenCount, metadataUri, isPremium)

            const createdRace = await animalNFT.getRaceById(raceId)

            expect(createdRace.id).to.equal(raceId)
            expect(createdRace.maxChildrenCount).to.equal(maxChildrenCount)
            expect(createdRace.metadataUri).to.equal(metadataUri)
            expect(createdRace.isPremium).to.equal(isPremium)
        })

        it('should revert with RaceAlreadyExisting error if race ID already exists', async function () {
            const { animalNFT } = await loadFixture(deployContracts)

            const raceId = 'CAT'
            const maxChildrenCount = 3
            const metadataUri = 'ipfs://...'
            const isPremium = false

            await animalNFT.createNewRace(raceId, maxChildrenCount, metadataUri, isPremium)

            await expect(
                animalNFT.createNewRace(raceId, maxChildrenCount, metadataUri, isPremium)
            ).to.be.revertedWithCustomError(animalNFT, 'RaceAlreadyExisting')
        })

        it('should only be callable by owner', async function () {
            const { animalNFT, otherAccount } = await loadFixture(deployContracts)

            const raceId = 'CAT'
            const maxChildrenCount = 3
            const metadataUri = 'ipfs://...'
            const isPremium = false

            await expect(
                animalNFT.connect(otherAccount).createNewRace(raceId, maxChildrenCount, metadataUri, isPremium)
            ).to.be.revertedWithCustomError(animalNFT, 'OwnableUnauthorizedAccount')
        })
    })

    describe('safeMintAnimal()', async () => {
        it('should NOT be able to mint an unknown race of animal', async () => {
            const { animalNFT } = await loadFixture(deployContractsWithPremiumAccessForOwner)

            await expect(animalNFT.safeMintAnimal('unknown_race')).to.be.revertedWith('Undefined race')
        })

        it('should NOT be able to mint a PREMIUM animal if not premium', async () => {
            const { animalNFT, nonPremiumAccount } = await loadFixture(deployContractsWithPremiumAccessForOwner)

            await expect(
                animalNFT.connect(nonPremiumAccount).safeMintAnimal(premiumRace.id)
            ).to.be.revertedWithCustomError(animalNFT, 'NeedPremiumAccess')
        })

        it('should be able to mint a NON-premium animal', async () => {
            const { animalNFT, nonPremiumAccount } = await loadFixture(deployContractsWithPremiumAccessForOwner)

            const lastTokenIdBefore = await animalNFT.getLastTokenId()

            await animalNFT.safeMintAnimal(nonPremiumRace.id)
            await animalNFT.connect(nonPremiumAccount).safeMintAnimal(nonPremiumRace.id)

            const lastTokenIdAfter = await animalNFT.getLastTokenId()

            expect(lastTokenIdAfter).to.eq(lastTokenIdBefore + 2n)
        })

        it('should be able to mint a premium animal if premium account', async () => {
            const { animalNFT, nonPremiumAccount } = await loadFixture(deployContractsWithPremiumAccessForOwner)

            const lastTokenIdBefore = await animalNFT.getLastTokenId()

            await animalNFT.safeMintAnimal(premiumRace.id)
            const lastTokenIdAfter = await animalNFT.getLastTokenId()

            expect(lastTokenIdAfter).to.eq(lastTokenIdBefore + 1n)
        })
    })

    describe('getRaceById()', async () => {
        it('should return an empty race if the race does not exist', async () => {
            const { animalNFT } = await loadFixture(deployContractsWithPremiumAccessForOwner)
            const race = await animalNFT.getRaceById('unknown_race')

            expect(race.id).to.eq('')
        })

        it('should a race if it exists', async () => {
            const { animalNFT } = await loadFixture(deployContractsWithPremiumAccessForOwner)
            const race = await animalNFT.getRaceById(premiumRace.id)

            expect(race.id).to.eq(premiumRace.id)
            expect(race.maxChildrenCount).to.eq(premiumRace.maxChildrenCount)
            expect(race.isPremium).to.eq(premiumRace.isPremium ?? false)
        })
    })

    describe('getAnimalsForAddress()', async () => {
        it('should returns an empty array if no animal for the address', async () => {
            const { animalNFT, owner } = await loadFixture(deployContractsWithPremiumAccessForOwner)
            const animals = await animalNFT.getAnimalsForAddress(owner.address)

            expect(animals).to.be.empty
        })

        it('should returns an array containing the animals for an address', async () => {
            const { animalNFT, owner } = await loadFixture(deployContractsWithPremiumAccessForOwner)

            const race = nonPremiumRace

            await animalNFT.safeMintAnimal(race.id)
            const animals = await animalNFT.getAnimalsForAddress(owner.address)

            expect(animals.length).to.eq(1)
            expect(animals[0].race.id).to.eq(race.id)
        })
    })

    describe('getRaces()', async () => {
        it('should return the races created', async () => {
            const { animalNFT, owner } = await loadFixture(deployContractsWithoutRaces)

            const raceToAdd = nonPremiumRace

            expect((await animalNFT.getRaces()).length).to.eq(0)
            await animalNFT.createNewRace(
                raceToAdd.id,
                raceToAdd.maxChildrenCount,
                'ipfs://',
                raceToAdd.isPremium ?? false
            )

            const racesNow = await animalNFT.getRaces()
            expect(racesNow.length).to.eq(1)
            expect(racesNow[0].id).to.eq(raceToAdd.id)
        })
    })

    describe('getAnimal()', async () => {
        it('should return the animal according to the tokenId', async () => {
            const { animalNFT, owner } = await loadFixture(deployContractsWithPremiumAccessForOwner)

            const race = nonPremiumRace

            await animalNFT.safeMintAnimal(race.id)
            const lastToken = await animalNFT.getLastTokenId()

            const animal = await animalNFT.getAnimal(lastToken)

            expect(animal.race.id).to.eq(race.id)
        })
    })
})
