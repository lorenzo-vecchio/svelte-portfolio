<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import { page } from '$app/state';
	import { localizeHref } from '$lib/paraglide/runtime';
	import * as m from '$lib/paraglide/messages';

	const is404 = $derived(page.status === 404);
</script>

<div class="shell error-page">
	<div class="error-card">
		<div class="section-code">
			{is404 ? m.error_code() : m.error_generic_code()}
		</div>
		<h1>{is404 ? m.error_title() : m.error_generic_title()}</h1>
		<p>{is404 ? m.error_body() : m.error_generic_body()}</p>
		<div class="error-actions">
			<a class="btn" href={localizeHref('/')}>
				<ArrowLeft size={14} aria-hidden="true" />
				{m.error_home()}
			</a>
		</div>
	</div>
</div>
