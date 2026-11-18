import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

export default defineConfig({
	plugins: [
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			// The URL is the only source of truth. No locale cookie is set, so
			// the privacy policy's "no cookie banner" statement stays literal.
			strategy: ['url', 'baseLocale'],
		}),
		tailwindcss(),
		sveltekit(),
	]
});
