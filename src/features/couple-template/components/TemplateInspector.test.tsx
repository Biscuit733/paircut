import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'
import { originalDoubleCircleDark } from '../templates/originalDoubleCircleDark'
import { cloneTemplate } from '../utils/scaleTemplate'
import { useCoupleTemplateStore } from '../store/useCoupleTemplateStore'
import { TemplateInspector } from './TemplateInspector'

afterEach(() => cleanup())

describe('TemplateInspector', () => {
  it('shows compact generated dimensions for selected text elements', () => {
    useCoupleTemplateStore.setState({
      workingTemplate: cloneTemplate(originalDoubleCircleDark),
      selectedElementId: 'subtitle',
    })

    render(<TemplateInspector />)

    expect(screen.getByLabelText('高')).toHaveValue(52.2)
  })
})
