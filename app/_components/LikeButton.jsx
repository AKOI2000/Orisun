'use client';

import { useState, useTransition } from 'react';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi2';
import { toggleLikeAction } from '@/app/_lib/likesCommentsAction';

export default function LikeButton({ postId, initialLiked, initialCount }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    // Optimistic update - flip the UI immediately, don't wait on the
    // server round trip for something this small to feel instant.
    const nextLiked = !liked;
    const previousLiked = liked;
    const previousCount = count;

    setLiked(nextLiked);
    setCount((c) => c + (nextLiked ? 1 : -1));

    startTransition(async () => {
      try {
        const result = await toggleLikeAction(postId);
        setLiked(result.liked);
        setCount(result.count);
      } catch {
        // Revert if the server call actually failed.
        setLiked(previousLiked);
        setCount(previousCount);
      }
    });
  }

  return (
    <button
      type="button"
      className={`like-button ${liked ? 'like-button--active' : ''}`}
      onClick={handleClick}
      disabled={isPending}
      aria-pressed={liked}
    >
      {liked ? <HiHeart /> : <HiOutlineHeart />}
      <span>{count}</span>
    </button>
  );
}