<script lang="ts">
	import { ArrowLeft } from '@lucide/svelte';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { contacts } from '$lib/contacts';
	import * as m from '$lib/paraglide/messages';
</script>

<div class="shell prose-page">
	<a class="back-link" href={localizeHref('/')}>
		<ArrowLeft size={13} aria-hidden="true" />
		{m.privacy_back()}
	</a>

	<div class="section-code">{m.privacy_code()}</div>
	<h1>{m.privacy_title()}</h1>
	<p class="mono" style="margin-top: 0.75rem; color: var(--ink-faint)">{m.privacy_updated()}</p>

	<p>{m.privacy_intro()}</p>

	<h2>{m.privacy_h1()}</h2>
	<p>{m.privacy_no_cookies()}</p>
	<p>{m.privacy_local_storage()}</p>

	<h2>{m.privacy_h2()}</h2>
	<p>{m.privacy_analytics()}</p>
	<ul>
		<li>{m.privacy_analytics_li1()}</li>
		<li>{m.privacy_analytics_li2()}</li>
		<li>{m.privacy_analytics_li3()}</li>
	</ul>

	<h2>{m.privacy_h3()}</h2>
	<p>{m.privacy_data()}</p>

	<h2>{m.privacy_h4()}</h2>
	<p>{m.privacy_legal()}</p>

	<h2>{m.privacy_h5()}</h2>
	<p>{m.privacy_rights()}</p>

	<h2>{m.privacy_h6()}</h2>
	<p>
		{m.privacy_contact()}
		<a href={contacts.emailHref}>{contacts.email}</a>.
	</p>
</div>
