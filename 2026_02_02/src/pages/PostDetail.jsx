import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import styles from './PostDetail.module.scss';

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const postRes = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
                const postData = await postRes.json();
                setPost(postData);

                const [userRes, commentsRes] = await Promise.all([
                    fetch(`https://jsonplaceholder.typicode.com/users/${postData.userId}`),
                    fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
                ]);

                const userData = await userRes.json();
                const commentsData = await commentsRes.json();

                setUser(userData);
                setComments(commentsData);
            } catch (err) {
                console.error('Błąd pobierania danych:', err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className={styles.container}>
                <p className={styles.loading}>Ładowanie...</p>
            </div>
        );
    }

    if (!post) {
        return (
            <div className={styles.container}>
                <p className={styles.loading}>Nie znaleziono posta.</p>
                <Link to="/posts" className={styles.backLink}>← Powrót do listy</Link>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <Link to="/posts" className={styles.backLink}>← Powrót do listy</Link>

            {/* Post */}
            <article className={styles.postCard}>
                <span className={styles.postId}>Post #{post.id}</span>
                <h1 className={styles.postTitle}>{post.title}</h1>
                <p className={styles.postBody}>{post.body}</p>
                <h2 className={styles.sectionTitle}>Autor</h2>
                <div className={styles.authorInfo}>
                    <div className={styles.authorDetails}>
                        <h3>{user.name}</h3>
                        <p className={styles.authorMeta}>
                            <span>{user.email}</span>
                            <span>{user.company.name}</span>
                            <span>{user.website}</span>
                        </p>
                    </div>
                </div>
            </article>

            <section className={styles.commentsSection}>
                <h2 className={styles.sectionTitle}>Komentarze ({comments.length})</h2>
                <div className={styles.commentsList}>
                    {comments.map(comment => (
                        <div key={comment.id} className={styles.commentCard}>
                            <div className={styles.commentHeader}>
                                <strong>{comment.name}</strong>
                                <span className={styles.commentEmail}>{comment.email}</span>
                            </div>
                            <p>{comment.body}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
