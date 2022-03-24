import create from 'zustand'

import { URLs } from '../../constants-web'

const deleteCategoryHelper = async (id) => {
    try {
        const response = await fetch(`${URLs.CATEGORIES}${id}`, {
            method: 'DELETE',
        })
        const data = await response.json()

        return data
    } catch (error) {
        console.log(
            `Ecommerce Web => error deleting category: ${error.message}`
        )
    }
}

const updateCategoryHelper = async (id, data) => {
    try {
        const response = await fetch(`${URLs.CATEGORIES}${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const updatedCategory = await response.json()

        return updatedCategory
    } catch (error) {
        console.log(
            `Ecommerce Web => error updating category: ${error.message}`
        )
    }
}

const useStore = create((set) => ({
    categories: [],
    selectedCategory: null,

    initCategories: async () => {
        const response = await fetch(URLs.CATEGORIES)
        const data = await response.json()

        set((state) => ({
            ...state,
            categories: data,
        }))
    },

    getCategoryById: async (id) => {
        const response = await fetch(`${URLs.CATEGORIES}${id}`)
        const category = await response.json()

        await set((state) => ({
            ...state,
            selectedCategory: category,
        }))
    },

    addCategory: (category) => {
        set((state) => ({
            categories: [...state.categories, category],
        }))
    },

    deleteCategory: async (id) => {
        const response = await deleteCategoryHelper(id)
        console.log('deleted data :>> ', response)

        set((state) => ({
            categories: state.categories.filter(
                (category) => category.id !== id
            ),
        }))
    },

    updateCategory: async (id, categoryToUpdate) => {
        const finallyUpdatedCat = await updateCategoryHelper(
            id,
            categoryToUpdate
        )
        console.log('updated data :>> ', finallyUpdatedCat)

        set((state) => ({
            categories: state.categories.map((category) =>
                category.id === id ? finallyUpdatedCat : category
            ),
        }))
    },
}))

export const useCategoryStore = useStore
