import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { CATEGORIES_TABLE_COLUMNS, FORM_MODE } from '../../../constants-web'
import { useCategoryStore } from '../../stores/categoryStore'

import styles from './CategoryReactForm.module.css'

const CategoryReactForm = () => {
    // router related
    const { categoryId, formMode } = useParams()
    const navigate = useNavigate()

    // react hooks form related
    const { register, handleSubmit, setValue, formState } = useForm()

    // zustand state related
    const getCategoryById = useCategoryStore((state) => state.getCategoryById)
    const selectedCategory = useCategoryStore((state) => state.selectedCategory)
    const setSelectedCategory = useCategoryStore(
        (state) => state.setSelectedCategory
    )
    const addCategory = useCategoryStore((state) => state.addCategory)
    const updateCategory = useCategoryStore((state) => state.updateCategory)

    // get field names (from Db) for the columns of category table
    const categoryFields = CATEGORIES_TABLE_COLUMNS.map(
        (column) => column.accessor
    )

    const goBackToCategoryForm = () => {
        navigate('/categories')
    }

    const onSubmit = async (categoryFromForm) => {
        console.log(`edit or create: ${formMode}`)

        if (formMode === FORM_MODE.EDIT) {
            await updateCategory(categoryId, categoryFromForm)
        } else {
            // everything else will be considered as create
            await addCategory(categoryFromForm)
        }

        // reset selectedCategory if set
        if (selectedCategory) {
            setSelectedCategory(null)
        }

        // go back to categoryList table
        goBackToCategoryForm()
    }

    useEffect(() => {
        if (categoryId && formMode && formMode === FORM_MODE.EDIT) {
            getCategoryById(categoryId)
        }
    }, [])

    useEffect(() => {
        if (selectedCategory) {
            categoryFields.forEach((field) => {
                setValue(field, selectedCategory[field])
            })
        } else {
            categoryFields.forEach((field) => {
                setValue(field, '')
            })
        }
    }, [selectedCategory])

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-slate-100 py-8 px-6 shadow rounded-lg sm:px-8">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mb-0 space-y-6"
                >
                    <h2>
                        {formMode === FORM_MODE.EDIT ? (
                            <div>
                                Edit Category for ID:{' '}
                                <span className="ash-txt-highlight">
                                    {categoryId}
                                </span>
                            </div>
                        ) : (
                            'Add Category'
                        )}
                    </h2>

                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-5 text-gray-700"
                        >
                            Category Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="name"
                                type="text"
                                placeholder="Category Name"
                                {...register('name', {
                                    required: true,
                                    maxLength: 80,
                                })}
                                autoFocus
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="icon"
                            className="block text-sm font-medium leading-5 text-gray-700"
                        >
                            Icon Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="icon"
                                type="text"
                                placeholder="Icon Name"
                                {...register('icon', {
                                    maxLength: 100,
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="color"
                            className="block text-sm font-medium leading-5 text-gray-700"
                        >
                            Icon Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="color"
                                type="text"
                                placeholder="Color Code"
                                {...register('color')}
                            />
                        </div>
                    </div>

                    <div className={styles.btnContainer}>
                        <button
                            type="submit"
                            className={`${styles.btn} ${styles.btnSubmit}`}
                            disabled={formState.isSubmitting}
                        >
                            {formState.isSubmitting && (
                                <span
                                    className="animate-spin inline-block w-8 h-8 border-4 rounded-full"
                                    role="status"
                                ></span>
                            )}
                            Submit
                        </button>

                        <button
                            type="button"
                            className={`${styles.btn} ${styles.btnCancel}`}
                            onClick={() => goBackToCategoryForm()}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CategoryReactForm
