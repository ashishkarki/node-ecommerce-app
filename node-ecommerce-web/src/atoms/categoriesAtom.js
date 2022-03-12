import { atom } from 'jotai'
import { ACTIONS, URLs } from '../../constants-web'

export const categoriesAtom = atom(async () => {
    try {
        const response = await fetch(URLs.CATEGORIES)
        const data = await response.json()

        return data
    } catch (err) {
        console.log(
            `Ecommerce Web => error fetching categories: ${err.message}`
        )
    }
})

export const deleteCategoryAtom = atom(
    // (get) => get(categoriesAtom),
    null,
    async (get, set, deletedId) => {
        const categories = await get(categoriesAtom)
        const response = await deleteCategory(deletedId)
        console.log(response)
        // set(categoriesAtom, [
        //     ...categories.data.filter((category) => category.id !== deletedId),
        // ])
    }
)

// Helper functions
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

const updateCategory = async (id, data) => {
    try {
    } catch (error) {
        console.log(
            `Ecommerce Web => error updating category: ${error.message}`
        )
    }
}
