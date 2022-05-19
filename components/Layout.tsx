import { ReactNode } from "react";
import Navbar from "./Navbar"
import Link from "next/link";
import { useSession } from "next-auth/react"

interface LayoutProps {
  children: ReactNode;
}



const Layout = ({ children }: LayoutProps): JSX.Element => {
    const nodes = process.env.NEXT_PUBLIC_L0_NODES!.split(" ");
    const { data: session } = useSession()
    const ServicesBtn = () => {
      return ( <> {session && <li><Link href="/services" >Services</Link></li>} </> )
    }

    return (
        <>
            <div className="drawer">
                <input id="drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Navbar />
                    <div className="md:container md:mx-auto">
                        {children}
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="drawer" className="drawer-overlay"/>
                    <ul className="p-4 menu w-80 bg-base-100 text-base-content">
                        <li><Link href="/identities" >Swarm of Oracle status check</Link></li>
                        {ServicesBtn()}
                        <li>
                             <Link href="/l0">L0</Link>
                            <ul className="menu bg-base-100">
                                {nodes.map((m, i) => (<li key={i}><Link href={`/l0/${m}`}><a>{m}</a></Link></li>))}
                            </ul>
                        </li>
                        <li><Link href="">SoftwarePassport tasks</Link></li>
                        <li><Link href="/oracles_consesus_post">Oracles Consesus Post</Link></li>
                        <li><Link href="/verify_notariztion_on_ethereum">Verify notarization on Ethereum</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Layout;




