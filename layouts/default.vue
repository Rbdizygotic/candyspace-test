<template>
  <div class="min-h-screen h-full">
    <!-- Navbar -->
    <nav class="border-b border-gray-200 bg-white">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 justify-between">
          <!-- Logo section -->
          <div class="flex">
            <div class="flex flex-shrink-0 items-center">
              <!-- Logo for small screens -->
              <img
                class="block h-8 w-auto"
                src="https://www.candyspace.com/hubfs/CandySpace_August_2020/image/march-2021-logos/logo_blackcurrent_candyfloss.svg"
                alt="Candyspace"
              />
            </div>
            <!-- Navigation tabs for large screens -->
            <div class="hidden sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
              <NuxtLink
                v-for="tab in tabs"
                :key="tab.name"
                :to="tab.href"
                :class="[
                  tab.current
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                  'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium',
                ]"
                :aria-current="tab.current ? 'page' : undefined"
              >
                {{ tab.name }}
              </NuxtLink>
            </div>
          </div>
          <!-- Hamburger menu button for small screens -->
          <div class="-mr-2 flex items-center sm:hidden">
            <button
              @click="open = !open"
              class="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              aria-label="Open main menu"
            >
              <span class="sr-only">Open main menu</span>
              <!-- Menu icon when closed -->
              <svg
                v-if="!open"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
              <!-- Close icon when open -->
              <svg
                v-else
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <!-- Mobile menu, show/hide based on menu state -->
      <div class="sm:hidden" v-if="open">
        <div class="space-y-1 pb-3 pt-2">
          <NuxtLink
            v-for="tab in tabs"
            :key="tab.name"
            :to="tab.href"
            :class="[
              tab.current
                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                : 'border-transparent text-gray-600 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-800',
              'block border-l-4 py-2 pl-3 pr-4 text-base font-medium',
            ]"
            :aria-current="tab.current ? 'page' : undefined"
          >
            {{ tab.name }}
          </NuxtLink>
        </div>
      </div>
    </nav>
    <!-- Main content area -->
    <div class="py-10">
      <main>
        <div class="mx-auto max-w-7xl sm:px-6 lg:px-8 px-4">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

// Access the current route
const route = useRoute();
// State for toggling the mobile menu
const open = ref(false);

// Define tabs with reactive computed properties
const tabs = computed(() => [
  { name: "Calculator", href: "/", current: route.path === "/" },
  { name: "Car List", href: "/car", current: route.path === "/car" },
]);
</script>
  