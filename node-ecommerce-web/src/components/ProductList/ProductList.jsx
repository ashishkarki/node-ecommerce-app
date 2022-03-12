import { useAtom } from 'jotai'

import styles from './ProductList.module.css'
import { productsAtom } from '../../atoms/productsAtom'
import ProductCard from '../ProductCard/ProductCard'

const ProductList = () => {
    const [products] = useAtom(productsAtom)

    return (
        <main className="space-y-2">
            <h3 className="text-xl md:text-2xl pl-4 py-1 ash-rounded ash-bg ash-txt">
                List of Products Sold
            </h3>

            <hr className=" bg-slate-300" />

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                {products.data.map((product) => (
                    <ProductCard product={product} key={product.id} />
                ))}
            </ul>
        </main>
    )
}

export default ProductList
