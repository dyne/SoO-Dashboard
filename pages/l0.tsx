import { NextPage } from "next";
import Link from "next/link";
import React from "react";


const L0: NextPage = () => {
    const nodes = process.env.NEXT_PUBLIC_L0_NODES!.split(" ");
    const title:string = 'L0 - Planetmint active nodes'

    return (<>
        <h1 className="pb-4 text-2xl font-bold">Layer 0</h1>
        {nodes.map((m, i) => (<><Link key={i} href={`/l0/${m}`}><a className="btn btn-primary btn-sm">{m}</a></Link><br/></>))}
    </>)
}

export default L0;