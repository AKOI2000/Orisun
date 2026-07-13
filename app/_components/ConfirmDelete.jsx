'use client';

import { useTransition } from 'react';
import toast from 'react-hot-toast';

function ConfirmDelete({ resourceName, onCloseModal, onConfirm }) {
  const [isPending, startTransition] = useTransition();

  const handleConfirm = () => {
    startTransition(async () => {
      try {
        const result = await onConfirm();
        if (result.success) {
          toast.success(`${resourceName} deleted successfully`);
          onCloseModal?.();
        } else {
          toast.error(result.error || 'Something went wrong');
        }
      } catch (error) {
        toast.error(error.message || 'Something went wrong');
      }
    });
  };

  return (
    <div className="confirm-delete">
      <h3>Delete {resourceName}</h3>

      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div className="flex">
        <button
          disabled={isPending}
          onClick={onCloseModal}
          className="btn-dashboard-tertiary"
        >
          Cancel
        </button>
        <button
          disabled={isPending}
          onClick={handleConfirm}
          className="btn-dashboard-primary"
        >
          {isPending ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;