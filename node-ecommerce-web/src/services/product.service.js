import { URLs } from '../../constants-web'

export const getAllProducts = async () => {
    try {
        const response = await fetch(URLs.PRODUCTS)
        const data = await response.json()

        return data
    } catch (err) {
        console.log(`Ecommerce Web => error fetching products: ${err.message}`)
    }
}

export const getProductById = async (id) => {
    try {
        const response = await fetch(`${URLs.PRODUCTS}/${id}`)
        const selectedProduct = await response.json()

        return selectedProduct
    } catch (err) {
        console.log(`Ecommerce Web => error fetching product: ${err.message}`)
    }
}
