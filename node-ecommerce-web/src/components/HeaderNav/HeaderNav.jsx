import styles from './HeaderNav.module.css'

const HeaderNav = () => {
    return (
        <header className="border border-sky-600 m-6 py-2 bg-slate-300 grid grid-cols-1 md:grid-cols-2 gap-1">
            <h2 className="font-semibold text-2xl capitalize pl-4">
                Node/Express e-commerce shop
            </h2>

            <nav className="md:ml-28 flex justify-evenly">
                <a href="/" className={styles.navItems}>
                    Home
                </a>
                <a href="/products" className={styles.navItems}>
                    Products
                </a>
            </nav>
        </header>
    )
}

export default HeaderNav
