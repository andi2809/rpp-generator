"use client";

import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, FileDown, RefreshCcw } from "lucide-react";
import { toast } from "sonner";
import { exportMarkdownToDocx, exportPreviewToPdf } from "@/lib/exporters";

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

  async function handleCopy() {
    await navigator.clipboard.writeText(content);
    toast.success("Hasil RPP berhasil disalin.");
  }

  async function handleExportPdf() {
    if (!previewRef.current) return;
    await exportPreviewToPdf(previewRef.current);
    toast.success("Ekspor PDF dimulai.");
  }

  async function handleExportDocx() {
    await exportMarkdownToDocx(content);
    toast.success("Dokumen DOCX berhasil dibuat.");
  }

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
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
      </div>
    </div>
  );
}
