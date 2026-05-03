export function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <div className="grid gap-8 rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm lg:grid-cols-[1.3fr_0.7fr] lg:p-12">
        <div>
          <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
            AI lesson-planning workspace
          </span>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
            Hasilkan draft RPP yang rapi, konsisten, dan siap disunting dengan bantuan AI.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Pilih kurikulum, isi konteks pembelajaran inti, lalu biarkan AI menyusun draft RPP yang bisa langsung Anda edit di markdown editor dan ekspor ke PDF atau DOCX.
          </p>
        </div>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Fokus produk</h2>
          <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
            <li>• Tanpa login / register</li>
            <li>• Fokus penuh pada generate draft RPP</li>
            <li>• Mendukung Kurikulum Merdeka dan Kurikulum 2013</li>
            <li>• Hasil nyaman dibaca, diedit, dan diekspor</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
