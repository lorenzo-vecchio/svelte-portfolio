/**
 * A small, scroll-linked vertical parallax. Sets --parallax on the node; the
 * consuming CSS decides how far the content travels (usually an oversized img
 * inside a clipped frame).
 */
export function parallax(node: HTMLElement, strength = 16) {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	let frame = 0;

	const update = () => {
		frame = 0;
		const rect = node.getBoundingClientRect();
		const viewport = window.innerHeight;
		if (rect.bottom < -120 || rect.top > viewport + 120) return;

		const progress = (rect.top + rect.height / 2 - viewport / 2) / viewport;
		const offset = Math.max(-1, Math.min(1, progress)) * strength;
		node.style.setProperty('--parallax', `${offset.toFixed(1)}px`);
	};

	const onScroll = () => {
		if (frame) return;
		frame = requestAnimationFrame(update);
	};

	update();
	window.addEventListener('scroll', onScroll, { passive: true });
	window.addEventListener('resize', onScroll);

	return {
		destroy() {
			window.cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		}
	};
}
