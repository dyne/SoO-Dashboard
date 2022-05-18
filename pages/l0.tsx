import { NextPage } from "next";
import Link from "next/link";

const L0: NextPage = () => {
    const nodes = process.env.NEXT_PUBLIC_L0_NODES.split(" ");


    return (<>
        {nodes.map(m => (<Link href={`/l0/${m}`}><a>{m}</a></Link>))}
    </>)
}

export default L0;