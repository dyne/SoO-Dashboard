import { NextPage } from "next";
import React, {useState} from "react";
import axios from "axios";


const OraclesConsensusPost: NextPage = () => {
    const [postId, setPostId] = useState('')
    const [recurseLimit, setRecurseLimit] = useState('2')
    const [endpoint, setEndpoint] = useState('')
    const [response, setResponse] = useState(null as any)
    const [tab, setTab] = useState(0)
    const [txId, setTxId] = useState('')


    function consesusPost(e:any) {
            axios.post('https://apiroom.net/api/zenswarm/zenswarm-6-random-oracles-post.chain',
                {data:{ post: {
                data: {
                 post: {
                  id: postId,
                  recurseLimit: parseInt(recurseLimit)
               },
               endpoint: endpoint
              }
             },
              keys: {}
            }})
          .then((res) =>setResponse(res.data.consensus))
          .catch( (error) => setResponse(error));
        e.preventDefault()
    }
     function verifyNotarization(e:any) {
            axios.post('https://apiroom.net/api/zenswarm/zenswarm-verify-ethereum-notarization-txid',
                {data: {txid: txId}, keys:{}})
          .then((res) =>setResponse(res.data))
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
        <button onClick={()=>setTab(0)} className="btn btn-primary mr-2 mb-2">Oracles Consesus Post</button>
        <button onClick={()=>setTab(1)} className="btn btn-primary mb-2">Verify notarization on Ethereum</button>
        <div className="grid max-h-screen grid-cols-2">
            {(tab===1) &&  <div>
                    <form onSubmit={verifyNotarization}>
                        <input type="text"
                               placeholder="b214475cbeb3c86b69209a4256eb611c4cf9915d88dfed09a87245d1c835ccdb"
                               onChange={(e)=>setTxId(e.target.value)}
                               className="input w-full max-w-xs mb-2 input-bordered"/><br/>
                        <button type="submit"
                                className="btn btn-primary">Verify!</button>
                    </form>
                </div>}
            {(tab===0) &&  <div>
                    <form onSubmit={consesusPost}>
                        <input type="text"
                               placeholder={placeholder.post.id}
                               onChange={(e)=>setPostId(e.target.value)}
                               className="input w-full max-w-xs mb-2 input-bordered"/><br/>
                        <input type="number"
                               placeholder={placeholder.post.recurseLimit}
                               onChange={(e)=>setRecurseLimit(e.target.value)}
                               className="input w-20 mb-2 input-bordered"/><br/>
                        <input type="text" placeholder={placeholder.endpoint}
                               onChange={(e)=>setEndpoint(e.target.value)}
                               className="input w-full max-w-xs mb-2 input-bordered"/><br/>
                        <button type="submit"
                                className="btn btn-primary">Post!</button>
                    </form>
                </div>}
            <div>
                {response &&<div className="break-all p-4 bg-black text-accent">
                    {JSON.stringify(response)}
                </div>}
            </div>

        </div>

    </>)
}

export default OraclesConsensusPost;