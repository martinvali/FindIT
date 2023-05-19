export function JobCard() {
  return (
    <article className="shadow">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <div className="w-6 h-6 rounded-lg bg-lime-500 text-center">B</div>
          <div className="flex flex-col justify-start">
            <p className="text-cyan-500 font-semibold">BOLT</p>
            <p>Full stack developer</p>
          </div>
        </div>
        <p>13.05.2023</p>
      </div>
    </article>
  );
}
