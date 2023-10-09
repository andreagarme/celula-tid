export type Grupos<T> = Record<string, T[]>;

/**
 * Agrupa un array de objetos por una clave.
 * @param objetos - El array de objetos a agrupar.
 * @param claveAgrupamiento - La clave por la cual agrupar.
 * @returns Un objeto con claves como los valores únicos de la clave de agrupamiento y valores como arrays de objetos con esa clave.
 * @example
 * const objetos = [{ id: 1, nombre: 'Juan' }, { id: 2, nombre: 'Pedro' }, { id: 3, nombre: 'Juan' }];
 * const grupos = agruparPor(objetos, 'nombre');
 * // grupos es { Juan: [{ id: 1, nombre: 'Juan' }, { id: 3, nombre: 'Juan' }], Pedro: [{ id: 2, nombre: 'Pedro' }] }
 */
export function agruparPor<T extends Record<string, unknown>>(arreglo: T[], iterador: (item: Required<T>) => string) {
	const grupos: Grupos<T> = {};

	for (const item of arreglo) {
		const claveGrupo = iterador(item as Required<T>);

		if (grupos[claveGrupo]) {
			grupos[claveGrupo].push(item);
		} else {
			grupos[claveGrupo] = [item];
		}
	}

	return grupos;
}
