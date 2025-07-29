<!-- SearchBar.svelte -->
<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import CustomSelect from '$lib/components/uiParts/CustomSelect.svelte';
	import CustomDateRange from '$lib/components/uiParts/CustomDateRange.svelte';

	const today = new Date().toISOString();

	let start = $state(today);
	let end = $state(today);

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

		const s = sp.get('startDate');
		const e = sp.get('endDate');
		start = s ? s : '';
		end = e ? e : '';
	});

	/* ---- push local state to url on submit ---- */
	function search() {
		const sp = new URLSearchParams(page.url.search); // keep everything
		if (start) sp.set('startDate', start);
		else sp.delete('startDate');

		if (end) sp.set('endDate', end);
		else sp.delete('endDate');

		goto(`?${sp}`, { replaceState: true });
	}

	$inspect('date', start, end);
</script>

<form
	class="flex flex-wrap items-center gap-3"
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
			class="h-[52px] min-w-[72px] rounded-md bg-sky-600 px-4 text-base font-semibold tracking-wide text-white
         transition-colors duration-150 hover:bg-sky-700 focus:ring-2 focus:ring-sky-400 focus:outline-none"
		>
			表示
		</button>
	</div>
</form>
