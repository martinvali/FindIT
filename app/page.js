export default function Home() {
  return (
    <main className="">
      <section className="pt-24 sm:pt-32 lg:pt-40">
        <h1 className="color-slate-900 font-bold text-4xl sm:text-5xl lg:text-6xl text-center mb-2 md:mb-3">
          Find the{" "}
          <span className="z-10 relative after:absolute after:bottom-1.5 sm:after:bottom-2 lg:after:bottom-3 after:left-1/2	after:-translate-x-1/2 after:w-[110%] after:h-2 lg:after:h-2.5 after:bg-cyan-400 after:-z-10 after:rounded-tl-xl">
            IT job
          </span>{" "}
          you deserve.
        </h1>
        <p className="text-slate-700 font-medium text-xl sm:text-2xl lg:text-3xl text-center">
          Browse remote and Estonian-based IT positions.
        </p>
      </section>
    </main>
  );
}
