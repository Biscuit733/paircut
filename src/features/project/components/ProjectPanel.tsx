import { ChevronDown, RotateCcw, Save, Trash2 } from 'lucide-react'
import { Button } from '../../../components/ui/Button'
import { Field } from '../../../components/ui/Field'
import type { ToastState } from '../../../components/ui/Toast'
import { useCoupleStore } from '../../couple-avatar/store/useCoupleStore'
import type { ImageAsset } from '../../uploader/types'
import { useCoupleTemplateStore } from '../../couple-template/store/useCoupleTemplateStore'
import { useProjectStore } from '../store/useProjectStore'
import type { ProjectDraft, ProjectSourceImageMeta, ProjectStatus, RelationshipType } from '../types'

const relationshipLabels: Array<{ value: RelationshipType; label: string }> = [
  { value: 'cp', label: 'CP' },
  { value: 'partner', label: '搭子' },
  { value: 'besties', label: '闺蜜' },
  { value: 'brothers', label: '兄弟' },
  { value: 'other', label: '其他' },
]

const statusLabels: Array<{ value: ProjectStatus; label: string }> = [
  { value: 'draft', label: '草稿' },
  { value: 'needs-crop', label: '待裁剪' },
  { value: 'needs-template', label: '待生成' },
  { value: 'needs-publish', label: '待发布' },
  { value: 'complete', label: '已完成' },
]

const controlClass = 'min-w-0 w-full rounded-lg border border-[#e5e5e5] bg-white px-3 py-2 text-sm text-[#171717] outline-none transition focus:border-[#ff6b6b] focus:ring-2 focus:ring-[#ff6b6b]/20'

export function ProjectPanel({ setToast }: { setToast: (toast: ToastState) => void }) {
  const { sourceImage, avatarA, avatarB, restoreAvatarState } = useCoupleStore()
  const { selectedTemplateId, exportSize, customWidth, restoreProjectTemplate } = useCoupleTemplateStore()
  const { info, drafts, selectedDraftId, lastSavedAt, updateInfo, resetInfo, saveDraft, selectDraft, deleteDraft, restoreDraft } = useProjectStore()
  const selectedDraft = drafts.find((draft) => draft.id === selectedDraftId) ?? null
  const activeDrafts = drafts.filter((draft) => !draft.deletedAt).slice(0, 4)
  const deletedDrafts = drafts.filter((draft) => draft.deletedAt).slice(0, 2)

  const saveCurrentDraft = () => {
    const draft = saveDraft({
      sourceImage: toSourceMeta(sourceImage) ?? selectedDraft?.sourceImage ?? null,
      avatarA,
      avatarB,
      selectedTemplateId,
      exportSize,
      customWidth,
    })
    setToast({ type: 'success', message: `草稿已保存：${draft.info.title}` })
  }

  const restoreCurrentDraft = (draft: ProjectDraft) => {
    selectDraft(draft.id)
    restoreAvatarState(draft.avatarA, draft.avatarB)
    restoreProjectTemplate(draft.selectedTemplateId, draft.exportSize, draft.customWidth)
    setToast({
      type: 'info',
      message: draft.sourceImage ? `已恢复草稿参数，请重新导入原图：${draft.sourceImage.name}` : '已恢复草稿参数。',
    })
  }

  return (
    <section className="grid gap-3 border-t border-[#eeeeee] pt-4">
      <div className="flex min-w-0 items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#171717]">作品草稿</p>
          <p className="mt-1 truncate text-xs text-[#737373]">{selectedDraft ? `当前：${selectedDraft.info.title}` : '保存当前裁剪、模板和作品信息'}</p>
        </div>
        {lastSavedAt ? <span className="shrink-0 rounded-full bg-[#f6f6f6] px-2 py-1 text-[11px] text-[#8a8a8a]">已保存</span> : null}
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button className="min-w-0 px-2" icon={<Save size={15} />} variant="primary" onClick={saveCurrentDraft}>
          保存
        </Button>
        <Button className="min-w-0 px-2" icon={<RotateCcw size={15} />} onClick={resetInfo}>
          新草稿
        </Button>
      </div>
      {lastSavedAt ? <p className="text-xs leading-5 text-[#8a8a8a]">最近保存：{new Date(lastSavedAt).toLocaleString()}</p> : null}

      <details className="group overflow-hidden rounded-lg border border-[#eeeeee] bg-white">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-3 py-2 text-sm font-medium text-[#171717] [&::-webkit-details-marker]:hidden">
          <span>编辑作品信息</span>
          <ChevronDown className="shrink-0 transition-transform group-open:rotate-180" size={16} />
        </summary>
        <div className="grid gap-3 border-t border-[#eeeeee] p-3">
          <Field label="标题">
            <input className={controlClass} placeholder="未命名情头" value={info.title} onChange={(event) => updateInfo({ title: event.target.value })} />
          </Field>
          <Field label="系列">
            <input className={controlClass} value={info.seriesName} onChange={(event) => updateInfo({ seriesName: event.target.value })} />
          </Field>
          <Field label="期数">
            <input className={controlClass} value={info.issue} onChange={(event) => updateInfo({ issue: event.target.value })} />
          </Field>
          <Field label="动漫">
            <input className={controlClass} value={info.animeName} onChange={(event) => updateInfo({ animeName: event.target.value })} />
          </Field>
          <Field label="角色 A">
            <input className={controlClass} value={info.roleA} onChange={(event) => updateInfo({ roleA: event.target.value })} />
          </Field>
          <Field label="角色 B">
            <input className={controlClass} value={info.roleB} onChange={(event) => updateInfo({ roleB: event.target.value })} />
          </Field>
          <Field label="组合">
            <select className={controlClass} value={info.relationshipType} onChange={(event) => updateInfo({ relationshipType: event.target.value as RelationshipType })}>
              {relationshipLabels.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="状态">
            <select className={controlClass} value={info.status} onChange={(event) => updateInfo({ status: event.target.value as ProjectStatus })}>
              {statusLabels.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          <Field label="标签">
            <input className={controlClass} placeholder="用逗号分隔" value={info.tags.join(', ')} onChange={(event) => updateInfo({ tags: splitTags(event.target.value) })} />
          </Field>
          <Field label="备注">
            <textarea className={`${controlClass} min-h-20 resize-y`} value={info.notes} onChange={(event) => updateInfo({ notes: event.target.value })} />
          </Field>
        </div>
      </details>

      {activeDrafts.length ? (
        <div className="grid gap-2">
          <p className="text-xs font-medium text-[#8a8a8a]">最近草稿</p>
          {activeDrafts.map((draft) => (
            <DraftRow key={draft.id} draft={draft} onDelete={() => deleteDraft(draft.id)} onRestore={() => restoreCurrentDraft(draft)} />
          ))}
        </div>
      ) : null}
      {deletedDrafts.length ? (
        <div className="grid gap-2 pt-1">
          <p className="text-xs font-medium text-[#8a8a8a]">回收站</p>
          {deletedDrafts.map((draft) => (
            <button key={draft.id} className="rounded-lg border border-dashed border-[#dedede] px-3 py-2 text-left text-xs text-[#737373]" type="button" onClick={() => restoreDraft(draft.id)}>
              恢复 {draft.info.title}
            </button>
          ))}
        </div>
      ) : null}
    </section>
  )
}

function DraftRow({ draft, onDelete, onRestore }: { draft: ProjectDraft; onDelete: () => void; onRestore: () => void }) {
  return (
    <div className="grid gap-2 rounded-lg border border-[#eeeeee] bg-white p-2">
      <button className="min-w-0 rounded-md px-1 py-0.5 text-left transition hover:bg-[#f7f7f7]" type="button" onClick={onRestore}>
        <p className="truncate text-sm font-medium text-[#171717]">{draft.info.title}</p>
        <p className="mt-1 truncate text-xs text-[#737373]">{[draft.info.seriesName, draft.info.issue, draft.info.roleA, draft.info.roleB].filter(Boolean).join(' · ') || '未填写作品信息'}</p>
      </button>
      <Button className="min-h-8 justify-self-start px-2 py-1 text-xs" icon={<Trash2 size={14} />} variant="ghost" onClick={onDelete}>
        删除
      </Button>
    </div>
  )
}

function splitTags(value: string) {
  return value
    .split(/[,，]/)
    .map((tag) => tag.trim())
    .filter(Boolean)
}

function toSourceMeta(asset: ImageAsset | null): ProjectSourceImageMeta | null {
  if (!asset) return null
  return {
    name: asset.name,
    width: asset.width,
    height: asset.height,
    aspectRatio: asset.aspectRatio,
    size: asset.size,
  }
}
