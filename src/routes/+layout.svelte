<!-- +layout.svelte -->
<script lang="ts">
	import Header from '$lib/components/layout/Header.svelte';
	import Sidebar from '$lib/components/layout/Sidebar.svelte';
	let { children } = $props();

	import '../app.css';
</script>

<div class="flex h-screen">
  <!-- Sidebar stays put, no overlap -->
  <Sidebar />

  <!-- Main content area -->
  <div class="flex flex-col flex-1 min-w-0">
    <Header />
    <main class="flex-1 overflow-y-auto bg-gray-50 p-6">
      {@render children()}
    </main>
  </div>
</div>
