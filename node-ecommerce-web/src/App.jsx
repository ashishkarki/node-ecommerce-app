import { Route, Routes } from 'react-router-dom'

import './App.css'
import HeaderNav from './components/HeaderNav/HeaderNav'
import Home from './components/Home/Home'
import ProductDetails from './components/ProductDetails/ProductDetails'
import ProductList from './components/ProductList/ProductList'

function App() {
    return (
        <div className="font-mono">
            <HeaderNav />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route
                    path="/products/:productId"
                    element={<ProductDetails />}
                />
                <Route path="*" element={<p>There's nothing here: 404!</p>} />
            </Routes>
        </div>
    )
}

export default App
