<!-- SearchBar.svelte -->
<script lang="ts">
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	import CustomSelect from '$lib/components/uiParts/CustomSelect.svelte';
	import CustomDateRange from '$lib/components/uiParts/CustomDateRange.svelte';
	import BitsDateRangePicker from '$lib/components/uiParts/BitsDateRangePicker.svelte';
	import type { CalendarDate } from '@internationalized/date';

	let range = $state<[CalendarDate, CalendarDate]>();
	function toISO(range: any) {
		if (!range?.start || !range?.end) return undefined;

		const pad = (n: number) => n.toString().padStart(2, '0');

		const fmt = (d: any) => `${d.year}-${pad(d.month)}-${pad(d.day)}T00:00:00`; // 2024-09-11T00:00:00

		return {
			start: fmt(range.start),
			end: fmt(range.end)
		};
	}

	let rangeError = $state('');

	const today = new Date().toISOString();
	let start = $state(today);
	let end = $state(today);

	let store = $state<string | undefined>(undefined);

	const items = [
		{ value: '1', label: 'Store 1' },
		{ value: '2', label: 'Store 2' },
		{ value: '3', label: 'Store 3' }
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
		rangeError = ''; // reset

		if (!toISO(range)?.start || !toISO(range)?.end) {
			rangeError = 'Start date and end date are required.';
			return;
		}

		const sp = new URLSearchParams(page.url.search); // keep everything
		// if (start) sp.set('startDate', start);
		if (range) sp.set('startDate', toISO(range)?.start ?? '');
		else sp.delete('startDate');

		// if (end) sp.set('endDate', end);
		if (range) sp.set('endDate', toISO(range)?.end ?? '');
		else sp.delete('endDate');

		if(store) sp.set('store', store);
		else sp.delete('store');

		goto(`?${sp}`, { replaceState: true });
	}
</script>

<form
	class="flex flex-wrap items-center gap-3"
	onsubmit={(e) => {
		e.preventDefault();
		search();
	}}
>
	<div class="flex items-center w-72">
		<CustomSelect bind:value={store as string} options={items} />
	</div>

	<!-- Date Range Picker -->
	<div class="flex items-center">
		<!-- <CustomDateRange bind:date1={start} bind:date2={end} /> -->

		<BitsDateRangePicker bind:range error={rangeError} />
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
