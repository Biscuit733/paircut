import { useEffect, useState } from 'react'
import type { CouplePosterTemplate } from '../types'
import { makeTemplateThumbnail } from '../utils/renderTemplateThumbnail'

export function TemplateThumbnail({ template }: { template: CouplePosterTemplate }) {
  const [url, setUrl] = useState(template.thumbnail)

  useEffect(() => {
    setUrl(makeTemplateThumbnail(template))
  }, [template])

  return url ? (
    <span className="block overflow-hidden rounded-lg bg-[#f3f1eb] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]">
      <img alt={template.name} className="aspect-[3/4] w-full object-cover transition duration-200 group-hover:scale-[1.015]" src={url} />
    </span>
  ) : null
}
