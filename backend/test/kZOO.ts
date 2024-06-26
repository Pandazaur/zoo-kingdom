import { time, loadFixture } from '@nomicfoundation/hardhat-toolbox-viem/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'
import { getAddress, parseGwei } from 'viem'

describe('kZOO', function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployToken() {
        const [owner, otherAccount] = await hre.viem.getWalletClients()

        const kZOO = await hre.viem.deployContract('kZOO')

        const publicClient = await hre.viem.getPublicClient()

        return {
            kZOO,
            owner,
            otherAccount,
            publicClient,
        }
    }

    describe('Deployment', () => {
        it('should have the good owner', async () => {
            const { kZOO, owner } = await loadFixture(deployToken)

            const kZooOwner = await kZOO.read.owner()

            expect(kZooOwner.toLowerCase()).to.equal(owner.account.address.toLowerCase())
        })
    })
})
