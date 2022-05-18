import {NextPage} from "next";
import React from 'react';
import ServicesMock from "../mocks/services";

const Services: NextPage = () => {
    return (
     <table className="table table-zebra w-full">
       <thead>
           <tr>
               <th>name</th>
               <th>url</th>
               <th>region</th>
           </tr>
       </thead>
       <tbody>
       {ServicesMock.map((s,i)=> <tr key={i}>
           <td>{s.name}</td>
           <td>{s.url}</td>
           <td>{s.region}</td>
         </tr> )}
       </tbody>
     </table>
   )
}


export default Services