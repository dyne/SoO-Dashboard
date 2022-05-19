import { NextPage } from "next";
import React, {useState} from "react";
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
    function consesusPost(e:any) {
        axios.post('https://apiroom.net/api/zenswarm/zenswarm-6-random-oracles-post.chain',
                `{ post: {
                data: ${post}
             },
              keys: {}
            }`)
          .then((res) =>setResponse(res.data.consensus))
          .catch( (error) => setResponse(error));

        e.preventDefault()
    }
    const title:string = 'Oracles Consensus Post'

    return (<>
        <h1 className="pb-4 text-2xl font-bold">{title}</h1>
        <div className="grid max-h-screen grid-cols-1 md:grid-cols-2">
            <form onSubmit={consesusPost}>
                <textarea
                       placeholder={placeholder}
                       onChange={(e)=>setPost(e.target.value)}
                       className="input w-4/5 mb-2 textarea-bordered h-60 textarea"/><br/>
                <button type="submit"
                        className="btn btn-primary">Post!</button>
            </form>
            {response &&<div className="break-all p-4 bg-black text-accent">
                {JSON.stringify(response)}
            </div>}
        </div>

    </>)
}

export default OraclesConsensusPost;