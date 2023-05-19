import { JobCard } from "./JobCard";

export function JobsSection() {
  return (
    <section className="max-w-7xl pt-24 outer-container flex flex-col gap-6">
      <JobCard />
      <JobCard />
      <JobCard />
    </section>
  );
}
