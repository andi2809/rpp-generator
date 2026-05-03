"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function CollapsibleSection({
  title,
  description,
  defaultOpen = false,
  children,
}: {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="md:col-span-2 rounded-[1.5rem] border border-slate-200 bg-slate-50">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
        aria-expanded={isOpen}
      >
        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          {description ? <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p> : null}
        </div>

        <ChevronDown className={cn("h-5 w-5 shrink-0 text-slate-500 transition-transform", isOpen ? "rotate-180" : "rotate-0")} />
      </button>

      {isOpen ? <div className="grid gap-5 border-t border-slate-200 px-5 py-5 md:grid-cols-2">{children}</div> : null}
    </div>
  );
}
