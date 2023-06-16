"use client";
import { useSupabase } from "../providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { JobCard } from "../components/JobCard";
import { Tabs } from "@mantine/core";
import { SettingsPanel } from "./components/SettingsPanel";

export default function Dashboard() {
  const { supabase } = useSupabase();
  const [jobs, setJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    async function getUserPosts() {
      const userResponse = await supabase.auth.getUser();
      console.log(userResponse);
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
      <section className="outer-container">
        <Tabs defaultValue="My jobs">
          <Tabs.List justify="center">
            <Tabs.Tab value="My jobs">My jobs</Tabs.Tab>
            <Tabs.Tab value="Settings">Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="My jobs" pt="xs">
            {jobs.map((job) => {
              return <JobCard {...job} key={job.id} isDashboard={true} />;
            })}
          </Tabs.Panel>

          <Tabs.Panel value="Settings" pt="xs">
            <SettingsPanel />
          </Tabs.Panel>
        </Tabs>
      </section>
    </main>
  );
}
