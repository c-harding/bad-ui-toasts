<script setup lang="ts">
import { twMerge, type ClassNameValue } from 'tailwind-merge';
import { type InputTypeHTMLAttribute } from 'vue';

const { class: classes } = defineProps<{
  class?: ClassNameValue;
  type?: InputTypeHTMLAttribute;
  label?: string;
  autocomplete?: string;
}>();

const emit = defineEmits<{ keyDown: [key: string, success: boolean] }>();

const model = defineModel();

const ignoredKeys = ['Enter', 'Tab', 'Shift', 'Meta', 'Alt', 'Control', 'AltGraph', 'Escape'];

const onKeyDown = (e: KeyboardEvent) => {
  if (ignoredKeys.includes(e.key) || e.metaKey || e.ctrlKey || e.altKey) return;
  e.stopPropagation();
  const value = model.value;
  setTimeout(() => {
    const newValue = model.value;
    emit('keyDown', e.key, newValue !== value);
  });
};
</script>

<template>
  <label class="flex flex-col">
    <slot>{{ label }}</slot>
    <input
      v-model="model"
      :type
      :autocomplete
      :data-1p-ignore="autocomplete === 'off'"
      :class="
        twMerge(
          'shadow appearance-none',
          'border rounded',
          'py-2 px-3',
          'text-gray-700 leading-tight',
          'focus:outline-none focus:shadow-outline focus:border-blue-500',
          'focus:border-2 not-focus:m-px',
          classes,
        )
      "
      @keydown="onKeyDown"
    />
  </label>
</template>
