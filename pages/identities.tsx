import { NextPage } from "next";
import Link from "next/link";
import React from 'react';
import useSWR from 'swr';
import IdentityBtn from "../components/IdentityBtn";
import PingChecker from "../components/PingChecker";

const Identities: NextPage = () => {

    const { data } = useSWR("https://apiroom.net/api/zenswarm/zenswarm-server-get-listOfIdentities")

    return (data && <>
        <div className="overflow-x-auto">
            <table className="table w-full table-zebra hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>UID</th>
                        <th>region</th>
                        <th>type</th>
                        <th>version</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {data.identities.map((node: any) => {
                        return (
                            <tr key={node.uid}>
                                <td><PingChecker uid={node.uid} api={node.pingAPI} /></td>
                                <td>{node.uid}</td>
                                <td>
                                    <div className="flex flex-col">
                                        <p className="font-bold">{node.country}</p>
                                        <p className="text-xs text-gray-400">{node.region}</p>
                                    </div>
                                </td>
                                <td>{node.type}</td>
                                <td>{node.version}</td>
                                <td className="flex flex-col space-y-2">
                                    <IdentityBtn uid={node.uid} />
                                    <a href={`http://${node.uid}/docs`} rel="noreffer" target="_blank" className="btn btn-xs btn-success">openapi</a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    </>)
}

export default Identities
