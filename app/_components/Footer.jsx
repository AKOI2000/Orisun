import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn, FaGithub } from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-footer">
          <div className="footer-cta">
            <h4>Never miss my thoughts</h4>
            <p>Subscribe to read my thoughts or not.</p>

            <form action="" className="footer-form">
              <input
                type="email"
                name=""
                id=""
                placeholder="example@gmail.com"
              />
              <button type="submit">Submit</button>
            </form>
            <small>*I might sell your data though</small>
          </div>
          <div className="footer-nav">
            <div className="footer-nav__nav">
              <h5 className="head">Quick Links</h5>
              <Link href="/">Home</Link>
              <Link href="/about">About</Link>
              <Link href="/thoughts">Thoughts</Link>
            </div>
            <div className="footer-nav__nav">
              <h5 className="head">Follow me</h5>
              <a href="https://www.instagram.com/olayinkaalausa/">
                Instagram <FaInstagram />
              </a>
              <a href="https://www.linkedin.com/in/codealausa">
                LinkedIn <FaLinkedinIn />
              </a>
              <a href="https://github.com/AKOI2000">
                Github <FaGithub />
              </a>
            </div>
          </div>
        </div>

        <Image
          alt="orisun"
          src="/orisun.png"
          width={100}
          height={100}
          sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        <p className="copyright">© {year} Orisun. All thoughts are my own.</p>
      </div>
    </footer>
  );
}
