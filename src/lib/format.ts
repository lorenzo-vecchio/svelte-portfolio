import { getLocale } from '$lib/paraglide/runtime';

export function textLocale(): string {
	return getLocale() === 'it' ? 'it-IT' : 'en-GB';
}

export function formatDate(value: string | Date): string {
	const date = typeof value === 'string' ? new Date(value) : value;
	if (Number.isNaN(date.getTime())) return '—';
	return new Intl.DateTimeFormat(textLocale(), {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(date);
}

export function formatNumber(value: number): string {
	return new Intl.NumberFormat(textLocale()).format(value);
}

export function formatLongDate(value: string | Date): string {
	const date = typeof value === 'string' ? new Date(value) : value;
	if (Number.isNaN(date.getTime())) return '—';
	return new Intl.DateTimeFormat(textLocale(), {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC'
	}).format(date);
}

export function timeInMilan(): { time: string; iso: string; date: string } {
	const now = new Date();
	const time = new Intl.DateTimeFormat('en-GB', {
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false,
		timeZone: 'Europe/Rome'
	}).format(now);
	const date = new Intl.DateTimeFormat(textLocale(), {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		timeZone: 'Europe/Rome'
	}).format(now);
	return { time, iso: now.toISOString(), date };
}
