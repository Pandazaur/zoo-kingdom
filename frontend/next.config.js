/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'ipfs.io',
                port: '',
            },
        ],
    },
    async redirects() {
        return [
            // Basic redirect
            {
                source: '/',
                destination: '/app/animals',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig
