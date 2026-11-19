<script lang="ts">
	import * as m from '$lib/paraglide/messages';
</script>

<div class="lab-diagram" aria-hidden="true">
	<svg viewBox="0 0 380 300">
		<!-- rack frame -->
		<g fill="none" stroke="currentColor" stroke-width="1">
			<rect x="38" y="20" width="150" height="260" />
			<path d="M44 34h138M44 266h138" opacity="0.55" />
			<path d="M44 34v232M182 34v232" opacity="0.55" />
			<circle cx="44" cy="27" r="2" opacity="0.5" />
			<circle cx="182" cy="27" r="2" opacity="0.5" />
			<circle cx="44" cy="273" r="2" opacity="0.5" />
			<circle cx="182" cy="273" r="2" opacity="0.5" />
		</g>

		<text
			x="38"
			y="13"
			font-family="IBM Plex Mono, monospace"
			font-size="7"
			letter-spacing="1"
			fill="currentColor"
			opacity="0.5">19" RACK / SWARM</text
		>

		<!-- units -->
		<g>
			<rect
				x="50"
				y="48"
				width="126"
				height="36"
				fill="var(--field)"
				stroke="currentColor"
				stroke-width="0.9"
			/>
			<path d="M58 60h24M58 66h20M58 72h22" stroke="currentColor" opacity="0.28" />
			<rect
				x="90"
				y="61"
				width="13"
				height="7"
				fill="none"
				stroke="currentColor"
				opacity="0.4"
			/>
			<circle cx="168" cy="58" r="2" fill="var(--accent)" />
			<text
				x="112"
				y="72"
				font-family="IBM Plex Mono, monospace"
				font-size="7"
				letter-spacing="0.8"
				fill="currentColor"
				opacity="0.6">EDGE</text
			>
		</g>

		<g>
			<rect
				x="50"
				y="90"
				width="126"
				height="36"
				fill="var(--field)"
				stroke="currentColor"
				stroke-width="0.9"
			/>
			<path d="M58 102h24M58 108h20M58 114h22" stroke="currentColor" opacity="0.28" />
			<rect
				x="90"
				y="103"
				width="13"
				height="7"
				fill="none"
				stroke="currentColor"
				opacity="0.4"
			/>
			<circle cx="168" cy="100" r="2" fill="var(--accent)" />
			<text
				x="112"
				y="114"
				font-family="IBM Plex Mono, monospace"
				font-size="7"
				letter-spacing="0.8"
				fill="currentColor"
				opacity="0.6">SVC-01</text
			>
		</g>

		<g>
			<rect
				x="50"
				y="132"
				width="126"
				height="36"
				fill="var(--field)"
				stroke="currentColor"
				stroke-width="0.9"
			/>
			<path d="M58 144h24M58 150h20M58 156h22" stroke="currentColor" opacity="0.28" />
			<rect
				x="90"
				y="145"
				width="13"
				height="7"
				fill="none"
				stroke="currentColor"
				opacity="0.4"
			/>
			<circle cx="168" cy="142" r="2" fill="var(--accent)" />
			<text
				x="112"
				y="156"
				font-family="IBM Plex Mono, monospace"
				font-size="7"
				letter-spacing="0.8"
				fill="currentColor"
				opacity="0.6">SVC-02</text
			>
		</g>

		<g>
			<rect
				x="50"
				y="174"
				width="126"
				height="36"
				fill="var(--field)"
				stroke="currentColor"
				stroke-width="0.9"
			/>
			<path d="M58 186h24M58 192h20M58 198h22" stroke="currentColor" opacity="0.28" />
			<rect
				x="90"
				y="187"
				width="13"
				height="7"
				fill="none"
				stroke="currentColor"
				opacity="0.4"
			/>
			<circle cx="168" cy="184" r="2" fill="var(--accent)" />
			<text
				x="112"
				y="198"
				font-family="IBM Plex Mono, monospace"
				font-size="7"
				letter-spacing="0.8"
				fill="currentColor"
				opacity="0.6">DATA</text
			>
		</g>

		<g>
			<rect
				x="50"
				y="216"
				width="126"
				height="36"
				fill="var(--field)"
				stroke="currentColor"
				stroke-width="0.9"
			/>
			<path d="M58 228h24M58 234h20M58 240h22" stroke="currentColor" opacity="0.28" />
			<rect
				x="90"
				y="229"
				width="13"
				height="7"
				fill="none"
				stroke="currentColor"
				opacity="0.4"
			/>
			<circle cx="168" cy="226" r="2" fill="var(--accent)" />
			<text
				x="112"
				y="240"
				font-family="IBM Plex Mono, monospace"
				font-size="7"
				letter-spacing="0.8"
				fill="currentColor"
				opacity="0.6">VPN</text
			>
		</g>

		<!-- leader labels -->
		<g fill="none" stroke="currentColor" stroke-width="0.8" opacity="0.45">
			<path d="M176 66h28M176 108h20M176 132h20M176 150h20M176 192h28M176 234h28" />
			<path d="M196 108v42" />
		</g>
		<g
			font-family="IBM Plex Mono, monospace"
			font-size="9"
			letter-spacing="0.8"
			fill="currentColor"
			opacity="0.7"
		>
			<text x="212" y="69">{m.lab_node_edge().toUpperCase()}</text>
			<text x="212" y="135">{m.lab_node_services().toUpperCase()} ×2</text>
			<text x="212" y="195">{m.lab_node_data().toUpperCase()}</text>
			<text x="212" y="237">{m.lab_node_vpn().toUpperCase()}</text>
		</g>

		<!-- private tunnel -->
		<g fill="none" stroke="var(--accent)" stroke-width="1" stroke-linecap="round">
			<path class="lab-packet" d="M182 246h56" stroke-dasharray="2 6" />
		</g>

		<!-- floor -->
		<g stroke="currentColor" opacity="0.3">
			<path d="M28 286h174" />
			<path d="M36 286l-5 7M56 286l-5 7M76 286l-5 7M96 286l-5 7M116 286l-5 7M136 286l-5 7M156 286l-5 7M176 286l-5 7M196 286l-5 7" />
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
