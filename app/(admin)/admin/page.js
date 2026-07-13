import Link from "next/link";
import { getAllPostsForAdmin } from "@/lib/posts";
import NewPostForm from "@/app/_components/NewPostForm";
import DeletePostButton from "@/app/_components/DeletePostButton";
import Pagination from "@/app/_components/Pagination";
import FilterTabs from "@/app/_components/FilterTabs";
import Image from "next/image";

const PAGE_SIZE = 10;
const STATUS_TABS = [
  { value: "all", label: "All" },
  { value: "published", label: "Published" },
  { value: "draft", label: "Draft" },
];

export default async function AdminPostsPage({ searchParams }) {
  const params = await searchParams;
  const status = params.status || "all";
  const page = Number(params.page) || 1;

  const { posts, totalCount } = await getAllPostsForAdmin({
    status,
    page,
    pageSize: PAGE_SIZE,
  });
  const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));

  return (
    <div className="admin-posts">
      <h2>Posts</h2>

      <NewPostForm />

      <FilterTabs
        tabs={STATUS_TABS}
        activeValue={status}
        buildHref={(value) => `/admin?status=${value}`}
        className="admin-posts__filters"
      />

      {posts.length === 0 && <h4>No posts found.</h4>}

      <div className="admin-posts__list">
        {posts.map((post) => (
          <Link href={`/admin/${post.id}`} key={post.id} className="admin-posts__row">
            <Image
              src={
                post.coverImage
                  ? post.coverImage
                  : "https://res.cloudinary.com/dbn6k7pg6/image/upload/v1783192949/image-placeholder_8136031_vcpss3.png"
              }
              alt={post.title}
              className="admin-posts__cover"
              width={1000}
              height={1000}
            />
            <p>{post.title}</p>
            <span
              className={`status-badge ${post.published ? "status-badge--published" : ""}`}
            >
              {post.published ? "Published" : "Draft"}
            </span>
            <DeletePostButton postId={post.id} afterDelete="refresh" />
          </Link>
        ))}
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        buildHref={(p) => `/admin?status=${status}&page=${p}`}
      />
    </div>
  );
}
