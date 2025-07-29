<!-- SearchBar.svelte -->
<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import CustomSelect from '$lib/components/uiParts/CustomSelect.svelte';
	import CustomDateRange from '$lib/components/uiParts/CustomDateRange.svelte';

	let start = $state('');
	let end = $state('');

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
		start = s ? s : '';
		end = e ? e : '';
	});

	/* ---- push local state to url on submit ---- */
	function search() {
		const sp = new URLSearchParams();
		if (start) sp.set('startDate', start);
		if (end) sp.set('endDate', end);

		// if (store) sp.set('store', store);

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
		<CustomDateRange bind:date1={start} bind:date2={end} />
	</div>

	<div class="flex items-center gap-3">
		<button
			type="submit"
			class="cursor-pointer h-[52px] rounded bg-blue-600 px-4 py-1 text-sm text-white hover:bg-blue-700"
		>
			Search
		</button>
	</div>
</form>
