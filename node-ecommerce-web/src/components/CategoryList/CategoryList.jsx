import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { CATEGORIES_TABLE_COLUMNS, FORM_MODE } from '../../../constants-web'
import { useCategoryStore } from '../../stores/categoryStore'
import { useUserStore } from '../../stores/userStore'
import ReactTable from '../ReactTable/ReactTable'

const CategoryList = () => {
    // the navigation
    const navigate = useNavigate()

    // the stores
    const categories = useCategoryStore((state) => state.categories)
    const initCategories = useCategoryStore((state) => state.initCategories)
    const deleteCategory = useCategoryStore((state) => state.deleteCategory)
    const isAdminUser = useUserStore((state) => state.isAdmin)

    const deleteCategoryWithConfirmation = async (catIdToDelete) => {
        confirm('Are you sure you want to delete this category?') &&
            (await deleteCategory(catIdToDelete))
    }

    useEffect(() => {
        initCategories()
    }, [])

    // columns to be display in ReactTable
    const actionColumns = isAdminUser
        ? [
              {
                  id: 'update',
                  Header: 'Actions',
                  accessor: 'id', // how will we link action to which col value
                  Cell: ({ value }) => (
                      <div className="flex justify-evenly items-center">
                          <button
                              className="ash-btn-primary"
                              onClick={() => {
                                  console.log('edit:', { value })
                                  navigate(
                                      `/categories/${value}/${FORM_MODE.EDIT}`
                                  )
                              }}
                          >
                              Edit
                          </button>

                          <button
                              className="bg-red-400 px-2 py-1 ash-rounded"
                              onClick={() => {
                                  deleteCategoryWithConfirmation(value)
                              }}
                          >
                              Delete
                          </button>
                      </div>
                  ),
              },
          ]
        : []

    const columns = React.useMemo(() => [
        ...CATEGORIES_TABLE_COLUMNS,
        ...actionColumns,
    ])

    return (
        <div>
            {isAdminUser && (
                <button
                    type="submit"
                    className="ash-btn-primary mb-2 float:left md:float-right"
                    onClick={() =>
                        navigate(`/categories/null/${FORM_MODE.CREATE}`)
                    }
                >
                    Add Category
                </button>
            )}

            <ReactTable columns={columns} data={categories} />
        </div>
    )
}

export default CategoryList
