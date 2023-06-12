"use client";
//import { Search } from "./Search";
import { Slider, Checkbox, TextInput } from "@mantine/core";
import { useState, useEffect } from "react";
export function FilterComponent({ setPosts, allPosts }) {
  const DEFAULT_FILTERS = {
    search: "",
    salary: "",
    type: [],
    location: [],
    level: [],
  };
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  useEffect(() => {
    setPosts(() => {
      const filteredPosts = allPosts.filter((post) => {
        console.log(post);
        return (
          (filters.type.length === 0 || filters.type.includes(post.type)) &&
          (filters.location.length === 0 ||
            filters.location.includes(post.location)) &&
          (filters.level.length === 0 ||
            filters.level.length.includes(post.level))
        );
      });
      return filteredPosts;
    });
  }, [filters]);
  return (
    <>
      <div className="flex flex-row justify-center items-center ml-auto gap-1.5 lg:hidden">
        <img src="/filterIcon.svg" alt="filter icon" />
        <button className="" onClick={() => setIsOpen(!isOpen)}>
          Filter
        </button>
      </div>
      {isOpen && (
        <section className="static w-full lg:max-w-xs p-8 shadow rounded-xl self-start">
          <header className="flex flex-row justify-between mb-6">
            <p className="text-slate-700 font-normal text-lg">Filter</p>
            <button className="text-cyan-700 font-medium text-lg">
              Clear all
            </button>
          </header>
          <p className="text-slate-900 font-semibold text-xl mb-3">Search</p>
          <TextInput
            radius="md"
            size="sm"
            value={filters.search}
            onChange={(e) => {
              setFilters((oldFilters) => ({
                ...oldFilters,
                search: e.target.value,
              }));
            }}
            rightSection={
              <img
                src="/searchIcon.svg"
                alt="Search icon"
                className="bg-cyan-50 h-full rounded-r-lg p-2.5"
              />
            }
          />
          <section className="pt-4 pb-4">
            <p className="text-slate-900 font-semibold text-xl mb-3">Salary</p>
            <Slider color="cyan" />
          </section>
          <section className="pt-4 pb-4">
            <p className="text-slate-900 font-semibold text-xl mb-3">
              Job type
            </p>
            {["Full-time", "Part-time", "Intership", "Contract"].map(
              (type, index, arr) => {
                return (
                  <Checkbox
                    key={type}
                    size="md"
                    label={type}
                    color="cyan"
                    onChange={(e) => {
                      const { checked } = e.target;

                      if (checked) {
                        setFilters({
                          ...filters,
                          type: [...filters.type, type],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          type: filters.type.filter(
                            (jobType) => jobType !== type
                          ),
                        });
                      }
                    }}
                    checked={filters.type.includes(type)}
                    className={index + 1 === arr.length ? "" : "mb-2"}
                  />
                );
              }
            )}
          </section>
          <section className="pt-4 pb-4">
            <p className="text-slate-900 font-semibold text-xl mb-3">
              Location
            </p>
            {["Tallinn", "Tartu", "Hybrid", "Remote"].map(
              (location, index, arr) => {
                return (
                  <Checkbox
                    key={location}
                    size="md"
                    label={location}
                    color="cyan"
                    onChange={(e) => {
                      const { checked } = e.target;

                      if (checked) {
                        setFilters({
                          ...filters,
                          location: [...filters.location, location],
                        });
                      } else {
                        setFilters({
                          ...filters,
                          location: filters.location.filter(
                            (jobLocation) => jobLocation !== location
                          ),
                        });
                      }
                    }}
                    checked={filters.location.includes(location)}
                    className={index + 1 === arr.length ? "" : "mb-2"}
                  />
                );
              }
            )}
          </section>
          <section className="pt-4 pb-4">
            <p className="text-slate-900 font-semibold text-xl mb-3">Level</p>
            {["Junior", "Mid", "Senior"].map((level, index, arr) => {
              return (
                <Checkbox
                  key={level}
                  size="md"
                  label={level}
                  color="cyan"
                  onChange={(e) => {
                    const { checked } = e.target;

                    if (checked) {
                      setFilters({
                        ...filters,
                        level: [...filters.level, level],
                      });
                    } else {
                      setFilters({
                        ...filters,
                        level: filters.level.filter(
                          (jobLevel) => jobLevel !== level
                        ),
                      });
                    }
                  }}
                  checked={filters.level.includes(level)}
                  className={index + 1 === arr.length ? "" : "mb-2"}
                />
              );
            })}
          </section>
        </section>
      )}
    </>
  );
}
