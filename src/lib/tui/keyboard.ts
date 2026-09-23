import { goto } from '$app/navigation';
import { page } from '$app/state';
import { findCommand } from './commands';
import { eventToToken, getDirectKeymap, getLeaderKeymap } from './keymap';
import { getSections, sectionHref } from './sections';
import { tui } from './state.svelte';

/** True when the event originates from a real text field (which owns its keys). */
function isTypingTarget(target: EventTarget | null): boolean {
	return (
		target instanceof HTMLInputElement ||
		target instanceof HTMLTextAreaElement ||
		(target instanceof HTMLElement && target.isContentEditable)
	);
}

function runCommand(id: string): void {
	findCommand(id)?.run();
}

function moveExplorer(delta: number): void {
	const count = getSections().length;
	tui.explorerIndex = (tui.explorerIndex + delta + count) % count;
}

function openExplorerSelection(): void {
	const section = getSections()[tui.explorerIndex];
	if (section) void goto(sectionHref(section));
}

function moveTab(delta: number): void {
	const sections = getSections();
	if (sections.length === 0) return;
	const current = sections.findIndex((section) => section.path === page.route.id);
	const next = ((current < 0 ? 0 : current) + delta + sections.length) % sections.length;
	void goto(sectionHref(sections[next]));
}

/**
 * Global keyboard entry point. Mount it once, on the TUI shell.
 *
 * The dispatcher is intentionally thin: it turns keys into intents and defers
 * to the keymaps/commands. Nothing here knows *what* a command does.
 */
export function handleGlobalKeydown(event: KeyboardEvent): void {
	if (isTypingTarget(event.target)) return;

	const token = eventToToken(event);
	if (!token) return;

	// While the which-key menu is open, any key resolves to a leader binding.
	if (tui.overlay === 'whichkey') {
		event.preventDefault();
		const binding = getLeaderKeymap().find((entry) => entry.chord === token);
		if (binding) runCommand(binding.commandId);
		else tui.closeOverlay();
		return;
	}

	// List/tab navigation is only meaningful in normal mode.
	if (tui.overlay === 'none') {
		switch (token) {
			case 'j':
			case 'down':
				event.preventDefault();
				moveExplorer(1);
				return;
			case 'k':
			case 'up':
				event.preventDefault();
				moveExplorer(-1);
				return;
			case 'enter':
				event.preventDefault();
				openExplorerSelection();
				return;
			case 'h':
			case 'left':
				event.preventDefault();
				moveTab(-1);
				return;
			case 'l':
			case 'right':
				event.preventDefault();
				moveTab(1);
				return;
		}
	}

	const binding = getDirectKeymap().find((entry) => entry.chord === token);
	if (binding) {
		event.preventDefault();
		runCommand(binding.commandId);
	}
}
