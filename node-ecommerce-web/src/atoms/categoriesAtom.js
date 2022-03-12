import { atom, useAtom } from 'jotai'
import { atomWithReducer, useReducerAtom } from 'jotai/utils'
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

export const deleteCategoriesAtom = atom(null, async (get, set, deletedId) => {
    // update DB
    await deleteCategoryById(deletedId)

    // update state
    const categories = get(categoriesAtom)
    const categoriesWithNew = categories.data.filter(
        (category) => category.id !== deletedId
    )

    set(categoriesAtom, categoriesWithNew)
})

export const categoriesReducer = (state, { type, payload }) => {
    console.log('categories reducer :>> ', JSON.stringify(state))
    const { data, success } = state
    const [categories, compute] = useAtom(rwCategoriesAtom)

    switch (type) {
        case ACTIONS.DELETE:
            compute(payload)
        case ACTIONS.EDIT:
            return {
                ...state,
                data: state.data.map((category) => {
                    if (category.id === payload.id) {
                        return payload
                    }
                    return category
                }),
            }
        default:
            return state
    }
}

// export const categoriesAtomWithReducer = atomWithReducer(async () => {
//     try {
//         const response = await fetch(URLs.CATEGORIES)
//         const data = await response.json()

//         return data
//     } catch (err) {
//         console.log(
//             `Ecommerce Web => error fetching categories: ${err.message}`
//         )
//     }
// }, categoriesReducer)

// which category id is currently acted upon
export const categoryIdAtom = atom('')
// what actions to be performed on the category
export const categoryActionAtom = atom(ACTIONS.NONE)

export const updatedCategoriesAtom = atom((get) => {
    const categoryId = get(categoryIdAtom)

    if (categoryId) {
        const action = get(categoryActionAtom)
        const categories = get(categoriesAtom)

        if (action === ACTIONS.DELETE) {
            // first, actually delete the category from DB
            deleteCategoryById(categoryId)

            // update the state of categories
            return categories.filter((category) => {
                return category.id !== categoryId
            })
        } else if (action === ACTIONS.EDIT) {
            // update the state of categories
            return categories.map((category) => {
                if (category.id === categoryId) {
                    return {
                        ...category,
                        name: 'updated category name',
                    }
                } else {
                    return category
                }
            })
        }
    } else {
        return categories
    }
})

// Helper functions
export const deleteCategoryById = async (id) => {
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
