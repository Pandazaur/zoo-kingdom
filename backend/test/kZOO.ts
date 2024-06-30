import {
    time,
    loadFixture,
} from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

describe('kZOO', function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployToken() {
        const [owner, otherAccount] = await hre.ethers.getSigners()

        const kZOO = await hre.ethers.deployContract('kZOO')

        return {
            kZOO,
            owner,
            otherAccount,
        }
    }

    describe('Deployment', () => {
        it('should have the good owner', async () => {
            const { kZOO, owner } = await loadFixture(deployToken)

            const kZooOwner = await kZOO.owner()

            expect(kZooOwner.toLowerCase()).to.equal(
                owner.address.toLowerCase(),
            )
        })
    })
})
