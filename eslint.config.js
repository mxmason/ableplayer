import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginJest from 'eslint-plugin-jest';
import js from '@eslint/js';

export default [
	js.configs.recommended,
	eslintConfigPrettier,
	{
		files: ['*.js'],
		languageOptions: {
			globals: {
				...globals.node,
			},
		},
	},
	{
		files: ['src/**/*.js'],
		languageOptions: {
			globals: {
				...globals.node,
				...globals.browser,
			},
			sourceType: 'module',
		},
	},
	{
		files: ['src/**/*.test.js'],
		plugins: { jest: eslintPluginJest },
		languageOptions: {
			globals: {
				...globals.jest,
			},
		},
	},
	{
		rules: {
			'no-console': 'warn',
		},
	},
	{
		ignores: ['dist/', 'node_modules/'],
	},
];
