import { Route, Routes } from 'react-router-dom'

import './App.css'
import HeaderNav from './components/HeaderNav/HeaderNav'
import Home from './components/Home/Home'
import ProductDetails from './components/ProductDetails/ProductDetails'
import ProductList from './components/ProductList/ProductList'

function App() {
    return (
        <div className="font-mono mt-6 space-y-3">
            <div className="ash-border ash-rounded mx-6">
                <HeaderNav />
            </div>

            <div className="ash-border ash-rounded mx-6 p-2">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<ProductList />} />
                    <Route
                        path="/products/:productId"
                        element={<ProductDetails />}
                    />
                    <Route
                        path="*"
                        element={<p>There's nothing here: 404!</p>}
                    />
                </Routes>
            </div>
        </div>
    )
}

export default App
