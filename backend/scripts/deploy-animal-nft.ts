import hre from 'hardhat'
import * as fs from 'fs'
import RACES from '../metadata/races'
import PinataSDK from '@pinata/sdk'
import dotenv from 'dotenv'
import { parseEther } from 'ethers'

dotenv.config()

async function main() {
    const [owner, ...otherSigners] = await hre.ethers.getSigners()
    const otherAccounts = otherSigners.slice(0, 5)

    const zooPass = await hre.ethers.deployContract('ZooPass')
    await zooPass.waitForDeployment()

    const animalContract = await hre.ethers.deployContract('AnimalNFT', [await zooPass.getAddress()])
    await animalContract.waitForDeployment()

    console.log(`Animal contract deployed to ${await animalContract.getAddress()}`)
    const marketplaceContract = await hre.ethers.deployContract('Marketplace', [await animalContract.getAddress()])

    console.log(`Marketplace contract deployed to ${await marketplaceContract.getAddress()}`)
    const pinata = new PinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_API_SECRET)

    console.log('-----------')

    for await (const race of RACES) {
        const uploadPictureOptions = {
            pinataMetadata: {
                name: `image_${race.id}`
            },
            pinataOptions: {
                cidVersion: 1
            }
        } as const

        const uploadMetadataOptions = {
            pinataMetadata: {
                name: `metadata_${race.id}`
            },
            pinataOptions: {
                cidVersion: 1
            }
        } as const

        console.log(`[${race.id}] Uploading picture on IPFS...`)
        const { IpfsHash: ipfsHashPicture } = await pinata.pinFileToIPFS(
            fs.createReadStream(race.metadata.imagePath),
            uploadPictureOptions
        )

        console.log(`[${race.id}] Uploading metadata on IPFS...`)
        const { IpfsHash: ipfsMetadata } = await pinata.pinJSONToIPFS(
            {
                ...race.metadata,
                imagePath: undefined,
                image: `ipfs://${ipfsHashPicture}`
            },
            uploadMetadataOptions
        )

        console.log(`[${race.id}] Creating the race...`)
        await animalContract.createNewRace(
            race.id,
            BigInt(race.maxChildrenCount),
            `ipfs://${ipfsMetadata}`,
            race.isPremium ?? false
        )

        if (!race.isPremium) {
            for await (const account of otherAccounts) {
                await animalContract.connect(account).safeMintAnimal(race.id)
                const tokenId = await animalContract.connect(account).getLastTokenId()

                await animalContract.connect(account).approve(await marketplaceContract.getAddress(), tokenId)
                await marketplaceContract
                    .connect(account)
                    .putOnSale(tokenId, parseEther(Math.random().toString().slice(0, 5)))
            }
        }
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
