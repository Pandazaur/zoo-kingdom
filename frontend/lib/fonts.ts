import { DM_Sans, Gluten, Grandstander } from 'next/font/google'

export const dmSans = DM_Sans({ subsets: ['latin'], display: 'swap', variable: '--font-dm-sans' })
export const gluten = Gluten({ subsets: ['latin'], display: 'swap', variable: '--font-gluten' })
export const grandstander = Grandstander({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-grandstander',
})
