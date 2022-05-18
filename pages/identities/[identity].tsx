import { NextPage } from "next";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useLayoutEffect, useRef, useMemo, ReactNode } from "react";
import useSWR from "swr";

const Pill = ({ level }: { level: string }) => {
    const color:any = {
        "warn": "bg-yellow-500",
        "info": "bg-blue-500",
        "error": "bg-red-500",
        "debug": "bg-gray-500",
    }
    return <span className={`text-xs inline-block px-1 leading-none text-center whitespace-nowrap align-baseline font-bold ${color[level]}`}>{level}</span>
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

const Identity: NextPage = () => {
    const logsRef = useRef<HTMLDivElement>(null);
    const uid = useRouter().query.identity
    const url = `http://${uid}/api/zenswarm-oracle-get-identity`
    const logsUrl = `http://${uid}/logs`
    const { data } = useSWR(url)
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
                        {logs && logs.split(/\r?\n/).map(l => <LogLine key={l} l={l} />)}
                        {!logs && "Loading logs..."}
                    </div>
                </div>

                <div className="pl-4">
                    <h2 className="pb-4 text-xl font-bold">Blockchain addresses and PKs</h2>
                    <dl>
                        <Definition label="ethereum" value={<Link href={`https://www.etherchain.org/account/${data?.identity.ethereum_address}`}><a>{data?.identity.ethereum_address}</a></Link>} />
                        <Definition label="ecdh public key" value={data?.identity.ecdh_public_key} />
                        <Definition label="reflow public key" value={data?.identity.reflow_public_key} />
                        <Definition label="bitcoin" value={<Link href={`https://blockchair.com/bitcoin/address/${data?.identity.bitcoin_address}`}><a>{data?.identity.bitcoin_address}</a></Link>} />
                    </dl>
                </div>
            </div>
            }
        </>
    )
}


export default Identity
