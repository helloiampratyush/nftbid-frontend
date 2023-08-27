import Link from "next/link"

export default function Sider() {
    return (
        <aside className="w-48 h-screen overflow-y-auto mt-28 bg-blue-200">
            <div>
                <Link href="/bid-management/intro">
                    <a className=" p-2 border-solid border-2 border-sky-500 bg-orange-400 w-48 text-center block hover:bg-orange-500 transition duration-300">
                        INTRODUCTION
                    </a>
                </Link>
                <Link href="/bid-management/allowbid">
                    <a className="p-2 border-solid border-2 border-sky-500 bg-orange-400 w-48 text-center block hover:bg-orange-500 transition duration-300">
                        ALLOW BID
                    </a>
                </Link>
                <Link href="/bid-management/ownerAnnounce">
                    <a className="p-2 border-solid border-2 border-sky-500 bg-orange-400 w-48 text-center block hover:bg-orange-500 transition duration-300">
                        BID-ANNOUNCE
                    </a>
                </Link>
                <Link href="/bid-management/bidding">
                    <a className="p-2 border-solid border-2 border-sky-500 bg-orange-400 w-48 text-center block hover:bg-orange-500 transition duration-300">
                        LIVE-BID
                    </a>
                </Link>
                <Link href="/bid-management/biddingLog">
                    <a className="p-2 border-solid border-2 border-sky-500 bg-orange-400 w-48 text-center block hover:bg-orange-500 transition duration-300">
                        LIVEBID(log)
                    </a>
                </Link>
                <Link href="/bid-management/bidderPay">
                    <a className="p-2 border-solid border-2 border-sky-500 bg-orange-400 w-48 text-center block hover:bg-orange-500 transition duration-300">
                        WINNERPAY
                    </a>
                </Link>
                <Link href="/bid-management/bidendLog">
                    <a className="p-2 border-solid border-2 border-sky-500 bg-orange-400 w-48 text-center block hover:bg-orange-500 transition duration-300">
                        BIDENDLOG
                    </a>
                </Link>
                <Link href="/bid-management/aboutSite">
                    <a className="p-2 border-solid border-2 border-sky-500 bg-orange-400 w-48 text-center block hover:bg-orange-500 transition duration-300">
                        ABOUT SITE
                    </a>
                </Link>
            </div>
        </aside>
    )
}
