import { gql } from "@apollo/client"

const GET_BID_END_INFO = gql`
    {
        bidDones(first: 5) {
            id
            nftAddress
            tokenId
            buyer
        }
    }
`
export default GET_BID_END_INFO
