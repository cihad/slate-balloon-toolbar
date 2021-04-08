import { FC } from 'react'

export const CaptionElement: FC<any> = ({ attributes, element, children }) => {
	return (
		<figcaption {...attributes}>
			{children}
		</figcaption>
	)
}