import { NextPage } from "next";
import { useRouter } from 'next/router';
import React, { useLayoutEffect, useRef, ReactNode } from "react";
import useSWR from "swr";

const Pill = ({ level }: { level: string }) => {
    const color:any = {
        "warn": "bg-yellow-500",
        "info": "bg-blue-500",
        "error": "bg-red-500",
        "debug": "bg-gray-500",
    }
    return <div><span className={`text-xs inline-block px-1 py-1 leading-none text-center whitespace-nowrap align-baseline font-bold ${color[level]}`}>{level}</span></div>
}


const LogLine = ({ l }: { l: string }) => {
    try {
        const line = JSON.parse(l);
        return (<div className="flex p-2 space-x-2 font-mono">
            <Pill level={line.level} />
            <span>{line.message}</span>
        </div>)
    } catch (e) { return null }
}

const Definition = ({ label, value }: { label: string, value: string | ReactNode }) => {
    return (
        <>
            <dt className="font-medium text-gray-500">{label}</dt>
            <br />
            <dd className="mt-1 break-all border-b text-accent">{value}</dd>
        </>

    )
}
const SubscriptionCard = ({ label, value, uid}: { label: string, value: any, uid:string}) => {
    const planetMint = ['172.104.233.185:26113',
    '151.236.222.33:26735',
    '151.236.222.33:28004',
    '172.104.233.185:25600',
    'zenswarm.zenroom.org:26729',
    '151.236.222.33:26735',
    'zenswarm.zenroom.org:26497'
    ]
    const valueKeys = Object.keys(value)
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title font-bold">{label}</h2>
                <ul>
                    {valueKeys.map((v,i)=><li key={i}><span className="font-bold">{v}</span>: <span className="text-grey-500">{value[v]}</span></li>)}
                    <li><span className="font-bold">Notarization to:</span><span className="text-grey-500">{planetMint.includes(uid)? "planetmint": "ethereum" }</span></li>)
                </ul>
            </div>
        </div>
    )
}

const Identity: NextPage = () => {
    const logsRef = useRef<HTMLDivElement>(null);
    const uid = useRouter().query.identity
    const url = `http://${uid}/api/zenswarm-oracle-get-identity`
    const logsUrl = `http://${uid}/logs`
    const { data } = useSWR(url)
    const subscriptions = data?.subscriptions
    const subscriptionsKeys =Object.keys(subscriptions? subscriptions : {})
    const { data: logs } = useSWR(logsUrl, (url) => fetch(url).then((res) => res.text()))

    useLayoutEffect(() => {
        if (logsRef.current) {
            logsRef.current.scroll({ top: logsRef.current.scrollHeight, behavior: 'smooth' });
        }
    }, [logs])

    return (
        <>
            <h1 className="w-full my-4 text-4xl font-bold shadow">{uid}</h1>
            {data && <div className="grid max-h-screen grid-cols-2">
                <div>
                    <h3 className="pb-4 text-xl font-bold">Logs</h3>
                    <div ref={logsRef} className="p-2 overflow-scroll text-xs text-gray-200 divide-y rounded h-96 divide-slate-600 bg-slate-900">
                        {logs && logs.split(/\r?\n/).map((l,i) => <LogLine key={i} l={l} />)}
                        {!logs && "Loading logs..."}
                    </div>
                </div>

                <div className="pl-4">
                    <h2 className="pb-4 text-xl font-bold">Blockchain addresses and PKs</h2>
                    <dl>
                        <Definition label="ethereum"
                                    value={<a href={`https://www.etherchain.org/account/${data?.identity.ethereum_address}`}
                                    rel="noreferrer"
                                    target="_blank">{data?.identity.ethereum_address}</a>} />
                        <Definition label="ecdh public key" value={data?.identity.ecdh_public_key} />
                        <Definition label="reflow public key" value={data?.identity.reflow_public_key} />
                        <Definition label="bitcoin"
                                    value={<a href={`https://blockchair.com/bitcoin/address/${data?.identity.bitcoin_address}`}
                                    rel="noreferrer"
                                    target="_blank">{data?.identity.bitcoin_address}</a>} />
                    </dl>
                    {subscriptionsKeys &&<><h2 className="pb-4 text-xl font-bold mt-4">Subscriptions</h2>
                        <dl>
                            {subscriptionsKeys && subscriptionsKeys.map((s,i)=> <SubscriptionCard key={i} label={s} uid={String(uid)} value={subscriptions[s]}/>)}
                        </dl>
                    </>}
                </div>
            </div>
            }
        </>
    )
}


export default Identity
