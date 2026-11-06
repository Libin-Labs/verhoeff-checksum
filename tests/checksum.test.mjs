import test from 'node:test';
import assert from 'node:assert/strict';
import { verhoeffDigit, appendVerhoeff, validateVerhoeff } from '../dist/esm/index.js';
function oracle(text) {
  const p = [1, 5, 7, 6, 2, 8, 3, 0, 9, 4];
  let state = 0;
  for (const [i, c] of [...text].reverse().entries()) {
    let n = Number(c);
    for (let j = 0; j < i % 8; j++) n = p[n];
    if (state < 5) state = n < 5 ? (state + n) % 5 : 5 + ((state + n - 5) % 5);
    else state = n < 5 ? 5 + ((state - 5 - n + 5) % 5) : (state - n + 5) % 5;
  }
  return state === 0;
}
test('published Verhoeff vectors', () => {
  for (const [payload, digit] of [
    ['236', '3'],
    ['12345', '1'],
    ['142857', '0'],
  ]) {
    assert.equal(verhoeffDigit(payload), digit);
    assert.equal(validateVerhoeff(payload + digit), true);
  }
});
test('independent dihedral operation and iterated permutation oracle', () => {
  for (let n = 0; n < 1000; n++) {
    const payload = String(n);
    assert.deepEqual(Array.from({ length: 10 }, (_, d) => payload + d).filter(oracle), [
      appendVerhoeff(payload),
    ]);
  }
});
test('all adjacent unequal transpositions', () => {
  for (let n = 0; n < 100; n++) {
    const value = appendVerhoeff(String(n).padStart(2, '0'));
    for (let i = 0; i < value.length - 1; i++)
      if (value[i] !== value[i + 1])
        assert.equal(
          validateVerhoeff(value.slice(0, i) + value[i + 1] + value[i] + value.slice(i + 2)),
          false,
        );
  }
});
test('all single substitutions', () => {
  const value = appendVerhoeff('0123456789');
  for (let i = 0; i < value.length; i++)
    for (let d = 0; d < 10; d++)
      if (value[i] !== String(d))
        assert.equal(validateVerhoeff(value.slice(0, i) + d + value.slice(i + 1)), false);
});
test('long period, zeroes, and processing limit', () => {
  const payload = '0123456789'.repeat(40);
  assert.equal(oracle(appendVerhoeff(payload)), true);
  assert.equal(validateVerhoeff(appendVerhoeff('000')), true);
  assert.equal(appendVerhoeff('1'.repeat(4095)).length, 4096);
  assert.throws(() => verhoeffDigit('1'.repeat(4096)), TypeError);
});
test('types and malformed decimal', () => {
  for (const s of ['', '1', '12\n', '１２', '1 2']) assert.equal(validateVerhoeff(s), false);
  for (const s of ['', null, '1\n']) assert.throws(() => verhoeffDigit(s), TypeError);
  assert.throws(() => validateVerhoeff(123), TypeError);
});
