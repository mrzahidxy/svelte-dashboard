<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	let { title, chartLabels, chartData, dataLabel } = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let chart: Chart | null = null;

	$inspect('chartData on chart', chartData);

	onMount(() => {
		if (canvas) {
			chart = new Chart(canvas, {
				type: 'bar',
				data: {
					labels: [],
					datasets: [
						{
							label: '',
							data: [],
							backgroundColor: 'rgba(75,192,192,0.4)'
						}
					]
				}
			});
		}
	});

	$effect(() => {
		if (!chart) return;
		chart.data = {
			labels: chartLabels,
			datasets: $state.snapshot([
				{
					label: dataLabel,
					data: chartData,
					backgroundColor: 'rgba(75,192,192,0.4)'
				}
			])
		};

		chart.update();
	});
</script>

<div class="chart-item">
	<canvas bind:this={canvas} class="h-[300px] max-h-[50vh] w-full"></canvas>
</div>

<style>
	.chart-item {
		background: white;
		border-radius: 12px;
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
		overflow: hidden;
		transition:
			transform 0.3s ease,
			box-shadow 0.3s ease;
		position: relative;
		height: 100%;
		min-height: 300px;
	}

	.chart-item:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
	}

	.chart-item canvas {
		width: 100% !important;
		height: 50% !important;
	}
</style>
