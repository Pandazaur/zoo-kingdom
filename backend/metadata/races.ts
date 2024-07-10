import { resolve } from 'path'

export type Race = {
    id: string
    maxChildrenCount: number
    isPremium: boolean
    metadata: {
        name: string
        description: string
        imagePath: string
        external_url?: string
        attributes?: any[]
    }
}

const RACES: Race[] = [
    {
        id: 'girafe',
        maxChildrenCount: 10,
        isPremium: true,
        metadata: {
            name: 'Girafe',
            description:
                'La girafe est un mammifère herbivore africain, remarquable par sa taille imposante, son long cou et ses taches uniques.',
            imagePath: resolve(__dirname, './pictures/girafe.jpg')
        }
    },
    {
        id: 'racoon',
        maxChildrenCount: 2,
        isPremium: true,
        metadata: {
            name: 'Raton Laveur',
            description:
                "Le raton laveur est un mammifère omnivore originaire d'Amérique du Nord, connu pour son intelligence, son masque noir distinctif et ses pattes habiles. Ils sont généralement nocturnes et s'adaptent facilement à divers habitats, des forêts aux zones urbaines. Leur nom vient de leur comportement de \"lavage\" des aliments dans l'eau, bien qu'il s'agisse plutôt d'une manipulation pour les inspecter et les ramollir.",
            imagePath: resolve(__dirname, './pictures/racoon.jpg')
        }
    },
    {
        id: 'tiger',
        maxChildrenCount: 6,
        isPremium: false,
        metadata: {
            name: 'Tigre',
            description:
                'Le tigre est le plus grand félin sauvage du monde. Ce mammifère carnivore, redouté pour sa puissance et sa beauté, est un élément emblématique de la faune asiatique.',
            imagePath: resolve(__dirname, './pictures/tiger.jpg')
        }
    },
    {
        id: 'fox',
        maxChildrenCount: 10,
        isPremium: true,
        metadata: {
            name: 'Renard',
            description: `Le renard roux, un canidé agile au pelage roux flamboyant, se distingue par sa silhouette svelte et son allure rusée. Son museau fin et pointu, ses oreilles dressées et sa queue touffue lui confèrent une apparence caractéristique. Solitaire et nocturne, il chasse petits mammifères, oiseaux et insectes, s'adaptant avec intelligence à son environnement.`,
            imagePath: resolve(__dirname, './pictures/fox.jpg')
        }
    },
    {
        id: 'crocodile',
        maxChildrenCount: 4,
        isPremium: false,
        metadata: {
            name: 'Crocodile',
            description: `Un reptile redoutable des eaux chaudes, le crocodile se caractérise par son corps allongé et cuirassé d'écailles robustes. Sa tête massive, dotée de puissantes mâchoires et d'un museau plat, lui confère un aspect menaçant. Carnivore opportuniste, il guette ses proies depuis les rivières et les zones humides, les attirant dans son univers aquatique pour les noyer et les broyer.`,
            imagePath: resolve(__dirname, './pictures/crocodile.jpg')
        }
    },
    {
        id: 'swan',
        maxChildrenCount: 16,
        isPremium: false,
        metadata: {
            name: 'Cygne',
            description: `Un majestueux oiseau aquatique au plumage immaculé, le cygne se distingue par sa silhouette élégante et sa grâce aérienne. Son long cou gracieux, sa tête fine et son bec orange vif lui confèrent une allure noble. Nageur hors pair, il glisse paisiblement sur les lacs et les rivières, nourrissant sa famille et défendant son territoire avec ferveur.`,
            imagePath: resolve(__dirname, './pictures/swan.jpg')
        }
    }
]

export default RACES
