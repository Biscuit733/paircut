import type { ReactNode } from 'react'

type FieldProps = {
  label: string
  children: ReactNode
  hint?: string
}

export function Field({ label, children, hint }: FieldProps) {
  return (
    <label className="grid gap-1.5 text-sm text-[#525252]">
      <span className="flex items-center justify-between gap-3">
        <span>{label}</span>
        {hint ? <span className="text-xs text-[#8a8a8a]">{hint}</span> : null}
      </span>
      {children}
    </label>
  )
}

