import AboutHero from "@/app/_components/AboutHero";
import Ethmology from "@/app/_components/Ethmology";
import Goals from "@/app/_components/Goals";

export const metadata = {
  title: "About | Orisun",
  description: "A little about who writes Orisun and why.",
  alternates: {
    canonical: "/about",
  },
};

function page() {
  return (
    <>
      <AboutHero />
      <Goals />
      <Ethmology />
    </>
  );
}

export default page;
