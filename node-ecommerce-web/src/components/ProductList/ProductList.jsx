import { useAtom } from 'jotai'
import { productsAtom } from '../../atoms/productsAtom'

const ProductList = () => {
    const [products] = useAtom(productsAtom)

    return (
        <main className="border border-sky-600 m-8">
            <h3>Products</h3>
            <ul>
                {products.data.map((product) => (
                    <li key={product._id}>
                        <h4>{product.name}</h4>
                        <img
                            src={product.image.replace(':3000/public', ':5001')}
                            alt={product.name}
                        />
                        <p>{product.countInStock} in stock</p>
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default ProductList
