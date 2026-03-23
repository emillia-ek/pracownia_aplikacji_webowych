import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styles from './PostDetail.module.scss';

export default function PostDetail() {
    const { id } = useParams();

    const { data: post, isLoading: postLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then(res => res.json())
    });

    const { data: user, isLoading: userLoading } = useQuery({
        queryKey: ['user', post?.userId],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/users/${post.userId}`).then(res => res.json()),
        enabled: !!post?.userId
    });

    const { data: comments = [], isLoading: commentsLoading } = useQuery({
        queryKey: ['comments', id],
        queryFn: () => fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(res => res.json())
    });

    const isLoading = postLoading || userLoading || commentsLoading;

    if (isLoading) return <div className={styles.container}><p className={styles.loading}>Ładowanie...</p></div>;
    if (!post) return <div className={styles.container}><p>Nie znaleziono posta.</p></div>;

    return (
        <div className={styles.container}>
            <Link to="/posts" className={styles.backLink}>← Powrót do listy</Link>

            <article className={styles.postCard}>
                <span className={styles.postId}>Post #{post.id}</span>
                <h1 className={styles.postTitle}>{post.title}</h1>
                <p className={styles.postBody}>{post.body}</p>

                {user && (
                    <div className={styles.authorInfo}>
                        <h2 className={styles.sectionTitle}>Autor</h2>
                        <h3>{user.name}</h3>
                        <p className={styles.authorMeta}>{user.email} | {user.company?.name}</p>
                    </div>
                )}
            </article>

            <section className={styles.commentsSection}>
                <h2 className={styles.sectionTitle}>Komentarze ({comments.length})</h2>
                <div className={styles.commentsList}>
                    {comments.map(comment => (
                        <div key={comment.id} className={styles.commentCard}>
                            <strong>{comment.name}</strong>
                            <p>{comment.body}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}