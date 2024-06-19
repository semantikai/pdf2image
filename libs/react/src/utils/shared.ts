import { signal, effect, computed } from "@preact/signals-react";

export function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}

export const roundTo = (value: number, precision = 0) => {
  const multiplier = Math.pow(10, precision);
  const newValue = parseFloat((Math.abs(value) * multiplier).toFixed(11));
  return (Math.round(newValue) / multiplier) * Math.sign(value);
};

export const computedAwait = function (
  v,
  cb = arguments.length === 1 ? v : cb
) {
  const s = signal(arguments.length === 2 ? v : undefined);
  effect(() => cb().then((v) => (s.value = v)));
  return computed(() => s.value);
};

export const inchToPixel = (inch: number) => inch * 96;
