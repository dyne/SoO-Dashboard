import { ReactNode } from "react";
import Navbar from "./Navbar"
import Link from "next/link";
import { useSession } from "next-auth/react"

interface LayoutProps {
  children: ReactNode;
}



const Layout = ({ children }: LayoutProps): JSX.Element => {
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
                    <label htmlFor="drawer" className="drawer-overlay"></label>
                    <ul className="p-4 overflow-y-auto menu w-80 bg-base-100 text-base-content">
                        <li><Link href="/identities" >Swarm of Oracle status check</Link></li>
                        {ServicesBtn()}
                        <li><Link href="">Logs management</Link></li>
                        <li><Link href="">SoftwarePassport tasks</Link></li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Layout;




