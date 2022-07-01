import React from 'react';
import useSWR from "swr";
import PingChecker from "./PingChecker";
import SubscriptionsCell from "./SubscriptionsCell";
import IdentityBtn from "./IdentityBtn";

const IdentityTableRow = ({ node }: { node: string }) => {
    const { data } = useSWR(`${node}/api/zenswarm-oracle-get-identity`);
    console.log(data?.identity)
    return (data && <>
        <tr>
                                <td><PingChecker uid={node} /></td>
                                <td className="whitespace-normal w-60 break-words">
                                    <div className="tooltip w-full" data-tip={`did:dyne:id:${data.identity.ecdh_public_key}`}>
                                        <a className="mr-2 bold">did:dyne:id:{data.identity.ecdh_public_key.slice(0,40)}...</a>
                                    </div>
                                </td>
                                <td>
                                    <div className="flex flex-col">
                                        <p className="font-bold">{data.identity.Country}</p>
                                        <p className="text-xs text-gray-400">{data.identity.State}</p>
                                    </div>
                                </td>
                                <td>{data.identity.description}</td>
                                <td>
                                    <SubscriptionsCell data={data} />
                                </td>
                                <td className="flex flex-col space-y-3 py-6">
                                    <IdentityBtn uid={node} />
                                    <a href={`${node}/docs`} rel="noreferrer" target="_blank" className="btn btn-xs btn-success">openapi</a>
                                </td>
                            </tr></>)
}


export default IdentityTableRow;