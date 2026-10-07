import Image from "next/image";
import Link from "next/link";
import AnimatedBtn from "./AnimatedBtn";

function AboutSection() {
  return (
    <section className="container">
      <div className="about-section">
        <div className="about-section__img-box">
          <Image
            src={"/Orisun2.png"}
            alt="Orisun"
            fill
            sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="about-section__text-box">
          <div className="text">
            <h2>How this came about</h2>
            <p>
              If you&apos;re here reading this, welcome to the source. Welcome
              to my thoughts, and do not panic or unfriend me.
            </p>
          </div>

          <div style={{ display: "inlineBlock",  }}>
            <AnimatedBtn
              primaryText="About Us"
              secondaryText="About Us"
              href="/about"
              className="transparent"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
