// app/_components/LikeSection.jsx
import { readFingerprint } from "@/app/_lib/fingerprint";
import { hasLiked } from "@/lib/likes";
import LikeButton from "@/app/_components/LikeButton";

export default async function LikeSection({ postId, likeCount }) {
  const fingerprint = await readFingerprint();
  const liked = fingerprint ? await hasLiked(postId, fingerprint) : false;

  return (
    <LikeButton postId={postId} initialLiked={liked} initialCount={likeCount} />
  );
}