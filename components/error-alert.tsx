import { AlertTriangle } from "lucide-react";

export function ErrorAlert({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
      <div className="flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
        <p>{message}</p>
      </div>
    </div>
  );
}
