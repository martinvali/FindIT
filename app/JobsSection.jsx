import { JobCard } from "./JobCard";
import { FilterComponent } from "./FilterComponent";
export function JobsSection() {
  return (
    <section className="max-w-7xl pt-24 outer-container flex flex-col gap-6 sm:gap-7 md:gap-8">
      <FilterComponent />
      <JobCard />
      <JobCard />
      <JobCard />
    </section>
  );
}
