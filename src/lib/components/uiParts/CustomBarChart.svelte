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

<div class="relative h-full min-h-[250px] overflow-hidden bg-white">
	<canvas bind:this={canvas} class="h-[300px] max-h-[50vh] w-full"></canvas>
</div>
