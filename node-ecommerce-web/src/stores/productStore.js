import create from 'zustand'
import { getAllProducts, getProductById } from '../services/product.service'

const useStore = create((set) => ({
    products: [],
    selectedProduct: null,

    initProducts: async () => {
        const products = await getAllProducts()

        set((state) => ({
            ...state,
            products,
        }))
    },

    getProductById: async (id) => {
        const selectedProduct = await getProductById(id)

        await set((state) => ({
            ...state,
            selectedProduct,
        }))
    },
}))

export const useProductStore = useStore
