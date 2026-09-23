import type { TuiOverlay } from './types';

const HINT_STORAGE_KEY = 'tui-intro-dismissed';

/**
 * Global, reactive UI state for the TUI. One instance is shared by the shell,
 * the keyboard dispatcher and every overlay so they stay in sync.
 */
class TuiState {
	/** Currently visible overlay. */
	overlay = $state<TuiOverlay>('none');

	/** Index of the highlighted row in the explorer. */
	explorerIndex = $state(0);

	/** Command palette state. */
	paletteQuery = $state('');
	paletteIndex = $state(0);

	/** Search overlay state. */
	searchQuery = $state('');
	searchIndex = $state(0);

	/** Transient message shown in the statusline. */
	statusMessage = $state('');

	/** Whether the mobile sidebar is open. */
	sidebarOpen = $state(false);

	/** First-visit onboarding hint. */
	hintDismissed = $state(false);

	private statusTimer: ReturnType<typeof setTimeout> | null = null;

	constructor() {
		if (typeof window !== 'undefined') {
			this.hintDismissed = window.localStorage.getItem(HINT_STORAGE_KEY) === '1';
		}
	}

	get overlayOpen(): boolean {
		return this.overlay !== 'none';
	}

	openOverlay(overlay: Exclude<TuiOverlay, 'none'>): void {
		this.overlay = overlay;
	}

	closeOverlay(): void {
		this.overlay = 'none';
	}

	toggleOverlay(overlay: Exclude<TuiOverlay, 'none'>): void {
		this.overlay = this.overlay === overlay ? 'none' : overlay;
	}

	toggleSidebar(): void {
		this.sidebarOpen = !this.sidebarOpen;
	}

	closeSidebar(): void {
		this.sidebarOpen = false;
	}

	resetPalette(): void {
		this.paletteQuery = '';
		this.paletteIndex = 0;
	}

	resetSearch(): void {
		this.searchQuery = '';
		this.searchIndex = 0;
	}

	/** Show a message in the statusline for a short while. */
	flash(message: string): void {
		this.statusMessage = message;
		if (this.statusTimer) clearTimeout(this.statusTimer);
		this.statusTimer = setTimeout(() => {
			this.statusMessage = '';
		}, 2200);
	}

	dismissHint(): void {
		this.hintDismissed = true;
		if (typeof window !== 'undefined') {
			window.localStorage.setItem(HINT_STORAGE_KEY, '1');
		}
	}
}

export const tui = new TuiState();
