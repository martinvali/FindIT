import { BlogArticle } from "../components/BlogArticle";
import { HighLightedBlogArticle } from "../components/HighlightedBlogArticle";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function Blog() {
  const supabase = createServerComponentClient({ cookies });

  const data = await supabase.from("articles").select();

  const articles = data.data;

  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-2xl font-medium mb-6">
          Articles from our team
        </h1>

        <HighLightedBlogArticle
          title={articles[0].title}
          text={articles[0].text}
          date={articles[0].created_at}
          id={articles[0].id}
          imgUrl="https://images.unsplash.com/photo-1686726754280-de6be7bd8229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 ">
          {articles.slice(1).map((article) => {
            return (
              <BlogArticle
                key={article.id}
                title={article.title}
                id={article.id}
                description={article.preview}
                text={article.text}
                date={article.created_at}
                imgUrl="https://images.unsplash.com/photo-1686726754280-de6be7bd8229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
              />
            );
          })}
          <BlogArticle
            title="Lorem ipsum dolor sit amet."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            date="9 june 2023"
            imgUrl="https://images.unsplash.com/photo-1686726754280-de6be7bd8229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          />
          <BlogArticle
            title="Lorem ipsum dolor sit amet."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            date="9 june 2023"
            imgUrl="https://images.unsplash.com/photo-1686726754280-de6be7bd8229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          />
          <BlogArticle
            title="Lorem ipsum dolor sit amet."
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            date="9 june 2023"
            imgUrl="https://images.unsplash.com/photo-1686726754280-de6be7bd8229?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
          />
        </div>
      </section>
    </main>
  );
}
