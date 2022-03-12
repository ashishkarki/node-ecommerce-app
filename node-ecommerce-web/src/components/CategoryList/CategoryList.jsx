import { useAtom } from 'jotai'
import { useReducerAtom } from 'jotai/utils'
import React, { useEffect } from 'react'
import { ACTIONS, CATEGORY_COLUMNS } from '../../../constants-web'

import {
    categoriesAtom,
    deleteCategoriesAtom,
    deleteCategoryById as deleteCategory,
} from '../../atoms/categoriesAtom'
import ReactTable from '../ReactTable/ReactTable'

const CategoryList = () => {
    const [categories, dispatch] = useAtom(categoriesAtom)
    // const [categories, dispatch] = useReducerAtom(
    //     categoriesAtom,
    //     categoriesReducer
    // )
    const [, deleteCategory] = useAtom(deleteCategoriesAtom)

    // columns to be display in ReactTable
    const columns = React.useMemo(() => [
        ...CATEGORY_COLUMNS,
        {
            id: 'update',
            accessor: 'id', // how will we link action to which col value
            Cell: ({ value }) => (
                <div className="flex justify-evenly items-center">
                    <button
                        className="bg-green-400 p-1 ash-rounded"
                        onClick={() =>
                            console.log('edit categoryId:', { value })
                        }
                    >
                        Edit
                    </button>

                    <button
                        className="bg-red-400 p-1 ash-rounded"
                        onClick={() => {
                            // deleteCategoryById(value)
                            deleteCategory(value)
                            console.log('delete categoryId:', { value })
                        }}
                    >
                        Delete
                    </button>
                </div>
            ),
        },
    ])

    const deleteCategoryById = async (categoryId) => {
        dispatch({
            type: ACTIONS.DELETE,
            payload: categoryId,
        })

        try {
            const response = await deleteCategory(categoryId)
            const data = await response.json()

            console.log(
                'Ecommerce Web => CategoryList => deleteCategoryById:',
                data
            )
        } catch (err) {
            console.log(
                `Ecommerce Web => CategoryList => error deleting category: ${err.message}`
            )
        }
    }

    return (
        <div>
            <ReactTable columns={columns} data={categories.data} />
        </div>
    )
}

export default CategoryList
