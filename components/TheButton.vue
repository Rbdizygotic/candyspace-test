<template>
  <button
    v-bind="$attrs"
    @click="$emit('click', $event)"
    :class="[overlayStyle, solidColor]"
    class="w-16 h-14 rounded-full focus:outline-none flex items-center justify-center overflow-hidden dark-mode"
  >
    <slot></slot>
  </button>
</template>

<script setup>
const props = defineProps({
  purple: {
    type: Boolean,
    required: false,
    default: false,
  },
  orange: {
    type: Boolean,
    required: false,
    default: false,
  },
  color: {
    type: String,
    required: false,
    default: "default",
  },
});

const store = useCalculatorStore();
const overlayStyle = computed(() => {
  const style = {
    orange:
      "relative before:content-[''] before:absolute before:top-0 before:left-0 before:rounded-full before:w-full before:h-full before:bg-yellow-700/20",
    purple:
      "relative before:content-[''] before:absolute before:top-0 before:left-0 before:rounded-full before:w-full before:h-full before:bg-purple-900/20",
  };

  return props.orange ? style.orange : props.purple ? style.purple : "";
});

const solidColor = computed(() => {
  const style = {
    orange: "text-white dark:text-white bg-yellow-600",
    purple: "text-white dark:text-white bg-purple-800",
    default: "text-white bg-zinc-300 dark:text-white dark:bg-neutral-800",
  };

  return style[props.color];
});

const emits = defineEmits(["click"]);
</script>

<style scoped>
.dark-mode {
  box-shadow: 1px 1px 4px black, -1px -1px 3px #4e4e4e;
}
</style>
