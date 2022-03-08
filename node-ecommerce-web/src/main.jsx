import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Provider } from 'jotai'
import LoadingState from './components/LoadingState/LoadingState'

ReactDOM.render(
    <React.StrictMode>
        <Provider>
            <React.Suspense fallback={<LoadingState />}>
                <App />
            </React.Suspense>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
