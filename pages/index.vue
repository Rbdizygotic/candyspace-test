<template>
  <!-- Main container with full width, centered content -->
  <div class="w-full flex justify-center">
    <!-- Calculator container with specific styling, including gradient background and shadow -->
    <div
      class="relative w-[21rem] h-[32rem] p-4 bg-gradient-to-b from-zinc-100 to-zinc-300 dark:from-neutral-700 dark:to-neutral-900 shadow-xl shadow-slate-400/60 dark:shadow-neutral-950 rounded-3xl flex flex-col items-center justify-end gap-8 overflow-hidden"
    >
      <!-- Container for the history of calculations -->
      <div class="w-full flex flex-col items-end overflow-hidden">
        <!-- Display each item in the history array -->
        <p
          class="text-zinc-400 dark:text-zinc-500 text-lg"
          v-for="(item, i) in history"
          :key="i"
        >
          {{ item }}
        </p>
      </div>
      <!-- Display the current value or 0 if the display is empty -->
      <p
        class="w-full font-bold text-zinc-600 dark:text-zinc-400 text-5xl tracking-wide text-end"
      >
        {{ display.length ? display : "0" }}
      </p>

      <!-- Buttons component for calculator input -->
      <TheButtons />
    </div>
  </div>
</template>

<script setup>
// Use Nuxt's useHead to set the page title
useHead({
  title: "Candyspace - Calculator",
});

// Import and use the calculator store
const store = useCalculatorStore();

// Computed property to get the history from the store
const history = computed(() => store.history);

// Computed property to get the display value from the store
const display = computed(() => store.display);
</script>
