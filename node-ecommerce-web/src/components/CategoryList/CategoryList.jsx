import { useAtom } from 'jotai'
import React from 'react'
import { categoriesAtom, deleteCategoryAtom } from '../../atoms/categoriesAtom'
import ReactTable from '../ReactTable/ReactTable'

const CategoryList = () => {
    const [categories] = useAtom(categoriesAtom)
    const [, compute] = useAtom(deleteCategoryAtom)

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
        {
            id: 'update',
            accessor: 'id', // how will we link action to which col value
            Cell: ({ value }) => (
                <div className="flex justify-evenly items-center">
                    <button
                        className="bg-green-400 p-1 ash-rounded"
                        onClick={() => console.log('edit:', { value })}
                    >
                        Edit
                    </button>

                    <button
                        className="bg-green-400 p-1 ash-rounded"
                        onClick={() => {
                            console.log('delete:', { value })
                            compute(value)
                        }}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ])

    return (
        <div>
            <ReactTable columns={columns} data={categories.data} />
        </div>
    )
}

export default CategoryList
