import { Link } from 'react-router-dom';
import styles from './Posts.module.scss';
import { useQuery } from '@tanstack/react-query';

export default function Posts() {
    const { data: posts = [], isLoading, isError } = useQuery({
        queryKey: ['posts'],
        queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json()),
    });

    if (isLoading) {
        return (
            <div className={styles.container}>
                <h1 className={styles.mainTitle}>Wpisy</h1>
                <p className={styles.loading}>Ładowanie postów...</p>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.mainTitle}>Wpisy</h1>

            <div className={styles.feed}>
                {posts.map(post => (
                    <Link to={`/posts/${post.id}`} key={post.id} className={styles.cardLink}>
                        <article className={styles.glassCard}>
                            <span className={styles.postId}>#{post.id}</span>
                            <h2>{post.title}</h2>
                            <p>{post.body.length > 100 ? post.body.slice(0, 100) + '...' : post.body}</p>
                            <span className={styles.readMore}>Czytaj więcej →</span>
                        </article>
                    </Link>
                ))}
            </div>
        </div>
    );
}