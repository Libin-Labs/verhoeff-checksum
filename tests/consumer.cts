import { verhoeffDigit, appendVerhoeff, validateVerhoeff } from '@lp-labs/verhoeff-checksum';
const digit: string = verhoeffDigit('236');
const value: string = appendVerhoeff('236');
const valid: boolean = validateVerhoeff(value);
digit.toUpperCase();
valid.valueOf();
// @ts-expect-error exact string input required
verhoeffDigit(236);
// @ts-expect-error no options overload
validateVerhoeff(value, {});
// @ts-expect-error cannot append to null
appendVerhoeff(null);
