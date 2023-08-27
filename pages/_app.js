import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import Sider from "../components/Sider"
import Head from "next/head"
import { NotificationProvider } from "web3uikit"
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "https://api.studio.thegraph.com/query/50428/nftbid/v0.0.5",
})

function MyApp({ Component, pageProps }) {
    return (
        <div>
            <Head>
                <title>NFT Marketbid</title>
                <meta name="description" content="NFT marketplacev2" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <MoralisProvider initializeOnMount={false}>
                <ApolloProvider client={client}>
                    <NotificationProvider>
                        <Header />
                        <div className="flex bg-gray-800">
                            <Sider className="bg-gray-200 w-1/4">
                                <div className="h-screen overflow-y-auto hover:overflow-auto"></div>
                            </Sider>
                            <div className="flex-1 p-4 overflow-y-auto">
                                <Component {...pageProps} />
                            </div>
                        </div>
                    </NotificationProvider>
                </ApolloProvider>
            </MoralisProvider>
        </div>
    )
}

export default MyApp
