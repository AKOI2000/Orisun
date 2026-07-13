import { notFound } from "next/navigation";
import { getPostById } from "@/lib/posts";
import PostMetaForm from "@/app/_components/PostMetaForm";
import BlockList from "@/app/_components/BlockList";
import DeletePostButton from "@/app/_components/DeletePostButton";

export default async function EditPostPage({ params }) {
  const { postId } = await params;
  const post = await getPostById(postId);

  if (!post) notFound();

  return (
    <div className="post-editor">
      <div className="post-editor__head">
        <h3>Edit post</h3>
        <DeletePostButton postId={post.id} afterDelete="redirect" />
      </div>
      <PostMetaForm post={post} />
      <BlockList postId={post.id} initialBlocks={post.blocks} />
    </div>
  );
}
