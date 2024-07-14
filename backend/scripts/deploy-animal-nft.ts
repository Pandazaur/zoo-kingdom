import hre from 'hardhat'
import * as fs from 'fs'
import RACES from '../metadata/races'
import PinataSDK from '@pinata/sdk'
import dotenv from 'dotenv'
import { BaseContract, Contract, parseEther } from 'ethers'
import { AnimalNFT, Marketplace, ZooPass } from '../typechain-types'

dotenv.config()

async function main() {
    const [owner, ...otherSigners] = await hre.ethers.getSigners()
    const otherAccounts = otherSigners.slice(0, 5)

    const zooPass = await deployAndVerify<ZooPass>('ZooPass')
    const animalContract = await deployAndVerify<AnimalNFT>('AnimalNFT', [await zooPass.getAddress()])
    const marketplaceContract = await deployAndVerify<Marketplace>('Marketplace', [await animalContract.getAddress()])

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

        if (hre.network.name === 'localhost' && !race.isPremium) {
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

async function deployAndVerify<T>(contractName: string, contractArgs: unknown[] = []): Promise<T> {
    const contract = await hre.ethers.deployContract(contractName, contractArgs)
    console.log(`[${contractName}]: ${await contract.getAddress()}`)
    await contract.waitForDeployment()

    if (hre.network.name !== 'localhost') {
        await hre.run('verify:verify', {
            address: await contract.getAddress(),
            constructorArguments: contractArgs
        })
    }

    return contract as T
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
