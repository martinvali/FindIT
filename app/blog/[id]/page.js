export default function BlogArticle({ searchParams }) {
  const { date, title, imgUrl, text } = searchParams;
  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-left md:text-center">
        <p className="text-cyan-500 font-normal text-lg sm:text-xl lg:text-2xl sm:mb-1 lg:mb-1.5">
          {date}
        </p>
        <h1 className="text-slate-900 text-2xl font-semibold mb-4 sm:text-3xl lg:text-4xl lg:mb-8">
          {title}
        </h1>
        <img
          src={imgUrl}
          className="rounded-lg max-w-2xl w-full mx-auto md:max-w-4xl mb-10 lg:mb-14"
          alt="Blog article image"
        />
        <p className="text-left">{text}</p>
      </section>
    </main>
  );
}
