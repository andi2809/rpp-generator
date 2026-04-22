const steps = [
  {
    title: "Pilih template",
    description: "Tentukan kurikulum agar sistem memakai struktur draft dan format section yang sesuai.",
  },
  {
    title: "Isi konteks inti",
    description: "Masukkan informasi pokok pembelajaran agar prompt tetap fokus dan hasil generate lebih relevan.",
  },
  {
    title: "Generate dan review",
    description: "AI menyusun draft RPP ke editor, lalu hasilnya bisa langsung disunting dan diekspor.",
  },
];

type HowItWorksProps = {
  embedded?: boolean;
};

export function HowItWorks({ embedded = false }: HowItWorksProps) {
  const sectionClassName = embedded
    ? "border-t border-slate-200 pt-8"
    : "border-t border-slate-200 bg-white py-20";

  const containerClassName = embedded
    ? ""
    : "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";

  return (
    <section className={sectionClassName}>
      <div className={containerClassName}>
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">Cara kerja</p>
          <h2 className="mt-3 text-3xl font-bold text-slate-950">Alur sederhana, hasil tetap serius.</h2>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-sm font-semibold text-white">
                {index + 1}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-slate-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
