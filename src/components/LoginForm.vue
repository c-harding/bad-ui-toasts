<script setup lang="ts">
import { inject, ref } from 'vue';
import InputField from './InputField.vue';
import FormButton from './FormButton.vue';
import { ToastColor, toastProviderToken } from '@/toasts/ToastProvider';

const username = ref('');
const password = ref('');

const toastService = inject(toastProviderToken);

const notifyKeyDown = (field: string, key: string, success: boolean) => {
  const resolvedKey = key === ' ' ? 'Space' : key;

  if (success) {
    toastService?.addToast({
      title: 'Key press successful',
      message: `Successfully registered a key press in the ${field} field: ${resolvedKey}`,
      color: ToastColor.GREEN,
      lifeTime: 5_000,
    });
  } else {
    toastService?.addToast({
      title: 'Key press unsuccessful',
      message: `The key press for in the ${field} field (${resolvedKey}) had no effect`,
      color: ToastColor.YELLOW,
      lifeTime: 5_000,
    });
  }
};

const logIn = () => {
  if (!username.value || !password.value) {
    toastService?.addToast({
      title: 'Unable to log in',
      message: 'Please enter a username or a password in order to log in',
      color: ToastColor.YELLOW,
      tag: 'UNABLE_TO_LOG_IN',
    });
  } else {
    toastService?.addToast({
      title: 'Unable to log in',
      message: 'The user name or password does not exist in any of our databases',
      color: ToastColor.RED,
    });
    toastService?.addToast({
      title: 'Did you know?',
      message:
        'Did you know? We don’t have a database, and there are no usernames or passwords that will successfully log in!',
      color: ToastColor.BLUE,
    });
  }
};
</script>

<template>
  <form class="border border-neutral-500 rounded p-4 gap-4 flex flex-col" @submit.prevent="logIn()">
    <InputField
      v-model="username"
      autocomplete="off"
      @keyDown="(key, success) => notifyKeyDown('username', key, success)"
    >
      Username
    </InputField>
    <InputField
      type="password"
      v-model="password"
      autocomplete="off"
      @keyDown="(key, success) => notifyKeyDown('password', key, success)"
    >
      Password
    </InputField>
    <FormButton type="submit"> Log in </FormButton>
  </form>
</template>
