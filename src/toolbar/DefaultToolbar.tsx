import React, { useEffect, useRef, useState } from 'react'
import { Node, Path } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import styles from './DefaultToolbar.module.css'
import { ToolbarComponentProps } from './ToolbarProvider'

export const DefaultToolbar: React.FunctionComponent<ToolbarComponentProps> = ({ elements }) => {
	const editor = useSlate()
	const toolbarRef = useRef<HTMLDivElement>(null)
	const [lowestPath, setLowestPath] = useState<Path|null>(null)

	useEffect(() => {
		if (elements.length) {
			setLowestPath(elements[0].path)
		} else {
			setLowestPath(null)
		}
	}, [elements])

	useEffect(() => {
		if (!lowestPath) return
		if (!toolbarRef.current) return
		const node = Node.get(editor, lowestPath)
		const elementDOM = ReactEditor.toDOMNode(editor as ReactEditor, node)
		;(toolbarRef.current as HTMLElement).style.removeProperty('transform')
		const {
			x: targetX,
			y: targetY,
			width: targetWidth
		} = elementDOM.getBoundingClientRect()
		const {
			x: refX,
			y: refY,
			height: refHeight
		} = (toolbarRef.current as HTMLElement).getBoundingClientRect()
		const translateX = targetX - refX
		const translateY = targetY - refY - refHeight
		;(toolbarRef.current as HTMLElement).style.setProperty(
			'transform',
			`translate(${translateX}px, ${translateY}px)`
		)
		;(toolbarRef.current as HTMLElement).style.setProperty(
			'width',
			`${targetWidth}px`
		)
	}, [lowestPath])

  return (
    <div
		className={`${styles.toolbar} ${elements.length ? '' : styles.hide}`}
		ref={toolbarRef}
    >
    	{elements.map(({ toolbar }) => toolbar)}
    </div>
  )
}
