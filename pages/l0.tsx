import { NextPage } from "next";
import Link from "next/link";
import React from "react";


const L0: NextPage = () => {
    const nodes = process.env.NEXT_PUBLIC_L0_NODES!.split(" ");
    const title:string = 'L0 - Planetmint active nodes'

    return (<>
        <h1 className="pb-4 text-2xl font-bold">Layer 0</h1><br/>
        <dl className="max-w-md">
            {nodes.map((m, i) => (<>
                <dt className="font-medium text-gray-500">Server#{i}</dt>
                <dd className="mt-1 break-all border-b text-accent">
                   <span>{m}</span> <Link key={i} href={`/l0/${m}`}><a className="btn btn-primary btn-xs mb-1 float-right">Check transactions</a></Link><br/>
                </dd>

            </>))}
        </dl>

    </>)
}

export default L0;