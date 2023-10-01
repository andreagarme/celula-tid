// TODO: traducir
/**
 * Removes the specified keys from the provided object.
 *
 * @param {Record<string, unknown>} obj - The object from which keys will be removed.
 * @param {string[]} keys - An array of keys to be removed from the object.
 * @returns {Record<string, unknown>} - A new object without the specified keys.
 */
export function quitarClaves<T extends Record<string, unknown>>(obj: T, keys: (keyof T)[]): Partial<T> {
	const strippedObject: Partial<Record<string, unknown>> = {};

	for (const key of Object.keys(obj)) {
		if (!keys.includes(key)) {
			strippedObject[key] = obj[key];
		}
	}

	return strippedObject as Partial<T>;
}
