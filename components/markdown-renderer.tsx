"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const remarkPlugins = [remarkGfm];

export function MarkdownRenderer({ content }: { content: string }) {
  return <ReactMarkdown remarkPlugins={remarkPlugins}>{content}</ReactMarkdown>;
}
