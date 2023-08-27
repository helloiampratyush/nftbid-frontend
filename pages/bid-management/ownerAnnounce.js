import { useQuery } from "@apollo/client"
import GET_BID_INFO from "../../constants/graphQueries1"
import { useMoralis } from "react-moralis"
import OWNERBox from "../../components/OWNERBox"
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
                    self.bidAnnounces.map((d1) => {
                        const {
                            id,
                            nftAddress,
                            tokenId,
                            minPrice,
                            bidStartTime,
                            bidEndTime,
                            owner,
                        } = d1
                        return (
                            <OWNERBox
                                nftAddress={nftAddress}
                                tokenId={tokenId}
                                minPrice={minPrice}
                                bidStartTime={bidStartTime}
                                bidEndTime={bidEndTime}
                                owner={owner}
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
