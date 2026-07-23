import { useEffect, useState } from 'react'
import { Crop, Grid2X2, Images, LayoutTemplate, Scissors, Settings2 } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Toast, type ToastState } from '../components/ui/Toast'
import { CoupleCropper } from '../features/couple-avatar/components/CoupleCropper'
import { SingleCropper } from '../features/cropper/components/SingleCropper'
import { TemplateEditor } from '../features/couple-template/components/TemplateEditor'
import { CollageEditor } from '../features/collage/components/CollageEditor'
import { useCoupleTemplateStore } from '../features/couple-template/store/useCoupleTemplateStore'
import { WorkshopSettingsPanel } from '../features/workshop-settings/components/WorkshopSettingsPanel'
import { useWorkshopSettingsStore } from '../features/workshop-settings/store/useWorkshopSettingsStore'

type AppMode = 'couple' | 'single' | 'template' | 'collage'

const modes: Array<{ id: AppMode; label: string; icon: React.ReactNode }> = [
  { id: 'couple', label: '头像裁剪', icon: <Scissors size={17} /> },
  { id: 'single', label: '单图裁剪', icon: <Crop size={17} /> },
  { id: 'template', label: '头像模板', icon: <LayoutTemplate size={17} /> },
  { id: 'collage', label: '智能拼图', icon: <Grid2X2 size={17} /> },
]

export function App() {
  const [mode, setMode] = useState<AppMode>('couple')
  const [toast, setToast] = useState<ToastState>(null)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const { undo, redo } = useCoupleTemplateStore()
  const settings = useWorkshopSettingsStore((state) => state.settings)

  useEffect(() => {
    if (!toast) return
    const timer = window.setTimeout(() => setToast(null), 2600)
    return () => window.clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!event.ctrlKey || mode !== 'template') return
      if (event.key.toLowerCase() === 'z' && event.shiftKey) {
        event.preventDefault()
        redo()
      } else if (event.key.toLowerCase() === 'z') {
        event.preventDefault()
        undo()
      } else if (event.key.toLowerCase() === 'y') {
        event.preventDefault()
        redo()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [mode, redo, undo])

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-white/70 bg-[#f6f6f3]/82 shadow-[0_1px_0_rgba(20,20,20,0.04)] backdrop-blur-2xl">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-lg border border-white/80 bg-white/82 text-[#ff5f6d] shadow-[0_12px_30px_rgba(24,24,27,0.08),inset_0_1px_0_rgba(255,255,255,0.95)]">
              <Images size={21} strokeWidth={2.2} />
            </div>
            <div>
              <h1 className="text-[21px] font-semibold tracking-normal text-[#161617]">{settings.creatorName} 头像工坊</h1>
              <p className="text-xs text-[#7a7a80]">裁剪、模板、拼图，都在本地完成</p>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2 rounded-lg border border-white/70 bg-white/46 p-1 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] backdrop-blur-xl">
            {modes.map((item) => (
              <Button key={item.id} icon={item.icon} variant={mode === item.id ? 'primary' : 'secondary'} onClick={() => setMode(item.id)}>
                {item.label}
              </Button>
            ))}
            <Button icon={<Settings2 size={17} />} variant="ghost" onClick={() => setIsSettingsOpen(true)}>
              设置
            </Button>
          </nav>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 py-5">
        {mode === 'couple' ? <CoupleCropper setToast={setToast} onOpenTemplates={() => setMode('template')} /> : null}
        {mode === 'single' ? <SingleCropper setToast={setToast} /> : null}
        {mode === 'template' ? <TemplateEditor setToast={setToast} onBack={() => setMode('couple')} /> : null}
        {mode === 'collage' ? <CollageEditor setToast={setToast} /> : null}
      </div>
      {isSettingsOpen ? <WorkshopSettingsPanel setToast={setToast} onClose={() => setIsSettingsOpen(false)} /> : null}
      <Toast toast={toast} />
    </div>
  )
}
