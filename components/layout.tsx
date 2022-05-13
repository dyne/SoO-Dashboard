import { ReactNode } from "react";
import Navbar from "./navbar"
import Link from "next/link";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps): JSX.Element => {
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
                        <li>Logs management</li>
                        <li>SoftwarePassport tasks</li>
                    </ul>
                </div>
            </div>
        </>
    )
};

export default Layout;