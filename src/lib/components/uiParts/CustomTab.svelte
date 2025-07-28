<!-- TabsWithQuery.svelte -->
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

  /* ---------- read current param from url ---------- */
  const urlValue = $derived(
    new URLSearchParams(page.url.search).get(param) ?? defaultValue
  );

  /* ---------- controlled tab value ----------------- */
  let value = $state<string>(urlValue);

  /* ---------- write param back to url -------------- */
$effect(() => {
  const sp = new URLSearchParams(page.url.search);
  const current = sp.get(param);

  if (current === value) return; // already in sync

  sp.set(param, value); // set default if missing or override
  goto(`${page.url.pathname}?${sp.toString()}`, {
    replaceState: true,
    noScroll: true
  });
});



</script>

<Tabs.Root bind:value class="w-fit">
  <Tabs.List class="inline-flex rounded-lg border border-gray-200 bg-gray-100 text-sm">
    {#each tabs as tab (tab.value)}
      <Tabs.Trigger
        value={tab.value}
        class="px-4 py-2 font-semibold text-gray-400 transition-colors
               focus:outline-none
               data-[state=active]:bg-white
               data-[state=active]:text-sky-600
               data-[state=active]:shadow"
      >
        {tab.label}
      </Tabs.Trigger>
    {/each}
  </Tabs.List>
</Tabs.Root>