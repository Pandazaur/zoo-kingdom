import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import hre from 'hardhat'

describe('ANW', function () {
    // We define a fixture to reuse the same setup in every test.
    // We use loadFixture to run this setup once, snapshot that state,
    // and reset Hardhat Network to that snapshot in every test.
    async function deployToken() {
        const [owner, otherAccount] = await hre.ethers.getSigners()

        const ANW = await hre.ethers.deployContract('ANW')

        return {
            ANW,
            owner,
            otherAccount
        }
    }

    describe('Deployment', () => {
        it('should have the good owner', async () => {
            const { ANW, owner } = await loadFixture(deployToken)

            const ANWOwner = await ANW.owner()

            expect(ANWOwner.toLowerCase()).to.equal(owner.address.toLowerCase())
        })
    })
})
