<script setup lang="ts">
import { inject } from 'vue';

import { ToastColor, toastProviderToken, type Toast } from './ToastProvider';
import { twMerge } from 'tailwind-merge';

const { onCanDismiss = () => true, onDismissed } = defineProps<{
  onCanDismiss?(toast: Toast): boolean;
  onDismissed?(toast: Toast): void;
}>();

const toastService = inject(
  toastProviderToken,
  () => {
    throw new Error('No toast provider found');
  },
  true,
);

const colors: Record<ToastColor, string> = {
  [ToastColor.RED]: 'bg-red-100 border-red-500',
  [ToastColor.YELLOW]: 'bg-yellow-100 border-yellow-500',
  [ToastColor.GREEN]: 'bg-green-100 border-green-500',
  [ToastColor.BLUE]: 'bg-blue-100 border-blue-500',
};

const dismiss = (toast: Toast) => {
  if (onCanDismiss(toast)) {
    toastService.deleteToast(toast.id);
    onDismissed?.(toast);
  }
};

const sizeForId = (toast: Toast) => Math.pow(0.75, toast.id - 5);
</script>

<template>
  <TransitionGroup
    appear
    name="toast-group"
    tag="aside"
    class="fixed top-0 right-0 max-h-dvh pointer-events-none flex flex-col flex-wrap-reverse p-4 gap-4 w-popup"
  >
    <article
      v-for="toast of toastService.getToasts()"
      :key="toast.id"
      class="pointer-events-auto flex flex-col p-4 max-w-popup rounded-xl left-4 right-4 border"
      :class="twMerge(colors[toast.color])"
      :style="{ '--button-scale': sizeForId(toast) }"
    >
      <button
        class="-m-1 ml-auto cursor-pointer -translate-y-1/3 origin-center scale-(--button-scale)"
        @click="dismiss(toast)"
      >
        &times;
      </button>
      <h2 v-if="toast.title" class="font-bold">{{ toast.title }}</h2>
      <p class="text-sm whitespace-pre-line">{{ toast.message }}</p>
    </article>
  </TransitionGroup>
</template>

<style>
.toast-group-move,
.toast-group-enter-active,
.toast-group-leave-active {
  transition: all 0.25s ease;
}

.toast-group-enter-from,
.toast-group-leave-to {
  opacity: 0;
}

.toast-group-leave-active {
  position: absolute;
}
</style>
