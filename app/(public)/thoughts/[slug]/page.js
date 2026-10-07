import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAllPosts, getPostBySlug, getRandomPosts } from "@/lib/posts";
import { getLikeCount } from "@/lib/likes";
import PostBlock from "@/app/_components/PostBlock";
import LikeButton from "@/app/_components/LikeButton";
import LikeSection from "@/app/_components/LikeSection";
import CommentList from "@/app/_components/CommentList";
import CommentForm from "@/app/_components/CommentForm";
import MorePost from "@/app/_components/MorePost";
import Image from "next/image";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) {
    return {
      title: "Thought Not Found | Orisun",
    };
  }

  return {
    title: `${post.title} | Orisun`,
    description: post.excerpt || "A thought from Orisun.",
    alternates: {
      canonical: `/thoughts/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | Orisun`,
      description: post.excerpt || "A thought from Orisun.",
      url: `/thoughts/${post.slug}`,
      images: post.coverImage ? [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Orisun`,
      description: post.excerpt || "A thought from Orisun.",
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default async function ThoughtPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || !post.published) notFound();

  const [likeCount, morePosts] = await Promise.all([
    getLikeCount(post.id),
    getRandomPosts(post.slug, 3),
  ]);

  return (
    <article className="thought page-hero">
      <header className="thought__header">
        <time className="thought__date">
          {new Date(post.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <h1>{post.title}</h1>
      </header>

      {post.coverImage && (
        <div className="thought__cover">
          <Image
            src={post.coverImage}
            alt={post.title}
            height={1000}
            width={1000}
            sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}

      <div className="thought__body">
        {post.blocks.map((block) => (
          <PostBlock key={block.id} block={block} />
        ))}
      </div>

      <div className="thought__like">
        <Suspense
          fallback={
            <LikeButton
              postId={post.id}
              initialLiked={false}
              initialCount={likeCount}
            />
          }
        >
          <LikeSection postId={post.id} likeCount={likeCount} />
        </Suspense>
      </div>

      <section className="thought__comments">
        <h2>Comments</h2>
        <CommentList comments={post.comments} />
        <CommentForm postId={post.id} />
      </section>
      <MorePost posts={morePosts} />
    </article>
  );
}