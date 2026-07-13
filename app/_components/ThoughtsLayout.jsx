import { getPaginatedPosts } from "@/lib/posts";
import ThoughtsCard from "./ThoughtsCard";
import ThoughtsPagination from "@/app/_components/ThoughtsPagination";

const PAGE_SIZE = 9;

async function ThoughtsLayout({ page = 1 }) {
  const { posts, totalCount } = await getPaginatedPosts({
    page,
    pageSize: PAGE_SIZE,
  });
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <>
      {posts.length === 0 && <p>Nothing published yet.</p>}

      <div className="thoughts">
        {posts?.map((post) => (
          <ThoughtsCard key={post.id} post={post} />
        ))}
      </div>

      <ThoughtsPagination
        page={page}
        totalPages={totalPages}
        buildHref={(p) => `/thoughts?page=${p}`}
      />
    </>
  );
}

export default ThoughtsLayout;
