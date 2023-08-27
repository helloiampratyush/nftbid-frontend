import { gql } from "@apollo/client"

const GET_BID_INFO = gql`
    {
        bidtimes(first: 5) {
            id
            nftAddress
            tokenId
            bidAmount
            bidder
            time
        }
    }
`
export default GET_BID_INFO
