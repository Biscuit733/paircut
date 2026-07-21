import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { clsx } from 'clsx'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  icon?: ReactNode
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-[#ff6b6b] text-white hover:bg-[#f15858]',
  secondary: 'border border-[#e5e5e5] bg-white text-[#171717] hover:bg-[#f7f7f7]',
  ghost: 'text-[#525252] hover:bg-[#f0efeb]',
  danger: 'bg-[#171717] text-white hover:bg-[#2b2b2b]',
}

export function Button({ className, variant = 'secondary', icon, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        'inline-flex min-h-9 items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#ff6b6b]/40',
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

