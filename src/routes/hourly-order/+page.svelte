<!-- Usage Example with Render Functions -->
<script lang="ts">
	import DataTable from '$lib/components/uiParts/DataTable/DataTable.svelte';
	import MySelect from '$lib/components/uiParts/MySelect.svelte';



	import { page } from '$app/state';
	import { goto, invalidate } from '$app/navigation';
	import type { Column, SalesRow } from '$lib/core/interfaces/dataTable';
	import type { PageProps } from './$types';


	type Row = { id: number; name: string; age: number; status: 'active' | 'inactive' };

	let { data }: PageProps = $props();

	let start = $state(data.start);
	let end = $state(data.end);
	let store = $state(data.store);

	let salesData = $derived(data.items);

	// $inspect(store);

	let columns: Column<SalesRow>[] = [
		{
			key: 'itemsOrdered',
			label: 'Day',
			sortable: false,
			tooltip: 'Day of the week',
			align: 'center'
		},
		{
			key: 'orderedSales',
			label: 'Entries',
			sortable: true,
			tooltip: 'Number of sales entries for this day'
		},
		{
			key: 'timesOrderedFirstTime',
			label: 'Net Sales',
			sortable: true,
			tooltip: 'Total sales excluding tax'
		},
		{
			key: 'timesOrdered',
			label: 'Discount',
			sortable: true,
			tooltip: 'Total discount excluding tax'
		},
		{
			key: 'time',
			label: 'Items Sold',
			sortable: true,
			tooltip: 'Total number of items sold'
		}
	];

	const items = [
		{ value: 'Store A', label: 'Store A' },
		{ value: 'Store B', label: 'Store B' },
		{ value: 'Store C', label: 'Store C' }
	];

	const handleSearch = async () => {
		const params = new URLSearchParams(page.url.searchParams);
		params.set('store', store);

		const query = params.toString().replace(/\+/g, '%20');
		await goto(`?${query}`, { replaceState: false, noScroll: true, keepFocus: true });
		await invalidate('/api/sales');
	};

	$inspect(data);
</script>

<div class="space-y-4 rounded-lg bg-white p-4 shadow">
	<div>
		<MySelect bind:value={store} options={items} placeholder="Choose…" />
		<button
			class="cursor-pointer rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			onclick={handleSearch}>Search</button
		>
	</div>

	{#if salesData?.length}
		<DataTable data={salesData} {columns} />
	{:else}
		<p class="text-gray-500">No data available</p>
	{/if}
</div>
