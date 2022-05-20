import { NextPage } from "next";
import React, { useState } from "react";
import axios from "axios";


const OraclesConsensusPost: NextPage = () => {

    const placeholder = `{
        post: {
                id: "01FSKCT2BR8326ZEM6F6C4STWM",
                recurseLimit: '2'
            },
            endpoint: "https://reflow-demo.dyne.org/api/json/trace"
        }`

    const [post, setPost] = useState(placeholder)


    const [response, setResponse] = useState(null as any)
    function consesusPost(e: any) {
        e.preventDefault()
        const input = { data: { "post": { data: JSON.parse(post) } } }
        axios.post('https://apiroom.net/api/zenswarm/zenswarm-6-random-oracles-post.chain', input, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
            .then((res) => setResponse(res.data))
            .catch((error) => setResponse(error));
    }
    const title: string = 'Oracles Consensus Post'

    return (<>
        <h1 className="pb-4 text-2xl font-bold">{title}</h1>
        <div className="grid max-h-screen grid-cols-1 md:grid-cols-2">
            <form onSubmit={consesusPost}>
                <textarea
                    placeholder={placeholder}
                    onChange={(e) => setPost(e.target.value)}
                    className="w-4/5 mb-2 input textarea-bordered h-60 textarea" /><br />
                <button type="submit"
                    className="btn btn-primary">Post!</button>
            </form>
            {response && <pre className="p-4 overflow-auto bg-black text-accent">
                {JSON.stringify(response, null, 2)}
            </pre>}
        </div>

    </>)
}

export default OraclesConsensusPost;