import Image from "next/image";
import Link from "next/link";

function LogoLink() {
  return (
    <Link href="/" className="site-nav__logo">
      <Image
        width={100}
        height={100}
        src="/Orisun.png"
        alt="Orisun Logo"
        sizes="(max-width: 763px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </Link>
  );
}

export default LogoLink;
