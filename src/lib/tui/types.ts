/**
 * Shared TUI domain types.
 *
 * Kept free of Svelte/Kit imports so every module (state, keymap, search,
 * components) can depend on it without creating cycles.
 */

/** A navigable "file" in the TUI — one per portfolio page. */
export interface TuiSection {
	/** Stable identifier, also used in `data-` hooks. */
	id: string;
	/** SvelteKit route path, matching `page.route.id`, e.g. `/tui/projects`. */
	path: string;
	/** Localized display label. */
	label: string;
	/** Fake filename shown in the explorer, e.g. `projects.ts`. */
	filename: string;
	/** Filetype shown in the statusline. */
	filetype: string;
	/** Single-character tab shortcut. */
	tabKey: string;
}

/** Overlays that capture keyboard focus on top of the shell. */
export type TuiOverlay = 'none' | 'whichkey' | 'palette' | 'search' | 'help';

export type TuiCommandGroup = 'navigation' | 'site' | 'interface';

/** An executable action surfaced in the palette, which-key and help. */
export interface TuiCommand {
	id: string;
	group: TuiCommandGroup;
	label: string;
	/** What the command does, in plain language. */
	description: string;
	/** Chord shown to the user, e.g. `p`, `g g`, `?`. */
	chord: string;
	run: () => void;
}

/** A single key → command mapping. Chords are space-separated tokens. */
export interface KeyBinding {
	chord: string;
	commandId: string;
}

/** A fuzzy-searchable entry built from the portfolio data. */
export interface SearchResult {
	id: string;
	kind: 'section' | 'project' | 'skill' | 'experience' | 'command';
	title: string;
	subtitle: string;
	commandId?: string;
}
