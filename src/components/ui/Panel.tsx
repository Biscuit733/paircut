import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={clsx('rounded-xl border border-[#e5e5e5] bg-white p-4 shadow-sm', className)}
      {...props}
    />
  )
}

