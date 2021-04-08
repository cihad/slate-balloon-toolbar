import { FC } from 'react'

export const ColoredBoxElement: FC<any> = ({ attributes, element, children }) => {
	return (
		<div
			{...attributes}
			style={{
				backgroundColor: element.color,
				padding: 20,
				boxSizing: 'border-box',
				marginBottom: '15px'
			}}
		>
			{children}
		</div>
	)
}