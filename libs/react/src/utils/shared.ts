import {
  signal,
  effect,
  computed,
  ReadonlySignal,
} from "@preact/signals-react";

export function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

export const roundTo = (value: number, precision = 0) => {
  const multiplier = Math.pow(10, precision);
  const newValue = parseFloat((Math.abs(value) * multiplier).toFixed(11));
  return (Math.round(newValue) / multiplier) * Math.sign(value);
};

export const computedAwait = function <T>(
  v: T | (() => Promise<T>),
  _cb: () => Promise<T>
): ReadonlySignal<T> {
  const cb = arguments.length === 1 ? (v as () => Promise<T>) : _cb;
  const s = signal<T | undefined>(
    arguments.length === 2 ? (v as T) : undefined
  );
  effect(() => (cb as () => Promise<T>)().then((v: T) => (s.value = v)));
  return computed(() => s.value as T);
};

export const inchToPixel = (inch: number) => inch * 96;
