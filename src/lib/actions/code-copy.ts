interface CodeCopyOptions {
	copyLabel: string;
	copiedLabel: string;
}

/** Adds a keyboard-accessible copy control to every code block in a README. */
export function enhanceCode(node: HTMLElement, options: CodeCopyOptions) {
	if (typeof window === 'undefined') return;

	const buttons: HTMLButtonElement[] = [];

	for (const pre of node.querySelectorAll<HTMLPreElement>('pre')) {
		if (pre.querySelector('.code-copy')) continue;

		const button = document.createElement('button');
		button.type = 'button';
		button.className = 'code-copy';
		button.textContent = options.copyLabel;
		button.setAttribute('aria-label', options.copyLabel);

		button.addEventListener('click', async () => {
			const code = pre.querySelector('code')?.innerText ?? pre.innerText;
			try {
				await navigator.clipboard.writeText(code);
				button.textContent = options.copiedLabel;
				button.dataset.copied = 'true';
				window.setTimeout(() => {
					button.textContent = options.copyLabel;
					delete button.dataset.copied;
				}, 1600);
			} catch {
				button.textContent = options.copyLabel;
			}
		});

		pre.appendChild(button);
		buttons.push(button);
	}

	return {
		destroy() {
			for (const button of buttons) button.remove();
		}
	};
}
