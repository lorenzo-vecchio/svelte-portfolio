type ViewTransitionDocument = Document & {
	startViewTransition?: (callback: () => void | Promise<void>) => {
		ready: Promise<void>;
		finished: Promise<void>;
		updateCallbackDone: Promise<void>;
		skipTransition: () => void;
	};
};

export function toggleTheme(event?: MouseEvent) {
	const root = document.documentElement;
	const isDark = root.classList.contains('dark');
	const next = isDark ? 'light' : 'dark';

	const apply = () => {
		root.classList.toggle('dark', next === 'dark');
		root.style.colorScheme = next;
		try {
			localStorage.setItem('theme', next);
		} catch {
			/* storage can be unavailable */
		}
	};

	const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	const doc = document as ViewTransitionDocument;

	if (!doc.startViewTransition || reduceMotion) {
		apply();
		return;
	}

	const x = event?.clientX ?? window.innerWidth / 2;
	const y = event?.clientY ?? 0;
	const radius = Math.hypot(
		Math.max(x, window.innerWidth - x),
		Math.max(y, window.innerHeight - y)
	);

	root.style.setProperty('--theme-x', `${x}px`);
	root.style.setProperty('--theme-y', `${y}px`);
	root.style.setProperty('--theme-r', `${radius}px`);
	root.classList.add('theme-transition');

	const transition = doc.startViewTransition(apply);
	transition.finished.finally(() => root.classList.remove('theme-transition'));
}
