import { Suspense } from "react";
import HomeHero from "../_components/HomeHero";
import AboutSection from "../_components/AboutSection";

export const metadata = {
  title: { absolute: "Orisun — a personal journal" },
  description: "A personal journal of everyday thoughts, moments, and musings.",
};

function page() {
  return (
    <>
      <Suspense fallback={<h1>Loading</h1>}>
        <HomeHero />
      </Suspense>

      <AboutSection />
    </>
  );
}

export default page;
