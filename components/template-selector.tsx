import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { rppTemplates, type CurriculumId } from "@/lib/rpp-templates";

export function TemplateSelector({
  value,
  onChange,
}: {
  value: CurriculumId;
  onChange: (value: CurriculumId) => void;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {rppTemplates.map((template) => {
        const selected = template.id === value;

        return (
          <button
            key={template.id}
            type="button"
            onClick={() => onChange(template.id)}
            className={cn(
              "rounded-[1.5rem] border p-5 text-left shadow-sm transition",
              selected
                ? "border-blue-500 bg-blue-50 ring-4 ring-blue-100"
                : "border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50",
            )}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-700">{template.shortLabel}</p>
                <h3 className="mt-2 text-lg font-semibold text-slate-950">{template.label}</h3>
              </div>

              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full border",
                  selected ? "border-blue-600 bg-blue-600 text-white" : "border-slate-300 text-slate-400",
                )}
              >
                <Check className="h-4 w-4" />
              </span>
            </div>

            <p className="mt-3 text-sm leading-6 text-slate-600">{template.description}</p>
          </button>
        );
      })}
    </div>
  );
}
