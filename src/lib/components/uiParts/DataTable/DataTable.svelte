<!-- DataTable.svelte with Render Functions -->
<script lang="ts" generics="T extends object">
	interface Column<T> {
		key: keyof T;
		label: string;
		sortable?: boolean;
		tooltip?: string;
		renderHeader?: (col: Column<T>, sortKey: keyof T | null, sortDir: 'asc' | 'desc') => string;
		renderCell?: (row: T, col: Column<T>) => string;
	}

	interface Props {
		data: T[];
		columns: Column<T>[];
	}

	let { data, columns }: Props = $props();

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
</script>

<div class="rounded-lg bg-white p-4 shadow">
	<table class="w-full border-collapse">
		<thead>
			<tr class="bg-gray-100">
				{#each columns as col (col.key)}
					<th
						class="border border-gray-200 p-2 text-left"
						class:cursor-pointer={col.sortable !== false}
						class:hover:bg-gray-200={col.sortable !== false}
						onclick={() => col.sortable !== false && toggleSort(col.key)}
					>
						{#if col.renderHeader}
							{@html col.renderHeader(col, sortKey, sortDir)}
						{:else}
							<span class="flex items-center gap-1">
								{col.label}

								{#if col.tooltip}
									<span
										class="inline-block h-4 w-4 shrink-0 cursor-help text-gray-500"
										title={col.tooltip}
									>
										?
									</span>
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
			{#each sortedData as row (row)}
				<tr class="border-t hover:bg-gray-50">
					{#each columns as col}
						<td class="border border-gray-200 p-2">
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
	</table>
</div>
