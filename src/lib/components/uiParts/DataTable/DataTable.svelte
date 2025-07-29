<!-- DataTable.svelte with Render Functions -->
<script lang="ts" generics="T extends object">
	import CustomTooltip from '../CustomTooltip.svelte';

	interface Column<T> {
		key: keyof T;
		label: string;
		sortable?: boolean;
		tooltip?: string;
		align?: 'left' | 'center' | 'right';
		renderHeader?: (col: Column<T>, sortKey: keyof T | null, sortDir: 'asc' | 'desc') => string;
		renderCell?: (row: T, col: Column<T>) => string;
	}

	interface Props {
		data: T[];
		columns: Column<T>[];
		totals?: Partial<T>;
	}

	let { data, columns, totals }: Props = $props();

	/* ---------- Sorting state ---------- */
	let sortKey = $state<keyof T | null>(null);
	let sortDir = $state<'asc' | 'desc'>('asc');

	/* ---------- Derived sorted data ---------- */
	const sortedData = $derived(
		sortKey
			? [...data].sort((a, b) => {
					const key = sortKey as keyof T;
					const av = a[key];
					const bv = b[key];
					return av < bv
						? sortDir === 'asc'
							? -1
							: 1
						: av > bv
							? sortDir === 'asc'
								? 1
								: -1
							: 0;
				})
			: data
	);

	/* ---------- Toggle handler ---------- */
	function toggleSort(key: keyof T) {
		if (sortKey === key) {
			sortDir = sortDir === 'asc' ? 'desc' : 'asc';
		} else {
			sortKey = key;
			sortDir = 'asc';
		}
	}

	/* ---------- Helper function to render HTML safely ---------- */
	function createHTML(htmlString: string) {
		return { __html: htmlString };
	}

	function alignClass(a?: 'left' | 'center' | 'right') {
		switch (a) {
			case 'center':
				return 'text-center';
			case 'right':
				return 'text-right';
			default:
				return 'text-left';
		}
	}
</script>

<div class="overflow-x-auto rounded-md border border-gray-100">
	<table class="min-w-full border-collapse whitespace-nowrap">
		<thead>
			<tr class="">
				{#each columns as col (col.key)}
					<th
						class="border border-gray-200 p-2 {alignClass(col.align)}"
						class:cursor-pointer={col.sortable !== false}
						class:hover:bg-gray-200={col.sortable !== false}
						onclick={() => col.sortable !== false && toggleSort(col.key)}
					>
						{#if col.renderHeader}
							{@html col.renderHeader(col, sortKey, sortDir)}
						{:else}
							<span class={alignClass(col.align)}>
								{col.label}

								{#if col.tooltip}
									<CustomTooltip title={col.tooltip} />
								{/if}

								<span class="inline-block w-3 text-xs text-gray-500">
									{#if col.sortable !== false}
										{sortKey === col.key ? (sortDir === 'asc' ? '▲' : '▼') : '↕'}
									{/if}
								</span>
							</span>
						{/if}
					</th>
				{/each}
			</tr>
		</thead>

		<tbody>
			{#each sortedData as row, rowIndex (row)}
				<tr
					class="border-t border-gray-200 text-sm text-gray-900 odd:bg-gray-50 even:bg-white hover:bg-sky-50
        {rowIndex === sortedData.length - 1 ? 'bg-gray-100 font-semibold' : ''}"
				>
					{#each columns as col}
						<td
							class="border border-gray-200 px-3 py-2 whitespace-nowrap
            {alignClass(col.align)}"
						>
							{#if col.renderCell}
								{@html col.renderCell(row, col)}
							{:else}
								{row[col.key] ?? ''}
							{/if}
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>

		{#if totals}
			<tfoot>
				<tr class="border-t-2 border-gray-300 bg-gray-100 font-semibold">
					{#each columns as col}
						<td class="border border-gray-200 p-2 {alignClass(col.align)}">
							{totals[col.key] ?? ''}
						</td>
					{/each}
				</tr>
			</tfoot>
		{/if}
	</table>
</div>
