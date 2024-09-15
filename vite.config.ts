import path from "node:path";
import { defineConfig } from "vite";
import biomePlugin from "vite-plugin-biome";
import solid from "vite-plugin-solid";

export default defineConfig({
	plugins: [
		solid(),
		biomePlugin({
			biomeCommandBase: "bunx @biomejs/biome",
			mode: "check",
			files: ".",
			applyFixes: true,
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
