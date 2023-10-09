import { describe, expect, it } from 'vitest';
import { agruparPor } from '.';

describe('agruparPor', () => {
	it('debería agrupar un array de objetos por una clave dada', () => {
		const objetos = [
			{ id: 1, nombre: 'Juan' },
			{ id: 2, nombre: 'Pedro' },
			{ id: 3, nombre: 'Juan' },
		];
		const resultadoEsperado = {
			Juan: [
				{ id: 1, nombre: 'Juan' },
				{ id: 3, nombre: 'Juan' },
			],
			Pedro: [{ id: 2, nombre: 'Pedro' }],
		};

		console.log(agruparPor(objetos, (item) => item.nombre));
		expect(agruparPor(objetos, (item) => item.nombre)).toEqual(resultadoEsperado);
	});

	it('debería devolver un objeto vacío si el array de entrada está vacío', () => {
		expect(agruparPor([], (item) => item['nombre'])).toEqual({});
	});

	it('debería agrupar correctamente incluso si la clave de agrupamiento no existe en algunos objetos', () => {
		const objetos = [{ id: 1, nombre: 'Juan' }, { id: 2 }, { id: 3, nombre: 'Juan' }];
		const resultadoEsperado = {
			Juan: [
				{ id: 1, nombre: 'Juan' },
				{ id: 3, nombre: 'Juan' },
			],
			undefined: [{ id: 2 }],
		};

		expect(agruparPor(objetos, (item) => item.nombre)).toEqual(resultadoEsperado);
	});

	it('debería tratar diferentes valores de la clave de agrupamiento como grupos separados', () => {
		const objetos = [
			{ id: 1, nombre: 'Juan' },
			{ id: 2, nombre: 'juan' },
			{ id: 3, nombre: 'Juan' },
		];
		const resultadoEsperado = {
			Juan: [
				{ id: 1, nombre: 'Juan' },
				{ id: 3, nombre: 'Juan' },
			],
			juan: [{ id: 2, nombre: 'juan' }],
		};

		expect(agruparPor(objetos, (item) => item.nombre)).toEqual(resultadoEsperado);
	});
});
