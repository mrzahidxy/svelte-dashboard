<!-- Usage Example with Render Functions -->
<script lang="ts">
	import DataTable from '$lib/components/uiParts/DataTable/DataTable.svelte';
	import MySelect from '$lib/components/uiParts/MySelect.svelte';
	import type { SalesItemByDay } from '$lib/core/interfaces/sales';
	import type { PageProps } from './$types';

	import { page } from '$app/state';
	import { goto, invalidate, invalidateAll } from '$app/navigation';

	type Row = { id: number; name: string; age: number; status: 'active' | 'inactive' };

	interface Column<T> {
		key: keyof T;
		label: string;
		sortable?: boolean;
		tooltip?: string;
		renderHeader?: (col: Column<T>, sortKey: keyof T | null, sortDir: 'asc' | 'desc') => string;
		renderCell?: (row: T, col: Column<T>) => string;
	}

	let { data }: PageProps = $props();


	let start = $state(data.start);
	let end = $state(data.end);
	let store = $state(data.store);


	let salesData = $derived(data.items);



	// $inspect(store);

	let columns: Column<SalesItemByDay>[] = [
		{
			key: 'dayOfWeek',
			label: 'Day',
			sortable: true,
			tooltip: 'Day of the week'
		},
		{
			key: 'count',
			label: 'Entries',
			sortable: true,
			tooltip: 'Number of sales entries for this day'
		},
		{
			key: 'totalSales',
			label: 'Net Sales',
			sortable: true,
			tooltip: 'Total sales excluding tax'
		},
		{
			key: 'totalDiscount',
			label: 'Discount',
			sortable: true,
			tooltip: 'Total discount excluding tax'
		},
		{
			key: 'itemsSold',
			label: 'Items Sold',
			sortable: true,
			tooltip: 'Total number of items sold'
		},
		{
			key: 'groups',
			label: 'Groups',
			sortable: true,
			tooltip: 'Total number of groups'
		},
		{
			key: 'salesPerGroup',
			label: 'Sales / Group',
			sortable: true,
			tooltip: 'Net sales per group',

			renderCell: (row: SalesItemByDay, col: Column<SalesItemByDay>) => {
				return `$${row.salesPerGroup.toFixed(2)}`;
			}
		},
		{
			key: 'people',
			label: 'People',
			sortable: true,
			tooltip: 'Total number of people'
		},
		{
			key: 'salesPerPeople',
			label: 'Sales / Person',
			sortable: true,
			tooltip: 'Net sales per person'
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



<div class="space-y-4 p-4">
	<div>
		<MySelect bind:value={store} options={items} placeholder="Choose…" />
		<button
			class="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
			onclick={handleSearch}>Search</button
		>
	</div>

	{#if salesData?.length}
		<DataTable data={salesData} {columns} />
	{:else}
		<p class="text-gray-500">No data available</p>
	{/if}
</div>
