import { Transforms } from "slate"
import { ReactEditor, useSlate } from "slate-react"
import { GithubPicker } from 'react-color'
import { useState } from "react"

export const ColoredBoxToolbar = ({ element }: any): JSX.Element => {
	const editor = useSlate()
	const path = ReactEditor.findPath(editor, element)

	const [showPicker, setShowPicker] = useState(false)
	const [color, setColor] = useState(element.color)

	return (
		<>
			<div
				style={{
					display: 'inline-flex',
					position: 'relative',
				}}
			>
				<button
					type="button"
					onClick={() => {
						setShowPicker(show => !show)
					}}
				>
					Box color picker
				</button>

				{showPicker && (
					<div style={{ position: 'absolute', top: '100%', transform: 'translateY(10px)' }}>
						<GithubPicker
							color={color}
							onChange={(color: any) => {
								setColor(color)
								Transforms.setNodes(editor, { color: color.hex }, { at: path })
							}}
						/>
					</div>
				)}

				{/* <input
					type="color"
					value={element.color}
					onChange={(e) => {
						Transforms.setNodes(editor, { color: e.target.value }, { at: path })
					}}
				/> */}

			</div>
			<button style={{ marginLeft: 'auto', order: 99 }}>
				Remove
			</button>
		</>
	)
}