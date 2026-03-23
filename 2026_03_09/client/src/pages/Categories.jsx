import styles from './Categories.module.scss';
import { useQuery } from '@tanstack/react-query';
import { API_URL } from '../api';

export default function Categories() {
    const { data: categories = [], isLoading, isError } = useQuery({
        queryKey: ['categories'],
        queryFn: () => fetch(`${API_URL}/categories`).then(res => res.json()),
    });

    if (isLoading) {
        return (
            <div className={styles.container}>
                <h1 className={styles.sectionTitle}>Przeglądaj interesujące kategorie</h1>
                <p>Ładowanie kategorii...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className={styles.container}>
                <h1 className={styles.sectionTitle}>Przeglądaj interesujące kategorie</h1>
                <p>Błąd ładowania kategorii. Sprawdź czy serwer działa.</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.sectionTitle}>Przeglądaj interesujące kategorie</h1>
            <div className={styles.grid}>
                {categories.map(category => (
                    <div key={category.id} className={styles.card}>
                        <span className={styles.icon}>⭑</span>
                        <h3 className={styles.cardTitle}>{category.name}</h3>
                        <p className={styles.cardCount}>{category.posts ? category.posts.length : 0} artykułów</p>
                    </div>
                ))}
            </div>
        </div>
    );
}