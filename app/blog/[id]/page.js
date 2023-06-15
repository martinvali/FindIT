export default function BlogArticle({ searchParams }) {
  console.log(searchParams);
  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-2xl font-medium mb-6">
          Articles from our team
        </h1>
      </section>
    </main>
  );
}
