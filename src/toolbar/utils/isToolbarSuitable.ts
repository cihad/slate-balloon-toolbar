import { Editor, Node, Path } from "slate"
import { ReactEditor } from "slate-react"


export const isToolbarSuitable = (editor: ReactEditor, registry: any) => {
	const hasRegistry = (node: any) => {
		return Editor.isBlock(editor, node) && node.type && registry[node.type as string]
	}

	if (!editor.selection) return false

	const { anchor, focus } = editor.selection

	let commonPath: Path|null = Path.common(anchor.path, focus.path)
	let node = Node.get(editor, commonPath)
	if (hasRegistry(node)) return true

	while (commonPath) {
		try {
			[node, commonPath] = Editor.parent(editor, commonPath)
		} catch {
			commonPath = null
		}
		if (hasRegistry(node)) return true
	}

	return false
}