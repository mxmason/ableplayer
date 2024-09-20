import { startDevServer } from '@web/dev-server';

startDevServer({
	config: {
		port: 8080,
		nodeResolve: true,
		rootDir: process.cwd(),
		watch: true,
		open: '/demos/index.html',
	},
});
