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
	class="w-48 appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
>
	{#if placeholder}
		<option disabled selected value="">{placeholder}</option>
	{/if}

	{#each options as opt}
		<option value={opt.value} disabled={opt.disabled} class="bg-gray-50 text-gray-900">
			{opt.label}
		</option>
	{/each}
</select>

<style>
	select option {
		background-color: #f9fafb; /* tailwind gray-50 */
		color: #111827; /* tailwind gray-900 */
	}

	select option:checked {
		background-color: #3b82f6; /* tailwind blue-500 */
		color: white;
	}

	select:focus {
		outline: none;
	}
</style>
