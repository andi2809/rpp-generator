"use client";

import dynamic from "next/dynamic";
import { useCallback, useRef } from "react";
import { Copy, FileDown, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { exportMarkdownToDocx, exportPreviewToPdf } from "@/lib/exporters";

const MarkdownRenderer = dynamic(
  async () => import("@/components/markdown-renderer").then((module) => module.MarkdownRenderer),
  {
    ssr: false,
    loading: () => <div className="text-sm text-slate-500">Memuat preview markdown...</div>,
  },
);

export function ResultPreview({
  content,
  isLoading,
  onRegenerate,
}: {
  content: string;
  isLoading: boolean;
  onRegenerate: () => void;
}) {
  const previewRef = useRef<HTMLDivElement>(null);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(content);
    toast.success("Hasil RPP berhasil disalin.");
  }, [content]);

  const handleExportPdf = useCallback(async () => {
    if (!previewRef.current) return;
    await exportPreviewToPdf(previewRef.current);
    toast.success("Ekspor PDF dimulai.");
  }, []);

  const handleExportDocx = useCallback(async () => {
    await exportMarkdownToDocx(content);
    toast.success("Dokumen DOCX berhasil dibuat.");
  }, [content]);

  return (
    <div className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-950">Live preview hasil RPP</h2>
          <p className="mt-1 text-sm text-slate-500">Preview selalu mengikuti isi editor markdown terbaru agar hasil akhir mudah dicek sebelum diekspor.</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleCopy}
            disabled={!content || isLoading}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Copy className="h-4 w-4" /> Copy
          </button>
          <button
            type="button"
            onClick={handleExportPdf}
            disabled={!content || isLoading}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FileDown className="h-4 w-4" /> PDF
          </button>
          <button
            type="button"
            onClick={handleExportDocx}
            disabled={!content || isLoading}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FileDown className="h-4 w-4" /> DOCX
          </button>
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isLoading}
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <RefreshCcw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} /> Regenerate
          </button>
        </div>
      </div>

      <div ref={previewRef} className="markdown-preview p-6 lg:p-8">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
}
