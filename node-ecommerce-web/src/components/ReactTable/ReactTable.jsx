import React from 'react'
import { useTable } from 'react-table'

const ReactTable = ({ columns, data }) => {
    const {
        getTableProps, // table props from react-table
        getTableBodyProps, // table body props from react-table
        // headerGroups, // headerGroups, if your table has groupings
        headers, // headers which you can use to describe your table
        rows, // rows for the table based on the data passed
        prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
    } = useTable({ columns, data })

    return (
        <table {...getTableProps()} className="min-w-full">
            <thead className="ash-bg">
                <tr className="">
                    {headers.map((header) => (
                        <th
                            {...header.getHeaderProps()}
                            className="px-4 py-2 ash-rounded ash-border"
                        >
                            {header.render('Header')}
                        </th>
                    ))}
                </tr>
            </thead>

            <tbody {...getTableBodyProps()} className="">
                {rows.map((row, i) => {
                    prepareRow(row)

                    return (
                        <tr {...row.getRowProps()} className="">
                            {row.cells.map((cell) => {
                                return (
                                    <td
                                        {...cell.getCellProps()}
                                        className="px-4 py-2 ash-rounded ash-border text-center"
                                    >
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

export default ReactTable
