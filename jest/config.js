/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
	clearMocks: true,
	rootDir: '../',
	setupFilesAfterEnv: ['<rootDir>/jest/setup.js'],
	// The test environment that will be used for testing
	testEnvironment: 'jsdom',
	transform: {
		'^.+\\.m?js$': '@swc/jest',
		'\\.(s?css|jpe?g|png|gif|eot|otf|webp|svg|ttf|woff?2|mp4|webm|wav|mp3|m4a|aac|oga)$':
			'<rootDir>/jest/transform-stub.js',
	},
};

export default config;
