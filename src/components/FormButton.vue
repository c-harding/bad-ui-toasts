<script setup lang="ts">
import { twMerge, type ClassNameValue } from 'tailwind-merge';

const { class: classes } = defineProps<{
  class?: ClassNameValue;
  type?: 'submit' | 'reset' | 'button';
  label?: string;
}>();

const emit = defineEmits<{ keyDown: [key: string, success: boolean] }>();

const model = defineModel();

const ignoredKeys = ['Enter', 'Tab', 'Shift', 'Meta', 'Alt', 'Control', 'AltGraph'];

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
  <button
    :type
    :class="
      twMerge(
        'shadow appearance-none bg-green-300',
        'border border-green-500 rounded',
        'py-2 px-3',
        'text-center',
        'focus:outline-none focus:shadow-outline focus:border-green-500',
        'focus:border-2 not-focus:m-px',

        classes,
      )
    "
    @keydown="onKeyDown"
  >
    <slot>{{ label }}</slot>
  </button>
</template>
