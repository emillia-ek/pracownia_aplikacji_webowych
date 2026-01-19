import styles from './Posts.module.scss';

export default function Posts() {
    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Wpisy</h1>

            <div className={styles.feed}>
                <article className={styles.glassCard}>
                    <span className={styles.date}>19 stycznia 2026</span>
                    <h2>Tytuł posta</h2>
                    <p>Super fajny post ktory jest mega dobrze napisany.</p>
                </article>
            </div>
        </div>
    );
}