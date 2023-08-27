import { gql } from "@apollo/client"

const GET_BID_INFO = gql`
    {
        bidAnnounces(first: 5) {
            id
            nftAddress
            tokenId
            minPrice
            bidStartTime
            bidEndTime
            owner
        }
    }
`
export default GET_BID_INFO
