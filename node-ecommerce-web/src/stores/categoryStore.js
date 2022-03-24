import create from 'zustand'

import { URLs } from '../../constants-web'
import {
    addCategoryHelper,
    deleteCategoryHelper,
    updateCategoryHelper,
} from '../services/category.service'

const useStore = create((set) => ({
    categories: [],

    selectedCategory: null,
    setSelectedCategory: (category) =>
        set((state) => ({
            ...state,
            selectedCategory: category,
        })),

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

    addCategory: async (category) => {
        const newCategory = await addCategoryHelper(category)

        set((state) => ({
            categories: [...state.categories, newCategory],
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

    deleteCategory: async (id) => {
        const response = await deleteCategoryHelper(id)
        console.log('deleted data :>> ', response)

        set((state) => ({
            categories: state.categories.filter(
                (category) => category.id !== id
            ),
        }))
    },
}))

export const useCategoryStore = useStore
