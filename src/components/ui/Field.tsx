import type { ReactNode } from 'react'

type FieldProps = {
  label: string
  children: ReactNode
  hint?: string
}

export function Field({ label, children, hint }: FieldProps) {
  return (
    <label className="grid gap-1.5 text-sm text-[#4f4f52]">
      <span className="flex items-center justify-between gap-3">
        <span className="font-medium">{label}</span>
        {hint ? <span className="text-xs font-medium text-[#8a8a8a]">{hint}</span> : null}
      </span>
      {children}
    </label>
  )
}
