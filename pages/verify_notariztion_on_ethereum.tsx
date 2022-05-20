import { NextPage } from "next";
import React, {useState} from "react";
import axios from "axios";


const VerifyNotarizationOnEthereum: NextPage = () => {
    const [response, setResponse] = useState(null as any)
    const placeholder = "b214475cbeb3c86b69209a4256eb611c4cf9915d88dfed09a87245d1c835ccdb"

    const [txId, setTxId] = useState(placeholder)

     function verifyNotarization(e:any) {
            axios.post('https://apiroom.net/api/zenswarm/zenswarm-verify-ethereum-notarization-txid',
                {data: {txid: txId}, keys:{}})
          .then((res) =>setResponse(res.data))
          .catch( (error) => setResponse(error));
        e.preventDefault()
      }

    const title:string = 'Verify Notarization on Ethereum'

    return (<>
        <h1 className="pb-4 text-2xl font-bold">{title}</h1>
        <div className="grid max-h-screen grid-cols-1 md:grid-cols-2">
            <div>
                <form onSubmit={verifyNotarization}>
                    <input type="text"
                           placeholder={placeholder}
                           onChange={(e)=>setTxId(e.target.value)}
                           className="input w-full max-w-xs mb-2 input-bordered"/><br/>
                    <button type="submit"
                            className="btn btn-primary">Verify!</button>
                </form>
            </div>
            <div>
                {response &&<div className="p-4 break=all overflow-auto bg-black text-accent whitespace-pre">
                    {JSON.stringify(response, null, 2)}
                </div>}
            </div>
        </div>

    </>)
}

export default VerifyNotarizationOnEthereum;