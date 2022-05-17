import {NextPage} from "next";
import axios from "axios";
import React from 'react';
import {useTable} from 'react-table';
import useSWR from 'swr';

const Identities: NextPage = ({identities, err}:any) => {

    const { data, error } = useSWR("https://apiroom.net/api/zenswarm/zenswarm-server-get-listOfIdentities")

    const tableData = data? data.identities : identities

    const columns = React.useMemo(
     () => [
         {
             Header: 'Ip',
             accessor: 'ip',
         },
         {
             Header: 'Country',
             accessor: 'country',
             Cell: ({ value }:any) => (value !== 'NONE') && <div className="badge badge-lg text-primary">{value}</div>
         },
         {
             Header: 'Type',
             accessor: 'type',
             Cell: ({ value }) => <div className="badge badge-lg badge-secondary">{value}</div>
         },
         {
             Header: 'Uid',
             accessor: 'uid',
         },
         {
             Header: 'Version',
             accessor: 'version',
           },
         {
             Header: 'PingAPI',
             accessor: 'pingAPI',
           },
     ],
     [tableData]
   )

   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data:tableData })
if(!err && !error) {
   return (
     <table {...getTableProps()} className="table table-zebra w-full">
       <thead>
         {headerGroups.map(headerGroup => (
             // eslint-disable-next-line react/jsx-key
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
                 // eslint-disable-next-line react/jsx-key
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
               // eslint-disable-next-line react/jsx-key
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
    return (<><h1>{err}</h1></>)

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