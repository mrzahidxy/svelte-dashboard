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

<select
	bind:value
	onchange={handleChange}
	disabled={disabled}
	class="w-[270px] h-[50px] rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-700 shadow-sm placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
>
	{#if placeholder}
		<option disabled selected={value === ''} value="" class="text-gray-400">
			{placeholder}
		</option>
	{/if}

	{#each options as opt}
		<option
			value={opt.value}
			disabled={opt.disabled}
			class="text-gray-900 bg-white hover:bg-gray-100"
		>
			{opt.label}
		</option>
	{/each}
</select>
