import { Route, Routes } from 'react-router-dom'

import CategoryList from './components/CategoryList/CategoryList'
import Home from './components/Home/Home'
import ProductDetails from './components/ProductDetails/ProductDetails'
import ProductList from './components/ProductList/ProductList'
import CategoryReactForm from './components/ReactForm/CategoryReactForm'

const Routing = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />

            {/* Products */}
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/:productId" element={<ProductDetails />} />

            {/* Categories */}
            <Route path="/categories" element={<CategoryList />} />
            <Route
                path="/categories/:categoryId/:formMode"
                element={<CategoryReactForm />}
            />

            <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
    )
}

export default Routing
