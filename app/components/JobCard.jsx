import Link from "next/link";

export function JobCard({
  title,
  location,
  type,
  experience,
  isDashboard = false,
}) {
  return (
    <article className="group shadow p-6 rounded-xl relative cursor-pointer">
      <div className="hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity  flex-row items-center gap-4 sm:gap-6 absolute bottom-0 pb-4 w-full bg-white">
        <Link
          href="/apply"
          className="bg-cyan-500 transition-colors hover:bg-cyan-600 text-white py-1 sm:py-1.5 sm:px-4 px-3 rounded-md text-lg sm:text-xl"
        >
          {isDashboard ? "Edit" : "Apply now"}
        </Link>
        <Link
          href="learn-more"
          className="text-cyan-600 text-lg sm:text-xl font-semibold hover:text-slate-900"
        >
          {isDashboard ? "Delete" : "Learn more"}
        </Link>
      </div>
      <div className="flex flex-row justify-between items-center mb-1 sm:mb-1.5 lg:mb-3.5 lg:items-start">
        <div className="flex flex-row items-center">
          <div className="text-white flex justify-center items-center w-6 h-6 rounded-md bg-green-300 mr-2 lg:w-14 lg:h-14 lg:text-3xl lg:mr-4">
            B
          </div>
          <div className="flex flex-col justify-start lg:justify-between">
            <p className="text-cyan-500 font-semibold text-lg">BOLT</p>
            <p className="hidden lg:block text-slate-900 text-2xl font-medium">
              {title}
            </p>
          </div>
        </div>
        <p className="font-normal sm:text-lg text-slate-700">13.05.2023</p>
      </div>
      <p className="font-medium text-2xl sm:text-3xl mb-2.5 sm:mb-3.5 text-slate-900 lg:hidden">
        {title}
      </p>
      <p className="text-cyan-700 font-semibold mb-2.5 sm:mb-3.5 sm:text-lg lg:mb-0 lg:text-xl">
        3000-4000€ &#8226; {location.join("/")} &#8226; {experience} &#8226;{" "}
        {type}
      </p>
      <div className="flex flex-row items-center gap-4 sm:gap-6 lg:hidden">
        <Link
          href="/apply"
          className="bg-cyan-500 transition-colors hover:bg-cyan-600 text-white py-1 sm:py-1.5 sm:px-4 px-3 rounded-md text-lg sm:text-xl"
        >
          {isDashboard ? "Edit" : "Apply now"}
        </Link>
        <Link
          href="learn-more"
          className="text-cyan-600 text-lg sm:text-xl font-semibold hover:text-slate-900"
        >
          {isDashboard ? "Delete" : "Learn more"}
        </Link>
      </div>
    </article>
  );
}
