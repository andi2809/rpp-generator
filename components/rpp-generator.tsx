"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PenLine, RotateCcw, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { ErrorAlert } from "@/components/error-alert";
import { FormSectionCard } from "@/components/form-section-card";
import { GenerateButton } from "@/components/generate-button";
import { GenerationForm } from "@/components/generation-form";
import { HowItWorks } from "@/components/how-it-works";
import { MarkdownEditor } from "@/components/markdown-editor";
import { ResultPreview } from "@/components/result-preview";
import { TemplateSelector } from "@/components/template-selector";
import { getRppTemplate } from "@/lib/rpp-templates";
import { defaultGenerateRppValues, generateRppSchema, type GenerateRppValues } from "@/schemas/generate-rpp";
import type { MDXEditorMethods } from "@mdxeditor/editor";

export function RppGenerator() {
  const [draftMarkdown, setDraftMarkdown] = useState(getRppTemplate(defaultGenerateRppValues.curriculum).emptyMarkdown);
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const editorRef = useRef<MDXEditorMethods>(null);

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<GenerateRppValues>({
    resolver: zodResolver(generateRppSchema),
    defaultValues: defaultGenerateRppValues,
    mode: "onBlur",
  });

  const curriculum = watch("curriculum");

  useEffect(() => {
    const template = getRppTemplate(curriculum);

    setDraftMarkdown(template.emptyMarkdown);
    setGeneratedDraft(template.emptyMarkdown);
    setError("");
    editorRef.current?.setMarkdown(template.emptyMarkdown);
  }, [curriculum]);

  async function generate(values: GenerateRppValues) {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as {
        content?: string;
        error?: string;
        code?: string;
      };

      if (!response.ok || !data.content) {
        const fallbackMessage =
          data.code === "groq_config_error"
            ? `${data.error || "Konfigurasi Groq belum lengkap."} Pastikan GROQ_API_KEY dan GROQ_MODEL terisi di .env.local lalu restart server.`
            : data.code === "groq_rate_limited"
              ? data.error || "Layanan Groq sedang membatasi permintaan. Coba lagi beberapa saat."
              : data.error || "Gagal menghasilkan draft RPP.";

        throw new Error(fallbackMessage);
      }

      setGeneratedDraft(data.content);
      setDraftMarkdown(data.content);
      editorRef.current?.setMarkdown(data.content);
      toast.success("Draft RPP berhasil dihasilkan.");
    } catch (err) {
      const message = err instanceof Error ? err.message : "Terjadi kesalahan tak terduga.";
      setError(message);
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleTemplateChange(nextCurriculum: GenerateRppValues["curriculum"]) {
    setValue("curriculum", nextCurriculum, { shouldDirty: true, shouldValidate: true });
  }

  function handleResetToGenerated() {
    if (!generatedDraft) {
      toast.warning("Belum ada hasil generate yang bisa dipulihkan.");
      return;
    }

    setDraftMarkdown(generatedDraft);
    editorRef.current?.setMarkdown(generatedDraft);
    toast.success("Editor dikembalikan ke hasil generate terakhir.");
  }

  function handleResetToTemplate() {
    const template = getRppTemplate(getValues("curriculum"));
    setGeneratedDraft(template.emptyMarkdown);
    setDraftMarkdown(template.emptyMarkdown);
    editorRef.current?.setMarkdown(template.emptyMarkdown);
    toast.success("Editor dikembalikan ke template awal.");
  }

  return (
    <div className="space-y-6">
      {error ? <ErrorAlert message={error} /> : null}

      <FormSectionCard
        title="Pilih template kurikulum"
        description="Template menentukan struktur draft RPP awal yang akan dibuat AI dan ditampilkan di editor."
      >
        <div className="md:col-span-2">
          <TemplateSelector value={curriculum} onChange={handleTemplateChange} />
        </div>
      </FormSectionCard>

      <HowItWorks embedded />

      <FormSectionCard
        title="Isi konteks inti untuk generate draft"
        description="Masukkan informasi utama saja agar backend tetap ringan, prompt tetap fokus, dan token Groq lebih terkontrol."
      >
        <div className="md:col-span-2">
          <form onSubmit={handleSubmit(generate)} className="space-y-6">
            <GenerationForm curriculum={curriculum} register={register} errors={errors} />

            <div className="flex flex-wrap items-center gap-3">
              <GenerateButton isLoading={isLoading} />
              <button
                type="button"
                onClick={() => generate(getValues())}
                disabled={isLoading}
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Sparkles className="h-4 w-4" /> Regenerate
              </button>
            </div>
          </form>
        </div>
      </FormSectionCard>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
        <section className="rounded-[1.75rem] border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-slate-950">Editor markdown RPP</h2>
              <p className="mt-1 text-sm text-slate-500">
                Hasil generate dimasukkan ke editor agar bisa langsung disunting sebelum diekspor.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleResetToGenerated}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <RotateCcw className="h-4 w-4" /> Pulihkan hasil generate
              </button>
              <button
                type="button"
                onClick={handleResetToTemplate}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                <PenLine className="h-4 w-4" /> Kembali ke template
              </button>
            </div>
          </div>

          <div className="p-5">
            <MarkdownEditor
              ref={editorRef}
              markdown={draftMarkdown}
              onChange={(value) => setDraftMarkdown(value)}
              placeholder="Hasil draft RPP akan muncul di sini..."
            />
          </div>
        </section>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <ResultPreview
            content={draftMarkdown}
            isLoading={isLoading}
            onRegenerate={() => generate(getValues())}
          />
        </div>
      </div>
    </div>
  );
}
