import { CheckCircle2, CircleAlert } from 'lucide-react'

export type ToastState = {
  type: 'success' | 'error' | 'info'
  message: string
} | null

export function Toast({ toast }: { toast: ToastState }) {
  if (!toast) return null
  const Icon = toast.type === 'error' ? CircleAlert : CheckCircle2
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-[#e5e5e5] bg-white px-4 py-3 text-sm shadow-lg">
      <Icon className={toast.type === 'error' ? 'text-red-500' : 'text-[#ff6b6b]'} size={18} />
      {toast.message}
    </div>
  )
}

