import { useState, useEffect, useMemo } from 'react'
import { DefaultBalloonToolbar } from './DefaultBalloonToolbar'
import { Editor, Path } from 'slate'
import { useSlate } from 'slate-react'
import { BalloonToolbarProviderProps, PathToolbarDuple } from './types'
import { isToolbarSuitable } from './utils'

export const BalloonToolbarProvider = (props: BalloonToolbarProviderProps) => {
	const { renderToolbar = DefaultBalloonToolbar, registry } = props
	const editor = useSlate()
	const [toolbarElements, setToolbarElements] = useState<PathToolbarDuple[]>([])
	const [lowestPath, setLowestPath] = useState<Path|null>(null)

	useEffect(() => {
		if (!editor.selection) {
			setToolbarElements([])
			return
		}
		const toolbarTypes = Object.keys(registry)
		let nodes: any[] = Array.from(
			Editor.nodes(
				editor,
				{
					match: n => {
						return Editor.isBlock(editor, n) && toolbarTypes.includes(n.type as string)
					},
					at: editor.selection
				}
			)
		)

		if (!isToolbarSuitable(editor, registry)) {
			setToolbarElements([])
			return
		}

		const elements = Array.from(nodes).map(([node, path]) => {
			const Element = registry[node.type as string]

			return {
				path,
				toolbar: <Element element={node} key={path} />
			}
		})
		setToolbarElements(elements)
	}, [registry, editor.selection])


	useEffect(() => {
		if (!toolbarElements.length) {
			setLowestPath(null)
			return
		}

		const els = [...toolbarElements]
		els.sort((a, b) => a.path.length - b.path.length)
		setLowestPath(els[0].path)
	}, [toolbarElements])

	const isVisible = useMemo(() => {
		const els = [...toolbarElements]
		if (!els.length) return false
		els.sort((a, b) => a.path.length - b.path.length)
		const [firstDuple, secondDuple] = els
		if (!secondDuple) return true
		if (firstDuple.path.length === secondDuple.path.length) return false
		return true
	}, [toolbarElements])

	return renderToolbar({
		path: lowestPath,
		children: toolbarElements.map(({ toolbar }) => toolbar),
		show: isVisible
	})
}
