"use client";
import { Search } from "./Search";
import { Slider } from "@mantine/core";
import { Checkbox } from "@mantine/core";

export function FilterComponent() {
  return (
    <section className="max-w-xs p-8 shadow rounded-xl self-start">
      <header className="flex flex-row justify-between mb-6">
        <p className="text-slate-700 font-normal text-lg">Filter</p>
        <button className="text-cyan-700 font-medium text-lg">Clear all</button>
      </header>
      <Search />
      <section className="pt-4 pb-4">
        <p className="text-slate-900 font-semibold text-xl mb-3">Salary</p>
        <Slider color="cyan" />
      </section>
      <section className="pt-4 pb-4">
        <p className="text-slate-900 font-semibold text-xl mb-3">Job type</p>
        <Checkbox size="md" label="Full-time" color="cyan" className="mb-2" />
        <Checkbox size="md" label="Part-time" color="cyan" className="mb-2" />
        <Checkbox size="md" label="Intership" color="cyan" className="mb-2" />
        <Checkbox size="md" label="Contract" color="cyan" />
      </section>
      <section className="pt-4 pb-4">
        <p className="text-slate-900 font-semibold text-xl mb-3">Location</p>
        <Checkbox size="md" label="Tallinn" color="cyan" className="mb-2" />
        <Checkbox size="md" label="Tartu" color="cyan" className="mb-2" />
        <Checkbox size="md" label="Hybrid" color="cyan" className="mb-2" />
        <Checkbox size="md" label="Remote" color="cyan" />
      </section>
      <section className="pt-4 pb-4">
        <p className="text-slate-900 font-semibold text-xl mb-3">Level</p>
        <Checkbox size="md" label="Junior" color="cyan" className="mb-2" />
        <Checkbox size="md" label="Mid" color="cyan" className="mb-2" />
        <Checkbox size="md" label="Senior" color="cyan" />
      </section>
    </section>
  );
}
