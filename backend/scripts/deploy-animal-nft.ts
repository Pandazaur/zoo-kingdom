import hre from 'hardhat'
import * as fs from 'fs'
import RACES from '../metadata/races'
import PinataSDK from '@pinata/sdk'
import dotenv from 'dotenv'

dotenv.config()

async function main() {
    const [owner] = await hre.viem.getWalletClients()
    const animalContract = await hre.viem.deployContract('AnimalNFT', [
        owner.account.address,
    ])

    console.log(`Animal contract deployed to ${animalContract.address}`)

    const pinata = new PinataSDK(
        process.env.PINATA_API_KEY,
        process.env.PINATA_API_SECRET,
    )

    RACES.forEach(async (race) => {
        const uploadPictureOptions = {
            pinataMetadata: {
                name: `image_${race.id}`,
            },
            pinataOptions: {
                cidVersion: 1,
            },
        } as const

        const uploadMetadataOptions = {
            pinataMetadata: {
                name: `metadata_${race.id}`,
            },
            pinataOptions: {
                cidVersion: 1,
            },
        } as const

        console.log(`[${race.id}] Uploading picture on IPFS...`)
        const { IpfsHash: ipfsHashPicture } = await pinata.pinFileToIPFS(
            fs.createReadStream(race.metadata.imagePath),
            uploadPictureOptions,
        )

        console.log(`[${race.id}] Uploading metadata on IPFS...`)
        const { IpfsHash: ipfsMetadata } = await pinata.pinJSONToIPFS(
            {
                ...race.metadata,
                imagePath: undefined,
                image: `ipfs://${ipfsHashPicture}`,
            },
            uploadMetadataOptions,
        )

        console.log(`[${race.id}] Creating the race...`)
        await animalContract.write.createNewRace([
            race.id,
            BigInt(race.maxChildrenCount),
            `ipfs://${ipfsMetadata}`,
        ])
    })
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
