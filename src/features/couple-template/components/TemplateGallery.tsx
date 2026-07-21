import { couplePosterTemplates, templateCategories } from '../templates'
import { useCoupleTemplateStore } from '../store/useCoupleTemplateStore'
import { TemplateThumbnail } from './TemplateThumbnail'

export function TemplateGallery() {
  const { selectedTemplateId, setTemplate } = useCoupleTemplateStore()
  return (
    <div className="grid gap-4">
      {templateCategories.map((category) => (
        <div key={category} className="grid gap-2">
          <p className="text-xs font-medium uppercase tracking-wide text-[#8a8a8a]">{category}</p>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-1">
            {couplePosterTemplates
              .filter((template) => template.category === category)
              .map((template) => (
                <button
                  key={template.id}
                  className={`grid gap-2 rounded-xl border p-2 text-left transition-colors ${
                    selectedTemplateId === template.id ? 'border-[#ff6b6b] bg-[#fff1f1]' : 'border-[#e5e5e5] bg-white hover:bg-[#fbfaf7]'
                  }`}
                  type="button"
                  onClick={() => setTemplate(template.id)}
                >
                  <TemplateThumbnail template={template} />
                  <span className="text-sm font-medium">{template.name}</span>
                </button>
              ))}
          </div>
        </div>
      ))}
    </div>
  )
}

