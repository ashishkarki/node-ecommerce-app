import React, { useEffect } from 'react'

import { useCategoryStore } from '../../stores/categoryStore'
import ReactTable from '../ReactTable/ReactTable'

const CategoryList = () => {
    const categories = useCategoryStore((state) => state.categories)
    const initCategories = useCategoryStore((state) => state.initCategories)
    const deleteCategory = useCategoryStore((state) => state.deleteCategory)

    useEffect(() => {
        initCategories()
    }, [])

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
                        className="bg-green-400 px-2 py-1 ash-rounded"
                        onClick={() => console.log('edit:', { value })}
                    >
                        Edit
                    </button>

                    <button
                        className="bg-red-400 px-2 py-1 ash-rounded"
                        onClick={() => {
                            deleteCategory(value)
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
            <ReactTable columns={columns} data={categories} />
        </div>
    )
}

export default CategoryList
