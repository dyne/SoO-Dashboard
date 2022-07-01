import React from 'react';
import useSWR from "swr";
import PingChecker from "./PingChecker";
import SubscriptionsCell from "./SubscriptionsCell";
import IdentityBtn from "./IdentityBtn";

const IdentityTableRow = ({ node }: { node: string }) => {
    const { data } = useSWR(`${node}/api/zenswarm-oracle-get-identity`);
    return (data && <>
        <tr>
                                <td><PingChecker uid={node} api={'/pingApi/'} /></td>
                                <td>{node}</td>
                                <td>
                                    <div className="flex flex-col">
                                        <p className="font-bold">{data.identity.Country}</p>
                                        <p className="text-xs text-gray-400">{data.identity.State}</p>
                                    </div>
                                </td>
                                <td>{data.identity.description}</td>
                                <td>{data.identity.version}</td>
                                <td>
                                    <SubscriptionsCell data={data} />
                                </td>
                                <td className="flex flex-col space-y-3 py-6">
                                    <IdentityBtn uid={node} />
                                    <a href={`http://${node}/docs`} rel="noreferrer" target="_blank" className="btn btn-xs btn-success">openapi</a>
                                </td>
                            </tr></>)
}


export default IdentityTableRow;