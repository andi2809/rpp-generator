"use client";

import dynamic from "next/dynamic";
import { forwardRef } from "react";
import type { MDXEditorMethods, MDXEditorProps } from "@mdxeditor/editor";

const ClientMarkdownEditor = dynamic(
  async () => import("@/components/markdown-editor-client").then((module) => module.MarkdownEditorClient),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[780px] rounded-[1.5rem] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">
        Memuat editor markdown...
      </div>
    ),
  },
);

export const MarkdownEditor = forwardRef<MDXEditorMethods, MDXEditorProps>((props, ref) => {
  return <ClientMarkdownEditor {...props} editorRef={ref} />;
});

MarkdownEditor.displayName = "MarkdownEditor";
