<script lang="ts">
	interface Option {
		value: string;
		label: string;
		disabled?: boolean;
	}

	interface Props {
		value: string;
		options: Option[];
		onchange?: (value: string) => void;
		disabled?: boolean;
		placeholder?: string;
	}

	let { value = $bindable(), options, onchange, disabled = false, placeholder }: Props = $props();

	function handleChange(event: Event) {
		const target = event.target as HTMLSelectElement;
		value = target.value;
		onchange?.(value);
	}
</script>

<label class="block w-full">
	<select
		bind:value
		onchange={handleChange}
		{disabled}
		class="h-12 w-full rounded-md border border-gray-300 bg-white px-3 text-gray-700 focus:border-blue-500 focus:ring-blue-500 focus:outline-none disabled:opacity-50"
	>
		{#if placeholder}
			<option value="" disabled selected={value === ''} class="text-gray-400">
				{placeholder}
			</option>
		{/if}

		{#each options as opt}
			<option value={opt.value} disabled={opt.disabled} class="bg-gray-100 text-gray-900">
				{#if opt.value === value}
					✔
				{/if}
				{opt.label}
			</option>
		{/each}
	</select>
</label>
