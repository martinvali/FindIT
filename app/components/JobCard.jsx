import Link from "next/link";
import { notifications } from "@mantine/notifications";
import { useRouter } from "next/navigation";

export function JobCard({
  id,
  title,
  location,
  type,
  level,
  url,
  salary,
  isDashboard = false,
  company,
  logoUrl,
  setUserData,
}) {
  const router = useRouter();

  async function clickedSecondaryButton(e) {
    try {
      e.preventDefault();
      notifications.clean();
      notifications.show({
        loading: true,
        title: "Loading...",
      });
      const response = await fetch(`/api/jobs/${id}`, { method: "DELETE" });

      notifications.clean();
      if (response.ok) {
        setUserData((userData) => {
          return {
            ...userData,
            jobs: userData.jobs.filter((job) => job.id !== id),
          };
        });
        return notifications.show({
          title: "Successfully deleted the job ad.",
          color: "green",
        });
      }
      return notifications.show({
        title: "Something went wrong.",
        message: "Please refresh the page to try again.",
        color: "red",
      });
    } catch (e) {
      notifications.clean();
      return notifications.show({
        title: "Something went wrong.",
        message: "Please refresh the page to try again.",
        color: "red",
      });
    }
  }

  return (
    <article className="group shadow p-6 rounded-xl relative cursor-pointer">
      <div className="hidden lg:flex opacity-0 group-hover:opacity-100 transition-opacity  flex-row items-center gap-4 sm:gap-6 absolute bottom-0 pb-4 w-full bg-white">
        <Link
          href={isDashboard ? `/jobs/edit/${id}` : url}
          className="bg-cyan-500 transition-colors hover:bg-cyan-600 text-white py-1 sm:py-1.5 sm:px-4 px-3 rounded-md text-lg sm:text-xl"
        >
          {isDashboard ? "Edit" : "Apply now"}
        </Link>
        <button
          href="learn-more"
          onClick={clickedSecondaryButton}
          className="text-cyan-600 text-lg sm:text-xl font-semibold hover:text-slate-900"
        >
          {isDashboard ? "Delete" : "Learn more"}
        </button>
      </div>
      <div className="flex flex-row justify-between items-center mb-1 sm:mb-1.5 lg:mb-3.5 lg:items-start">
        <div className="flex flex-row items-center">
          <div className="text-white flex justify-center items-center w-6 h-6 rounded-md bg-cyan-500 mr-2 lg:w-14 lg:h-14 lg:text-3xl lg:mr-4">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={company + "_logo"}
                className="rounded-md w-full h-full"
              />
            ) : (
              company[0].toUpperCase()
            )}
          </div>
          <div className="flex flex-col justify-start lg:justify-between">
            <p className="text-cyan-500 font-semibold text-lg">{company}</p>
            <p className="hidden lg:block text-slate-900 text-2xl font-medium">
              {title}
            </p>
          </div>
        </div>
        {/* <p className="font-normal sm:text-lg text-slate-700">13.05.2023</p> */}
      </div>
      <p className="font-medium text-2xl sm:text-3xl mb-2.5 sm:mb-3.5 text-slate-900 lg:hidden">
        {title}
      </p>
      <p className="text-cyan-700 font-semibold mb-2.5 sm:mb-3.5 sm:text-lg lg:mb-0 lg:text-xl">
        {level} &#8226; {location.join("/")} &#8226; {type}{" "}
        {salary.length > 0 && `• ${salary[0]}€-${salary[1]}€`}
      </p>
      <div className="flex flex-row items-center gap-4 sm:gap-6 lg:hidden">
        <Link
          href={isDashboard ? `/jobs/edit/${id}` : url}
          className="bg-cyan-500 transition-colors hover:bg-cyan-600 text-white py-1 sm:py-1.5 sm:px-4 px-3 rounded-md text-lg sm:text-xl"
        >
          {isDashboard ? "Edit" : "Apply now"}
        </Link>
        <button
          onClick={clickedSecondaryButton}
          className="text-cyan-600 text-lg sm:text-xl font-semibold hover:text-slate-900"
        >
          {isDashboard ? "Delete" : "Learn more"}
        </button>
      </div>
    </article>
  );
}
