"use client";

import { JobCard } from "./JobCard";
import { FilterComponent } from "./FilterComponent";
import { useSupabase } from "../providers/SupabaseProvider";
import { useEffect, useState, useRef } from "react";

export function JobsSection() {
  const { supabase } = useSupabase();
  const allPosts = useRef([]);
  const [posts, setPosts] = useState([]);

  console.log(posts);
  useEffect(() => {
    async function fetchAllPosts() {
      const response = await supabase
        .from("posts")
        .select("*, users(company_name, logo_url)");
      const { data } = response;
      allPosts.current = data;
      setPosts(data);
    }

    fetchAllPosts();
  }, []);

  return (
    <section className="flex-col max-w-7xl pt-24 outer-container flex gap-6 lg:flex-row">
      <FilterComponent setPosts={setPosts} allPosts={allPosts.current} />
      <section className="flex flex-col gap-6 sm:gap-7 md:gap-8 basis-full">
        {posts.map((post) => {
          return <JobCard {...post} key={post.id} />;
        })}
      </section>
    </section>
  );
}
