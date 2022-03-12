import { atom } from 'jotai'
import { URLs } from '../../constants-web'

export const productsAtom = atom(async () => {
    try {
        const response = await fetch(URLs.PRODUCTS)
        const data = await response.json()

        return data
    } catch (err) {
        console.log(`Ecommerce Web => error fetching products: ${err.message}`)
    }
})
