"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { createPostAction } from "../_lib/post-actions";

export default function NewPostForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    startTransition(async () => {
      try {
        await createPostAction(formData);
        // createPostAction redirects on success, so this only
        // runs if it returned early (e.g. empty title).
        toast.error("Title is required.");
      } catch (error) {
        // Next.js redirects throw internally - let that pass through
        // rather than treating it as a real failure.
        if (error?.digest?.startsWith("NEXT_REDIRECT")) throw error;
        toast.error("Something went wrong creating the post.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="new-post-form">
      <input type="text" name="title" placeholder="New post title" required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating…" : "Create post"}
      </button>
    </form>
  );
}
