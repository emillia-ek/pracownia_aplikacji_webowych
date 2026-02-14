import { Link } from 'react-router-dom';
import styles from './Home.module.scss';

export default function Home() {
    return (
        <div className={styles.heroSection}>
            <h1 className={styles.title}>Aplikacja blogowa</h1>
            <p className={styles.subtitle}>
                Zobacz najnowsze wpisy!
            </p>
            <Link to="/posts" className={styles.ctaButton}>
                Przejdź do Wpisów
            </Link>
        </div>
    );
}