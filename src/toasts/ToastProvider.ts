import type { InjectionKey } from 'vue';

export const toastProviderToken: InjectionKey<ToastProvider> = Symbol();

export interface ToastProvider {
  addToast(toast: ToastSpec): void;

  getToasts(): readonly Toast[];

  deleteToast(id: number): void;
}

export interface ToastSpec {
  title?: string;
  message: string;
  color?: ToastColor;
  lifeTime?: number;
  tag?: string;
}

export interface Toast {
  id: number;
  title?: string;
  message: string;
  color: ToastColor;
  tag?: string;
}

export enum ToastColor {
  RED = 'RED',
  YELLOW = 'YELLOW',
  GREEN = 'GREEN',
  BLUE = 'BLUE',
}
