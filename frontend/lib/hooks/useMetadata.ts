import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { convertIpfsToHttps } from '../strings'

export default function useMetadata<Metadata = unknown>(metadataUri: string) {
    const metadataFetchableUri = convertIpfsToHttps(metadataUri)

    return useQuery<Metadata>({
        queryKey: ['METADATA_URI', metadataFetchableUri],
        queryFn: async () => {
            const metadata = await axios.get(metadataFetchableUri)
            return metadata.data
        },
    })
}
