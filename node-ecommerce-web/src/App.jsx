import './App.css'
import HeaderNav from './components/HeaderNav/HeaderNav'
import Routing from './Routing'

function App() {
    return (
        <div className="font-mono mt-6 space-y-3">
            <div className="ash-border ash-rounded mx-6">
                <HeaderNav />
            </div>

            <div className="ash-border ash-rounded mx-6 p-2">
                <Routing />
            </div>
        </div>
    )
}

export default App
