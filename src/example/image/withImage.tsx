import { ReactEditor } from "slate-react";

export const withImage = (editor: ReactEditor) => {
	const { isVoid } = editor
	editor.isVoid = n => n.type === 'image' || isVoid(n)
	return editor
}