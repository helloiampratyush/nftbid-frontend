import { Form, useNotification, Button, Input } from "web3uikit"
import Head from "next/head"
import { ethers } from "ethers"
import networkMapping from "../../constants/nftbidAddress.json"
import marketPlaceAbi from "../../constants/nftbid.json"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
export default function bidderPay() {
    const { chainId, account, isWeb3Enabled } = useMoralis()

    const chainString = chainId ? parseInt(chainId).toString() : "11155111"
    const marketPlaceAddress = networkMapping[chainString].nftbid[0]
    const dispatch = useNotification()
    const { runContractFunction } = useWeb3Contract()

    async function handleAmountPayment(data) {
        const amountToPay = ethers.utils.parseUnits(data.data[2].inputResult, "ether").toString()
        const nftAddress = data.data[0].inputResult
        const tokenId = data.data[1].inputResult
        const Operation = {
            abi: marketPlaceAbi,
            contractAddress: marketPlaceAddress,
            functionName: "highestBidderPaid",
            msgValue: amountToPay,
            params: {
                nftAddress: nftAddress,
                tokenId: tokenId,
            },
        }
        await runContractFunction({
            params: Operation,
            onSuccess: handleListSuccess,
            onError: (error) => console.log(error),
        })
    }
    const handleListSuccess = async (tx) => {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: "payment done",
            title: "",
            position: "topR",
        })
    }

    return (
        <div className="mt-28">
            <div>
                {isWeb3Enabled ? (
                    <div>
                        <div className="flex flex-row m-6"></div>
                        <Form
                            buttonConfig={{
                                onClick: function noRefCheck() {},
                                theme: "primary",
                            }}
                            onSubmit={handleAmountPayment}
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
                                    name: "Price(In ETH)",
                                    type: "number",
                                    value: "",
                                    key: "price",
                                },
                            ]}
                            title="Pay to get Nft"
                            id="Main Form"
                        />
                    </div>
                ) : (
                    <div></div>
                )}
            </div>
        </div>
    )
}
