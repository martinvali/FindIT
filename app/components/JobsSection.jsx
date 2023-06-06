"use client";

import { JobCard } from "./JobCard";
import { FilterComponent } from "./FilterComponent";
import { useSupabase } from "../providers/SupabaseProvider";
import { useEffect, useState } from "react";

export function JobsSection() {
  const { supabase } = useSupabase();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchAllPosts() {
      const response = await supabase.from("posts").select();
      const { data } = response;
      setPosts(data);
    }

    fetchAllPosts();
  }, []);

  return (
    <section className="max-w-7xl pt-24 outer-container flex gap-6 flex-row">
      <FilterComponent />
      <section className="flex flex-col gap-6 sm:gap-7 md:gap-8 basis-full">
        {posts.map((post) => {
          return <JobCard {...post} key={post.id} />;
        })}
      </section>
    </section>
  );
}
