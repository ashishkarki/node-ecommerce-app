import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'jotai'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import App from './App'
import LoadingState from './components/LoadingState/LoadingState'

ReactDOM.render(
    // <React.StrictMode>
    <Router>
        <Provider>
            <React.Suspense fallback={<LoadingState />}>
                <App />
            </React.Suspense>
        </Provider>
    </Router>,
    // </React.StrictMode>,
    document.getElementById('root')
)
