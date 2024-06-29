import fs from 'fs'
import axios from 'axios'
import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import RACES from '../../metadata/races'
import dotenv from 'dotenv'

dotenv.config()

const AnimalNFTModule = buildModule('AnimalNFTModule', (m) => {
    const animalNft = m.contract('AnimalNFT', [m.getAccount(0)])

    RACES.forEach(async (race) => {
        const form = new FormData()

        const file = fs.readFileSync(race.metadata.imagePath)

        const pinataMetadata = JSON.stringify({
            ...race.metadata,
            imagePath: undefined,
        })

        const pinataOptions = JSON.stringify({ cidVersion: 0 })

        form.append('file', file)
        form.append('pinataMetadata', pinataMetadata)
        form.append('pinataOptions', pinataOptions)

        const res = await axios.post(
            'https://api.pinata.cloud/pinning/pinFileToIPFS',
            form,
            {
                maxBodyLength: Infinity,
                headers: {
                    'Content-Type': `multipart/form-data; boundary=${form._boundary}`,
                    Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
                },
            },
        )

        console.log('Metadata:', res.data)

        m.call(
            animalNft,
            'createNewRace',
            [race.id, race.maxChildrenCount, res.data],
            { id: race.id },
        )
    })

    return { animalNft }
})

export default AnimalNFTModule
