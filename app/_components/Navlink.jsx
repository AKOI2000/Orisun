import Link from "next/link";
import AnimatedBtn from "./AnimatedBtn";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/thoughts", label: "Thoughts" }
];

function Navlink() {
  return (
    <div className="site-nav__nav">
      {links.map((link) => (
        <AnimatedBtn key={link.href} href={link.href} primaryText={link.label} secondaryText={link.label} />
      ))}
    </div>
  );
}

export default Navlink;
