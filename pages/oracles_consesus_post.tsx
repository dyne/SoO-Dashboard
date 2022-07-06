import {NextPage} from "next";
import React, {useState} from "react";
import axios from "axios";
import useSWR from "swr";
import Spinner from "../components/Spinner";


const OraclesConsensusPost: NextPage = () => {
    const {data} = useSWR("https://did.dyne.org:443/api/W3C-DID-extract-oracles-uid.chain")
    const urlPlaceholder = (data && data['W3C-DIDs_uid_list']) && `${data['W3C-DIDs_uid_list'][0]}/api/zenswarm-post-6-rand-oracles.chain`
    const [endpoint, setEndpoint] = useState('https://swarm0.dyne.org:20000/api/zenswarm-post-6-rand-oracles.chain')
    const handleSelect = (e: any) => {
        setEndpoint(`${e.target.value}/api/zenswarm-post-6-rand-oracles.chain`)
    }
    const postPlaceholder = `{
        "data": { 
            "txId": "94d5a744e8a4d8153cda90a900fdeba5b763a945411f3f7ebe33c7d54b91bbf0",
            "post": {
                "data": {
                    "post": {
                        "id": "01FSKCT2BR8326ZEM6F6C4STWM",
                        "recurseLimit": 2
                    },
                    "endpoint": "https://reflow-demo.dyne.org/api/json/trace"
                }
            }
        }
    }`

    const [post, setPost] = useState(postPlaceholder)
    const [response, setResponse] = useState(null as any)

    function consesusPost(e: any) {
        setResponse(<Spinner/>)
        e.preventDefault()
        const input = JSON.parse(post)
        axios.post(endpoint, input, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => setResponse(JSON.stringify(res.data, null, 2)))
            .catch((error) => setResponse(error));
    }

    const title: string = 'Oracles Consensus Post'

    return (<>
        <h1 className="pb-4 text-2xl font-bold h-full">{title}</h1>
        {!data && <Spinner/>}
        {data&&<div className="grid grid-cols-1 grid-rows-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-7">
                <form className="grid grid-cols-1 h-[33rem]" onSubmit={consesusPost}>
                <label className="font-bold">select zenswarm node:</label>
                <select className="select select-bordered my-2" onChange={((e: any) => handleSelect(e))}>
                    {data && data['W3C-DIDs_uid_list']?.map((n: string) =>
                        <option key={n} value={n}>
                            {n}
                        </option>)}
                </select>
                <h5 className="font-bold my-8">
                    EndPoint:<br/><span className="text-gray-400">{endpoint}</span>
                </h5>
                <textarea
                    placeholder={postPlaceholder}
                    onChange={(e) => setPost(e.target.value)}
                    className="mb-2 input textarea-bordered h-60 textarea"/><br/>
                <button type="submit"
                        className="btn btn-primary">Post!
                </button>
            </form>
            </div>

            {response && <div className="overflow-scroll md:col-span-5 h-[33rem]">
                <pre className="p-4 bg-black text-accent whitespace-pre min-h-full place-content-center grid">
                {response}
            </pre></div>}
        </div>}

    </>)
}

export default OraclesConsensusPost;