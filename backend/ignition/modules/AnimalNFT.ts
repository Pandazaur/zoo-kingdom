import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

// @TODO: Get the type directly from the generation after compilation but how ?
type Race = {
    id: string
    maxChildrenCount: number
    metadataUri: string
}

const RACES: Race[] = [
    {
        id: 'tiger',
        maxChildrenCount: 10,
        metadataUri: 'ipfs://',
    },
    {
        id: 'red_squirrel',
        maxChildrenCount: 10,
        metadataUri: 'ipfs://',
    },
]

const AnimalNFTModule = buildModule('AnimalNFTModule', (m) => {
    const animalNft = m.contract('AnimalNFT', [m.getAccount(0)])

    RACES.forEach((race) => {
        m.call(
            animalNft,
            'createNewRace',
            [race.id, race.maxChildrenCount, race.metadataUri],
            { id: race.id },
        )
    })

    return { animalNft }
})

export default AnimalNFTModule
