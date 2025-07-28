<script lang="ts">
	import { DateRangePicker } from 'bits-ui';
	import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
	import CaretLeft from 'phosphor-svelte/lib/CaretLeft';
	import CaretRight from 'phosphor-svelte/lib/CaretRight';

	interface Props {
		label?: string;
		value?: string;
		startDate?: string;
		endDate?: string;
	}

	let { label, startDate = $bindable(), endDate = $bindable() }: Props = $props();

	const toFormattedISOString = (year: number, month: number, day: number) => {
		const date = new Date(year, month - 1, day);
		return date.toISOString().slice(0, 19); // Removes milliseconds and 'Z'
	};

	$inspect(startDate);
</script>




<DateRangePicker.Root
	onValueChange={({ start, end }) => {
		if (start && end) {
			startDate = toFormattedISOString(start.year, start.month, start.day);
			endDate = toFormattedISOString(end.year, end.month, end.day);
		}
	}}
	weekdayFormat="short"
	fixedWeeks={true}
	class="flex w-full max-w-[340px] flex-col gap-1.5"
	numberOfMonths={2}
>
	{#if label}
		<DateRangePicker.Label class="block text-sm font-medium text-gray-700 select-none">
			{label}
		</DateRangePicker.Label>
	{/if}

	<div
		class="flex w-full items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm tracking-tight text-gray-800 select-none focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 hover:border-gray-400"
	>
		{#each ['start', 'end'] as const as type (type)}
			<DateRangePicker.Input {type}>
				{#snippet children({ segments })}
					{#each segments as { part, value }, i (part + i)}
						<div class="inline-block select-none">
							{#if part === 'literal'}
								<DateRangePicker.Segment {part} class="px-1 text-gray-400">
									{value}
								</DateRangePicker.Segment>
							{:else}
								<DateRangePicker.Segment
									{part}
									class="rounded px-1 py-1 hover:bg-gray-100 focus:bg-gray-100 focus:text-gray-900 focus-visible:ring-0 focus-visible:ring-offset-0 aria-[valuetext=Empty]:text-gray-400"
								>
									{value}
								</DateRangePicker.Segment>
							{/if}
						</div>
					{/each}
				{/snippet}
			</DateRangePicker.Input>
			{#if type === 'start'}
				<div aria-hidden="true" class="px-1 text-gray-400">–</div>
			{/if}
		{/each}

		<DateRangePicker.Trigger
			class="ml-auto inline-flex size-8 items-center justify-center rounded text-gray-500 hover:bg-gray-100"
		>
			<CalendarBlank class="size-5" />
		</DateRangePicker.Trigger>
	</div>

	<DateRangePicker.Content sideOffset={6} class="z-50">
		<DateRangePicker.Calendar class="mt-6 rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
			{#snippet children({ months, weekdays })}
				<DateRangePicker.Header class="flex items-center justify-between">
					<DateRangePicker.PrevButton
						class="inline-flex size-9 items-center justify-center rounded transition hover:bg-gray-100 active:scale-[0.98]"
					>
						<CaretLeft class="size-5" />
					</DateRangePicker.PrevButton>
					<DateRangePicker.Heading class="text-base font-medium text-gray-700" />
					<DateRangePicker.NextButton
						class="inline-flex size-9 items-center justify-center rounded transition hover:bg-gray-100 active:scale-[0.98]"
					>
						<CaretRight class="size-5" />
					</DateRangePicker.NextButton>
				</DateRangePicker.Header>

				<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4">
					{#each months as month (month.value)}
						<DateRangePicker.Grid class="w-full space-y-1 select-none">
							<DateRangePicker.GridHead>
								<DateRangePicker.GridRow class="mb-1 flex w-full justify-between">
									{#each weekdays as day (day)}
										<DateRangePicker.HeadCell
											class="w-10 rounded-md text-center text-xs text-gray-400"
										>
											<div>{day.slice(0, 2)}</div>
										</DateRangePicker.HeadCell>
									{/each}
								</DateRangePicker.GridRow>
							</DateRangePicker.GridHead>

							<DateRangePicker.GridBody>
								{#each month.weeks as weekDates (weekDates)}
									<DateRangePicker.GridRow class="flex w-full">
										{#each weekDates as date (date)}
											<DateRangePicker.Cell
												{date}
												month={month.value}
												class="relative m-0 size-10 overflow-visible p-0 text-center text-sm"
											>
												<DateRangePicker.Day
													class="inline-flex size-10 items-center justify-center rounded text-gray-800 transition hover:border-gray-500 focus-visible:ring-blue-500 data-[disabled]:text-gray-300 data-[highlighted]:bg-gray-100 data-[selected]:bg-blue-500 data-[selected]:text-white data-[selection-end]:bg-blue-600 data-[selection-end]:text-white data-[selection-start]:bg-blue-600 data-[selection-start]:text-white data-[today]:font-semibold"
												>
													<div
														class="absolute top-1 hidden size-1 rounded-full bg-gray-800 group-data-selected:bg-white group-data-today:block"
													></div>
													{date.day}
												</DateRangePicker.Day>
											</DateRangePicker.Cell>
										{/each}
									</DateRangePicker.GridRow>
								{/each}
							</DateRangePicker.GridBody>
						</DateRangePicker.Grid>
					{/each}
				</div>
			{/snippet}
		</DateRangePicker.Calendar>
	</DateRangePicker.Content>
</DateRangePicker.Root>
