<!-- SearchBar.svelte -->
<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import CustomDateRangePicker from '$lib/components/uiParts/CustomDateRangePicker.svelte';
	import CustomSelect from '$lib/components/uiParts/CustomSelect.svelte';

	/* ---- local copies of the filters (mutable) ---- */
	let range = $state<{ start: string | undefined; end: string | undefined }>({
		start: undefined,
		end: undefined
	});

	let store = $state<string | undefined>(undefined);

	const items = [
		{ value: 'Store 1', label: 'Store 1' },
		{ value: 'Store 2', label: 'Store 2' },
		{ value: 'Store 3', label: 'Store 3' }
	];

	/* ---- read current url into local state ---- */
	$effect(() => {
		const sp = new URLSearchParams(page.url.search);

		const storeParam = sp.get('store');
		store = storeParam ? storeParam : undefined;

		const s = sp.get('start');
		const e = sp.get('end');
		range.start = s ? s : undefined;
		range.end = e ? e : undefined;
	});

	/* ---- push local state to url on submit ---- */
	function search() {
		const sp = new URLSearchParams();
		if (range.start) sp.set('start', range.start);
		if (range.end) sp.set('end', range.end);

		if (store) sp.set('store', store);

		goto(`?${sp.toString()}`, { replaceState: true });
	}



</script>

<form
	class="flex flex-wrap items-center gap-3 p-4"
	onsubmit={(e) => {
		e.preventDefault();
		search();
	}}
>
	<div class="flex items-center">
		<CustomSelect bind:value={store as string} options={items} placeholder="Choose..." />
	</div>
    
	<!-- Date Range Picker -->
	<div class="flex items-center">
		<CustomDateRangePicker bind:startDate={range.start} bind:endDate={range.end} />
	</div>

	<!-- Submit Button -->
	<button
		type="submit"
		class="h-[40px] rounded bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700"
	>
		Search
	</button>
</form>
