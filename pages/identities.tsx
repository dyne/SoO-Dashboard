import {NextPage} from "next";
import {useState} from "react";
import axios from "axios";
import React from 'react';
import {useTable} from 'react-table';

const Identities: NextPage = ({identities, error}:any) => {

  if(!error) {const data = identities

   const columns = React.useMemo(
     () => [
         {
             Header: 'Base Url',
             accessor: 'baseUrl',
         },
         {
             Header: 'Bitcoin Adress',
             accessor: 'bitcoin_address',
         },
         {
             Header: 'Country',
             accessor: 'country',
         },
         {
             Header: 'Ip',
             accessor: 'ip',
             },
         {
             Header: 'Tracker',
             accessor: 'tracker',
           },
         {
             Header: 'Port Http',
             accessor: 'port_http',
           },
         {
             Header: 'Port Https',
             accessor: 'port_https',
           }
     ],
     []
   )

   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data })

   return (
     <table {...getTableProps()} className="table table-zebra w-full">
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td{...cell.getCellProps()}>
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
     </table>
   )}
    return (<><h1>{error}</h1></>)

}

Identities.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get('https://apiroom.net/api/zenswarm/zenswarm-server-get-listOfIdentities')
    const identities = res?.data.identities;
    return { identities };
  } catch (error) {
    return { error };
  }
};

export default Identities