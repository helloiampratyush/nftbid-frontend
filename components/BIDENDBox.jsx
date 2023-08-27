import { TokenKind } from "graphql"
import { useEffect, useState } from "react"
import { useMoralis } from "react-moralis"

import moment from "moment/moment"
export default function BIDENDBox({ nftAddress, tokenId, buyer }) {
    const [NftAddress, setNftAddress] = useState(0)
    const [TokenId, setTokenId] = useState(0)
    const [Buyer, setBuyer] = useState(0)

    const { isWeb3Enabled } = useMoralis()

    async function updateUi() {
        const NftAddress = nftAddress
        const TokenId = tokenId
        const Buyer = buyer

        setNftAddress(NftAddress)
        setTokenId(TokenId)
        setBuyer(Buyer)
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
                    <div className=" text-pink-500">CONGRATULATIONS 🙂 </div>
                    <div className="bg-gray-500 text-center">
                        <p>
                            {Buyer} has won bid,paid the amount and got nft with nftAddress{" "}
                            {NftAddress} with tokenId {TokenId}
                        </p>
                    </div>
                </div>
            ) : (
                <div>web3 is not enabled</div>
            )}
        </div>
    )
}
