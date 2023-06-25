"use client";
import { useSupabase } from "../providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { JobCard } from "../components/JobCard";
import { Tabs } from "@mantine/core";
import { SettingsPanel } from "./components/SettingsPanel";
import { JobCardSkeleton } from "../components/JobCardSkeleton";

export default function Dashboard() {
  const { supabase } = useSupabase();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUserPosts() {
      const userResponse = await supabase.auth.getUser();
      const user = userResponse.data.user;

      if (!user) {
        router.replace("/login");
      }

      const userId = user.id;

      const jobsResponse = await supabase
        .from("posts")
        .select()
        .eq("user_id", userId);

      const companyResponse = await supabase
        .from("users")
        .select("logo_url, company_name")
        .eq("user_id", userId);

      const { logo_url: logoUrl, company_name: company } =
        companyResponse?.data[0];

      const jobs = jobsResponse.data;
      setUserData({
        jobs,
        company,
        userId,
        logoUrl,
      });

      setIsloading(false);
    }
    getUserPosts();
  }, []);

  return (
    <main>
      <section className="pt-24 sm:pt-32 lg:pt-40 outer-container text-center">
        <h1 className="text-slate-900 text-3xl sm:text-4xl lg:text-5xl font-medium mb-7 sm:mb-8 md:mb-12 lg:mb-16">
          Dashboard
        </h1>
      </section>
      <section className="outer-container flex flex-col items-center">
        <Tabs
          defaultValue="My jobs"
          className="w-full !flex !flex-col"
          classNames={{
            panel: "flex flex-col gap-1.5 sm:gap-2.5 md:gap-3",
          }}
          color="#06b6d4"
        >
          <Tabs.List justify="center" className="!inline-flex self-center mb-4">
            <Tabs.Tab value="My jobs">My jobs</Tabs.Tab>
            <Tabs.Tab value="Settings">Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="My jobs">
            {isLoading &&
              [0, 1, 2, 3, 4].map((id) => {
                return <JobCardSkeleton key={id} />;
              })}

            {!isLoading && userData.jobs.length === 0 && (
              <p className="mt-6 text-center text-xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold">
                No job ads were found :(
              </p>
            )}

            {!isLoading &&
              userData.jobs.length > 0 &&
              userData.jobs.map((job) => {
                return (
                  <JobCard
                    {...job}
                    key={job.id}
                    company={userData.company}
                    logoUrl={userData.logoUrl}
                    isDashboard={true}
                    setUserData={setUserData}
                  />
                );
              })}
          </Tabs.Panel>

          <Tabs.Panel
            value="Settings"
            className="shadow p-6 rounded-xl max-w-md w-full self-center"
          >
            <SettingsPanel
              company={userData.company}
              userId={userData.userId}
              logoUrl={userData.logoUrl}
            />
          </Tabs.Panel>
        </Tabs>
      </section>
    </main>
  );
}
