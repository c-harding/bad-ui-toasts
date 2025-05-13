<script setup lang="ts">
import { ref } from 'vue';
import LoginForm from './components/LoginForm.vue';
import ToastContainer from './toasts/ToastContainer.vue';
import { ToastColor } from './toasts/ToastProvider';
import { provideToasts } from './toasts/ToastService';
import { useEventListener } from '@vueuse/core';

const toastService = provideToasts();

toastService.addToast({
  title: 'Congratulations!',
  message: 'You have been enrolled into a free trial of Toaster, sponsored by Kitchenaid.',
});

const escapeInfoToastShown = ref(false);

const showEscapeToast = () => {
  escapeInfoToastShown.value = true;
  toastService.addToast({
    title: 'Did you know?',
    message: 'Toasts can be dismissed with the ESC key!',
  });
};

const escapeBeingPressed = ref(false);

let remainingEscapes = 0;

const handleEscape = () => {
  const toasts = toastService.getToasts();
  if (toasts.length === 0) {
    toastService.addToast({
      title: 'Escape is not permitted',
      message: 'The escape key was not needed, there are no toasts to dismiss',
      color: ToastColor.YELLOW,
    });
  } else if (remainingEscapes <= 0) {
    toastService.addToast({
      title: 'EscapeKey Premium Pro subscription not found',
      message:
        'You do not have an active EscapeKey Premium Pro, and you have used your free Escape keypress for the day.\n\nPlease come back tomorrow, or contact QAware GmbH by post with your IP address and a €1 coin to enable EscapeKey Premium Pro for one week.',
      color: ToastColor.RED,
    });
  } else {
    toastService.deleteToast(toasts[0].id);
    toastService.addToast({
      title: 'EscapeKey limit reached',
      message:
        'You have used up your allowance of escape keypresses for the day. Please use the mouse or come back tomorrow.',
      color: ToastColor.YELLOW,
    });
  }
  remainingEscapes--;
};

useEventListener(window, 'keydown', (e) => {
  if (e.key === 'Escape') {
    escapeBeingPressed.value = true;
    e.preventDefault();
    handleEscape();
  }
});

useEventListener(window, 'keyup', (e) => {
  if (e.key === 'Escape') {
    escapeBeingPressed.value = false;
  }
});
</script>

<template>
  <ToastContainer @dismissed="!escapeInfoToastShown && showEscapeToast()" />
  <main class="flex flex-col m-4 items-center gap-4 *:max-w-content">
    <h1>Engineering Camp Login</h1>
    <LoginForm />
  </main>
  <Transition name="escape">
    <kbd
      v-if="escapeBeingPressed"
      class="fixed inset-0 m-auto p-1 w-[3em] border-2 border-neutral-400 rounded-sm aspect-square flex items-center justify-center bg-neutral-50 text-xl"
      >Esc</kbd
    >
  </Transition>
</template>

<style>
.escape-leave-active {
  transition: all 0.75s ease-out;
}

.escape-enter-from,
.escape-leave-to {
  opacity: 0;
}
</style>
