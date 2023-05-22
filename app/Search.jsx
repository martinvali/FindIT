export function Search() {
  return (
    <div className="relative">
      <input
        className="rounded-lg p-2 shadow w-full border-none outline-cyan-700 outline-offset-1"
        type="text"
        placeholder="Search"
      />
      <button className="transition-colors absolute right-0 top-1/2 -translate-y-1/2 bg-cyan-50 hover:bg-cyan-100 h-full rounded-r-lg outline-cyan-700 px-4">
        <img src="/searchIcon.svg" alt="Search icon" />
      </button>
    </div>
  );
}
