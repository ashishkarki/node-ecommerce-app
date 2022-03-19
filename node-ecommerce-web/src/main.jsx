import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import './index.css'
import LoadingState from './components/LoadingState/LoadingState'

const LazyAppComponent = React.lazy(() => import('./App'))

ReactDOM.render(
    // <React.StrictMode>
    <Router>
        <React.Suspense fallback={<LoadingState />}>
            <LazyAppComponent />
        </React.Suspense>
    </Router>,
    // </React.StrictMode>,
    document.getElementById('root')
)
