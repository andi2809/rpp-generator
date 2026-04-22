import { cn } from "@/lib/utils";

type CommonFieldProps = {
  label: string;
  helperText?: string;
  error?: string;
  required?: boolean;
  className?: string;
};

function FieldWrapper({
  label,
  helperText,
  error,
  required,
  className,
  children,
}: CommonFieldProps & { children: React.ReactNode }) {
  return (
    <div className={cn("space-y-2", className)}>
      <label className="block text-sm font-medium text-slate-800">
        {label}
        {required ? <span className="ml-1 text-red-600">*</span> : null}
      </label>
      {children}
      {helperText ? <p className="text-xs leading-5 text-slate-500">{helperText}</p> : null}
      {error ? <p className="text-xs font-medium text-red-600">{error}</p> : null}
    </div>
  );
}

const baseClassName =
  "w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

export function InputField(
  props: CommonFieldProps & React.InputHTMLAttributes<HTMLInputElement>,
) {
  const { label, helperText, error, required, className, ...rest } = props;
  return (
    <FieldWrapper label={label} helperText={helperText} error={error} required={required} className={className}>
      <input {...rest} className={baseClassName} />
    </FieldWrapper>
  );
}

export function TextareaField(
  props: CommonFieldProps & React.TextareaHTMLAttributes<HTMLTextAreaElement>,
) {
  const { label, helperText, error, required, className, ...rest } = props;
  return (
    <FieldWrapper label={label} helperText={helperText} error={error} required={required} className={className}>
      <textarea {...rest} className={cn(baseClassName, "min-h-[140px] resize-y")} />
    </FieldWrapper>
  );
}

export function SelectField(
  props: CommonFieldProps & React.SelectHTMLAttributes<HTMLSelectElement> & { options: Array<{ label: string; value: string }> },
) {
  const { label, helperText, error, required, className, options, ...rest } = props;
  return (
    <FieldWrapper label={label} helperText={helperText} error={error} required={required} className={className}>
      <select {...rest} className={baseClassName}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </FieldWrapper>
  );
}
