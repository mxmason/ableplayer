/**
 * @typedef {import('rollup').RollupOptions} RollupOptions
 */
import copy from 'rollup-plugin-copy';
import css from 'rollup-plugin-css-only';
import image from '@rollup/plugin-image';
import livereload from 'rollup-plugin-livereload';
import nodeResolve from '@rollup/plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import serve from 'rollup-plugin-serve';
import terser from '@rollup/plugin-terser';

const pkgName = process.env.npm_package_name;
const isProd = !process.env.ROLLUP_WATCH;
const outputDir = 'dist';

/** @type {RollupOptions[]} */
export default [
	{
		input: 'src/index.js',
		output: [
			{
				file: `${outputDir}/${pkgName}.js`,
				format: 'es',
			},
			{
				file: `${outputDir}/${pkgName}.min.js`,
				format: 'es',
				plugins: [terser()],
			},
		],
		plugins: [
			nodeResolve(),
			postcss({
				extract: `${pkgName}.css`,
				minimize: isProd,
			}),
			image(),
			copy({
				targets: [{ src: 'demos/*', dest: outputDir }],
			}),
			replace({
				preventAssignment: true,
				'process.env.NODE_ENV': JSON.stringify(
					isProd ? 'production' : 'development',
				),
			}),
			!isProd &&
				serve({
					contentBase: outputDir,
					port: 8080,
				}),
			!isProd &&
				livereload({
					watch: outputDir,
					port: 8080,
				}),
		],
	},
	// Demo styles. This JS file only exists
	// to import the CSS file so that Rollup will process it.
	{
		input: 'demos/styles.js',
		output: {
			assetFileNames: 'demo-styles.css',
			file: 'dist/demo-styles.js',
			format: 'es',
		},
		plugins: [css()],
	},
];
