import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";

function HorizontalThoughtsCard({ post }) {
  return (
    <>
      <Link href={`/thoughts/${post.slug}`} className="horizontal-thought">
        <div className="horizontal-thought__img-box">
          <Image
            src={post?.coverImage}
            alt={post.title}
            width={400}
            height={400}
            sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        <div className="horizontal-thought__text-box">
          <div className="">
            <p className="date">{format(post.createdAt, "do MMMM yyyy")}</p>
            <h5>{post.title}</h5>
          </div>
        </div>
      </Link>
    </>
  );
}

export default HorizontalThoughtsCard;
