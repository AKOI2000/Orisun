import ThoughtsCard from "@/app/_components/ThoughtsCard";
import HorizontalThoughtsCard from "./HorizontalThoughtsCard";

export default function MorePost({ posts = [] }) {
  if (posts.length === 0) return null;

  return (
    <section className="more-posts">
      <h4>More to read</h4>
      <div className="more-posts__posts">
        {posts.map((post) => (
          <HorizontalThoughtsCard post={post} key={post.id} />
        ))}
      </div>
    </section>
  );
}
