import styles from './Categories.module.scss';

export default function Categories() {
    return (
        <div className={styles.container}>
            <h1 className={styles.sectionTitle}>Przeglądaj interesujące kategorie</h1>
            <div className={styles.grid}>
                <div className={styles.card}>
                    <span className={styles.icon}>⭑</span>
                    <h3 className={styles.cardTitle}>Programowanie</h3>
                    <p className={styles.cardCount}>12 artykułów</p>
                </div>
                <div className={styles.card}>
                    <span className={styles.icon}>⭑</span>
                    <h3 className={styles.cardTitle}>Inne</h3>
                    <p className={styles.cardCount}>8 artykułów</p>
                </div>
                <div className={styles.card}>
                    <span className={styles.icon}>⭑</span>
                    <h3 className={styles.cardTitle}>Rozwój Osobisty</h3>
                    <p className={styles.cardCount}>5 artykułów</p>
                </div>
                <div className={styles.card}>
                    <span className={styles.icon}>⭑</span>
                    <h3 className={styles.cardTitle}>Innowacje</h3>
                    <p className={styles.cardCount}>3 artykuły</p>
                </div>
            </div>
        </div>
    );
}