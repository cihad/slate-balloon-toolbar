import typescript from '@rollup/plugin-typescript'
import packageJson from './package.json'

export default {
	input: 'src/toolbar/index.ts',
	output: {
		file: packageJson.main,
		format: 'cjs',
		sourcemap: true,
	},
	plugins: [
		typescript(),
	],
}