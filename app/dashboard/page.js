"use client";
import { useSupabase } from "../providers/SupabaseProvider";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { JobCard } from "../components/JobCard";
import { Tabs } from "@mantine/core";
import { SettingsPanel } from "./components/SettingsPanel";
import { JobCardSkeleton } from "../components/JobCardSkeleton";
import Link from "next/link";

export default function Dashboard() {
  const LARGE_SCREEN_WIDTH = 1024;
  const { supabase } = useSupabase();
  const [userData, setUserData] = useState([]);
  const [isLoading, setIsloading] = useState(true);
  const [tabOrientation, setTabOrientation] = useState("horizontal");
  const router = useRouter();

  useEffect(() => {
    function updateOrientation() {
      if (window.innerWidth >= LARGE_SCREEN_WIDTH) {
        return setTabOrientation("vertical");
      }

      setTabOrientation("horizontal");
    }

    updateOrientation();

    window.addEventListener("resize", updateOrientation);

    return () => window.removeEventListener("resize", updateOrientation);
  }, []);

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
          classNames={{
            root: "w-full !flex !flex-col lg:!flex-row lg:!self-start mb-6 sm:mb-8 md:mb-10 lg:mb-12 lg:gap-6",
            list: "lg:!self-start lg:shadow lg:p-6 lg:rounded-xl pl-0 before:!content-none lg:!flex-col lg:!min-w-[250px]",
            panel:
              "w-full flex flex-col gap-1.5 sm:gap-2.5 md:gap-3 lg:max-w-full",
            tab: "!text-lg !border-0 !justify-start font-medium aria-[selected=false]:text-slate-600 aria-[selected=false]:after:!content-none aria-selected:text-slate-900 aria-selected:font-semibold relative after:absolute after:bottom-0.5 lg:after:bottom-0 after:left-1/2 lg:after:left-0 after:-translate-x-1/2 after:w-full lg:after:w-[2px] after:h-1 lg:after:h-full after:bg-cyan-500 after:-z-10 after:rounded-tl-xl hover:!text-cyan-700 hover:bg-transparent transition-colors",
          }}
          orientation={tabOrientation}
          color="#06b6d4"
        >
          <Tabs.List
            justify="center"
            className="!inline-flex self-center mb-4 md:mb-5 lg:mb-7"
          >
            <Tabs.Tab value="My jobs">My jobs</Tabs.Tab>
            <Tabs.Tab value="Settings">Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="My jobs">
            {!isLoading && userData.jobs.length === 0 && (
              <div className="shadow p-6 rounded-xl max-w-lg lg:max-w-full w-full self-center flex justify-center items-center flex-col gap-1.5 sm:gap-2.5 md:gap-3">
                <p className="mt-6 text-center text-xl sm:text-3xl md:text-4xl font-semibold mb-3 md:mb-4 lg:max-w-full">
                  No job ads were found
                </p>

                <Link
                  href="/jobs/new"
                  className="bg-cyan-500 hover:bg-cyan-600 transition-colors text-center text-white py-1.5 px-3 rounded-md text-xl md:text-2xl lg:py-2 lg:px-5 w-full"
                >
                  Post a new job
                </Link>
              </div>
            )}

            {isLoading &&
              [0, 1, 2, 3, 4].map((id) => {
                return <JobCardSkeleton key={id} />;
              })}

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
            className="shadow p-6 rounded-xl max-w-lg w-full self-center"
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
