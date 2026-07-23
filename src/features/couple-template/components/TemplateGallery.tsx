import { couplePosterTemplates, templateCategories } from '../templates'
import { useCoupleTemplateStore } from '../store/useCoupleTemplateStore'
import { TemplateThumbnail } from './TemplateThumbnail'
import { useWorkshopSettingsStore } from '../../workshop-settings/store/useWorkshopSettingsStore'
import { applyTemplateDefaults } from '../utils/applyTemplateDefaults'
import { getTemplateMeta } from '../templates/templateMeta'

export function TemplateGallery() {
  const { selectedTemplateId, setTemplate } = useCoupleTemplateStore()
  const settings = useWorkshopSettingsStore((state) => state.settings)
  return (
    <div className="grid gap-5">
      {templateCategories.map((category) => (
        <div key={category} className="grid gap-2.5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold text-[#8a8a8a]">{category}</p>
            <span className="h-px flex-1 bg-[#e8e4dd]" />
          </div>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {couplePosterTemplates
              .filter((template) => template.category === category)
              .map((template) => {
                const previewTemplate = applyTemplateDefaults(template, settings)
                const meta = getTemplateMeta(template.id)
                const isSelected = selectedTemplateId === template.id
                return (
                  <button
                    key={template.id}
                    className={`group grid gap-2.5 rounded-lg border p-2.5 text-left transition duration-150 active:scale-[0.992] ${
                      isSelected
                        ? 'border-[#ff5f6d] bg-white shadow-[0_12px_28px_rgba(255,95,109,0.14)] ring-1 ring-[#ff5f6d]/30'
                        : 'border-white/80 bg-white/66 shadow-[0_10px_24px_rgba(24,24,27,0.05)] hover:bg-white hover:shadow-[0_16px_34px_rgba(24,24,27,0.08)]'
                    }`}
                    type="button"
                    onClick={() => setTemplate(template.id)}
                  >
                    <TemplateThumbnail template={previewTemplate} />
                    <span className="flex items-center justify-between gap-2">
                      <span className="truncate text-sm font-semibold text-[#1d1d1f]">{template.name}</span>
                      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ${isSelected ? 'bg-[#ff5f6d] text-white' : 'bg-[#f1f0ec] text-[#7a7a80]'}`}>
                        {meta.usage}
                      </span>
                    </span>
                    <span className="line-clamp-2 text-xs leading-5 text-[#6f6f75]">{meta.description}</span>
                    <span className="text-[11px] font-medium text-[#9a8f86]">{meta.tone}</span>
                  </button>
                )
              })}
          </div>
        </div>
      ))}
    </div>
  )
}
