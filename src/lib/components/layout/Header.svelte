<script lang="ts">
  let isOpen = $state(false);

  const navLinks = [
    { href: '/', label: 'ホーム' },
    { href: '/sales', label: '売上管理' },
    { href: '/menu', label: 'メニュー管理' },
    { href: '/orders', label: 'オーダー管理' }
  ];

  function toggleMenu() {
    isOpen = !isOpen;
  }
</script>

<nav class="bg-white border-b border-gray-200 shadow-sm">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between items-center h-16">
      <!-- Logo -->
      <div class="flex items-center">
        <img src="/logo.svg" alt="Logo" class="h-8 w-auto mr-2" />
        <span class="font-semibold text-lg text-blue-600">ツナグNe! POS</span>
      </div>

      <!-- Desktop Nav -->
      <div class="hidden md:flex space-x-6">
        {#each navLinks as link}
          <a href={link.href} class="text-gray-700 hover:text-blue-600 text-sm font-medium">{link.label}</a>
        {/each}
      </div>

      <!-- Mobile Toggle Button -->
      <button
        class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 focus:outline-none"
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
        onclick={toggleMenu}
      >
        <span class="sr-only">メニューを開く</span>
        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {#if !isOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {/if}
        </svg>
      </button>
    </div>
  </div>

  <!-- Mobile Nav -->
  {#if isOpen}
    <div class="md:hidden" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {#each navLinks as link}
          <a href={link.href} class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600">
            {link.label}
          </a>
        {/each}
      </div>
    </div>
  {/if}
</nav>
