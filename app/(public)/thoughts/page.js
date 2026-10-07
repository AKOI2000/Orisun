import ThoughtsLayout from "@/app/_components/ThoughtsLayout";

export const metadata = {
  title: "Thoughts | Orisun",
  description: "All entries from Orisun, newest first.",
  alternates: {
    canonical: "/thoughts",
  },
};

async function page({ searchParams }) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  return (
    <>
      <section className="page-hero">
        <h1 className="page-hero-heading">Thoughts.</h1>
        <ThoughtsLayout page={currentPage} />
      </section>
    </>
  );
}

export default page;
