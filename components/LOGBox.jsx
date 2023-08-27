import { TokenKind } from "graphql"
import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"

import moment from "moment/moment"
export default function LOGBox({ nftAddress, tokenId, bidAmount, bidder, time }) {
    const [NftAddress, setNftAddress] = useState(0)
    const [TokenId, setTokenId] = useState(0)
    const [BidAmount, setBidAmount] = useState(0)
    const [Bidder, setBidder] = useState(0)
    const [Time, setTime] = useState(0)

    const { isWeb3Enabled } = useMoralis()

    async function updateUi() {
        const NftAddress = nftAddress
        const TokenId = tokenId
        const BidAmount = bidAmount
        const Bidder = bidder
        const Time = time

        setNftAddress(NftAddress)
        setTokenId(TokenId)
        setBidAmount(BidAmount)
        setBidder(Bidder)
        setTime(Time)
    }
    useEffect(() => {
        if (isWeb3Enabled) {
            updateUi()
        }
    }, [isWeb3Enabled])

    return (
        <div className="container mx-auto flex flex-col mt-16">
            {isWeb3Enabled ? (
                <div>
                    <div className=" text-pink-500">ANNOUNCEMENT!!</div>
                    <div className="bg-gray-500 text-center">
                        <p>
                            {Bidder} has bidded {BidAmount / 1e18} ETH for nftAddresss:{NftAddress}{" "}
                            and tokenId:{TokenId} at{" "}
                            {moment.unix(Time).format("DD-MM-YYYY HH:mm:ss")}
                        </p>
                    </div>
                </div>
            ) : (
                <div>web3 is not enabled</div>
            )}
        </div>
    )
}
