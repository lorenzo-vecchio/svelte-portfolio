import { getSections } from './sections';
import type { KeyBinding } from './types';

/**
 * Normalizes a keyboard event into a small, comparable token.
 * Returns `null` for keys the TUI does not care about.
 */
export function eventToToken(event: KeyboardEvent): string | null {
	if (event.ctrlKey && event.key.toLowerCase() === 'k') return 'ctrl+k';

	switch (event.key) {
		case ' ':
			return 'space';
		case 'Escape':
			return 'esc';
		case 'Enter':
			return 'enter';
		case 'ArrowUp':
			return 'up';
		case 'ArrowDown':
			return 'down';
		case 'ArrowLeft':
			return 'left';
		case 'ArrowRight':
			return 'right';
	}

	if (event.key.length === 1) return event.key.toLowerCase();
	return null;
}

/** Section jumps: the number row is always available. */
function sectionBindings(): KeyBinding[] {
	return getSections().map((section) => ({
		chord: section.tabKey,
		commandId: `go.${section.id}`,
	}));
}

/**
 * Keys that work straight from normal mode. Kept small and safe so that
 * curious/accidental typing never triggers destructive actions.
 */
export function getDirectKeymap(): KeyBinding[] {
	return [
		...sectionBindings(),
		{ chord: ':', commandId: 'ui.palette' },
		{ chord: 'ctrl+k', commandId: 'ui.palette' },
		{ chord: '/', commandId: 'ui.search' },
		{ chord: '?', commandId: 'ui.help' },
		{ chord: 'space', commandId: 'ui.menu' },
		{ chord: 'b', commandId: 'ui.sidebar' },
		{ chord: 't', commandId: 'ui.theme' },
		{ chord: 'esc', commandId: 'ui.back' },
		{ chord: 'q', commandId: 'ui.back' },
	];
}

/** Keys offered inside the which-key menu (after pressing Space). */
export function getLeaderKeymap(): KeyBinding[] {
	return [
		...sectionBindings(),
		{ chord: 'w', commandId: 'site.open' },
		{ chord: 'o', commandId: 'site.projects' },
		{ chord: 'r', commandId: 'site.privacy' },
		{ chord: 'y', commandId: 'site.copy-email' },
		{ chord: ':', commandId: 'ui.palette' },
		{ chord: '/', commandId: 'ui.search' },
		{ chord: '?', commandId: 'ui.help' },
		{ chord: 'b', commandId: 'ui.sidebar' },
		{ chord: 't', commandId: 'ui.theme' },
		{ chord: 'q', commandId: 'ui.back' },
	];
}
