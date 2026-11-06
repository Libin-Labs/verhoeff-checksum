# @lp-labs/verhoeff-checksum

True Verhoeff decimal generation using the published dihedral multiplication and permutation tables. Catalog identity 426; standalone package version 0.1.0.
No runtime, peer, or sibling dependencies. Node >=18, ESM and CommonJS with declarations.

## Install

```sh
npm install @lp-labs/verhoeff-checksum
```

## Quickstart (runnable JavaScript)

```js
import assert from 'node:assert/strict';
import { verhoeffDigit, appendVerhoeff, validateVerhoeff } from '@lp-labs/verhoeff-checksum';
assert.equal(verhoeffDigit('236'), '3');
assert.equal(appendVerhoeff('236'), '2363');
assert.equal(validateVerhoeff('2363'), true);
assert.equal(validateVerhoeff('2633'), false);
```

## Customization and errors

All three operations accept ASCII decimal strings without normalization. Generate a single digit or append it; validation requires the full value including its last digit. Invalid payloads or non-string inputs throw TypeError; malformed complete strings return false. Leading zeroes are retained.

## Complete public declarations

Every runtime export and public type is shown below. This is the complete emitted declaration surface.

```ts
export declare function verhoeffDigit(payload: string): string;
export declare function appendVerhoeff(payload: string): string;
export declare function validateVerhoeff(value: string): boolean;
```

## Performance, boundaries and limitations

O(n) time, O(1) checksum workspace, payload 1..4095 digits and complete value 2..4096. Original implementation of published mathematical tables; tests also compute dihedral products and iterate the base permutation independently, and check adjacent unequal transpositions. This is error detection, not encryption, authenticity or tamper resistance; arbitrary distant swaps are not guaranteed detectable.

## Development

```sh
npm ci --offline
npm run build
npm run typecheck
npm test
npm run format:check
```

The offline install requires the locked development dependencies already in the npm cache.
Build emits separate ESM/CJS and declarations; type checks include bare-package .mts/.cts consumers with negative cases.
Runtime tests import only the single-quoted standalone dist entry and also run against installed offline tarballs.
No build artifacts or development dependencies are required at runtime.

## Support

If this library is useful to you, consider supporting its maintenance with a [donation via PayPal](https://www.paypal.me/LibinPrasanth).

## Author

Created by [Libin Prasanth](https://www.linkedin.com/in/libinprasanth/). Connect on LinkedIn for updates and discussion.
