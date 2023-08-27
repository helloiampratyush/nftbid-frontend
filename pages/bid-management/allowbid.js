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

    async function approvebid(data) {
        const nftAddress = data.data[0].inputResult
        const tokenId = data.data[1].inputResult
        const timeOfBid = data.data[2].inputResult
        let minPrice
        data.data[3].inputResult
            ? (minPrice = ethers.utils.parseUnits(data.data[3].inputResult, "ether").toString())
            : (minPrice = "0.01")
        const startBid = {
            abi: marketPlaceAbi,
            contractAddress: marketPlaceAddress,
            functionName: "allowBid",
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
                minPrice: minPrice,
                timeOfBid: timeOfBid,
            },
        }
        await runContractFunction({
            params: startBid,
            onSuccess: handleallowSuccess,
            onError: (error) => console.log(error),
        })
    }

    const handleallowSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: "",
            title: "Bid Allowed",
            position: "topR",
        })
    }

    return (
        <div className="mt-32">
            <Form
                buttonConfig={{
                    onClick: function noRefCheck() {},
                    theme: "primary",
                }}
                onSubmit={approvebid}
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
                        name: "Bid-time(in sec)",
                        type: "number",
                        value: "",
                        key: "timeOfBid",
                    },
                    {
                        name: "minPrice(In ETH)",
                        type: "number",
                        value: "",
                        key: "price",
                    },
                ]}
                title="allow market place for bid"
                id="Main Form"
            />
        </div>
    )
}
