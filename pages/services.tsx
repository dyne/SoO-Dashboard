import {NextPage} from "next";
import React from 'react';
import {useTable} from 'react-table';
import ServicesMock from "../mocks/services";

const Services: NextPage = () => {
   const data = ServicesMock

   const columns = React.useMemo(
     () => [
         {
             Header: 'Name',
             accessor: 'name',
         },
         {
             Header: 'Url',
             accessor: 'url',
         },
         {
             Header: 'Region',
             accessor: 'region',
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
   )
}


export default Services