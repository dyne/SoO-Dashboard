import {NextPage} from "next";
import {useState} from "react";
import axios from "axios";

const Identities: NextPage = () => {
  const [identities, setIdentities] = useState([] as Array<any>)
  axios.get('https://apiroom.net/api/zenswarm/zenswarm-server-get-listOfIdentities').then(response => {
  setIdentities(response.data.identities)
    console.log(identities);
});
  return (
    <ul>
      {identities.map((identity, index)=>{return (<li key={index}>{JSON.stringify(identity)}</li>)})}
    </ul>
  )
}

export default Identities