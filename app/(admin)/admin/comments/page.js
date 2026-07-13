import { getPendingComments } from '@/lib/comments';
import CommentRow from '@/app/_components/CommentRow';

export default async function CommentsPage() {
  const comments = await getPendingComments();

  return (
    <div className="admin-comments">
      <h1>Pending comments</h1>

      {comments.length === 0 && <p>Nothing waiting on you — all caught up.</p>}

      <ul className="admin-comments__list">
        {comments.map((comment) => (
          <CommentRow key={comment.id} comment={comment} />
        ))}
      </ul>
    </div>
  );
}