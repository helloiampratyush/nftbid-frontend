import { useQuery } from "@apollo/client"
import GET_BID_END_INFO from "../../constants/graphQueries3"
import { useMoralis } from "react-moralis"
import BIDENDBox from "../../components/BIDENDBox"
export default function selfDeposite() {
    const { loading, error, data: self } = useQuery(GET_BID_END_INFO)
    const { isWeb3Enabled } = useMoralis()
    return (
        <div className="container mx-auto m-4 ">
            <h1 className="text-2xl text-purple-900 bg-neutral-300 text-center">
                {" "}
                OWNER ANNOUNCEMENT
            </h1>
            {isWeb3Enabled ? (
                loading || !self ? (
                    <div>loading.....</div>
                ) : (
                    self.bidDones.map((d1) => {
                        const { id, nftAddress, tokenId, buyer } = d1
                        return (
                            <BIDENDBox
                                nftAddress={nftAddress}
                                tokenId={tokenId}
                                buyer={buyer}
                                key={id}
                            />
                        )
                    })
                )
            ) : (
                <div>web3 is not Enabled</div>
            )}
        </div>
    )
}
