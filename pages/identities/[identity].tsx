import { NextPage } from "next";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useLayoutEffect, useRef } from "react";
import useSWR from "swr";

const Pill = ({ level }: { level: string }) => {
    const color = {
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
            <h1 className="text-2xl">{uid}</h1>
            {data && <>
                <h2 className="text-xl font-bold">Blockchain addresses and PKs</h2>
                <div className="border-t border-gray-600">
                    <dl>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ethereum</dt>
                            <dd className="mt-1 text-sm text-accent sm:mt-0 sm:col-span-2"><Link href={`https://www.etherchain.org/account/${data?.identity.ethereum_address}`}><a>{data?.identity.ethereum_address}</a></Link></dd>
                        </div>
                        <div className="px-4 py-5 break-all sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="overflow-auto text-sm font-medium text-gray-500">reflow public key</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{data?.identity.reflow_public_key}</dd>
                        </div>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ecdh public key</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{data?.identity.ecdh_public_key}</dd>
                        </div>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ecdh public key</dt>
                            <dd className="mt-1 text-sm sm:mt-0 sm:col-span-2">{data?.identity.ecdh_public_key}</dd>
                        </div>
                        <div className="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">bitcoin</dt>
                            <dd className="mt-1 text-sm text-accent sm:mt-0 sm:col-span-2"><Link href={`https://blockchair.com/bitcoin/address/${data?.identity.bitcoin_address}`}><a>{data?.identity.bitcoin_address}</a></Link></dd>
                        </div>
                    </dl>
                </div>

                <div ref={logsRef} className="overflow-scroll text-xs text-gray-200 divide-y divide-slate-600 bg-slate-900 max-h-96">
                    {logs && logs.split(/\r?\n/).map(l => <LogLine key={l} l={l} />)}
                </div>
            </>
            }
        </>
    )
}


export default Identity
