import { NextPage } from "next";
import Link from "next/link";

const L0: NextPage = () => {
    // @ts-ignore
    const nodes = process.env.NEXT_PUBLIC_L0_NODES.split(" ");


    return (<>
        {nodes.map((m, i) => (<Link key={i} href={`/l0/${m}`}><a>{m}</a></Link>))}
    </>)
}

export default L0;