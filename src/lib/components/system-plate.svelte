<script lang="ts">
	import { onMount } from 'svelte';
	import { plateInspect } from '$lib/actions/plate-inspect';
	import * as m from '$lib/paraglide/messages';

	let canvas = $state<HTMLDivElement>();
	let readout = $state('X — / Y —');

	function updateReadout(x: number, y: number) {
		readout = `X ${Math.round(x)} / Y ${Math.round(y)}`;
	}

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

		let frame = 0;
		const update = () => {
			frame = 0;
			const progress = Math.min(1, Math.max(0, window.scrollY / 760));
			canvas?.style.setProperty('--plate-scroll', progress.toFixed(3));
		};
		const onScroll = () => {
			if (frame) return;
			frame = requestAnimationFrame(update);
		};

		update();
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => {
			window.cancelAnimationFrame(frame);
			window.removeEventListener('scroll', onScroll);
		};
	});
</script>

<figure class="plate" aria-label={m.spec_figure()}>
	<div class="plate-head">
		<span>{m.spec_figure()}</span>
		<span>45.4642° N / 9.1900° E</span>
	</div>

	<div class="plate-canvas" bind:this={canvas} use:plateInspect={updateReadout}>
		<svg viewBox="0 0 680 540" role="img" aria-labelledby="plate-title">
			<title id="plate-title">
				Exploded system drawing: an interface slab above a service slab and a data store, with a
				private VPN module.
			</title>

			<defs>
				<pattern
					id="plate-hatch"
					width="7"
					height="7"
					patternUnits="userSpaceOnUse"
					patternTransform="rotate(45)"
				>
					<line
						x1="0"
						y1="0"
						x2="0"
						y2="7"
						stroke="currentColor"
						stroke-width="0.6"
						opacity="0.35"
					/>
				</pattern>
			</defs>

			<!-- registration marks -->
			<g fill="none" stroke="currentColor" stroke-width="1" opacity="0.32">
				<path d="M24 40V24h16M640 24h16v16M656 500v16h-16M40 516H24v-16" />
				<path d="M340 16v8M340 516v8M16 270h8M656 270h8" />
			</g>

			<!-- vertical dimension -->
			<g stroke="currentColor" fill="none" opacity="0.42">
				<path
					class="draw-path"
					pathLength="1"
					d="M80 62v444"
					style="--draw-delay: 100ms"
				/>
				<path d="M72 62h16M72 190h16M72 252h16M72 370h16M72 430h16M72 506h16" />
				<path d="M76 66l4-6 4 6M76 502l4 6 4-6" />
			</g>
			<text
				x="62"
				y="292"
				transform="rotate(-90 62 292)"
				text-anchor="middle"
				font-family="IBM Plex Mono, monospace"
				font-size="9"
				letter-spacing="1.6"
				fill="currentColor"
				opacity="0.5">SYSTEM / 03 LAYERS</text
			>

			<!-- 01 / interface -->
			<g>
				<polygon
					points="170,80 500,80 530,62 200,62"
					fill="var(--paper-deep)"
					stroke="currentColor"
					stroke-width="1.2"
				/>
				<polygon
					points="170,80 500,80 530,62 200,62"
					fill="url(#plate-hatch)"
					stroke="none"
				/>
				<polygon
					points="500,80 530,62 530,172 500,190"
					fill="var(--paper-deep)"
					stroke="currentColor"
					stroke-width="1.2"
				/>
				<polygon
					points="500,80 530,62 530,172 500,190"
					fill="url(#plate-hatch)"
					stroke="none"
				/>
				<rect
					x="170"
					y="80"
					width="330"
					height="110"
					fill="var(--paper)"
					stroke="currentColor"
					stroke-width="1.5"
				/>

				<line x1="170" y1="104" x2="500" y2="104" stroke="currentColor" opacity="0.42" />
				<circle cx="184" cy="92" r="2.4" fill="none" stroke="currentColor" opacity="0.6" />
				<circle cx="194" cy="92" r="2.4" fill="none" stroke="currentColor" opacity="0.6" />
				<circle cx="204" cy="92" r="2.4" fill="none" stroke="currentColor" opacity="0.6" />
				<rect x="220" y="87" width="100" height="10" fill="currentColor" opacity="0.1" />

				<rect
					x="184"
					y="116"
					width="70"
					height="58"
					fill="none"
					stroke="currentColor"
					opacity="0.3"
				/>
				<line x1="194" y1="130" x2="244" y2="130" stroke="currentColor" opacity="0.28" />
				<line x1="194" y1="140" x2="232" y2="140" stroke="currentColor" opacity="0.18" />
				<line x1="194" y1="150" x2="240" y2="150" stroke="currentColor" opacity="0.18" />
				<line x1="194" y1="160" x2="224" y2="160" stroke="currentColor" opacity="0.18" />

				<line x1="268" y1="120" x2="482" y2="120" stroke="currentColor" opacity="0.28" />
				<line x1="268" y1="134" x2="444" y2="134" stroke="currentColor" opacity="0.16" />
				<line x1="268" y1="148" x2="466" y2="148" stroke="currentColor" opacity="0.16" />
				<line x1="268" y1="162" x2="410" y2="162" stroke="currentColor" opacity="0.16" />

				<rect
					x="270"
					y="154"
					width="58"
					height="15"
					fill="none"
					stroke="var(--accent)"
					stroke-width="1.2"
				/>
				<circle cx="482" cy="92" r="2.4" fill="var(--accent)" />

				<text
					x="170"
					y="48"
					font-family="IBM Plex Mono, monospace"
					font-size="11"
					letter-spacing="1.1"
					fill="currentColor"
					opacity="0.55">01 / INTERFACE</text
				>
			</g>

			<!-- 02 / service -->
			<g>
				<polygon
					points="120,270 510,270 540,252 150,252"
					fill="var(--paper-deep)"
					stroke="currentColor"
					stroke-width="1.2"
				/>
				<polygon
					points="120,270 510,270 540,252 150,252"
					fill="url(#plate-hatch)"
					stroke="none"
				/>
				<polygon
					points="510,270 540,252 540,352 510,370"
					fill="var(--paper-deep)"
					stroke="currentColor"
					stroke-width="1.2"
				/>
				<polygon
					points="510,270 540,252 540,352 510,370"
					fill="url(#plate-hatch)"
					stroke="none"
				/>
				<rect
					x="120"
					y="270"
					width="390"
					height="100"
					fill="var(--paper)"
					stroke="currentColor"
					stroke-width="1.5"
				/>

				<line x1="120" y1="288" x2="510" y2="288" stroke="currentColor" opacity="0.4" />
				<text
					x="132"
					y="282"
					font-family="IBM Plex Mono, monospace"
					font-size="8.5"
					letter-spacing="0.9"
					fill="currentColor"
					opacity="0.55">SERVICE LAYER</text
				>
				<text
					x="498"
					y="282"
					text-anchor="end"
					font-family="IBM Plex Mono, monospace"
					font-size="8"
					letter-spacing="0.8"
					fill="currentColor"
					opacity="0.42">03 INSTANCES</text
				>

				<g>
					<rect
						x="136"
						y="300"
						width="108"
						height="52"
						fill="none"
						stroke="currentColor"
						opacity="0.4"
					/>
					<text
						x="146"
						y="318"
						font-family="IBM Plex Mono, monospace"
						font-size="10"
						letter-spacing="0.9"
						fill="currentColor">API</text
					>
					<line x1="146" y1="328" x2="222" y2="328" stroke="currentColor" opacity="0.2" />
					<line x1="146" y1="338" x2="202" y2="338" stroke="currentColor" opacity="0.2" />
					<circle cx="232" cy="310" r="2.4" fill="var(--accent)" />
				</g>

				<g>
					<rect
						x="260"
						y="300"
						width="108"
						height="52"
						fill="none"
						stroke="currentColor"
						opacity="0.4"
					/>
					<text
						x="270"
						y="318"
						font-family="IBM Plex Mono, monospace"
						font-size="10"
						letter-spacing="0.9"
						fill="currentColor">WORKER</text
					>
					<line x1="270" y1="328" x2="346" y2="328" stroke="currentColor" opacity="0.2" />
					<line x1="270" y1="338" x2="326" y2="338" stroke="currentColor" opacity="0.2" />
					<circle cx="356" cy="310" r="2.4" fill="var(--accent)" />
				</g>

				<g>
					<rect
						x="384"
						y="300"
						width="108"
						height="52"
						fill="none"
						stroke="currentColor"
						opacity="0.4"
					/>
					<text
						x="394"
						y="318"
						font-family="IBM Plex Mono, monospace"
						font-size="10"
						letter-spacing="0.9"
						fill="currentColor">CRON</text
					>
					<line x1="394" y1="328" x2="470" y2="328" stroke="currentColor" opacity="0.2" />
					<line x1="394" y1="338" x2="450" y2="338" stroke="currentColor" opacity="0.2" />
					<circle cx="480" cy="310" r="2.4" fill="var(--accent)" />
				</g>

				<circle cx="126" cy="276" r="2" fill="none" stroke="currentColor" opacity="0.5" />
				<circle cx="504" cy="276" r="2" fill="none" stroke="currentColor" opacity="0.5" />

				<text
					x="120"
					y="238"
					font-family="IBM Plex Mono, monospace"
					font-size="11"
					letter-spacing="1.1"
					fill="currentColor"
					opacity="0.55">02 / SERVICE</text
				>
			</g>

			<!-- 04 / vpn -->
			<g>
				<polygon
					points="560,290 630,290 646,280 576,280"
					fill="var(--paper-deep)"
					stroke="currentColor"
					stroke-width="1.1"
				/>
				<polygon
					points="630,290 646,280 646,326 630,336"
					fill="var(--paper-deep)"
					stroke="currentColor"
					stroke-width="1.1"
				/>
				<rect
					x="560"
					y="290"
					width="70"
					height="46"
					fill="var(--paper)"
					stroke="currentColor"
					stroke-width="1.3"
				/>
				<text
					x="570"
					y="307"
					font-family="IBM Plex Mono, monospace"
					font-size="10"
					letter-spacing="0.9"
					fill="currentColor">VPN</text
				>
				<line x1="570" y1="313" x2="620" y2="313" stroke="currentColor" opacity="0.22" />
				<text
					x="570"
					y="325"
					font-family="IBM Plex Mono, monospace"
					font-size="7"
					letter-spacing="0.8"
					fill="currentColor"
					opacity="0.48">PRIVATE</text
				>
				<text
					x="570"
					y="334"
					font-family="IBM Plex Mono, monospace"
					font-size="7"
					letter-spacing="0.8"
					fill="currentColor"
					opacity="0.48">NETWORK</text
				>
				<circle cx="626" cy="296" r="2.2" fill="var(--accent)" />
				<text
					x="560"
					y="258"
					font-family="IBM Plex Mono, monospace"
					font-size="10"
					letter-spacing="1"
					fill="currentColor"
					opacity="0.55">04 / VPN</text
				>
			</g>

			<!-- 03 / data -->
			<g>
				<ellipse
					cx="330"
					cy="430"
					rx="92"
					ry="24"
					fill="var(--paper-deep)"
					stroke="currentColor"
					stroke-width="1.4"
				/>
				<path
					d="M238 430v44a92 24 0 0 0 184 0v-44"
					fill="var(--paper)"
					stroke="currentColor"
					stroke-width="1.4"
				/>
				<path d="M238 448a92 24 0 0 0 184 0" fill="none" stroke="currentColor" opacity="0.28" />
				<path d="M238 464a92 24 0 0 0 184 0" fill="none" stroke="currentColor" opacity="0.28" />
				<ellipse
					cx="330"
					cy="430"
					rx="92"
					ry="24"
					fill="none"
					stroke="currentColor"
					stroke-width="1.4"
				/>

				<polygon
					points="214,506 446,506 466,494 234,494"
					fill="var(--paper-deep)"
					stroke="currentColor"
					stroke-width="1.1"
				/>
				<rect
					x="214"
					y="506"
					width="232"
					height="10"
					fill="var(--paper)"
					stroke="currentColor"
					stroke-width="1.1"
				/>
				<polygon
					points="446,506 466,494 466,504 446,516"
					fill="var(--paper-deep)"
					stroke="currentColor"
					stroke-width="1.1"
				/>

				<circle cx="420" cy="436" r="2.2" fill="var(--accent)" />
				<path d="M424 438h10" stroke="currentColor" stroke-width="0.8" opacity="0.45" />
				<text
					x="440"
					y="446"
					font-family="IBM Plex Mono, monospace"
					font-size="11"
					letter-spacing="1.1"
					fill="currentColor"
					opacity="0.55">03 / DATA</text
				>
			</g>

			<!-- connectors and request path -->
			<g fill="none" stroke="currentColor" stroke-width="1" opacity="0.55">
				<path
					class="draw-path"
					pathLength="1"
					d="M335 190v52M335 242l-3 6M335 242l3 6"
					style="--draw-delay: 220ms"
				/>
				<path
					class="draw-path"
					pathLength="1"
					d="M314 370v30h16v22"
					style="--draw-delay: 360ms"
				/>
				<path
					class="draw-path"
					pathLength="1"
					d="M540 308h20"
					style="--draw-delay: 500ms"
				/>
				<circle cx="335" cy="270" r="2.4" fill="var(--paper)" stroke="currentColor" />
				<circle cx="330" cy="422" r="2.4" fill="var(--paper)" stroke="currentColor" />
			</g>

			<g fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-linecap="round">
				<path class="draw-soft" d="M335 190v52" style="animation-delay: 0ms" />
				<path class="draw-soft" d="M314 370v30h16v22" style="animation-delay: 400ms" />
				<path class="draw-soft" d="M540 308h20" style="animation-delay: 800ms" />
			</g>

			<g
				font-family="IBM Plex Mono, monospace"
				font-size="8"
				letter-spacing="0.7"
				fill="currentColor"
				opacity="0.46"
			>
				<text x="346" y="222">HTTPS / WS</text>
				<text x="362" y="386">SQL</text>
			</g>
		</svg>

		<div class="plate-inspect" aria-hidden="true">
			<span class="inspect-h"></span>
			<span class="inspect-v"></span>
			<span class="inspect-label">{readout}</span>
		</div>
	</div>

	<div class="plate-foot">
		<div><i></i> Interface</div>
		<div><i></i> Service</div>
		<div><i></i> Data</div>
		<div><i></i> VPN</div>
	</div>
</figure>
