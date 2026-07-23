import type { HTMLAttributes } from 'react'
import { clsx } from 'clsx'

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <section
      className={clsx(
        'rounded-lg border border-white/78 bg-white/76 p-4 shadow-[0_16px_44px_rgba(24,24,27,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl',
        className,
      )}
      {...props}
    />
  )
}
