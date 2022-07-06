import React from "react";
import Definition from "./Definition";
type DID = {
    "@context": Array<string | {
            "Country": string,
            "State": string,
            "description": string,
            "url": string
    }>,
    "Country": string,
    "State": string,
    "alsoKnownAs": string,
    "description": string,
    "id": string,
    "proof": {
        "created": string,
        "jws": string,
        "proofPurpose": string,
        "type": string,
        "verificationMethod": string
    },
    "service":Array<{
            "id": string,
            "serviceEndpoint": string,
            "type": string
        }>
    "url": string,
    "verificationMethod": Array<{
            "controller": string,
            "id": string,
            "publicKeyBase64": string,
            "type": string
        }>
}

const DID = ({resolvedDid}:{resolvedDid:DID}) => {
    const context = resolvedDid["@context"];
    const proof = resolvedDid.proof;
    const service = resolvedDid.service;
    const verificationMethod = resolvedDid.verificationMethod;
    return (<>
        <Definition label="@context" value={<pre>{JSON.stringify(context, null, 2)}</pre>}/>
        <Definition label="Country" value={resolvedDid.Country}/>
        <Definition label="State" value={resolvedDid.State}/>
        <Definition label="alsoKnownAs" value={resolvedDid.alsoKnownAs}/>
        <Definition label="description" value={resolvedDid.description}/>
        <Definition label="id" value={resolvedDid.id}/>
        <Definition label="proof" value={<pre>{JSON.stringify(proof, null, 2)}</pre>}/>
        <Definition label="service" value={<pre>{JSON.stringify(service, null, 2)}</pre>}/>
        <Definition label="url" value={resolvedDid.url}/>
        <Definition label="verificationMethod" value={<pre>{JSON.stringify(verificationMethod, null, 2)}</pre>}/>
        </>)
}
export default DID;