"use client";
import Link from "next/link";

export function BlogArticle({ id, date, title, imgUrl, description }) {
  return (
    <Link href={`/blog/${id}`}>
      <article className="flex flex-col justify-start text-left">
        <img
          src={imgUrl}
          alt="Blog article image"
          className="rounded-lg mb-6"
        />
        <p className="text-cyan-500 font-normal text-base">{date}</p>
        <h2 className="text-slate-900 text-xl font-semibold mb-1">{title}</h2>
        <p className="text-slate-800 text-base font-normal">{description}</p>
      </article>
    </Link>
  );
}
