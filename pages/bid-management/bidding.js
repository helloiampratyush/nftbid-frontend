import { Form, useNotification, Button } from "web3uikit"
import Head from "next/head"
import { ethers } from "ethers"
import networkMapping from "../../constants/nftbidAddress.json"
import marketPlaceAbi from "../../constants/nftbid.json"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
export default function Home() {
    const { chainId, account, isWeb3Enabled } = useMoralis()

    const chainString = chainId ? parseInt(chainId).toString() : "11155111"
    const marketPlaceAddress = networkMapping[chainString].nftbid[0]
    const dispatch = useNotification()
    const { runContractFunction } = useWeb3Contract()
    const [proceeds, setProceeds] = useState("0")

    async function bidding(data) {
        const nftAddress = data.data[0].inputResult
        const tokenId = data.data[1].inputResult
        let bidAmount
        data.data[2].inputResult
            ? (bidAmount = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString())
            : (bidAmount = " ")
        const Bid = {
            abi: marketPlaceAbi,
            contractAddress: marketPlaceAddress,
            functionName: "bidding",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
                bidAmount: bidAmount,
            },
        }
        await runContractFunction({
            params: Bid,
            onSuccess: handlebidSuccess,
            onError: (error) => console.log(error),
        })
    }

    const handlebidSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: "",
            title: "Bid Allowed",
            position: "topR",
        })
        window.location.reload()
    }

    return (
        <div className="mt-32">
            <Form
                buttonConfig={{
                    onClick: function noRefCheck() {},
                    theme: "primary",
                }}
                onSubmit={bidding}
                data={[
                    {
                        name: "Nft Address",
                        type: "text",
                        inputWidth: "30%",
                        value: "",
                        key: "nftAddress",
                    },
                    {
                        name: "Token Id",
                        type: "number",
                        value: "",
                        key: "tokenId",
                    },

                    {
                        name: "Bid-Amount(In ETH)",
                        type: "number",
                        value: "",
                        key: "price",
                    },
                ]}
                title="bid"
                id="Main Form"
            />
        </div>
    )
}
