export default function SerachBox() {
  return (
    <section className="mt-12 text-slate-100">
      <div className="relative">
        <input
          type="text"
          placeholder="Search article"
          className="w-full bg-slate-600 text-xl p-3 border-4 border-slate-900 rounded-md outline-none placeholder:text-slate-500 placeholder:text-base"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          fill="white"
          viewBox="0 0 16 16"
          className="bi bi-search absolute right-3 top-4 text-3xl"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
        </svg>
      </div>
    </section>
  );
}
