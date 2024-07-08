import type { HardhatUserConfig } from 'hardhat/config'
import * as dotenv from 'dotenv'

import '@nomicfoundation/hardhat-verify'
import '@nomicfoundation/hardhat-toolbox'

dotenv.config()

const config: HardhatUserConfig = {
    solidity: '0.8.24',
}

if (process.env.ETHERSCAN_API_KEY) {
    config.etherscan = {
        apiKey: process.env.ETHERSCAN_API_KEY
    }

    config.sourcify = {
        enabled: true
    }
}

if (process.env.ALCHEMY_KEY && process.env.WALLET_PRIVATE_KEY) {
    config.networks = {
        arbitrum_testnet: {
            url: `https://arb-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_KEY}`,
            accounts: [process.env.WALLET_PRIVATE_KEY as string]
        }
    },
}

export default config
