"use client";

import { JobCard } from "./JobCard";
import { FilterComponent } from "./FilterComponent";
import { useSupabase } from "../providers/SupabaseProvider";
import { useEffect, useState, useRef } from "react";

export function JobsSection() {
  const { supabase } = useSupabase();
  const allPosts = useRef([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchAllPosts() {
      const response = await supabase
        .from("posts")
        .select("*, users(company_name, logo_url)");
      const { data } = response;
      allPosts.current = data;
      setPosts(data);
      setIsLoading(false);
    }

    fetchAllPosts();
  }, []);

  return (
    <section className="flex-col max-w-7xl pt-24 outer-container flex gap-6 lg:flex-row">
      <FilterComponent setPosts={setPosts} allPosts={allPosts.current} />
      <section className="flex flex-col gap-6 sm:gap-7 md:gap-8 basis-full">
        {isLoading &&
          [0, 1, 2, 3, 4].map((id) => {
            return (
              <div
                className="shadow animate-pulse rounded-xl w-full h-36 p-6"
                key={id}
              >
                <div className="w-3/4 max-w-xl h-10 rounded-md animate-pulse bg-slate-100 mb-7"></div>
                <div className="w-2/4 max-w-lg h-6 rounded-md animate-pulse bg-slate-100"></div>
              </div>
            );
          })}
        {posts.length > 0 && !isLoading
          ? posts.map((post) => {
              return (
                <JobCard
                  {...post}
                  key={post.id}
                  company={post.users.company_name}
                  logoUrl={post.users.logo_url}
                />
              );
            })
          : !isLoading && (
              <p className="mt-6 text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                No job ads were found :(
              </p>
            )}
      </section>
    </section>
  );
}
