import LoginBtn from "./login";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="navbar bg-base-100">
            <div className="flex-none">
                <label className="btn btn-square btn-ghost drawer-button" htmlFor="drawer">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </label>
            </div>
            <div className="flex-1">
                <Link href="/">
                    <a className="text-xl normal-case btn btn-ghost">SoO Dashboard</a>
                </Link>
            </div>
            <LoginBtn/>
        </div>
    )
}

export default Navbar;
