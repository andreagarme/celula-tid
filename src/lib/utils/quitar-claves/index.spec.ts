import { expect, it } from 'vitest';
import { quitarClaves } from '.';
// TODO: traducir
it('should remove specified keys from the object', () => {
	const obj = { a: 1, b: 2, c: 3 };
	const result = quitarClaves(obj, ['a', 'b']);

	expect(result).not.toHaveProperty('a');
	expect(result).not.toHaveProperty('b');

	expect(result).toHaveProperty('c');
});

it('should return a new object and not modify the original', () => {
	const obj = { a: 1, b: 2, c: 3 };
	const result = quitarClaves(obj, ['a', 'b']);

	expect(obj).toHaveProperty('a');
	expect(obj).toHaveProperty('b');

	expect(result).not.toBe(obj);
});

it('should work with an empty keys array', () => {
	const obj = { a: 1, b: 2, c: 3 };
	const result = quitarClaves(obj, []);

	expect(result).toEqual(obj);
});

it('should work with an empty object', () => {
	const obj: Record<string, unknown> = {};
	const result = quitarClaves(obj, ['a', 'b']);

	expect(result).toEqual({});
});
