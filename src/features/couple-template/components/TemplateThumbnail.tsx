import { useEffect, useState } from 'react'
import type { CouplePosterTemplate } from '../types'
import { makeTemplateThumbnail } from '../utils/renderTemplateThumbnail'

export function TemplateThumbnail({ template }: { template: CouplePosterTemplate }) {
  const [url, setUrl] = useState(template.thumbnail)

  useEffect(() => {
    setUrl(makeTemplateThumbnail(template))
  }, [template])

  return url ? <img alt={template.name} className="aspect-[3/4] w-full rounded-md bg-[#f7f7f7] object-cover" src={url} /> : null
}
