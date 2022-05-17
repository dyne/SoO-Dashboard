import { useRouter } from 'next/router'
import {NextPage} from "next";
import useSWR from "swr";
import React from "react";


const Identity: NextPage = () => {
    const port = useRouter().query.identity
    const url = `http://zenswarm.zenroom.org:${port}/api/zenswarm-oracle-get-identity`
    const { data } = useSWR(url)
    return (
        <ul>
            <li>{data?.identity.uid}</li>
            <li>{data?.identity.ip}</li>
            <li>{data?.identity.port_http}</li>
            <li>{data?.identity.country}</li>
            <li>{data?.identity.ecdh_public_key}</li>
            <li>{data?.identity.version}</li>
        </ul>
    )
}


export default Identity