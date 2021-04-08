import { useEffect, useRef } from 'react'
import { Node } from 'slate'
import { ReactEditor, useSlate } from 'slate-react'
import { css } from '@emotion/css'
import { BalloonToolbarComponentProps } from './types'

export const DefaultBalloonToolbar = (props: BalloonToolbarComponentProps) => {
	const { children, path, show } = props
	const editor = useSlate()
	const toolbarRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!path) return
		if (!toolbarRef.current) return
		const node = Node.get(editor, path)
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
	}, [editor, path])


	if (!show) return null

	return (
		<div
			onMouseDown={(e) => {e.preventDefault()}}
			className={css`
				position: absolute;
				display: flex;
				background: black;
				color: #f0f0f0;
				padding: 5px;
				height: 30px;
				box-sizing: border-box;
				border-radius: 4px;
				z-index: 1;
			`}
			ref={toolbarRef}
		>
			{children}
		</div>
	)
}
