/**
 * @typedef {import('rollup').RollupOptions} RollupOptions
 */

import postcss from 'rollup-plugin-postcss';
import terser from '@rollup/plugin-terser';

const [pkgName, pkgVersion] = [
	process.env.npm_package_name,
	process.env.npm_package_version,
];

/** @type {RollupOptions} */
export default {
	input: 'src/index.js',
	output: [
		{
			file: `dist/${pkgName}.js`,
			format: 'es',
		},
		{
			file: `dist/${pkgName}.min.js`,
			format: 'es',
			plugins: [terser()],
		},
	],
	plugins: [
		postcss({
			extract: `${pkgName}.min.css`,
			minimize: true,
		}),
	],
};
