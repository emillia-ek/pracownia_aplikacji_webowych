import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import styles from './PostDetail.module.scss';
import { API_URL } from '../api';

export default function PostDetail() {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [commentContent, setCommentContent] = useState('');

    const { data: post, isLoading: postLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetch(`${API_URL}/posts/${id}`).then(res => res.json())
    });

    const addCommentMutation = useMutation({
        mutationFn: (content) =>
            fetch(`${API_URL}/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, postId: Number(id) }),
            }).then(res => res.json()),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['post', id] });
            setCommentContent('');
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (commentContent.trim()) {
            addCommentMutation.mutate(commentContent.trim());
        }
    };

    if (postLoading) return <div className={styles.container}><p className={styles.loading}>Ładowanie...</p></div>;
    if (!post) return <div className={styles.container}><p>Nie znaleziono posta.</p></div>;

    return (
        <div className={styles.container}>
            <Link to="/posts" className={styles.backLink}>← Powrót do listy</Link>

            <article className={styles.postCard}>
                <span className={styles.postId}>Post #{post.id}</span>
                <h1 className={styles.postTitle}>{post.title}</h1>
                <p className={styles.postBody}>{post.content}</p>

                {post.category && (
                    <div className={styles.authorInfo}>
                        <h2 className={styles.sectionTitle}>Kategoria</h2>
                        <h3>{post.category.name}</h3>
                    </div>
                )}
            </article>

            <section className={styles.commentsSection}>
                <h2 className={styles.sectionTitle}>Komentarze ({post.comments ? post.comments.length : 0})</h2>

                <form className={styles.commentForm} onSubmit={handleSubmit}>
                    <textarea
                        className={styles.commentInput}
                        placeholder="Napisz komentarz..."
                        value={commentContent}
                        onChange={(e) => setCommentContent(e.target.value)}
                        rows={3}
                        required
                    />
                    <button
                        type="submit"
                        className={styles.commentSubmit}
                        disabled={addCommentMutation.isPending || !commentContent.trim()}
                    >
                        {addCommentMutation.isPending ? 'Wysyłanie...' : 'Dodaj komentarz'}
                    </button>
                    {addCommentMutation.isError && (
                        <p className={styles.commentError}>Nie udało się dodać komentarza. Spróbuj ponownie.</p>
                    )}
                </form>

                <div className={styles.commentsList}>
                    {post.comments && post.comments.map(comment => (
                        <div key={comment.id} className={styles.commentCard}>
                            <p>{comment.content}</p>
                            <small>{new Date(comment.createdAt).toLocaleDateString('pl-PL')}</small>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}