import { Form, Input, useNotification, Button, Information } from "web3uikit"
import Head from "next/head"
import { ethers } from "ethers"

import networkMapping from "../constants/nftbidAddress.json"
import marketPlaceAbi from "../constants/nftbid.json"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
export default function withdraw() {
    const { chainId, account, isWeb3Enabled } = useMoralis()

    const chainString = chainId ? parseInt(chainId).toString() : "11155111"
    const marketPlaceAddress = networkMapping[chainString].nftbid[0]
    const dispatch = useNotification()
    const { runContractFunction } = useWeb3Contract()
    const [proceeds, setProceeds] = useState("0")
    const [ethAmount, setEthAmount] = useState("0")
    async function handleWithDrawProceed(tx) {
        await tx.wait(1)
        dispatch({
            type: "success",
            message: "proceed withdrawn",
            title: "",
            position: "topR",
        })
    }
    async function setupUI() {
        const returnProceed = await runContractFunction({
            params: {
                abi: marketPlaceAbi,
                contractAddress: marketPlaceAddress,
                functionName: "getGainedProfitAmount",
                params: {
                    seller: account,
                },
            },
            onError: (error) => console.log(error),
        })

        if (returnProceed) {
            setProceeds(returnProceed.toString())
        }
    }
    useEffect(() => {
        setupUI()
    }, [proceeds, account, isWeb3Enabled, chainId])
    return (
        <div className="mt-32">
            {isWeb3Enabled ? (
                <div>
                    <div className=" text-fuchsia-900 my-6 mx-6 text-center text-2xl">
                        <Information
                            information={ethers.utils.formatUnits(proceeds, "ether")}
                            topic="Your collection from market place in ETH"
                        />
                    </div>

                    {proceeds != "0" ? (
                        <div className="mx-3 p-6 flex flex-row">
                            <Input
                                label="Amount(ETH)"
                                name="Test text Input"
                                type="text"
                                onChange={(event) => {
                                    setEthAmount(event.target.value)
                                }}
                                width="400px"
                            />
                            <Button
                                onClick={() => {
                                    runContractFunction({
                                        params: {
                                            abi: marketPlaceAbi,
                                            contractAddress: marketPlaceAddress,
                                            functionName: "withdraw",
                                            params: {
                                                ethAmount: ethers.utils.parseUnits(
                                                    ethAmount,
                                                    "ether"
                                                ),
                                            },
                                        },
                                        onError: (error) => console.log(error),
                                        onSuccess: handleWithDrawProceed,
                                    })
                                }}
                                text="withDraw"
                                type="button"
                            />
                        </div>
                    ) : (
                        <div className="text-center text-2xl text-red-600">
                            no proceed detected
                        </div>
                    )}
                </div>
            ) : (
                <div>web3 is not enabled</div>
            )}
        </div>
    )
}
