import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useProductStore } from '../../stores/productStore'

const ProductDetails = () => {
    // the navigation
    const navigate = useNavigate()

    // the stores
    const selectedProduct = useProductStore((state) => state.selectedProduct)

    return (
        <div>
            <header className="flex justify-between items-center ash-rounded ash-bg px-2 py-1">
                <h2 className="hidden sm:inline-block font-semibold">
                    Product Details
                </h2>

                <button
                    type="button"
                    className="bg-green-400 px-2 py-1 ash-rounded hover:ring-2"
                    onClick={() => navigate('/products')}
                >
                    Back
                </button>
            </header>

            <main>
                <div className="flex flex-col justify-between items-center space-y-3"></div>
            </main>

            <footer>
                <div className="flex justify-between items-center">
                    <h4 className="font-semibold">Add to Cart</h4>
                </div>
            </footer>
        </div>
    )
}

export default ProductDetails
