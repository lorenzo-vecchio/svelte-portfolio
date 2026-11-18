interface RevealOptions {
	delay?: number;
	scribe?: boolean;
}

/**
 * Reveals an element once it enters the viewport. If JS is unavailable the
 * element stays visible: the pending state is only added from this action.
 */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	if (typeof window === 'undefined') return;
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
	if (!('IntersectionObserver' in window)) return;

	if (options.scribe) node.classList.add('scribe');
	node.style.setProperty('--reveal-delay', `${options.delay ?? 0}ms`);
	node.dataset.reveal = 'pending';

	// IntersectionObserver uses the visible area; an element clipped to zero
	// (the scribe heading) would never intersect. Watch its parent instead.
	const observed = options.scribe ? (node.parentElement ?? node) : node;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				node.dataset.reveal = 'visible';
				observer.disconnect();
			}
		},
		{ rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
	);

	observer.observe(observed);

	// IntersectionObserver can miss elements that are already in view when the
	// page is restored or navigated to directly. Check the initial geometry too.
	const rect = observed.getBoundingClientRect();
	if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
		requestAnimationFrame(() => {
			node.dataset.reveal = 'visible';
			observer.disconnect();
		});
	}
	return {
		destroy() {
			observer.disconnect();
		}
	};
}
