import React, { useState, useCallback } from 'react'
import { ToolbarContext } from './ToolbarContext'
import { DefaultToolbar } from './DefaultToolbar'
import { Path } from 'slate'

export interface PathToolbarDuple {
	path: Path
	toolbar: React.ReactNode
}

export interface ToolbarProviderProps {
	children: React.ReactNode
	toolbar: React.FunctionComponent<ToolbarComponentProps>
}

export interface ToolbarComponentProps {
	elements: PathToolbarDuple[]
}

export const ToolbarProvider = ({
	children,
	toolbar = DefaultToolbar
}: ToolbarProviderProps) => {
	const [toolbarElements, setToolbarElements] = useState<PathToolbarDuple[]>([])

	const addToolbar = useCallback((path: Path, toolbar: JSX.Element) => {
		setToolbarElements((toolbarElements) => {
		const index = toolbarElements.findIndex(({ path: p }) =>
			Path.equals(p, path)
		)

		if (index > -1) {
			return toolbarElements
		} else {
			const toolbarEls = [...toolbarElements]
			return [...toolbarEls, { path, toolbar }]
		}
		})
	}, [])

	const removeToolbar = useCallback((path: Path) => {
		setToolbarElements((value) => {
			const index = value.findIndex(({ path: p }) => Path.equals(p, path))

			if (index > -1) {
				console.log('index', index, 'path', path)
				const toolbarEls = [...value]
				toolbarEls.splice(index, 1)
				return toolbarEls
			} else {
				return value
			}
		})
	}, [])

	const Toolbar = toolbar

	return (
		<ToolbarContext.Provider value={{ addToolbar, removeToolbar }}>
		<Toolbar elements={toolbarElements} />
		{children}
		</ToolbarContext.Provider>
	)
}
