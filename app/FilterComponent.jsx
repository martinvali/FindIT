"use client";

export function FilterComponent() {
  return (
    <section className="max-w-xs">
      <div className="flex flex-row justify-between">
        <p className="text-slate-700 font-normal text-xl">Filter</p>
        <button className="text-cyan-700 font-semibold text-xl">
          Clear all
        </button>
      </div>
    </section>
  );
}
