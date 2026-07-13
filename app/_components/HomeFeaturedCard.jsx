import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

function HomeFeaturedCard({ post }) {
  return (
    <Link href={`/thoughts/${post.slug}`} className="featured-card">
      <div className="featured-card__img-box">
        <Image src={post.coverImage} alt={post.title} fill />
      </div>
      <div className="featured-card__info">
        <p className="date">{format(post.createdAt, "do MMMM yyyy")}</p>
        <h4>{post.title}</h4>
      </div>
    </Link>
  );
}

export default HomeFeaturedCard;
