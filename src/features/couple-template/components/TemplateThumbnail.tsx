import { useEffect, useState } from 'react'
import type { CouplePosterTemplate } from '../types'
import { makeTemplateThumbnail, type TemplateThumbnailSources } from '../utils/renderTemplateThumbnail'

export function TemplateThumbnail({ template, sourceUrls }: { template: CouplePosterTemplate; sourceUrls: TemplateThumbnailSources }) {
  const [url, setUrl] = useState(template.thumbnail)

  useEffect(() => {
    let cancelled = false
    void makeTemplateThumbnail(template, sourceUrls).then((nextUrl) => {
      if (!cancelled) setUrl(nextUrl)
    })
    return () => {
      cancelled = true
    }
  }, [sourceUrls, template])

  return url ? (
    <span className="block overflow-hidden rounded-lg bg-[#f3f1eb] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.7)]">
      <img
        alt={template.name}
        className="w-full object-cover transition duration-200 group-hover:scale-[1.015]"
        src={url}
        style={{ aspectRatio: `${template.canvasWidth} / ${template.canvasHeight}` }}
      />
    </span>
  ) : null
}
