import { useContext } from 'react'
import { ToolbarContext } from './ToolbarContext'
import { Element } from 'slate'
import { ReactEditor, useSlate, useSelected } from 'slate-react'

export const useToolbar = (element: Element, toolbar: JSX.Element) => {
  const toolbarContext = useContext(ToolbarContext)
  const editor = useSlate()
  const path = ReactEditor.findPath(editor as ReactEditor, element)
  const selected = useSelected()

  if (selected) {
    toolbarContext!.addToolbar(path, toolbar)
  } else {
    toolbarContext!.removeToolbar(path)
  }
}
