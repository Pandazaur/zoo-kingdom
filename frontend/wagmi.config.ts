import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'

export default defineConfig({
    out: './contracts.ts',
    plugins: [hardhat({ project: '../backend' })],
})
