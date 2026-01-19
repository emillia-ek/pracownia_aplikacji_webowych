import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.scss';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Milka</div>
            <ul>
                <li><NavLink to="/" className={({isActive}) => isActive ? styles.active : ""}>Strona główna</NavLink></li>
                <li><NavLink to="/categories" className={({isActive}) => isActive ? styles.active : ""}>Kategorie</NavLink></li>
                <li><NavLink to="/posts" className={({isActive}) => isActive ? styles.active : ""}>Wpisy</NavLink></li>
            </ul>
        </nav>
    );
}