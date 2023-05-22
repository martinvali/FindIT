import { JobCard } from "./JobCard";
import { FilterComponent } from "./FilterComponent";
export function JobsSection() {
  return (
    <section className="max-w-7xl pt-24 outer-container flex gap-6 flex-row">
      <FilterComponent />
      <section className="flex flex-col gap-6 sm:gap-7 md:gap-8 basis-full">
        <JobCard />
        <JobCard />
        <JobCard />
      </section>
    </section>
  );
}
