<!-- Sidebar.svelte -->
<script lang="ts">
	import { page } from '$app/state';
</script>

<aside class="flex w-64 shrink-0 flex-col border-r border-gray-200 bg-white">
	<nav class="flex-1 space-y-2 px-4 py-4">
		<a
			href="/hourly-order"
			class="block rounded-md px-3 py-2 text-sm transition-colors"
			class:text-gray-700={page.url.pathname !== '/hourly-order'}
			class:bg-gray-100={page.url.pathname === '/hourly-order'}
			class:text-sky-600={page.url.pathname === '/hourly-order'}
		>
			Hourly Order
		</a>

		<a
			href="/sales-by-day"
			class="block rounded-md px-3 py-2 text-sm transition-colors"
			class:text-gray-700={page.url.pathname !== '/sales-by-day'}
			class:bg-gray-100={page.url.pathname === '/sales-by-day'}
			class:text-sky-600={page.url.pathname === '/sales-by-day'}
		>
			Sales by Day
		</a>
	</nav>
</aside>