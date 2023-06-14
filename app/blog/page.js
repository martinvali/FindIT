"use client";
import { FormInput } from "../components/FormInput";
import { useSupabase } from "../providers/SupabaseProvider";
import { BlogArticle } from "../components/BlogArticle";

export default function Login() {
  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-2xl font-medium mb-6">
          Articles from our team
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-8 ">
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
