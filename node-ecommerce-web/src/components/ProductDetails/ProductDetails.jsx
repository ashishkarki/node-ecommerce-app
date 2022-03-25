import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useOrderStore } from '../../stores/orderStore'
import { useProductStore } from '../../stores/productStore'
import { useUserStore } from '../../stores/userStore'

const ProductDetails = () => {
    // the navigation
    const navigate = useNavigate()
    const { productId } = useParams()

    // the stores
    const getProductById = useProductStore((state) => state.getProductById)
    const selectedProduct = useProductStore((state) => state.selectedProduct)
    const user = useUserStore((state) => state.user)
    const saveOrder = useOrderStore((state) => state.saveOrder)

    // local state
    const DEFAULT_ORDER_QUANTITY = 1
    const [quantity, setQuantity] = useState(DEFAULT_ORDER_QUANTITY)

    useEffect(() => {
        getProductById(productId)
    }, [])

    return (
        <div>
            <header className="flex justify-between items-center ash-rounded ash-bg px-2 py-1.5">
                <h2 className="hidden sm:inline-block font-semibold">
                    Product Details
                </h2>

                <button
                    type="button"
                    className="ash-btn-primary"
                    onClick={() => navigate('/products')}
                >
                    Back
                </button>
            </header>

            <main>
                {!selectedProduct ? (
                    <div>Loading...</div>
                ) : (
                    <div className="space-y-3">
                        <div>Name: {selectedProduct.name}</div>
                        <div>Description: {selectedProduct.description}</div>
                        <div>Brand: {selectedProduct.brand}</div>
                        <div>Price: {selectedProduct.price}</div>
                        <div>Category: {selectedProduct.price}</div>
                        <div>Stock: {selectedProduct.countInStock}</div>
                        <div>Rating: {selectedProduct.rating}</div>
                        <div>Total Reviews: {selectedProduct.numReviews}</div>
                        <div>Is Featured: {selectedProduct.isFeatured}</div>
                    </div>
                )}
            </main>

            <footer className="mt-3 px-2 py-1.5 space-x-2 flex justify-end ash-bg ash-rounded">
                <input
                    type="number"
                    name="order"
                    className="w-1/6"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                />

                <button
                    type="button"
                    className="ash-btn-primary"
                    onClick={() =>
                        saveOrder({
                            userEmail: user.email,
                            product: {
                                id: selectedProduct.id,
                                name: selectedProduct.name,
                                price: selectedProduct.price,
                                quantity: quantity,
                            },
                        })
                    }
                >
                    Add to Cart
                </button>
            </footer>
        </div>
    )
}

export default ProductDetails
