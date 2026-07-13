import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";

function HeroCard({ post }) {
  return (
    <Link href={`/thoughts/${post.slug}`} className="home-hero_card">
      <Image src={post.coverImage} alt={post.title} fill />

      <div className="home-hero_card-info">
        <p className="date">{format(post.createdAt, "do MMMM yyyy")}</p>
        <h3>{post.title}</h3>
        <p className="desc">{post.excerpt}...</p>
      </div>
    </Link>
  );
}

export default HeroCard;
