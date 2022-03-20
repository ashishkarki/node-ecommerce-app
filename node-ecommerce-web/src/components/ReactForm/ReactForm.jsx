import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router-dom'
import { FORM_MODE } from '../../../constants-web'

import styles from './ReactForm.module.css'

const ReactForm = () => {
    const { categoryId, formMode } = useParams()
    const location = useLocation()

    const { register, handleSubmit, setValue } = useForm()

    const onSubmit = (data) => {
        console.log('data :>> ', data)
    }

    useEffect(() => {
        if (categoryId && formMode) {
            if (formMode === FORM_MODE.EDIT) {
                setValue('id', categoryId)
            }
        }
        console.log(
            'ReactForm => location, categoryId :>> ',
            location,
            categoryId,
            formMode
        )
    }, [categoryId, formMode])

    return (
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="mb-0 space-y-6"
                >
                    <div>
                        <label
                            htmlFor="categoryName"
                            className="block text-sm font-medium leading-5 text-gray-700"
                        >
                            Category ID
                        </label>
                        <div className="mt-1">
                            <input
                                id="categoryName"
                                type="text"
                                placeholder={categoryId}
                                {...register('categoryName', {
                                    required: true,
                                    maxLength: 80,
                                })}
                                disabled
                                className="bg-gray-200"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="categoryName"
                            className="block text-sm font-medium leading-5 text-gray-700"
                        >
                            Category Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="categoryName"
                                type="text"
                                placeholder="Category Name"
                                {...register('categoryName', {
                                    required: true,
                                    maxLength: 80,
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="iconName"
                            className="block text-sm font-medium leading-5 text-gray-700"
                        >
                            Icon Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="iconName"
                                type="text"
                                placeholder="Icon Name"
                                {...register('iconName', {
                                    maxLength: 100,
                                })}
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            htmlFor="colorCode"
                            className="block text-sm font-medium leading-5 text-gray-700"
                        >
                            Icon Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="colorCode"
                                type="text"
                                placeholder="Color Code"
                                {...register('colorCode')}
                            />
                        </div>
                    </div>

                    <div className={styles.btnContainer}>
                        <button
                            type="submit"
                            className={`${styles.btn} ${styles.btnSubmit}`}
                        >
                            Submit
                        </button>

                        <button
                            type="submit"
                            className={`${styles.btn} ${styles.btnCancel}`}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ReactForm
