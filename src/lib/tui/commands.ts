import { goto } from '$app/navigation';
import { toggleMode } from 'mode-watcher';
import * as m from '$lib/paraglide/messages';
import { localizeHref } from '$lib/paraglide/runtime';
import { contacts } from '$lib/conf';
import { getSections } from './sections';
import { tui } from './state.svelte';
import type { TuiCommand } from './types';

/**
 * Every action the TUI can perform. Commands are pure descriptions + a `run`
 * callback; the keymap decides how they are triggered and the overlays decide
 * how they are presented.
 */
export function getCommands(): TuiCommand[] {
	const navigate = (href: string) => () => {
		tui.closeOverlay();
		tui.closeSidebar();
		void goto(localizeHref(href));
	};

	const navigation: TuiCommand[] = getSections().map((section) => ({
		id: `go.${section.id}`,
		group: 'navigation',
		label: section.label,
		description: `${m.tui_open()} ${section.label}`,
		chord: section.tabKey,
		run: navigate(section.path),
	}));

	const site: TuiCommand[] = [
		{
			id: 'site.open',
			group: 'site',
			label: m.tui_open_main_site(),
			description: m.tui_open_main_site(),
			chord: 'w',
			run: navigate('/'),
		},
		{
			id: 'site.projects',
			group: 'site',
			label: m.tui_open_projects(),
			description: m.tui_open_projects(),
			chord: 'o',
			run: navigate('/projects'),
		},
		{
			id: 'site.privacy',
			group: 'site',
			label: m.tui_open_privacy(),
			description: m.tui_open_privacy(),
			chord: 'r',
			run: navigate('/privacy'),
		},
		{
			id: 'site.copy-email',
			group: 'site',
			label: m.tui_yank_email(),
			description: contacts.email,
			chord: 'y',
			run: async () => {
				try {
					await navigator.clipboard.writeText(contacts.email);
					tui.flash(m.tui_yank_email());
				} catch {
					tui.flash(contacts.email);
				}
			},
		},
	];

	const interfaceCommands: TuiCommand[] = [
		{
			id: 'ui.palette',
			group: 'interface',
			label: m.tui_commands(),
			description: m.tui_desc_palette(),
			chord: ':',
			run: () => {
				tui.resetPalette();
				tui.openOverlay('palette');
			},
		},
		{
			id: 'ui.search',
			group: 'interface',
			label: m.tui_search(),
			description: m.tui_desc_search(),
			chord: '/',
			run: () => {
				tui.resetSearch();
				tui.openOverlay('search');
			},
		},
		{
			id: 'ui.menu',
			group: 'interface',
			label: m.tui_menu(),
			description: m.tui_desc_menu(),
			chord: 'space',
			run: () => tui.openOverlay('whichkey'),
		},
		{
			id: 'ui.help',
			group: 'interface',
			label: m.tui_help(),
			description: m.tui_desc_help(),
			chord: '?',
			run: () => tui.openOverlay('help'),
		},
		{
			id: 'ui.sidebar',
			group: 'interface',
			label: m.tui_explorer(),
			description: m.tui_desc_sidebar(),
			chord: 'b',
			run: () => tui.toggleSidebar(),
		},
		{
			id: 'ui.theme',
			group: 'interface',
			label: m.tui_desc_theme(),
			description: m.tui_desc_theme(),
			chord: 't',
			run: () => {
				toggleMode();
				tui.flash(m.tui_desc_theme());
			},
		},
		{
			id: 'ui.back',
			group: 'interface',
			label: m.tui_back(),
			description: m.tui_desc_back(),
			chord: 'esc',
			run: () => {
				if (tui.overlayOpen) {
					tui.closeOverlay();
					return;
				}
				if (typeof window !== 'undefined' && window.history.length > 1) {
					window.history.back();
				}
			},
		},
	];

	return [...navigation, ...site, ...interfaceCommands];
}

/** Look up a command by id in a freshly built registry. */
export function findCommand(id: string): TuiCommand | undefined {
	return getCommands().find((command) => command.id === id);
}

export type { TuiCommand };
