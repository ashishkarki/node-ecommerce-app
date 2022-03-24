import { URLs } from '../../constants-web'

export const addCategoryHelper = async (data) => {
    try {
        const response = await fetch(URLs.CATEGORIES, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        const newCategory = await response.json()

        return newCategory
    } catch (error) {
        console.log(`Ecommerce Web => error adding category: ${error.message}`)
    }
}

export const updateCategoryHelper = async (id, data) => {
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

export const deleteCategoryHelper = async (id) => {
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
