<script lang="ts">
	import { DatePicker } from '@svelte-plugins/datepicker';
	import { format } from 'date-fns';
	import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';

	let {
		date1 = $bindable(),
		date2 = $bindable()
	}: {
		date1?: string;
		date2?: string;
	} = $props();

	const formatDate = (dateString: Date | number | string): string => {
		if (isNaN(new Date(dateString).getTime())) {
			return '';
		}
		return (dateString && format(new Date(dateString), dateFormat)) || '';
	};

	const formatToISO = (date: Date | number | string): string => {
		if (!date) return '';
		const d = new Date(date);
		if (isNaN(d.getTime())) return '';
		// Set time to current time for consistent ISO format
		const now = new Date();
		d.setHours(now.getHours(), now.getMinutes(), now.getSeconds());
		return d.toISOString().slice(0, 19); // Format: 2024-09-11T06:14:57
	};

	const today: Date = new Date();

	let startDate = $state<Date | number>(today);
	let endDate = $state<Date | number>(today);
	let dateFormat = $state<string>('MMM d, yyyy');
	let isOpen = $state<boolean>(false);

	const formattedStartDate = $derived(formatDate(startDate));
	const formattedEndDate = $derived(formatDate(endDate));

	// Update bindable props with ISO format whenever dates change
	$effect(() => {
		date1 = formatToISO(startDate);
		date2 = formatToISO(endDate);
	});

	const toggleDatePicker = (): void => {
		isOpen = !isOpen;
	};
</script>

<div class="date-filter">
	<DatePicker bind:isOpen bind:startDate bind:endDate isRange isMultipane>
		<button
			class="inline-flex min-w-[100px] items-center gap-2 border border-gray-200 bg-white px-4 py-4"
			onclick={toggleDatePicker}
			class:open={isOpen}
		>
			<div class="flex items-center gap-2">
				{#if startDate}
					{formattedStartDate} - {formattedEndDate}
				{:else}
					Pick a date
				{/if}

				<CalendarBlank class="size-5" />
			</div>
		</button>
	</DatePicker>
</div>
