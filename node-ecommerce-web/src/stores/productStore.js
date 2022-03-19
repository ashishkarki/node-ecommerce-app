import create from 'zustand'

import { URLs } from '../../constants-web'

const useStore = create((set) => ({
    products: [],
    initProducts: async () => {
        const products = await getAllProducts()

        set((state) => ({
            ...state,
            products,
        }))
    },
}))

const getAllProducts = async () => {
    try {
        const response = await fetch(URLs.PRODUCTS)
        const data = await response.json()

        return data
    } catch (err) {
        console.log(`Ecommerce Web => error fetching products: ${err.message}`)
    }
}

export const useProductStore = useStore
