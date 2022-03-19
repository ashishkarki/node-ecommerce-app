import { Link, NavLink } from 'react-router-dom'

import styles from './HeaderNav.module.css'

const HeaderNav = () => {
    const setActiveLinkProps = (isActive) => ({
        color: isActive ? 'green' : 'inherit',
        fontWeight: isActive ? 'bold' : 'inherit',
    })

    const createNavLink = (to, label) => (
        <NavLink
            to={to}
            className={styles.navItems}
            style={({ isActive }) => setActiveLinkProps(isActive)}
        >
            {label}
        </NavLink>
    )

    return (
        <header className="py-2 ash-bg grid grid-cols-1 md:grid-cols-2 gap-1">
            <h2 className="font-semibold text-2xl capitalize pl-4 ash-bg ash-txt">
                Node/Express e-commerce shop
            </h2>

            <nav className="md:ml-28 flex justify-around">
                {createNavLink('/', 'Home')}

                {createNavLink('/products', 'Products')}

                {createNavLink('/categories', 'Categories')}
            </nav>
        </header>
    )
}

export default HeaderNav
