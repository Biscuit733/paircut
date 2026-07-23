import { useEffect, useState } from 'react'
import { RotateCcw, Save, X } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Field } from '../../../components/ui/Field'
import type { ToastState } from '../../../components/ui/Toast'
import { useCoupleTemplateStore } from '../../couple-template/store/useCoupleTemplateStore'
import { useProjectStore } from '../../project/store/useProjectStore'
import { useWorkshopSettingsStore } from '../store/useWorkshopSettingsStore'

type WorkshopSettingsPanelProps = {
  onClose: () => void
  setToast: (toast: ToastState) => void
}

const inputClass = 'w-full rounded-lg border border-[#dedede] bg-white px-3 py-2 text-sm text-[#171717] outline-none transition focus:border-[#171717] focus:ring-2 focus:ring-[#171717]/10'

export function WorkshopSettingsPanel({ onClose, setToast }: WorkshopSettingsPanelProps) {
  const settings = useWorkshopSettingsStore((state) => state.settings)
  const updateSettings = useWorkshopSettingsStore((state) => state.updateSettings)
  const resetSettings = useWorkshopSettingsStore((state) => state.resetSettings)
  const [creatorName, setCreatorName] = useState(settings.creatorName)
  const [themeSeries, setThemeSeries] = useState(settings.themeSeries)

  useEffect(() => {
    setCreatorName(settings.creatorName)
    setThemeSeries(settings.themeSeries)
  }, [settings.creatorName, settings.themeSeries])

  const apply = (nextCreatorName: string, nextThemeSeries: string) => {
    const previousSettings = settings
    const nextSettings = updateSettings({ creatorName: nextCreatorName, themeSeries: nextThemeSeries })
    useCoupleTemplateStore.getState().applyWorkshopSettings(nextSettings, previousSettings)
    useProjectStore.getState().applyWorkshopSettings(nextSettings, previousSettings)
    setToast({ type: 'success', message: `默认内容已更新：${nextSettings.creatorName} + ${nextSettings.themeSeries}` })
  }

  return (
    <div className="fixed inset-0 z-50 bg-[#171717]/24 px-4 py-5 backdrop-blur-sm" onClick={onClose}>
      <section
        className="ml-auto grid w-full max-w-[380px] gap-4 rounded-xl border border-[#e5e5e5] bg-white p-4 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-base font-semibold text-[#171717]">工坊默认内容</p>
            <p className="mt-1 text-xs leading-5 text-[#737373]">保存在当前浏览器。新模板、恢复默认和新草稿会优先使用这里的内容。</p>
          </div>
          <Button aria-label="关闭设置" className="min-h-8 px-2" icon={<X size={16} />} variant="ghost" onClick={onClose} />
        </div>

        <Field label="作者 / 工坊名">
          <input className={inputClass} placeholder="Biscuit" value={creatorName} onChange={(event) => setCreatorName(event.target.value)} />
        </Field>
        <Field label="主题系列">
          <input className={inputClass} placeholder="一丁点甜" value={themeSeries} onChange={(event) => setThemeSeries(event.target.value)} />
        </Field>

        <div className="grid grid-cols-2 gap-2">
          <Button icon={<Save size={16} />} variant="primary" onClick={() => apply(creatorName, themeSeries)}>
            保存默认
          </Button>
          <Button
            icon={<RotateCcw size={16} />}
            onClick={() => {
              const previousSettings = settings
              const nextSettings = resetSettings()
              useCoupleTemplateStore.getState().applyWorkshopSettings(nextSettings, previousSettings)
              useProjectStore.getState().applyWorkshopSettings(nextSettings, previousSettings)
              setToast({ type: 'info', message: '默认内容已恢复为 Biscuit + 一丁点甜。' })
            }}
          >
            恢复
          </Button>
        </div>
      </section>
    </div>
  )
}
