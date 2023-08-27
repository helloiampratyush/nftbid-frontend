import { useQuery } from "@apollo/client"
import GET_BID_INFO from "../../constants/graphQueries2"
import { useMoralis } from "react-moralis"
import LOGBox from "../../components/LOGBox"
export default function selfDeposite() {
    const { loading, error, data: self } = useQuery(GET_BID_INFO)
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
                    self.bidtimes.map((d1) => {
                        const { id, nftAddress, tokenId, bidAmount, bidder, time } = d1
                        return (
                            <LOGBox
                                nftAddress={nftAddress}
                                tokenId={tokenId}
                                bidAmount={bidAmount}
                                bidder={bidder}
                                time={time}
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
