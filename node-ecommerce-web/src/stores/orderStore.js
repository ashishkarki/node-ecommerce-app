import create from 'zustand'
import { getAllOrders } from '../services/order.service'

const useStore = create((set) => ({
    orders: [
        {
            /**
            "id": "5e9f9b8f-f8c4-4f7f-b8e8-f8f8f8f8f8f8", // auto by "email": "user@email.com",
            "products": [
                {
                    "id": "cbbcytu-f8c4-4f7f-b8e8-f8f8f8f8f8f8",
                    "name": "Product 1",
                    "price": 100,
                    "quantity": 1
                },
                {
                    "id": "3gfr45t-f8c4-4f7f-b8e8-azazazazazaz",
                    "name": "Product 2",
                    "price": 500,
                    "quantity": 5
                }
            ]

         */
        },
    ],

    saveOrder: async (order) => {
        // TODO: save order to database and make fxn async

        // see if this user already has a cart
        const existingOrders = await getAllOrders()
        const existingOrder = existingOrders.find(
            (o) => o.email === order.userEmail
        )

        if (existingOrder) {
            // add to existing order
            const updatedOrderForThisUser = {
                ...existingOrder,
                // todo check if this product already exists in the order
                products: [...existingOrder.products, order.product],
            }

            // save new order
            await set((state) => ({
                ...state,
                orders: [...state.orders, updatedOrderForThisUser],
            }))
        } else {
            // create new order
            const newOrderForThisUser = {
                email: order.userEmail,
                products: [
                    {
                        id: order.product.id,
                        name: order.product.name,
                        price: order.product.price,
                        quantity: order.product.quantity,
                    },
                ],
            }

            // save new order
            await set((state) => ({
                ...state,
                orders: [...state.orders, newOrderForThisUser],
            }))
        }

        console.log(`current order object: ${JSON.stringify(order)}`)
    },
}))

export const useOrderStore = useStore
