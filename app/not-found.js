import Link from "next/link";

export default function NotFound() {
  return (
    <main className="outer-container pt-24 sm:pt-32 lg:pt-40 flex flex-col items-center">
      <img
        src="/notfound.svg"
        className="w-5/6 max-w-md mx-auto mb-5 sm:mb-8"
      />
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl mb-5 sm:mb-8 font-semibold">
        Page not found
      </h1>
      <Link
        href="/"
        className="bg-cyan-500 hover:bg-cyan-600 transition-colors text-white py-1.5 px-3 rounded-md text-xl lg:py-2 lg:px-5"
      >
        Back home
      </Link>
    </main>
  );
}
