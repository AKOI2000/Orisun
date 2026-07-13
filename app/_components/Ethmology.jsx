import Image from "next/image";

function Ethmology() {
  return (
    <section className="ethmology">
      <div className="container">
        <div className="grid-col-2">
          <div className="section-header">
            <h6>The Origin</h6>
            <h4>Ethmology</h4>
          </div>

          <div className="about-text">
            <Image
              width={100}
              height={100}
              src="/Orisun.png"
              alt="Orisun"
              sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <p>From orí (“head”) + ìsun (“flow; spring”).</p>
            <h5>
              Pronounciation <span>/ō.ɾí.ꜜsũ̄/</span>
            </h5>

            <h6>Noun</h6>
            <ol>
              <li>
                spring (a natural source of water). <br />{" "}
                <small>
                  &ldquo;A ri orisun omi ninu igbo&rdquo; which translates to
                  &ldquo;We found a spring of water in the forest&rdquo;.
                </small>
              </li>
              <li>
                {" "}
                origin, source <br />{" "}
                <small>
                  &ldquo;Orisun imole wa ninu iwe &rdquo; which means &ldquo;The
                  source of light is in the book &rdquo;
                </small>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Ethmology;
