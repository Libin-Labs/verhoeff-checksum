const multiplication = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 3, 4, 0, 6, 7, 8, 9, 5],
  [2, 3, 4, 0, 1, 7, 8, 9, 5, 6],
  [3, 4, 0, 1, 2, 8, 9, 5, 6, 7],
  [4, 0, 1, 2, 3, 9, 5, 6, 7, 8],
  [5, 9, 8, 7, 6, 0, 4, 3, 2, 1],
  [6, 5, 9, 8, 7, 1, 0, 4, 3, 2],
  [7, 6, 5, 9, 8, 2, 1, 0, 4, 3],
  [8, 7, 6, 5, 9, 3, 2, 1, 0, 4],
  [9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
] as const;
const permutations = [
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
  [1, 5, 7, 6, 2, 8, 3, 0, 9, 4],
  [5, 8, 0, 3, 7, 9, 6, 1, 4, 2],
  [8, 9, 1, 6, 0, 4, 3, 5, 2, 7],
  [9, 4, 5, 3, 1, 2, 6, 8, 7, 0],
  [4, 2, 8, 6, 5, 7, 3, 9, 0, 1],
  [2, 7, 9, 3, 8, 0, 6, 4, 1, 5],
  [7, 0, 4, 6, 9, 1, 3, 2, 5, 8],
] as const;
const inverse = [0, 4, 3, 2, 1, 5, 6, 7, 8, 9] as const;
function decimal(value: unknown): asserts value is string {
  if (typeof value !== 'string' || value.length < 1 || value.length > 4095 || /[^0-9]/.test(value))
    throw new TypeError('Payload must contain 1..4095 ASCII digits.');
}
function state(value: string, offset: number): number {
  let current = 0;
  for (let i = 0; i < value.length; i++) {
    const digit = Number(value[value.length - 1 - i]);
    current = multiplication[current]![permutations[(i + offset) % 8]![digit]!]!;
  }
  return current;
}
export function verhoeffDigit(payload: string): string {
  decimal(payload);
  return String(inverse[state(payload, 1)]);
}
export function appendVerhoeff(payload: string): string {
  return payload + verhoeffDigit(payload);
}
export function validateVerhoeff(value: string): boolean {
  if (typeof value !== 'string') throw new TypeError('Value must be a string.');
  return (
    value.length >= 2 && value.length <= 4096 && !/[^0-9]/.test(value) && state(value, 0) === 0
  );
}
