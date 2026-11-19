<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { parallax } from '$lib/actions/parallax';
	import * as m from '$lib/paraglide/messages';
	import fieldMoto from '$lib/images/field-moto.jpg?enhanced';
	import fieldWinter from '$lib/images/field-winter.jpg?enhanced';
	import fieldSail from '$lib/images/field-sail.jpg?enhanced';

	const notes = [
		{
			title: m.field_moto_title(),
			body: m.field_moto_body(),
			place: m.field_photo_moto(),
			src: fieldMoto,
			alt: 'Two motorcycles parked on a mountain road'
		},
		{
			title: m.field_ski_title(),
			body: m.field_ski_body(),
			place: m.field_photo_alps(),
			src: fieldWinter,
			alt: 'A snowy path through a larch forest'
		},
		{
			title: m.field_sport_title(),
			body: m.field_sport_body(),
			place: m.field_photo_run(),
			src: fieldSail,
			alt: 'A sailboat with a blue spinnaker on open water'
		}
	];
</script>

<div class="field-grid">
	{#each notes as note, index (note.title)}
		<figure class="field-card" use:reveal={{ delay: index * 80 }}>
			<div class="field-media" use:parallax={-26 + index * 8}>
				<enhanced:img
					src={note.src}
					alt={note.alt}
					sizes="(min-width: 760px) 33vw, 100vw"
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
