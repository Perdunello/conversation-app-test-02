import styles from './Header.module.scss'

const Header = ({mainCurrency}) => {
    return <div className={styles.mainWrapper}>
        {/*<div>created by Vlad Hrytsyshyn</div>*/}
        <div className={styles.centring}>
            <div className={styles.login}>
                <button>Login</button>
            </div>
            <div className={styles.mainRates}>{mainCurrency.map(item => {
                return <div key={item.r030}>{item.cc} - <span className={styles.rate}>{item.rate} ₴</span></div>
            })}</div>
        </div>
    </div>
}

export default Header