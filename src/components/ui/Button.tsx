import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  icon?: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-[#ff5f6d] text-white shadow-[0_8px_18px_rgba(255,95,109,0.22)] hover:bg-[#f24f5f]',
  secondary: 'border border-white/80 bg-white/78 text-[#161617] shadow-[inset_0_1px_0_rgba(255,255,255,0.82),0_1px_2px_rgba(20,20,20,0.05)] backdrop-blur hover:bg-white',
  ghost: 'text-[#4a4a4c] hover:bg-white/70',
  danger: 'bg-[#1d1d1f] text-white shadow-[0_8px_18px_rgba(20,20,20,0.18)] hover:bg-[#2c2c2e]',
}

export function Button({ className, variant = 'secondary', icon, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex min-h-9 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition duration-150 focus:outline-none focus:ring-2 focus:ring-[#ff5f6d]/35 active:scale-[0.985]',
        variants[variant],
        className,
      )}
      type="button"
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}
