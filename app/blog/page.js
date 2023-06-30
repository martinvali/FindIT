import { BlogArticle } from "../components/BlogArticle";
import { HighLightedBlogArticle } from "../components/HighlightedBlogArticle";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Blog() {
  const supabase = createServerComponentClient({ cookies });

  const data = await supabase
    .from("articles")
    .select("title, created_at, id, preview, img_url");

  const articles = data.data;
  const lastArticleIndex = articles.length - 1;

  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-medium mb-7 sm:mb-8 md:mb-12 lg:mb-16">
          Articles from our team
        </h1>

        <HighLightedBlogArticle
          title={articles[lastArticleIndex].title}
          text={articles[lastArticleIndex].text}
          date={articles[lastArticleIndex].created_at}
          id={articles[lastArticleIndex].id}
          preview={articles[lastArticleIndex].preview}
          imgUrl={articles[lastArticleIndex].img_url}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 ">
          {articles.slice(0, lastArticleIndex).map((article) => {
            return (
              <BlogArticle
                key={article.id}
                title={article.title}
                id={article.id}
                description={article.preview}
                text={article.text}
                date={article.created_at}
                imgUrl={article.img_url}
              />
            );
          })}
        </div>
      </section>
    </main>
  );
}
