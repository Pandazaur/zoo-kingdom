export function convertIpfsToHttps(ipfsLink: string) {
    return ipfsLink.replace(`ipfs://`, `https://ipfs.io/ipfs/`)
}
