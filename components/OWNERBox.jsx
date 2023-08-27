import { TokenKind } from "graphql"
import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"

import moment from "moment/moment"
export default function OWNERBox({
    nftAddress,
    tokenId,
    minPrice,
    bidStartTime,
    bidEndTime,
    owner,
}) {
    const [NftAddress, setNftAddress] = useState(0)
    const [TokenId, setTokenId] = useState(0)
    const [MinPrice, setMinPrice] = useState(0)
    const [BidStartTime, setBidStartTime] = useState(0)
    const [BidEndTime, setBidEndTime] = useState(0)
    const [Owner, setOwner] = useState(0)
    const { isWeb3Enabled } = useMoralis()
    const [Num, setNum] = useState(0)

    async function updateUi() {
        const NftAddress = nftAddress
        const TokenId = tokenId
        const MinPrice = minPrice
        const BidStartTime = bidStartTime
        const BidEndTime = bidEndTime
        const Owner = owner

        setNftAddress(NftAddress)
        setTokenId(TokenId)
        setMinPrice(MinPrice)
        setBidStartTime(BidStartTime)
        setBidEndTime(BidEndTime)
        setOwner(Owner)
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUi()
        }
    }, [isWeb3Enabled])

    return (
        <div className="container mx-auto flex flex-col mt-28">
            {isWeb3Enabled ? (
                <div>
                    <div className=" text-pink-500">ANNOUNCEMENT!!</div>
                    <div className="bg-gray-500 text-center">
                        <p className=" text-xl">owner:{Owner}</p>
                        <p className=" text-xl">nftAddress:{NftAddress}</p>
                        <p className=" text-xl">tokenId:{TokenId}</p>
                        <p className=" text-xl">minPrice:{MinPrice / 1e18} Eth</p>
                        <p className=" text-xl">
                            bidStartTime:{moment.unix(BidStartTime).format("DD-MM-YYYY HH:mm:ss")}
                        </p>
                        <p className=" text-xl">
                            bidEndTime:{moment.unix(BidEndTime).format("DD-MM-YYYY HH:mm:ss")}
                        </p>
                    </div>
                </div>
            ) : (
                <div>web3 is not enabled</div>
            )}
        </div>
    )
}
