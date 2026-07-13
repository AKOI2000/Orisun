'use client';

import { useRouter } from 'next/navigation';
import Modal from '@/app/_components/Modal';
import ConfirmDelete from '@/app/_components/ConfirmDelete';
import { deletePostAction } from '../_lib/post-actions';

// afterDelete: 'refresh' (stay on the list, just re-fetch it) or
// 'redirect' (the post's own page no longer exists - navigate away)
export default function DeletePostButton({ postId, afterDelete = 'refresh' }) {
  const router = useRouter();

  async function handleConfirm() {
    const result = await deletePostAction(postId);

    if (result.success) {
      if (afterDelete === 'redirect') {
        router.push('/admin');
      } else {
        router.refresh();
      }
    }

    return result;
  }

  return (
    <Modal>
      <Modal.Open opens="delete-post">
        <button type="button" className="btn-dashboard-tertiary">
          Delete
        </button>
      </Modal.Open>
      <Modal.Window name="delete-post">
        <ConfirmDelete resourceName="post" onConfirm={handleConfirm} />
      </Modal.Window>
    </Modal>
  );
}