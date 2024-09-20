/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  clearMocks: true,
	setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
	transform: {
		"^.+\\.m?js$": "@swc/jest",
	},
};

export default config;
