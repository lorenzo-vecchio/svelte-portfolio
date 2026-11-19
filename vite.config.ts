import tailwindcss from '@tailwindcss/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';

// Revision stamp for the whole sheet, in the drawing convention YYYY.MM.
// It is resolved once when the build (or the dev server) starts, so every
// deployment carries the month it was produced in.
const builtAt = new Date();
const revision = `${builtAt.getFullYear()}.${String(builtAt.getMonth() + 1).padStart(2, '0')}`;

export default defineConfig({
	define: {
		__BUILD_REVISION__: JSON.stringify(revision)
	},
	plugins: [
		enhancedImages(),
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
