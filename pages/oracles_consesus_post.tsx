import { NextPage } from "next";
import React, {useState} from "react";
import axios from "axios";


const OraclesConsensusPost: NextPage = () => {
    const [postId, setPostId] = useState('')
    const [recurseLimit, setRecurseLimit] = useState('2')
    const [endpoint, setEndpoint] = useState('')
    const [response, setResponse] = useState(null as any)

    function onSubmit(e:any) {
        axios.post('https://apiroom.net/api/zenswarm/zenswarm-6-random-oracles-post.chain', {
          data:
            { post: {
            data: {
             post: {
              id: postId,
              recurseLimit: parseInt(recurseLimit)
           },
           endpoint: endpoint
          }
         }},
          keys: {}
        })
      .then((res) =>setResponse(res))
      .catch( (error) => setResponse(error));
    e.preventDefault()
  }

    const title:string = 'Oracles Consesus Post'
    const placeholder = {
                             post: {
                              id: "01FSKCT2BR8326ZEM6F6C4STWM",
                              recurseLimit: '2'
                           },
                           endpoint: "https://reflow-demo.dyne.org/api/json/trace"
                          }

    return (<>
        <h1 className="pb-4 text-2xl font-bold">{title}</h1>
        <div className="grid max-h-screen grid-cols-2">
            <div>
                <form onSubmit={onSubmit}>
                    <input type="text"
                           placeholder={placeholder.post.id}
                           onChange={(e)=>setPostId(e.target.value)}
                           className="input w-full max-w-xs mb-2"/><br/>
                    <input type="number"
                           placeholder={placeholder.post.recurseLimit}
                           onChange={(e)=>setRecurseLimit(e.target.value)}
                           className="input w-20 mb-2"/><br/>
                    <input type="text" placeholder={placeholder.endpoint}
                           onChange={(e)=>setEndpoint(e.target.value)}
                           className="input w-full max-w-xs mb-2"/><br/>
                    <button type="submit"
                            className="btn btn-primary">Post!</button>
                </form>
            </div>
            <div>
                {response && JSON.stringify(response)}
            </div>

        </div>

    </>)
}

export default OraclesConsensusPost;