import { useAtom } from 'jotai'
import React from 'react'
import { categoriesAtom } from '../../atoms/categoriesAtom'
import ReactTable from '../ReactTable/ReactTable'

const CategoryList = () => {
    const [categories] = useAtom(categoriesAtom)

    // columns to be display in ReactTable
    const columns = React.useMemo(() => [
        {
            Header: 'Name',
            accessor: 'name',
        },
        {
            Header: 'Icon',
            accessor: 'icon',
        },
        {
            Header: 'Color',
            accessor: 'color',
        },
    ])

    return (
        <div>
            <ReactTable columns={columns} data={categories.data} />
        </div>
    )
}

export default CategoryList
