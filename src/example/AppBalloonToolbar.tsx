import { useState, useRef, useEffect } from 'react'
import { css } from '@emotion/css'
import { usePopper } from 'react-popper';
import { Node } from 'slate';
import { useSlate } from 'slate-react';
import { ReactEditor } from 'slate-react';
import { BalloonToolbarComponentProps } from '../toolbar'

export const AppBalloonToolbar = (props: BalloonToolbarComponentProps) => {
	const { children, path, show } = props
	const editor = useSlate()
	const [referenceElement, setReferenceElement] = useState<HTMLElement|null>(null);
	const balloonElement = useRef<HTMLDivElement>(null)
	const { styles, attributes } = usePopper(referenceElement, balloonElement.current, {
		placement: 'top',
		modifiers: [
			{
				name: 'flip',
				enabled: false,
			},
			{
				name: 'offset',
				options: {
					offset: [0, 5]
				}
			}
		]
	});

	useEffect(() => {
		if (!path) {
			setReferenceElement(null)
			return
		}
		const node = Node.get(editor, path)
		const dom = ReactEditor.toDOMNode(editor, node)
		setReferenceElement(dom)
	}, [path])

	if (!show) return null

	return (
		<div
			ref={balloonElement}
			onMouseDown={(e) => {e.preventDefault()}}
			className={css`
				display: flex;
				background: black;
				color: #fff;
				padding: .4em;
				border-radius: .2em;
				height: 35px;
				box-sizing: border-box;
				z-index: 1;
			`}
			style={{ width: referenceElement?.offsetWidth, ...styles.popper}}
			{...attributes.popper}
		>
			{children}
		</div>
	)
}