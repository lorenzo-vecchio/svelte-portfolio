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

	<div
		class="plate-canvas"
		bind:this={canvas}
		use:plateInspect={updateReadout}
	>
		<svg viewBox="0 0 680 540" role="img" aria-labelledby="plate-title">
			<title id="plate-title">
				System diagram: an interface connected to a service layer and a data store, with a
				private VPN.
			</title>

			<!-- registration marks -->
			<g fill="none" stroke="currentColor" stroke-width="1" opacity="0.35">
				<path d="M24 40V24h16M640 24h16v16M656 500v16h-16M40 516H24v-16" />
				<path d="M340 16v8M340 516v8M16 270h8M656 270h8" />
			</g>

			<!-- section line -->
			<g opacity="0.4">
				<path
					d="M52 58v424"
					fill="none"
					stroke="currentColor"
					stroke-width="1"
					stroke-dasharray="6 6"
				/>
				<circle cx="52" cy="58" r="8" fill="var(--paper)" stroke="currentColor" />
				<circle cx="52" cy="482" r="8" fill="var(--paper)" stroke="currentColor" />
				<text x="52" y="61" text-anchor="middle" font-size="8" fill="currentColor">A</text>
				<text x="52" y="485" text-anchor="middle" font-size="8" fill="currentColor">A</text>
			</g>

			<!-- browser / interface -->
			<g transform="translate(150 78)">
				<rect
					width="330"
					height="128"
					fill="none"
					stroke="currentColor"
					stroke-width="1.2"
				/>
				<line x1="0" y1="26" x2="330" y2="26" stroke="currentColor" opacity="0.4" />
				<circle cx="13" cy="13" r="2.8" fill="none" stroke="currentColor" opacity="0.55" />
				<circle cx="23" cy="13" r="2.8" fill="none" stroke="currentColor" opacity="0.55" />
				<circle cx="33" cy="13" r="2.8" fill="none" stroke="currentColor" opacity="0.55" />
				<rect x="48" y="9" width="82" height="8" fill="currentColor" opacity="0.12" />
				<rect
					x="16"
					y="42"
					width="82"
					height="58"
					fill="none"
					stroke="currentColor"
					opacity="0.35"
				/>
				<line x1="26" y1="55" x2="88" y2="55" stroke="currentColor" opacity="0.3" />
				<line x1="26" y1="64" x2="74" y2="64" stroke="currentColor" opacity="0.18" />
				<line x1="26" y1="73" x2="82" y2="73" stroke="currentColor" opacity="0.18" />
				<line x1="26" y1="82" x2="66" y2="82" stroke="currentColor" opacity="0.18" />
				<line x1="112" y1="46" x2="304" y2="46" stroke="currentColor" opacity="0.28" />
				<line x1="112" y1="58" x2="268" y2="58" stroke="currentColor" opacity="0.18" />
				<line x1="112" y1="70" x2="290" y2="70" stroke="currentColor" opacity="0.18" />
				<line x1="112" y1="82" x2="240" y2="82" stroke="currentColor" opacity="0.18" />
				<line x1="112" y1="94" x2="278" y2="94" stroke="currentColor" opacity="0.18" />
				<rect
					x="112"
					y="104"
					width="44"
					height="12"
					fill="none"
					stroke="var(--accent)"
					stroke-width="1"
				/>
				<text
					x="0"
					y="-12"
					font-family="IBM Plex Mono, monospace"
					font-size="8.5"
					letter-spacing="1"
					fill="currentColor"
					opacity="0.55">01 / INTERFACE</text
				>
				<circle cx="316" cy="13" r="2.2" fill="var(--accent)" />
			</g>

			<!-- service layer -->
			<g transform="translate(110 258)">
				<rect
					width="390"
					height="104"
					fill="none"
					stroke="currentColor"
					stroke-width="1.2"
				/>
				<line x1="0" y1="26" x2="390" y2="26" stroke="currentColor" opacity="0.4" />
				<text
					x="12"
					y="17"
					font-family="IBM Plex Mono, monospace"
					font-size="8.5"
					letter-spacing="1"
					fill="currentColor"
					opacity="0.55">SERVICE LAYER</text
				>
				<text
					x="378"
					y="17"
					text-anchor="end"
					font-family="IBM Plex Mono, monospace"
					font-size="8"
					letter-spacing="0.8"
					fill="currentColor"
					opacity="0.4">03 INSTANCES</text
				>

				<g>
					<rect
						x="12"
						y="40"
						width="110"
						height="48"
						fill="none"
						stroke="currentColor"
						opacity="0.45"
					/>
					<text
						x="24"
						y="60"
						font-family="IBM Plex Mono, monospace"
						font-size="9"
						letter-spacing="1"
						fill="currentColor">API</text
					>
					<line x1="24" y1="70" x2="98" y2="70" stroke="currentColor" opacity="0.2" />
					<line x1="24" y1="77" x2="78" y2="77" stroke="currentColor" opacity="0.2" />
					<circle cx="106" cy="52" r="2" fill="var(--accent)" />
				</g>

				<g>
					<rect
						x="140"
						y="40"
						width="110"
						height="48"
						fill="none"
						stroke="currentColor"
						opacity="0.45"
					/>
					<text
						x="152"
						y="60"
						font-family="IBM Plex Mono, monospace"
						font-size="9"
						letter-spacing="1"
						fill="currentColor">WORKER</text
					>
					<line x1="152" y1="70" x2="226" y2="70" stroke="currentColor" opacity="0.2" />
					<line x1="152" y1="77" x2="206" y2="77" stroke="currentColor" opacity="0.2" />
					<circle cx="234" cy="52" r="2" fill="var(--accent)" />
				</g>

				<g>
					<rect
						x="268"
						y="40"
						width="110"
						height="48"
						fill="none"
						stroke="currentColor"
						opacity="0.45"
					/>
					<text
						x="280"
						y="60"
						font-family="IBM Plex Mono, monospace"
						font-size="9"
						letter-spacing="1"
						fill="currentColor">CRON</text
					>
					<line x1="280" y1="70" x2="354" y2="70" stroke="currentColor" opacity="0.2" />
					<line x1="280" y1="77" x2="334" y2="77" stroke="currentColor" opacity="0.2" />
					<circle cx="362" cy="52" r="2" fill="var(--accent)" />
				</g>
			</g>

			<!-- data -->
			<g transform="translate(210 408)">
				<ellipse
					cx="110"
					cy="0"
					rx="86"
					ry="16"
					fill="none"
					stroke="currentColor"
					stroke-width="1.2"
				/>
				<path
					d="M24 0v64a86 16 0 0 0 172 0V0"
					fill="none"
					stroke="currentColor"
					stroke-width="1.2"
				/>
				<path d="M24 22a86 16 0 0 0 172 0" fill="none" stroke="currentColor" opacity="0.3" />
				<path d="M24 44a86 16 0 0 0 172 0" fill="none" stroke="currentColor" opacity="0.3" />
				<text
					x="110"
					y="-26"
					text-anchor="middle"
					font-family="IBM Plex Mono, monospace"
					font-size="8.5"
					letter-spacing="1"
					fill="currentColor"
					opacity="0.55">03 / DATA</text
				>
				<circle cx="218" cy="32" r="2.2" fill="var(--accent)" />
			</g>

			<!-- private vpn -->
			<g transform="translate(526 274)">
				<rect
					width="92"
					height="66"
					fill="none"
					stroke="currentColor"
					stroke-width="1.2"
				/>
				<text
					x="10"
					y="18"
					font-family="IBM Plex Mono, monospace"
					font-size="9"
					letter-spacing="1"
					fill="currentColor">VPN</text
				>
				<line x1="10" y1="26" x2="82" y2="26" stroke="currentColor" opacity="0.25" />
				<text
					x="10"
					y="42"
					font-family="IBM Plex Mono, monospace"
					font-size="7.5"
					letter-spacing="0.8"
					fill="currentColor"
					opacity="0.55">PRIVATE</text
				>
				<text
					x="10"
					y="54"
					font-family="IBM Plex Mono, monospace"
					font-size="7.5"
					letter-spacing="0.8"
					fill="currentColor"
					opacity="0.55">NETWORK</text
				>
				<circle cx="82" cy="12" r="2.2" fill="var(--accent)" />
			</g>

			<!-- connectors -->
			<g fill="none" stroke="currentColor" stroke-width="1" opacity="0.55">
				<path
					class="draw-path"
					pathLength="1"
					d="M315 206v28h-10v24"
					style="--draw-delay: 180ms"
				/>
				<path
					class="draw-path"
					pathLength="1"
					d="M305 362v28h15v18"
					style="--draw-delay: 360ms"
				/>
				<path
					class="draw-path"
					pathLength="1"
					d="M500 306h26"
					style="--draw-delay: 540ms"
				/>
				<path d="M305 234l-4 5h8z" fill="currentColor" stroke="none" />
				<path d="M320 390l-4 5h8z" fill="currentColor" stroke="none" />
				<path d="M526 306l-5-4v8z" fill="currentColor" stroke="none" />
				<circle cx="305" cy="234" r="2.5" fill="var(--paper)" stroke="currentColor" />
				<circle cx="320" cy="390" r="2.5" fill="var(--paper)" stroke="currentColor" />
			</g>

			<!-- animated signal -->
			<g fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-linecap="round">
				<path
					class="draw-soft"
					d="M315 206v28h-10v24"
					style="animation-delay: 0ms"
				/>
				<path
					class="draw-soft"
					d="M305 362v28h15v18"
					style="animation-delay: 400ms"
				/>
				<path
					class="draw-soft"
					d="M500 306h26"
					style="animation-delay: 800ms"
				/>
			</g>

			<!-- annotations -->
			<g
				font-family="IBM Plex Mono, monospace"
				font-size="7.5"
				letter-spacing="0.8"
				fill="currentColor"
				opacity="0.45"
			>
				<text x="322" y="228">HTTP / WS</text>
				<text x="330" y="382">SQL</text>

				<text x="246" y="510">INTERFACE → SERVICE → DATA</text>
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
	</div>
</figure>
