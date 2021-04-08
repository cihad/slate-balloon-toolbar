import { Transforms } from 'slate'
import { useSlate, ReactEditor } from 'slate-react'

export type EmptyText = {
	text: string
}

export interface ImageElementInterface {
	type: 'image'
	url: string
	children: EmptyText[]
}

export const ImageToolbar = ({ element }: any) => {
	const editor = useSlate() as ReactEditor
	const path = ReactEditor.findPath(editor, element)

	return (
		<>
			<button
				type="button"
				onClick={() => {
					const url = window.prompt("Image URL")

					if (!url) return
					Transforms.setNodes(editor, {url} as Partial<ImageElementInterface>, { at: path })
				}}
			>
				Change image URL
			</button>
		</>
	)
}