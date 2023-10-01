import { describe, expect, test } from 'vitest';
import { normalizar } from '.'; // Asegúrate de importar la función desde el archivo correcto

describe('Pruebas para la función normalizar', () => {
	test('Debe eliminar los acentos de las letras', () => {
		expect(normalizar('áéíóú')).toBe('aeiou');
	});

	test('Debe eliminar espacios al principio y al final', () => {
		expect(normalizar(' hola ')).toBe('hola');
	});

	test('Debe manejar cadenas vacías', () => {
		expect(normalizar('')).toBe('');
	});

	test('Debe eliminar los diacríticos de las letras', () => {
		expect(normalizar('ñÑ')).toBe('nN');
	});

	test('Debe manejar caracteres especiales', () => {
		expect(normalizar('¿¡')).toBe('¿¡');
	});

	test('Debe manejar espacios intermedios', () => {
		expect(normalizar('hola mundo')).toBe('hola mundo');
	});

	test('Debe manejar cadenas con números', () => {
		expect(normalizar('123')).toBe('123');
	});
});
