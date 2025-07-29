<script module lang="ts">
	export interface TabItem {
		value: string;
		label: string;
	}
</script>

<script lang="ts" generics="T extends Readonly<TabItem[]>">
	import { Tabs } from 'bits-ui';
	import { page } from '$app/state';
	import { goto } from '$app/navigation';

	type Props = {
		tabs: T;
		param?: string;
		defaultValue?: T[number]['value'];
	};

	let { tabs, param = 'viewMode', defaultValue = tabs[0]?.value }: Props = $props();

	/* ---------- derive current tab value from URL ---------- */
	const urlValue = $derived(new URLSearchParams(page.url.search).get(param) ?? defaultValue);

	/* ---------- keep local state in sync with URL ---------- */
	let value = $state(urlValue);

	/* ---------- write param back to URL when user clicks a tab ---------- */
	$effect(() => {
		const sp = new URLSearchParams(page.url.search);
		if (sp.get(param) === value) return;   // nothing to change
		sp.set(param, value);
		goto(`${page.url.pathname}?${sp}`, { replaceState: true, noScroll: true });
	});
</script>

<Tabs.Root bind:value class="w-fit">
  <Tabs.List
    class=" inline-flex rounded-md border border-gray-200 bg-[#f1f3f5] text-sm overflow-hidden p-1"
  >
    {#each tabs as tab (tab.value)}
      <Tabs.Trigger
        value={tab.value}
        class="cursor-pointer px-4 py-2 font-medium text-gray-400 transition-colors
          focus:outline-none
          data-[state=active]:bg-white
          data-[state=active]:text-sky-600
          data-[state=active]:shadow-none"
      >
        {tab.label}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
</Tabs.Root>
