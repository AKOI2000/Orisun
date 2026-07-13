import Image from "next/image";

function AboutHero() {
  return (
    <section className="page-hero">
      <Image
        width={700}
        height={700}
        src="/Orisun2.png"
        alt="Orisun"
        sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />

      <div className="origin">
        <div className="grid-col-2">
          <div className="section-header">
            <h6>The Journey</h6>
            <h4>From Vision to &quot;Thoughts&quot;</h4>
          </div>

          <div className="about-text">
            <p>
              {" "}
              It was around 3am, the most crucial hour in every creative’s life,
              when the name Orisun came to me. You could interpret it as
              “source” or “origin” in Yoruba, but for me, it’s more than just a
              translation. It’s a wordplay, a tribute. I took it from my late
              mom’s name, and in that moment, it became something sacred.
            </p>

            <p>
              {" "}
              Orisun reminds me of where I come from, the values I hold, and the
              need to always return to something true.
            </p>

            <p>
              {" "}
              This is not a blog, it is a personal journal that y’all get to
              read. I wanted to build a space. A space where thoughts flow
              without filters.
            </p>

            <p>
              {" "}
              As a full stack developer, I’m used to creating things for people.
              Interfaces, APIs, features. But I wanted to create something for
              me. Somewhere I could journal my thoughts, about things I love
              (sports, tech, music) and the weird, random thoughts that hit when
              no one’s watching.
            </p>

            <p>
              {" "}
              If you are here reading this, welcome to the source. Welcome to my
              thoughts, and do not panic or unfriend me.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutHero;
