import create from 'zustand'

import { URLs } from '../../constants-web'

const deleteCategory = async (id) => {
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

const useStore = create((set) => ({
    categories: [],
    initCategories: async () => {
        const response = await fetch(URLs.CATEGORIES)
        const data = await response.json()

        set((state) => ({
            ...state,
            categories: data,
        }))
    },

    addCategory: (category) => {
        set((state) => ({
            categories: [...state.categories, category],
        }))
    },

    deleteCategory: async (id) => {
        const response = await deleteCategory(id)
        console.log('deleted data :>> ', response)

        set((state) => ({
            categories: state.categories.filter(
                (category) => category.id !== id
            ),
        }))
    },
}))

export const useCategoryStore = useStore
