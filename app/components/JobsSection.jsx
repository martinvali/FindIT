"use client";

import { JobCard } from "./JobCard";
import { FilterComponent } from "./FilterComponent";
import { useSupabase } from "../providers/SupabaseProvider";
import { useEffect, useState, useRef } from "react";
import { notifications } from "@mantine/notifications";
import { JobCardSkeleton } from "./JobCardSkeleton";
import { Suspense } from "react";

export function JobsSection() {
  const { supabase } = useSupabase();
  const allPosts = useRef([]);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function keyDown(e) {
      if (e.key === "Tab") {
        document.body.classList.remove("user-not-tabbing");
      }
    }
    window.addEventListener("keydown", keyDown);

    async function fetchAllPosts() {
      try {
        const { data, error } = await supabase
          .from("posts")
          .select("*, users(company_name, logo_url)");

        if (error) {
          notifications.show({
            title: "Something went wrong.",
            message: "Please refresh the page to try again.",
            color: "red",
          });
          return;
        }
        allPosts.current = data;
        setPosts(data);
        setIsLoading(false);
      } catch (e) {
        notifications.show({
          title: "Something went wrong.",
          message: "Please refresh the page to try again.",
          color: "red",
        });
      }
    }

    fetchAllPosts();

    return () => window.removeEventListener("keydown", keyDown);
  }, []);

  return (
    <section className="flex-col max-w-7xl pt-24 outer-container flex gap-6 lg:flex-row">
      <Suspense>
        <FilterComponent setPosts={setPosts} allPosts={allPosts.current} />
      </Suspense>
      <section className="flex flex-col gap-6 sm:gap-7 md:gap-8 basis-full">
        {isLoading &&
          [0, 1, 2, 3, 4].map((id) => {
            return <JobCardSkeleton key={id} />;
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
