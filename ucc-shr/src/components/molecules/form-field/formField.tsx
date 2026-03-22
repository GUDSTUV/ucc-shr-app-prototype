interface FormFieldProps {
  label:    string
  hint?:    string
  error?:   string
  required?: boolean
  children: React.ReactNode
}

export function FormField({ label, hint, error, required, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-medium text-gray-900">
        {label}
        {required && <span className="text-red ml-0.5">*</span>}
      </label>
      {hint && (
        <p className="text-[11px] font-light text-gray-400">{hint}</p>
      )}
      {children}
      {error && (
        <p className="text-[11px] text-red font-medium">{error}</p>
      )}
    </div>
  )
}