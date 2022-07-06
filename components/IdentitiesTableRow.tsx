import React, {useState} from 'react';
import useSWR from "swr";
import PingChecker from "./PingChecker";
import SubscriptionsCell from "./SubscriptionsCell";
import IdentityBtn from "./IdentityBtn";
import {ClipboardCheckIcon, ClipboardCopyIcon} from "@heroicons/react/solid";
import axios from "axios";
import Spinner from "./Spinner";
import DID from "./DID";

const IdentityTableRow = ({node}: { node: string }) => {
    const {data} = useSWR(`${node}/api/zenswarm-oracle-get-identity`, {refreshInterval :10000});
    const [isCopied, setIsCopied] = useState(false);
    const [resolvedDid, setResolvedDid] = useState(null);
    const ecdh_public_key = `did:dyne:id:${data?.identity?.ecdh_public_key}`
    const context = resolvedDid? resolvedDid["@context"] : []

    async function copyTextToClipboard(text: string) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const resolveDidData = {
        "data": {
            "id": ecdh_public_key
        },
        "keys": {}
    }

    function didPost(e: any) {
        e.preventDefault()
        setResolvedDid(null)
        axios.post('http://did.dyne.org:12000/api/W3C-DID-resolve-did', resolveDidData, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => setResolvedDid(res.data['W3C-DID']))
            .catch((error) => console.log(error)).finally(()=>console.log(resolvedDid))
    }

    const handleCopyClick = () => {
        copyTextToClipboard(ecdh_public_key)
            .then(() => {
                // If successful, update the isCopied state value
                setIsCopied(true);
                setTimeout(() => {
                    setIsCopied(false);
                }, 1500);
            })
    }
    const copyIcon = isCopied ? <ClipboardCheckIcon className="w-5 h-5"/> : <ClipboardCopyIcon className="w-5 h-5"/>
    return (data && <>
        <tr>
            <td><PingChecker uid={node}/></td>
            <td className="min-w-30">
                <div className="tooltip w-full h-full whitespace-normal break-words" data-tip={ecdh_public_key}>
                    <a className="mr-2 bold flex flex-col">
                        <div className="grid grid-cols-12 w-24 md:w-full">
                            <button
                                className={`btn btn-ghost text-xs col-span-1 p-0 hidden md:block justify-end hover:bg-transparent ${isCopied && "text-success"}`}
                                onClick={handleCopyClick}>
                                {copyIcon}
                            </button>
                            <label htmlFor="my-modal" className="col-span-11 mt-3 cursor-pointer hidden md:block">
                                {ecdh_public_key.slice(0, 61)}...</label>
                            <label htmlFor="my-modal" className="col-span-11  md:hidden mt-3 cursor-pointer w-full btn btn-primary btn-xs">
                                resolve</label>
                            <input type="checkbox" id="my-modal" className="modal-toggle" onInput={didPost}/>
                                <label htmlFor="my-modal" className="modal cursor-pointer">

                                    <label className="modal-box relative w-screen text-left" htmlFor="my-modal-4">
                                        <h1 className="text-4xl bold mb-5">W3C-DID Document</h1>
                                        {!resolvedDid && <Spinner/>}
                                        {resolvedDid&&<DID resolvedDid={resolvedDid}/>}
                                    </label>
                                </label>
                        </div>
                    </a>
                </div>
            </td>
            <td>
                <div className="grid grid-col-1">
                    <p className="font-bold">{data.identity.Country}</p>
                    <p className="text-xs text-gray-400">{data.identity.State}</p>
                </div>
            </td>
            <td>{data.identity.description}</td>
            <td>
                <SubscriptionsCell data={data}/>
            </td>
            <td className="flex flex-col space-y-3 py-6 w-36">
                <IdentityBtn uid={node}/>
                <a href={`${node}/docs`} rel="noreferrer" target="_blank"
                   className="btn btn-xs btn-success">openapi</a>
            </td>
        </tr>
    </>)
}


export default IdentityTableRow;