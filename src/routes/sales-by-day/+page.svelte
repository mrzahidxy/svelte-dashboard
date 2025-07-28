<!-- Usage Example with Render Functions -->
<script lang="ts">
	import DataTable from '$lib/components/uiParts/DataTable/DataTable.svelte';

	import { page } from '$app/state';
	import { goto, invalidate } from '$app/navigation';
	import type { Column } from '$lib/core/interfaces/dataTable';
	import type { PageProps } from './$types';
	import type { SalesInformation } from '$lib/core/interfaces/sales';

	let { data }: PageProps = $props();

	let start = $state(data.start);
	let end = $state(data.end);
	let store = $state(data.store);

	let salesData = $derived(data.items);
	let totals = $derived(data.total);

	// $inspect(store);

	const columns: Column<SalesInformation>[] = [
	{ key: 'weekday',               label: 'Day',               sortable: false, tooltip: 'Day of the week', align: 'center' },
	{ key: 'timesStoreOpened',      label: 'Times Open',        sortable: true,  tooltip: 'Number of times the store was opened' },
	{ key: 'netSales',              label: 'Net Sales',         sortable: true,  tooltip: 'Net revenue excluding tax' },
	{ key: 'totalDiscount',         label: 'Discount',          sortable: true,  tooltip: 'Total discount given' },
	{ key: 'numberOfItemsAdded',    label: 'Items Added',       sortable: true,  tooltip: 'Total items added to cart' },
	{ key: 'numberOfGroups',        label: 'Groups',            sortable: true,  tooltip: 'Number of distinct groups' },
	{ key: 'netSalesPerGroup',      label: 'Sales / Group',     sortable: true,  tooltip: 'Average net sales per group' },
	{ key: 'numberOfPeople',        label: 'People',            sortable: true,  tooltip: 'Total number of people involved' },
	{ key: 'netSalesPerPeople',     label: 'Sales / Person',    sortable: true,  tooltip: 'Average net sales per person' },
	{ key: 'productName',           label: 'Product',           sortable: true,  tooltip: 'Product name' },
	{ key: 'compositionRatio',      label: 'Comp. Ratio',       sortable: true,  tooltip: 'Composition ratio (%)' },
	{ key: 'numberOfSales',         label: 'Sales Count',       sortable: true,  tooltip: 'Total number of sales transactions' },
	{ key: 'cost',                  label: 'Cost',              sortable: true,  tooltip: 'Total cost' },
	{ key: 'grossProfit',           label: 'Gross Profit',      sortable: true,  tooltip: 'Gross profit' },
	{ key: 'grossProfitRatio',      label: 'Gross Profit %',    sortable: true,  tooltip: 'Gross profit ratio (%)' },
	{ key: 'profitContributionRatio', label: 'Profit Contrib. %', sortable: true, tooltip: 'Profit contribution ratio (%)' }
];


	const handleSearch = async () => {
		const params = new URLSearchParams(page.url.searchParams);
		params.set('store', store);

		const query = params.toString().replace(/\+/g, '%20');
		await goto(`?${query}`, { replaceState: false, noScroll: true, keepFocus: true });
		await invalidate('/api/sales');
	};

	$inspect(totals);
</script>

<div class="space-y-4 rounded-lg bg-white p-4 shadow">
	{#if salesData?.length}
		<DataTable data={salesData} {columns} {totals} />
	{:else}
		<p class="text-gray-500">No data available</p>
	{/if}
</div>
