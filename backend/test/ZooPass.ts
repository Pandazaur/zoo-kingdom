import { loadFixture } from '@nomicfoundation/hardhat-toolbox/network-helpers'
import { expect } from 'chai'
import { ethers } from 'hardhat'
import RACES, { Race } from '../metadata/races'
import { parseEther } from 'ethers'

describe('ZooPass', () => {
    async function deployZooPass() {
        const [owner, otherAccount] = await ethers.getSigners()

        const zooPass = await ethers.deployContract('ZooPass')

        return {
            owner,
            otherAccount,
            zooPass
        }
    }

    describe('Initial state', () => {
        it('should be deployed', async () => {
            const { zooPass } = await loadFixture(deployZooPass)

            expect(await zooPass.name()).to.eq('Zoo Pass')
            expect(await zooPass.symbol()).to.eq('kPASS')
        })
    })

    describe('changeZooPrice()', () => {
        it('should NOT be possible for the owner to set price to 0', async () => {
            const { zooPass } = await loadFixture(deployZooPass)

            await expect(zooPass.changeZooPrice(0)).to.be.revertedWith('Price cannot be 0.')
        })

        it('should be possible for the owner to change the price', async () => {
            const { zooPass } = await loadFixture(deployZooPass)

            const newPrice = parseEther('0.75')
            await zooPass.changeZooPrice(newPrice)

            expect(await zooPass.zooPassPrice()).to.eq(newPrice)
        })

        it('should NOT be possible to change the price if not owner', async () => {
            const { zooPass, otherAccount } = await loadFixture(deployZooPass)

            const newPrice = parseEther('0.75')
            await expect(zooPass.connect(otherAccount).changeZooPrice(newPrice)).to.revertedWithCustomError(
                zooPass,
                'OwnableUnauthorizedAccount'
            )
        })
    })

    describe('buyZooPass()', () => {
        it('should NOT be able to buy "Zoo Pass" if price paid is not the good one', async () => {
            const { zooPass, owner } = await loadFixture(deployZooPass)

            const price = await zooPass.zooPassPrice()

            await expect(zooPass.buyZooPass(owner.address, { value: '0' })).to.be.revertedWith('Invalid price paid')
            await expect(zooPass.buyZooPass(owner.address, { value: price + 1n })).to.be.revertedWith(
                'Invalid price paid'
            )
        })

        it('should NOT be able to buy the "Zoo Pass" if it already owns one', async () => {
            const { zooPass, owner } = await loadFixture(deployZooPass)

            const price = await zooPass.zooPassPrice()
            await zooPass.buyZooPass(owner.address, { value: price })

            await expect(
                //
                zooPass.buyZooPass(owner.address, { value: price })
            ).to.revertedWith('You already have a Zoo Pass')
        })

        it('should be able to buy a "ZooPass"', async () => {
            const { zooPass, owner } = await loadFixture(deployZooPass)

            const price = await zooPass.zooPassPrice()
            await zooPass.buyZooPass(owner.address, { value: price })

            expect(await zooPass.balanceOf(owner.address)).to.eq(1n)
        })
    })
})
