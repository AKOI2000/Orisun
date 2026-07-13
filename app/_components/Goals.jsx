import Image from "next/image";

function Goals() {
  return (
    <section className="goals">
      <div className="container">
        <div className="grid-col-2">
          <Image
            src="/ben-weber-uj3OTNT0sRM-unsplash.webp"
            alt="Orisun Goals"
            fill
          />
          <div className="overlay" />

          <div className="section-header">
            <h6>What do I want?</h6>
            <h4>My Goals</h4>
          </div>

          <div className="about-text">
            <p>
              Like I said before, this is not a blog, it is a journal. It is
              everything you don&apos;t get to see in my portfolio or any
              serious project I build.
            </p>
            <p>
              The goal is simple, it is to reflect, to document, to grow, and to
              connect with people who share similar thoughts but either struggle
              to express them or don&apos;t know how to put them into words.
            </p>
            <p>
              This is me being intentional with the things that live in my head.
              No pressure, no performance, just presence.
            </p>
            <p>
              If something here makes you think, or smile, or pause for a
              second, then the goal is being acheived.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Goals;
