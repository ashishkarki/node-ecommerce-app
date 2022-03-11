import { useAtom } from 'jotai'

import styles from './ProductList.module.css'
import { productsAtom } from '../../atoms/productsAtom'

const ProductList = () => {
    const [products] = useAtom(productsAtom)

    return (
        <main className={`${styles.borderRound} m-6 p-2`}>
            <h3 className="text-xl md:text-2xl bg-slate-300 text-amber-600 pl-4 py-1 rounded-lg">
                List of Products Sold
            </h3>

            <hr className="mt-2 bg-slate-300" />

            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                {products.data.map((product) => (
                    <li
                        key={product.id}
                        className="rounded-lg grid grid-cols-1 md:grid-cols-2 border-2 border-sky-600 my-2 p-2 bg-slate-100"
                    >
                        <div className="flex flex-col justify-between items-center space-y-3">
                            <h4 className="font-semibold">{product.name}</h4>

                            <p className={`${styles.subDetails} w-5/6`}>
                                <span className="text-blue-500">
                                    ${product.price}{' '}
                                </span>
                                per item
                            </p>

                            <p className={`${styles.subDetails} w-5/6`}>
                                <span className="text-blue-500">
                                    {product.countInStock}
                                </span>{' '}
                                in stock
                            </p>

                            <p
                                className={`${styles.subDetails} text-ellipsis overflow-hidden w-full cursor-pointer hover:bg-amber-600`}
                            >
                                Cat ID:{' '}
                                <span className="text-blue-500">
                                    {product.category}
                                </span>
                            </p>
                        </div>

                        {product.image && (
                            <div className="flex justify-center items-center">
                                {' '}
                                <img
                                    src={product.image.replace(
                                        ':3000/public',
                                        ':5001'
                                    )}
                                    alt={product.name}
                                    className="w-1/3 md:w-1/2 object-cover"
                                />
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </main>
    )
}

export default ProductList
