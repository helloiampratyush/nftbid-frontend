import { gql } from "@apollo/client"

const GET_LISTED_ITEMS = gql`
    {
        activeItems(first: 5, where: { buyer: "0x0000000000000000000000000000000000000000" }) {
            id
            seller
            nftAddress
            buyer
            tokenId
            minPrice
        }
    }
`
export default GET_LISTED_ITEMS
