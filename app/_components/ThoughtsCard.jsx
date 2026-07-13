import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

function ThoughtsCard({ post }) {
  return (
    <>
      <Link href={`/thoughts/${post.slug}`} className="thought-card">
        <div className="thought-card__img-box">
          <Image
            src={post?.coverImage}
            alt={post.title}
            width={400}
            height={400}
            sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="thought-card__info">
          <p className="date">{format(post.createdAt, "do MMMM yyyy")}</p>
          <h5>{post.title}</h5>
          <p className="desc">{post?.excerpt}</p>
        </div>
      </Link>
    </>
  );
}

export default ThoughtsCard;
