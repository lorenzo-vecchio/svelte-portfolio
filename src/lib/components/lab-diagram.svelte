<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<div class="lab-diagram" aria-hidden="true">
	<svg viewBox="0 0 360 180">
		<g fill="none" stroke="currentColor" stroke-width="1" opacity="0.45">
			<rect x="18" y="30" width="132" height="40" />
			<rect x="210" y="30" width="132" height="40" />
			<rect x="18" y="110" width="132" height="40" />
			<rect x="210" y="110" width="132" height="40" />

			<path d="M150 50h14v28" />
			<path d="M210 50h-14v28" />
			<path d="M150 130h14v-28" />
			<path d="M210 130h-14v-28" />
			<circle cx="180" cy="90" r="24" />
			<circle cx="180" cy="90" r="3" fill="var(--accent)" stroke="none" />
		</g>

		<g fill="var(--accent)" stroke="none">
			<circle cx="28" cy="40" r="2" />
			<circle cx="332" cy="40" r="2" />
			<circle cx="28" cy="120" r="2" />
			<circle cx="332" cy="120" r="2" />
		</g>

		<g
			font-family="IBM Plex Mono, monospace"
			font-size="8"
			letter-spacing="1"
			fill="currentColor"
			opacity="0.65"
		>
			<text x="38" y="60">{m.lab_node_edge().toUpperCase()}</text>
			<text x="322" y="60" text-anchor="end">{m.lab_node_services().toUpperCase()}</text>
			<text x="38" y="140">{m.lab_node_data().toUpperCase()}</text>
			<text x="322" y="140" text-anchor="end">{m.lab_node_vpn().toUpperCase()}</text>
			<text x="180" y="93" text-anchor="middle" font-size="7" opacity="0.6">SWARM</text>
		</g>

		<g fill="none" stroke="var(--accent)" stroke-width="1" stroke-linecap="round">
			<path class="lab-packet" d="M150 50h14v28" stroke-dasharray="2 6" />
			<path class="lab-packet" d="M210 130h-14v-28" stroke-dasharray="2 6" style="animation-delay: 1.2s" />
			<path class="lab-packet" d="M150 130h14v-28" stroke-dasharray="2 6" style="animation-delay: 2.4s" />
			<path class="lab-packet" d="M210 50h-14v28" stroke-dasharray="2 6" style="animation-delay: 3.6s" />
		</g>
	</svg>
</div>

<style>
	.lab-packet {
		animation: lab-flow 5s linear infinite;
	}

	@keyframes lab-flow {
		to {
			stroke-dashoffset: -32;
		}
	}
</style>
