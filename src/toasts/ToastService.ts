import { provide, reactive, readonly } from 'vue';
import {
  ToastColor,
  toastProviderToken,
  type Toast,
  type ToastProvider,
  type ToastSpec,
} from './ToastProvider';

export class ToastService implements ToastProvider {
  readonly #toasts: Toast[] = reactive([]);

  #counter = 0;

  getToasts(): readonly Toast[] {
    return readonly(this.#toasts);
  }

  addToast(toast: ToastSpec): number {
    if (toast.tag) {
      const index = this.#toasts.findIndex((t) => t.tag === toast.tag);
      if (index > -1) this.#toasts.splice(index, 1);
    }

    const id = ++this.#counter;
    this.#toasts.push({
      title: toast.title,
      message: toast.message,
      tag: toast.tag,
      color: toast.color ?? ToastColor.BLUE,
      id,
    });
    if (toast.lifeTime) {
      setTimeout(() => {
        this.deleteToast(id);
      }, toast.lifeTime);
    }
    return id;
  }

  deleteToast(id: number): void {
    setTimeout(() => {
      const index = this.#toasts.findIndex((toast) => toast.id === id);
      if (id >= 0) this.#toasts.splice(index, 1);
    });
  }
}

export const provideToasts = () => {
  const service = new ToastService();
  provide(toastProviderToken, service);
  return service;
};
