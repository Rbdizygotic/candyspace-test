<template>
  <div class="w-full flex flex-col gap-3.5">
    <div class="w-full flex justify-end gap-3.5">
      <TheButton @click="clearAll" color="orange">C</TheButton>
      <TheButton
        v-for="char in ['(', ')', '*']"
        :key="char"
        @click="inputChar(char)"
        :color="char === '*' ? 'purple' : ''"
        >{{ char }}</TheButton
      >
    </div>

    <div class="w-full flex justify-end gap-3.5">
      <TheButton
        v-for="char in ['7', '8', '9', '/']"
        :key="char"
        @click="inputChar(char)"
        :color="char === '/' ? 'purple' : ''"
        >{{ char }}</TheButton
      >
    </div>

    <div class="w-full flex justify-end gap-3.5">
      <TheButton
        v-for="char in ['4', '5', '6', '-']"
        :key="char"
        @click="inputChar(char)"
        :color="char === '-' ? 'purple' : ''"
        >{{ char }}</TheButton
      >
    </div>

    <div class="w-full flex justify-end gap-3.5">
      <TheButton
        v-for="char in ['1', '2', '3', '+']"
        :key="char"
        @click="inputChar(char)"
        :color="char === '+' ? 'purple' : ''"
        >{{ char }}</TheButton
      >
    </div>

    <div class="w-full flex justify-end gap-3.5">
      <TheButton
        v-for="char in ['.', '0']"
        :key="char"
        @click="inputChar(char)"
        color=""
        >{{ char }}</TheButton
      >
      <TheButton @click="clearOne">
        <img
          class="w-6 fill-red-200"
          src="~/assets/svg/delete-left-solid.svg"
          alt="Delete"
        />
      </TheButton>
      <TheButton @click="result" color="purple">=</TheButton>
    </div>
  </div>
</template>

<script setup>
const store = useCalculatorStore();

const clearOne = () => store.clearOne();
const clearAll = () => store.clearAll();
const inputChar = (char) => store.updateDisplayAction(char);
const result = () => store.calculate();
</script>
