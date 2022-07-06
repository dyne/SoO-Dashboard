import { NextPage } from "next";
import React, {useState} from 'react';
import useSWR from 'swr';
import IdentityTableRow from "../components/IdentitiesTableRow";
import Spinner from "../components/Spinner";



const Identities: NextPage = () => {
    const { data } = useSWR("https://did.dyne.org:443/api/W3C-DID-extract-oracles-uid.chain")
    const W3CDIDs = (data && data['W3C-DIDs_uid_list']) && data['W3C-DIDs_uid_list']
    return (data?<>
        <div className="overflow-x-auto">
            <table className="table w-full table-zebra hover">
                <thead>
                    <tr>
                        <th></th>
                        <th>DID</th>
                        <th>region</th>
                        <th>type</th>
                        <th>subscriptions</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                {W3CDIDs?.map((node: string, i:number) => (<IdentityTableRow key={i} node={node}/>))}
                </tbody>
            </table>
        </div>
    </>:<Spinner/>)
}

export default Identities
