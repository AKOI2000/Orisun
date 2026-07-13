"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { submitCommentAction } from "@/app/_lib/likesCommentsAction";

export default function CommentForm({ postId }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isPending, startTransition] = useTransition();

  function onSubmit(data) {
    startTransition(async () => {
      try {
        await submitCommentAction(postId, data);
        toast.success("Comment sent — it'll appear once approved.");
        reset();
      } catch {
        toast.error("Something went wrong. Try again.");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="comment-form" noValidate>
      <div className="comment-form__row">
        <input
          type="text"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        {errors.name && (
          <span className="comment-form__error">{errors.name.message}</span>
        )}
      </div>

      <div className="comment-form__row">
        <input
          type="email"
          placeholder="Email (not published)"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          })}
        />
        {errors.email && (
          <span className="comment-form__error">{errors.email.message}</span>
        )}
      </div>

      <div className="comment-form__row">
        <textarea
          rows={4}
          placeholder="Say something…"
          {...register("content", {
            required: "Comment cannot be empty",
            minLength: { value: 2, message: "Say a little more than that" },
          })}
        />
        {errors.content && (
          <span className="comment-form__error">{errors.content.message}</span>
        )}
      </div>

      <button type="submit" disabled={isPending}>
        {isPending ? "Sending…" : "Post comment"}
      </button>
    </form>
  );
}
