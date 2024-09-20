import globals from 'globals';
import eslintConfigPrettier from 'eslint-config-prettier';
import js from '@eslint/js';

export default [
	js.configs.recommended,
	eslintConfigPrettier,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				'jest/globals': true,
				$: true,
				AblePlayer: true,
				jQuery: true,
			},
		},
		rules: {
			'no-empty': 'off',
			'no-prototype-builtins': 'off',
			'no-redeclare': 'off',
			'no-undef': 'off',
			'no-unused-vars': 'off',
		},
	},
	{
		ignores: ['build/', 'node_modules/'],
	},
];
