/**
 * Shows a technical crosshair over the system plate and reports local
 * coordinates in the SVG's viewBox (680 × 540).
 */
export function plateInspect(
	node: HTMLElement,
	onMove?: (x: number, y: number) => void
) {
	if (typeof window === 'undefined') return;

	const enter = () => {
		node.dataset.inspect = 'true';
	};

	const leave = () => {
		node.dataset.inspect = 'false';
	};

	const move = (event: PointerEvent) => {
		if (event.pointerType === 'touch') return;
		const rect = node.getBoundingClientRect();
		if (!rect.width || !rect.height) return;
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;
		node.style.setProperty('--cx', `${x}px`);
		node.style.setProperty('--cy', `${y}px`);
		node.dataset.inspect = 'true';
		onMove?.((x / rect.width) * 680, (y / rect.height) * 540);
	};

	node.addEventListener('pointerenter', enter);
	node.addEventListener('pointerleave', leave);
	node.addEventListener('pointermove', move);

	return {
		destroy() {
			node.removeEventListener('pointerenter', enter);
			node.removeEventListener('pointerleave', leave);
			node.removeEventListener('pointermove', move);
		}
	};
}
