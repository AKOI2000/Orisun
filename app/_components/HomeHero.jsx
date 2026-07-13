import { getAllPosts } from "@/lib/posts";
import HeroCard from "../_components/HeroCard";
import HomeFeaturedCard from "../_components/HomeFeaturedCard";
import AnimatedBtn from "../_components/AnimatedBtn";

async function HomeHero() {
  const posts = await getAllPosts();
  const heroPost = posts.slice(0, 2);
  const featuredPosts = posts.slice(2, 7);

  return (
    <section className="page-hero">
      <div className="home-hero">
        {heroPost.map((post) => (
          <HeroCard key={post.id} post={post} />
        ))}
      </div>

      {featuredPosts.length > 0 && (
        <>
          <div className="home-featured grid-col-4">
            {featuredPosts.map((post) => (
              <HomeFeaturedCard key={post.id} post={post} />
            ))}
          </div>

          <center>
            <AnimatedBtn
              primaryText="View More"
              secondaryText="View More"
              href={"/thoughts"}
              className="colored"
            />
          </center>
        </>
      )}
    </section>
  );
}

export default HomeHero;
