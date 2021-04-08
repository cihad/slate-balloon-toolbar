import { css } from '@emotion/css'

export const ImageElement = ({ element, attributes , children }: any) => {
	return (
		<div {...attributes}>
			<div contentEditable={false}>
				<img
					src={element.url}
					alt=""
					className={css`
						max-width: 100%;
					`}
				/>
			</div>
			{children}
		</div>
	)
}