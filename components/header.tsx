export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Generator RPP AI</p>
          <p className="text-sm text-slate-500">Next.js + Groq + PDF reference aware</p>
        </div>

        <a
          href="#generator"
          className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Mulai Generate
        </a>
      </div>
    </header>
  );
}
