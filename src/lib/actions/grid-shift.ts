/**
 * Slow vertical drift for the fixed sheet grid. The layer is oversized by one
 * grid module and the offset wraps, so the transform can stay compositor-only.
 */
export function gridShift(node: HTMLElement, factor = 0.16) {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	let frame = 0;
	const module = 120;

	const update = () => {
		frame = 0;
		const offset = -((window.scrollY * factor) % module);
		node.style.setProperty('--grid-y', `${offset.toFixed(1)}px`);
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
