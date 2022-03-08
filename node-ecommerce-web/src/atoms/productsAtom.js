import { atom } from 'jotai'

const URL = `/api/v1/ecommerce/products/`

export const productsAtom = atom(async () => {
    try {
        const response = await fetch(URL)
        const data = await response.json()

        return data
    } catch (err) {
        console.log(`Ecommerce Web => error fetching products: ${err.message}`)
    }
})
