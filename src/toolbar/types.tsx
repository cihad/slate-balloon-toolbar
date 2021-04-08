import React from "react";
import { Path } from "slate";

export interface PathToolbarDuple {
	path: Path
	toolbar: React.ReactNode
}

export interface BalloonToolbarComponentProps {
	children: React.ReactNode
	path: Path | null
	show: boolean
}

export interface BalloonToolbarProviderProps {
	registry: {
		[key: string]: ({ element }: any) => JSX.Element
	}
	renderToolbar?: (props: BalloonToolbarComponentProps) => JSX.Element | null
}
