import {NextPage} from "next";
import {useRouter} from 'next/router';
import React, {useLayoutEffect, useRef, ReactNode, useState} from "react";
import useSWR from "swr";
import Spinner from "../../components/Spinner";
import DID from "../../components/DID";
import axios from "axios";

const Pill = ({level}: { level: string }) => {
    const color: any = {
        "warn": "bg-yellow-500",
        "info": "bg-blue-500",
        "error": "bg-red-500",
        "debug": "bg-gray-500",
    }
    return <div><span
        className={`text-xs inline-block px-1 py-1 leading-none text-center whitespace-nowrap align-baseline font-bold ${color[level]}`}>{level}</span>
    </div>
}


const LogLine = ({l}: { l: string }) => {
    try {
        const line = JSON.parse(l);
        return (<div className="flex p-2 space-x-2 font-mono">
            <Pill level={line.level}/>
            <span>{line.message}</span>
        </div>)
    } catch (e) {
        return null
    }
}

const Definition = ({label, value}: { label: string, value: string | ReactNode }) => {
    return (
        <>
            <dt className="font-medium text-gray-500">{label}</dt>
            <br/>
            <dd className="mt-1 break-all border-b text-accent">{value}</dd>
        </>

    )
}
const SubscriptionCard = ({label, value, L0}: { label: string, value: any, L0: string }) => {
    const valueKeys = Object.keys(value)
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title font-bold">{label}</h2>
                <ul>
                    {valueKeys.map((v, i) => <li key={i}><span className="font-bold">{v}</span>: <span
                        className="text-grey-500">{value[v]}</span></li>)}
                    <li><span className="font-bold">Notarization to:</span><span className="text-grey-500">{L0}</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

const Identity: NextPage = () => {
    const logsRef = useRef<HTMLDivElement>(null);
    const [resolvedDid, setResolvedDid] = useState(null);
    const uid = useRouter().query.identity
    const url = `${uid}/api/zenswarm-oracle-get-identity`
    const logsUrl = `${uid}/logs`
    const {data} = useSWR(url)
    const subscriptions = data?.subscriptions
    const eventSubscriptions = data?.event_subscriptions
    const subscriptionsKeys = Object.keys(subscriptions ? subscriptions : {})
    const eventSubscriptionsKeys = Object.keys(eventSubscriptions ? eventSubscriptions : {})
    const {data: logs} = useSWR(logsUrl, (url) => fetch(url).then((res) => res.text()))
    const ecdh_public_key = `did:dyne:id:${data?.identity?.ecdh_public_key}`


    useLayoutEffect(() => {
        if (logsRef.current) {
            logsRef.current.scroll({top: logsRef.current.scrollHeight, behavior: 'smooth'});
        }
    }, [logs])

    const resolveDidData = {
        "data": {
            "id": ecdh_public_key
        },
        "keys": {}
    }

    function didPost(e: any) {
        e.preventDefault()
        console.log(data)
        setResolvedDid(null)
        axios.post('http://did.dyne.org:12000/api/W3C-DID-resolve-did', resolveDidData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => setResolvedDid(res.data['W3C-DID']))
            .catch((error) => console.log(error)).finally(() => console.log(resolvedDid))
    }

    return (
        <>
            <h1 className="w-full my-4 text-4xl font-bold shadow mb-0">{uid}</h1>
            <label htmlFor="my-modal" className="col-span-11 mb-3 cursor-pointer hidden md:block text-gray-500">
                {ecdh_public_key}</label>
            <label htmlFor="my-modal"
                   className="col-span-11  md:hidden mt-3 cursor-pointer w-full btn btn-primary btn-xs">
                resolve</label>
            <input type="checkbox" id="my-modal" className="modal-toggle" onInput={didPost}/>
            <label htmlFor="my-modal" className="modal cursor-pointer">

                <label className="modal-box relative w-screen text-left" htmlFor="my-modal-4">
                    <h1 className="text-4xl bold mb-5">W3C-DID Document</h1>
                    {!resolvedDid && <Spinner/>}
                    {resolvedDid && <DID resolvedDid={resolvedDid}/>}
                </label>
            </label>
            {data && <div className="grid max-h-screen grid-cols-2">
                <div>
                    <h3 className="pb-4 text-xl font-bold">Logs</h3>
                    <div ref={logsRef}
                         className="p-2 overflow-scroll text-xs text-gray-200 divide-y rounded h-96 divide-slate-600 bg-slate-900">
                        {logs && logs.split(/\r?\n/).map((l, i) => <LogLine key={i} l={l}/>)}
                        {!logs && "Loading logs..."}
                    </div>
                </div>

                <div className="pl-4">
                    <h2 className="pb-4 text-xl font-bold">Blockchain addresses and PKs</h2>
                    <dl>
                        <Definition label="ethereum"
                                    value={<a
                                        href={`http://test.fabchain.net:8000/#/address/${data?.identity.ethereum_address}`}
                                        rel="noreferrer"
                                        target="_blank">{data?.identity.ethereum_address}</a>}/>
                        <Definition label="ecdh public key" value={ecdh_public_key}/>
                        <Definition label="reflow public key" value={data?.identity.reflow_public_key}/>
                        <Definition label="bitcoin"
                                    value={<a
                                        href={`https://blockchair.com/bitcoin/address/${data?.identity.bitcoin_address}`}
                                        rel="noreferrer"
                                        target="_blank">{data?.identity.bitcoin_address}</a>}/>
                    </dl>
                </div>

            </div>
            }
            {!(subscriptionsKeys.length === 0) && <><h2 className="pb-4 text-xl font-bold mt-4">Subscriptions</h2>
                <dl>
                    {subscriptionsKeys && subscriptionsKeys.map((s, i) => <SubscriptionCard key={i} label={s}
                                                                                            L0={data?.identity.L0}
                                                                                            value={subscriptions[s]}/>)}
                </dl>
            </>}
            {!(eventSubscriptionsKeys?.length === 0) && <><h2 className="pb-4 text-xl font-bold mt-4">Subscriptions
                Events</h2>
                <dl>
                    {eventSubscriptionsKeys && eventSubscriptionsKeys.map((s, i) => <SubscriptionCard key={i} label={s}
                                                                                                      L0={data?.identity.L0}
                                                                                                      value={eventSubscriptions[s]}/>)}
                </dl>
            </>}
        </>
    )
}


export default Identity
