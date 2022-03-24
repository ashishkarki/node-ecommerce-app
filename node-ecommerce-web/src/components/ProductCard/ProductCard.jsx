import React from 'react'
import { useNavigate } from 'react-router-dom'

import styles from './ProductCard.module.css'

const ProductCard = ({ product }) => {
    const navigate = useNavigate()

    return (
        <li
            className="ash-rounded ash-border grid grid-cols-1 md:grid-cols-2 my-2 p-2 bg-slate-100 hover:cursor-pointer hover:ring-2 hover:ash-border-thick"
            onClick={() => navigate(`/products/${product.id}`)}
        >
            <div className="flex flex-col justify-between items-center space-y-3">
                <h4 className="font-semibold">{product.name}</h4>

                <p className={`${styles.subDetails} w-5/6`}>
                    <span className="ash-txt-highlight">${product.price} </span>
                    per item
                </p>

                <p className={`${styles.subDetails} w-5/6`}>
                    <span className="ash-txt-highlight">
                        {product.countInStock}
                    </span>{' '}
                    in stock
                </p>

                <p
                    className={`${styles.subDetails} text-ellipsis overflow-hidden w-full`}
                >
                    Cat ID:{' '}
                    <span className="ash-txt-highlight">
                        {product.category}
                    </span>
                </p>
            </div>

            {product.image && (
                <div className="flex justify-center items-center">
                    <img
                        src={product.image.replace(':3000/public', ':5001')}
                        alt={product.name}
                        className="w-1/3 md:w-1/2 object-cover"
                    />
                </div>
            )}
        </li>
    )
}

export default ProductCard
