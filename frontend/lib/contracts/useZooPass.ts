import { abi } from '@/../backend/artifacts/contracts/ZooPass.sol/ZooPass.json'

export const contractMainInfos = {
    abi,
    address: process.env.NEXT_PUBLIC_ZOOPASS_ADDRESS,
}
