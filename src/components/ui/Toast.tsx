import { CheckCircle2, CircleAlert } from 'lucide-react'

export type ToastState = {
  type: 'success' | 'error' | 'info'
  message: string
} | null

export function Toast({ toast }: { toast: ToastState }) {
  if (!toast) return null
  const Icon = toast.type === 'error' ? CircleAlert : CheckCircle2
  return (
    <div className="fixed bottom-5 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-lg border border-white/80 bg-white/82 px-4 py-3 text-sm shadow-[0_16px_44px_rgba(24,24,27,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl">
      <Icon className={toast.type === 'error' ? 'text-red-500' : 'text-[#ff6b6b]'} size={18} />
      {toast.message}
    </div>
  )
}
