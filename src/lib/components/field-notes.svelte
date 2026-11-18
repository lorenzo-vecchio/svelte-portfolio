<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { parallax } from '$lib/actions/parallax';
	import * as m from '$lib/paraglide/messages';

	const notes = [
		{
			title: m.field_moto_title(),
			body: m.field_moto_body(),
			place: m.field_photo_moto(),
			src: '/images/field-moto.jpg',
			alt: 'An adventure motorcycle parked on a gravel mountain road'
		},
		{
			title: m.field_ski_title(),
			body: m.field_ski_body(),
			place: m.field_photo_alps(),
			src: '/images/field-alps.jpg',
			alt: 'A snow-covered Dolomite village with ski slopes in the foreground'
		},
		{
			title: m.field_sport_title(),
			body: m.field_sport_body(),
			place: m.field_photo_run(),
			src: '/images/field-run.jpg',
			alt: 'A runner climbing a rocky trail during the Ullswater Trail Race'
		}
	];
</script>

<div class="field-grid">
	{#each notes as note, index (note.title)}
		<figure class="field-card" use:reveal={{ delay: index * 80 }}>
			<div class="field-media" use:parallax={-26 + index * 8}>
				<img
					src={note.src}
					alt={note.alt}
					width="900"
					height="1125"
					loading="lazy"
					decoding="async"
				/>
			</div>
			<figcaption>
				<div class="field-caption">
					<strong>{note.title}</strong>
					<span>{note.place}</span>
				</div>
				<p class="field-body">{note.body}</p>
			</figcaption>
		</figure>
	{/each}
</div>
