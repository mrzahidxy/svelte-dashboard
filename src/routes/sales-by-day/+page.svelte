<!-- Usage Example with Render Functions -->
<script lang="ts">
	import DataTable from '$lib/components/uiParts/DataTable/DataTable.svelte';

	import type { Column } from '$lib/core/interfaces/dataTable';
	import type { PageProps } from './$types';
	import type { SalesInformation } from '$lib/core/interfaces/sales';
	import CustomTab from '$lib/components/uiParts/CustomTab.svelte';
	import SearchBar from './SearchBar.svelte';
	import CustomBarChart from '$lib/components/uiParts/CustomBarChart.svelte';

	let { data }: PageProps = $props();

	let start = $state(data.startDate);
	let end = $state(data.endDate);
	// let store = $state(data.store);
	let chartData = $state();
	let chartLabels = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

	let salesData = $derived(data.items);
	let totals = $derived(data.total);

	// $inspect(store);

	const columns: Column<SalesInformation>[] = [
		{ key: 'weekday', label: 'Day', sortable: false, tooltip: 'Day of the week', align: 'center' },
		{
			key: 'timesStoreOpened',
			label: 'Times Open',
			sortable: true,
			tooltip: 'Number of times the store was opened'
		},
		{ key: 'netSales', label: 'Net Sales', sortable: true, tooltip: 'Net revenue excluding tax' },
		{ key: 'totalDiscount', label: 'Discount', sortable: true, tooltip: 'Total discount given' },
		{
			key: 'numberOfItemsAdded',
			label: 'Items Added',
			sortable: true,
			tooltip: 'Total items added to cart'
		},
		{
			key: 'numberOfGroups',
			label: 'Groups',
			sortable: true,
			tooltip: 'Number of distinct groups'
		},
		{
			key: 'netSalesPerGroup',
			label: 'Sales / Group',
			sortable: true,
			tooltip: 'Average net sales per group'
		},
		{
			key: 'numberOfPeople',
			label: 'People',
			sortable: true,
			tooltip: 'Total number of people involved'
		},
		{
			key: 'netSalesPerPeople',
			label: 'Sales / Person',
			sortable: true,
			tooltip: 'Average net sales per person'
		},
		{ key: 'productName', label: 'Product', sortable: true, tooltip: 'Product name' },
		{
			key: 'compositionRatio',
			label: 'Comp. Ratio',
			sortable: true,
			tooltip: 'Composition ratio (%)'
		},
		{
			key: 'numberOfSales',
			label: 'Sales Count',
			sortable: true,
			tooltip: 'Total number of sales transactions'
		},
		{ key: 'cost', label: 'Cost', sortable: true, tooltip: 'Total cost' },
		{ key: 'grossProfit', label: 'Gross Profit', sortable: true, tooltip: 'Gross profit' },
		{
			key: 'grossProfitRatio',
			label: 'Gross Profit %',
			sortable: true,
			tooltip: 'Gross profit ratio (%)'
		},
		{
			key: 'profitContributionRatio',
			label: 'Profit Contrib. %',
			sortable: true,
			tooltip: 'Profit contribution ratio (%)'
		}
	];

	const tabs = [
		{ value: 'total', label: '合計表示' },
		{ value: 'avergage', label: '平均表示' }
	];

	// Generate chart data
	$effect(() => {
		const map = Object.fromEntries(data?.items.map((item) => [item.weekday, item.netSales]));
		chartData = chartLabels.map((day) => map[day] ?? 0);
	});
</script>

<div class="space-y-6 rounded-lg bg-white p-4 shadow-md">
	<!-- Search and Tabs -->
	<div class="flex flex-col gap-4">
		<SearchBar />
		<CustomTab {tabs} />
	</div>

	<!-- Chart -->
	<div class="mt-2">
		<CustomBarChart title="Sales by Day" {chartLabels} {chartData} dataLabel="Net Sales" />
	</div>

	<!-- Table -->
	<div class="mt-6">
		{#if salesData?.length}
			<DataTable data={salesData} {columns} {totals} />
		{:else}
			<p class="text-center text-gray-500">No data available</p>
		{/if}
	</div>
</div>
