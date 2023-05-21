"use client";
import { Search } from "./Search";
import { Slider } from "@mantine/core";
import { Checkbox } from "@mantine/core";

export function FilterComponent() {
  return (
    <section className="max-w-xs p-8 shadow rounded-xl">
      <header className="flex flex-row justify-between mb-6">
        <p className="text-slate-700 font-normal text-lg">Filter</p>
        <button className="text-cyan-700 font-medium text-lg">Clear all</button>
      </header>
      <p>Salary</p>
      <Slider />
      <p>Job type</p>
      <Checkbox label="Full-time" color="#0E7490" />
      <Checkbox label="Part-time" color="#0E7490" />
      <Checkbox label="Intership" color="#0E7490" />
      <Checkbox label="Contract" color="#0E7490" />
      <p>Location</p>
      <Checkbox label="Tallinn" color="#0E7490" />
      <Checkbox label="Tartu" color="#0E7490" />
      <Checkbox label="Hybrid" color="#0E7490" />
      <Checkbox label="Remote" color="#0E7490" />
      <p>Level</p>
      <Checkbox label="Junior" color="#0E7490" />
      <Checkbox label="Mid" color="#0E7490" />
      <Checkbox label="Senior" color="#0E7490" />
      <Search />
    </section>
  );
}
