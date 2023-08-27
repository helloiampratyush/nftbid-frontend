import { Form, Input, useNotification, Button, Information } from "web3uikit"
import Head from "next/head"
import { ethers } from "ethers"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
export default function INTRODUCTION() {
    const { isWeb3Enabled } = useMoralis()

    return (
        <div className="mt-28">
            {isWeb3Enabled ? (
                <div>
                    <div className=" text-fuchsia-900 mx-0  text-2xl flex flex-col">
                        <Information
                            information="hello viewer!"
                            topic="how bidding will be work here!"
                        />
                        <div className=" text-2xl m-9 rounded-lg">
                            <p>hello again!</p>
                            <br />
                            <p>
                                This is second version of my previously deployed nft market-place
                                you can check out:
                                <a href="https://dainty-cascaron-e6c066.netlify.app/">
                                    marketPlacev1
                                </a>
                                <br />
                                Thank you for visiting 😇
                            </p>
                            <br />
                            <p>
                                STEP 1:If you have listed nft by going to sell-nft section then you
                                are owner of that nft you can allow bid for that nft so better you
                                should have respective nft address and tokeId.
                            </p>
                            <br />
                            <p>
                                STEP 2: You will need some input time to allow bidding because
                                miner can manipulate till 900s so better put time greater than
                                1200s for bidding and also require there minPrice you should have
                                write minPrice that you have written at the time of listing
                            </p>
                            <br />
                            <p>
                                STEP 3: This step will be for bidder where will require
                                nftAddress,tokenId and bidAmount . nftAddress and tokenId you can
                                collect from ownerAnnounceMent you can put bidAmount as much as you
                                want you see who bidded by how much amount refrain to put same
                                amount.
                            </p>
                            <br />
                            <p>
                                STEP 4: Finally after time passes that had decided by owner highest
                                bidder will be announced then that guy shall have to pay bidAmount
                                to take on nft.
                            </p>
                            <br />
                            Step 5: After finishing transaction amount will be go to the seller
                            amount and that amount, seller can credit as much as they can .this
                            site will secure there amount untill they will take all their amount
                        </div>
                    </div>
                </div>
            ) : (
                <div>web3 is not enabled</div>
            )}
        </div>
    )
}
