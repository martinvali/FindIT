"use client";
import Link from "next/link";

export function HighLightedBlogArticle({
  id,
  date,
  title,
  imgUrl,
  description,
}) {
  return (
    <Link
      href={`/blog/${id}`}
      className="inline-block mb-10 sm:mb-12 md:mb-16 lg:mb-20"
    >
      <article className="flex flex-col justify-start text-left sm:flex-row sm:gap-10">
        <div className="sm:basis-2/5 lg:basis-1/3 grow">
          <img
            src={imgUrl}
            alt="Blog article image"
            className="rounded-lg mb-6 sm:mb-0"
          />
        </div>
        <div className="sm:basis-1/2 grow">
          <p className="text-cyan-500 font-normal text-base md:text-lg lg:text-xl sm:mb-1 lg:mb-1.5">
            {date}
          </p>
          <h2 className="text-slate-900 text-xl font-semibold mb-2 md:text-2xl lg:text-3xl lg:mb-2.5">
            {title}
          </h2>
          <p className="text-slate-800 text-base font-normal md:text-lg lg:text-xl">
            {description}
          </p>
        </div>
      </article>
    </Link>
  );
}
