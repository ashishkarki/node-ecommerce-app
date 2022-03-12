import { atom } from 'jotai'
import { URLs } from '../../constants-web'

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
