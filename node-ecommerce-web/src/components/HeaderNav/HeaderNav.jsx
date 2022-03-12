import { Link } from 'react-router-dom'

import styles from './HeaderNav.module.css'

const HeaderNav = () => {
    return (
        <header className="py-2 ash-bg grid grid-cols-1 md:grid-cols-2 gap-1">
            <h2 className="font-semibold text-2xl capitalize pl-4 ash-bg ash-txt">
                Node/Express e-commerce shop
            </h2>

            <nav className="md:ml-28 flex justify-around">
                <Link to="/" className={styles.navItems}>
                    Home
                </Link>

                <Link to="/products" className={styles.navItems}>
                    Products
                </Link>

                <Link to="/categories" className={styles.navItems}>
                    Categories
                </Link>
            </nav>
        </header>
    )
}

export default HeaderNav
