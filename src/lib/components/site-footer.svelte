<script lang="ts">
	import { ArrowUpRight } from '@lucide/svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { contacts } from '$lib/contacts';
	import { formatDate } from '$lib/format';
	import { getLatestCommitDate } from '$lib/projects';
	import { reveal } from '$lib/actions/reveal';
	import * as m from '$lib/paraglide/messages';

	const year = new Date().getFullYear();
	const home = $derived(localizeHref('/'));
	const latest = $derived(formatDate(getLatestCommitDate()));
</script>

<footer class="site-footer">
	<div class="shell">
		<div class="footer-top" use:reveal={{ delay: 60 }}>
			<div class="footer-brand">
				<strong>Lorenzo Vecchio</strong>
				<p>{m.footer_tagline()}</p>
			</div>

			<div class="footer-col">
				<h3>{m.footer_nav()}</h3>
				<ul>
					<li><a href={home}>{m.nav_work()}</a></li>
					<li><a href={localizeHref('/projects')}>{m.nav_projects()}</a></li>
					<li><a href={`${home}#about`}>{m.nav_about()}</a></li>
					<li><a href={localizeHref('/privacy')}>{m.footer_privacy()}</a></li>
				</ul>
			</div>

			<div class="footer-col">
				<h3>{m.footer_elsewhere()}</h3>
				<ul>
					<li>
						<a href={contacts.github} target="_blank" rel="noopener noreferrer">
							GitHub <ArrowUpRight size={12} aria-hidden="true" />
						</a>
					</li>
					<li>
						<a href={contacts.linkedin} target="_blank" rel="noopener noreferrer">
							LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
						</a>
					</li>
					<li>
						<a href={contacts.emailHref}>
							Email <ArrowUpRight size={12} aria-hidden="true" />
						</a>
					</li>
					<li>
						<a
							href="https://github.com/lorenzo-vecchio/svelte-portfolio"
							target="_blank"
							rel="noopener noreferrer"
						>
							{m.footer_source()} <ArrowUpRight size={12} aria-hidden="true" />
						</a>
					</li>
				</ul>
			</div>
		</div>

		<dl class="title-block">
			<div class="title-block-row">
				<dt>{m.footer_project()}</dt>
				<dd>{m.footer_project_value()}</dd>
			</div>
			<div class="title-block-row">
				<dt>{m.footer_author()}</dt>
				<dd>Lorenzo Giovanni Vecchio</dd>
			</div>
			<div class="title-block-row">
				<dt>{m.footer_location()}</dt>
				<dd>Milan, IT · 45.4642° N, 9.1900° E</dd>
			</div>
			<div class="title-block-row">
				<dt>{m.footer_stack()}</dt>
				<dd>SvelteKit · TypeScript · Tailwind CSS</dd>
			</div>
			<div class="title-block-row">
				<dt>{m.footer_data()}</dt>
				<dd>{m.footer_data_value()}</dd>
			</div>
			<div class="title-block-row">
				<dt>{m.footer_latest()}</dt>
				<dd>{latest}</dd>
			</div>
			<div class="title-block-row">
				<dt>{m.footer_revision()}</dt>
				<dd>{__BUILD_REVISION__}</dd>
			</div>
			<div class="title-block-row">
				<dt>{m.footer_sheet()}</dt>
				<dd>{m.footer_sheet_value()}</dd>
			</div>
		</dl>

		<div class="footer-bottom">
			<span>© {year} Lorenzo Giovanni Vecchio · {m.footer_rights()}</span>
			<span>{m.footer_analytics()}</span>
			<a class="u-link" href="#top">{m.footer_top()} ↑</a>
		</div>
	</div>
</footer>

<style>
	.footer-col a {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.footer-bottom {
		border-top: 1px solid var(--rule);
		margin-top: 1.5rem;
	}
</style>
