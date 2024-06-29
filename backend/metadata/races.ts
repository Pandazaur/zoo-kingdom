import { resolve } from 'path'

type Race = {
    id: string
    maxChildrenCount: number
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
        metadata: {
            name: 'Girafe',
            description:
                'La girafe est un mammifère herbivore africain, remarquable par sa taille imposante, son long cou et ses taches uniques.',
            imagePath: resolve(__dirname, './pictures/girafe.jpg'),
        },
    },
    {
        id: 'tiger',
        maxChildrenCount: 6,
        metadata: {
            name: 'Tigre',
            description:
                'Le tigre est le plus grand félin sauvage du monde. Ce mammifère carnivore, redouté pour sa puissance et sa beauté, est un élément emblématique de la faune asiatique.',
            imagePath: resolve(__dirname, './pictures/tiger.jpg'),
        },
    },
    {
        id: 'fox',
        maxChildrenCount: 10,
        metadata: {
            name: 'Renard',
            description: `Le renard roux, un canidé agile au pelage roux flamboyant, se distingue par sa silhouette svelte et son allure rusée. Son museau fin et pointu, ses oreilles dressées et sa queue touffue lui confèrent une apparence caractéristique. Solitaire et nocturne, il chasse petits mammifères, oiseaux et insectes, s'adaptant avec intelligence à son environnement.`,
            imagePath: resolve(__dirname, './pictures/fox.jpg'),
        },
    },
    {
        id: 'crocodile',
        maxChildrenCount: 4,
        metadata: {
            name: 'Crocodile',
            description: `Un reptile redoutable des eaux chaudes, le crocodile se caractérise par son corps allongé et cuirassé d'écailles robustes. Sa tête massive, dotée de puissantes mâchoires et d'un museau plat, lui confère un aspect menaçant. Carnivore opportuniste, il guette ses proies depuis les rivières et les zones humides, les attirant dans son univers aquatique pour les noyer et les broyer.`,
            imagePath: resolve(__dirname, './pictures/crocodile.jpg'),
        },
    },
    {
        id: 'swan',
        maxChildrenCount: 16,
        metadata: {
            name: 'Cygne',
            description: `Un majestueux oiseau aquatique au plumage immaculé, le cygne se distingue par sa silhouette élégante et sa grâce aérienne. Son long cou gracieux, sa tête fine et son bec orange vif lui confèrent une allure noble. Nageur hors pair, il glisse paisiblement sur les lacs et les rivières, nourrissant sa famille et défendant son territoire avec ferveur.`,
            imagePath: resolve(__dirname, './pictures/crocodile.jpg'),
        },
    },
]

export default RACES
