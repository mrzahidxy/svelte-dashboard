<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { title, chartLabels, chartData, dataLabel } = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let chart: Chart | null = null;

	onMount(() => {
		if (canvas) {
			chart = new Chart(canvas, {
				type: 'bar',
				data: {
					labels: [],
					datasets: [
						{
							label: '',
							data: []
						}
					]
				},

				options: {
					scales: {
						y: {
							grid: {
								display: false
							}
						}
					}
				}
			});
		}
	});

	$effect(() => {
		if (!chart) return;

		const ctx = chart.ctx;
		const gradient = ctx.createLinearGradient(0, 0, 0, 300);
		gradient.addColorStop(0, 'rgba(75,192,192, 0.2)');
		gradient.addColorStop(0.5, 'rgba(75,192,192, 0.5)');
		gradient.addColorStop(1, 'rgba(0,100,150, 0.6)');

		chart.data = {
			labels: chartLabels,
			datasets: $state.snapshot([
				{
					label: dataLabel,
					data: chartData,
					backgroundColor: gradient as any
				}
			])
		};

		chart.update();
	});
</script>

<div class="relative h-full min-h-[250px] overflow-hidden bg-white">
	<canvas bind:this={canvas} class="h-[300px] max-h-[50vh] w-full"></canvas>
</div>
