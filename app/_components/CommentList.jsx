import { format } from "date-fns";

export default function CommentList({ comments }) {
  if (comments.length === 0) {
    return (
      <p className="comment-list__empty">No comments yet — be the first.</p>
    );
  }

  return (
    <ul className="comment-list">
      {comments.map((comment) => (
        <li key={comment.id} className="comment-list__item">
          <div className="comment-list__meta">
            <span className="comment-list__name">{comment.name}</span>
            <time className="comment-list__date">
              {/* {new Date(comment.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })} */}

              {format(comment.createdAt, "mmm d yyyy")}
            </time>
          </div>
          <p className="comment-list__content">{comment.content}</p>
        </li>
      ))}
    </ul>
  );
}
