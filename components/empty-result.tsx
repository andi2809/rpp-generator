import { FileText } from "lucide-react";

export function EmptyResult() {
  return (
    <div className="rounded-[1.75rem] border border-dashed border-slate-300 bg-white p-8 text-center shadow-sm">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
        <FileText className="h-6 w-6 text-slate-500" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900">Hasil RPP akan muncul di sini</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Setelah form diisi dan tombol generate ditekan, preview RPP akan tampil di panel ini.
      </p>
    </div>
  );
}
