import { NextPage } from "next";
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from "react";
import useSWR from "swr";


const Identity: NextPage = () => {
    const uid = useRouter().query.identity
    const url = `http://${uid}/api/zenswarm-oracle-get-identity`
    const { data } = useSWR(url)
    return (
        <>
            <h1 className="text-2xl">{uid}</h1>
            {data && <>
                <h2 className="text-xl font-bold">Blockchain addresses and PKs</h2>
                <div className="border-t border-gray-200">
                    <dl>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ethereum</dt>
                            <dd className="mt-1 text-sm text-accent sm:mt-0 sm:col-span-2"><Link href={`https://www.etherchain.org/account/${data?.identity.ethereum_address}`}><a>{data?.identity.ethereum_address}</a></Link></dd>
                        </div>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="overflow-auto text-sm font-medium text-gray-500">reflow public key</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data?.identity.reflow_public_key}</dd>
                        </div>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ecdh public key</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data?.identity.ecdh_public_key}</dd>
                        </div>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">ecdh public key</dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">{data?.identity.ecdh_public_key}</dd>
                        </div>
                        <div className="px-4 py-5 bg-gray-50 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">bitcoin</dt>
                            <dd className="mt-1 text-sm text-accent sm:mt-0 sm:col-span-2"><Link href={`https://blockchair.com/bitcoin/address/${data?.identity.bitcoin_address}`}><a>{data?.identity.bitcoin_address}</a></Link></dd>
                        </div>
                    </dl>
                </div>
                <ul>
                    <li>{data?.identity.uid}</li>
                    <li>{data?.identity.ip}</li>
                    <li>{data?.identity.port_http}</li>
                    <li>{data?.identity.country}</li>
                    <li>{data?.identity.ecdh_public_key}</li>
                    <li>{data?.identity.version}</li>
                </ul>
            </>
            }
        </>
    )
}


export default Identity
