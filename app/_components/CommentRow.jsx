'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import Link from 'next/link';
import Modal from '@/app/_components/Modal';
import ConfirmDelete from '@/app/_components/ConfirmDelete';
import { approveCommentAction, deleteCommentAction } from '@/app/_lib/likesCommentsAction';

export default function CommentRow({ comment }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleApprove() {
    startTransition(async () => {
      const result = await approveCommentAction(comment.id);
      if (result.success) {
        toast.success('Comment approved');
        router.refresh();
      } else {
        toast.error(result.error);
      }
    });
  }

  async function handleDeleteConfirm() {
    const result = await deleteCommentAction(comment.id);
    if (result.success) router.refresh();
    return result;
  }

  return (
    <li className="comment-row">
      <div className="comment-row__meta">
        <span className="comment-row__name">{comment.name}</span>
        <span className="comment-row__email">{comment.email}</span>
        <time className="comment-row__date">
          {new Date(comment.createdAt).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}
        </time>
      </div>

      <p className="comment-row__content">{comment.content}</p>

      <Link href={`/thoughts/${comment.post.slug}`} target="_blank" className="comment-row__post-link">
        On: {comment.post.title}
      </Link>

      <div className="comment-row__actions">
        <button type="button" onClick={handleApprove} disabled={isPending}>
          {isPending ? 'Approving…' : 'Approve'}
        </button>

        <Modal>
          <Modal.Open opens="delete-comment">
            <button type="button" className="btn-dashboard-tertiary">
              Delete
            </button>
          </Modal.Open>
          <Modal.Window name="delete-comment">
            <ConfirmDelete resourceName="comment" onConfirm={handleDeleteConfirm} />
          </Modal.Window>
        </Modal>
      </div>
    </li>
  );
}