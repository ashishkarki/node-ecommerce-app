import styles from './ProductList.module.css'
import ProductCard from '../ProductCard/ProductCard'
import { useProductStore } from '../../stores/productStore'
import { useEffect } from 'react'

const ProductList = () => {
    const products = useProductStore((state) => state.products)
    const initProducts = useProductStore((state) => state.initProducts)

    useEffect(() => {
        initProducts()
    }, [])

    return (
        <main className="space-y-2">
            <h3 className="text-xl md:text-2xl pl-4 py-1 ash-rounded ash-bg ash-txt">
                List of Products Sold
            </h3>

            <hr className=" bg-slate-300" />

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                {products.map((product) => (
                    <ProductCard
                        product={product}
                        key={new Date() * Math.random() * Math.random()}
                    />
                ))}
            </ul>
        </main>
    )
}

export default ProductList
