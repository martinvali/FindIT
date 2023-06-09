"use client";
import { useSupabase } from "../providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { JobCard } from "../components/JobCard";
import { DashboardNav } from "./components/DashboardNav";
import { Tabs } from "@mantine/core";

export default function Dashboard() {
  const { supabase } = useSupabase();
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getUserPosts() {
      const userResponse = await supabase.auth.getUser();
      const userId = userResponse.data.user.id;
      const jobsResponse = await supabase
        .from("posts")
        .select()
        .eq("user_id", userId);

      const jobs = jobsResponse.data;
      setJobs(jobs);
    }
    getUserPosts();
  }, []);

  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-2xl font-medium mb-6">Dashboard</h1>
      </section>
      <section className="flex flex-col justify-start items-center outer-container lg:flex-row">
        <section className="w-full">
          <DashboardNav />
          {jobs.map((job) => {
            return <JobCard {...job} />;
          })}
        </section>
      </section>
    </main>
  );
}
