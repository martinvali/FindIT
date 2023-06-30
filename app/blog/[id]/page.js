import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function BlogArticle({ params: { id } }) {
  const supabase = createServerComponentClient({ cookies });

  const data = await supabase.from("articles").select().eq("id", id);

  const article = data.data[0];

  const { created_at: date, title, img_url: imgUrl, text } = article;

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

        {text.split("\n").map((paragraph) => {
          return <p className="text-left mb-3">{paragraph}</p>;
        })}
      </section>
    </main>
  );
}
