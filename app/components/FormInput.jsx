export function FormInput({ type, label, name }) {
  return (
    <div className="flex flex-col text-left mb-6">
      <label htmlFor={name} className="text-slate-700 font-semibold pb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        required
        className="rounded-lg p-2 shadow w-full border-none outline-cyan-700 outline-offset-1"
      />
    </div>
  );
}
