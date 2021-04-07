import { createContext } from 'react'
import { Path } from 'slate'

export interface ToolbarContextInterface {
	addToolbar: (path: Path, element: JSX.Element) => void,
	removeToolbar: (path: Path) => void
}

export const ToolbarContext = createContext<ToolbarContextInterface | null>(null)
