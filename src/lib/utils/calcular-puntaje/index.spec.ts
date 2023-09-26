import { describe, expect, it } from 'vitest';
import { calcularPuntaje } from '.';

describe('calcularPuntaje', () => {
	it('debería devolver 0 para "actualmente no esta a su alcance hacerlo"', () => {
		expect(calcularPuntaje('actualmente no esta a su alcance hacerlo')).toBe(0);
	});

	it('debería devolver 1 para "menos de lo esperado"', () => {
		expect(calcularPuntaje('menos de lo esperado')).toBe(1);
	});

	it('debería devolver 2 para "solo lo requerido"', () => {
		expect(calcularPuntaje('solo lo requerido')).toBe(2);
	});

	it('debería devolver 3 para "mas de lo esperado"', () => {
		expect(calcularPuntaje('mas de lo esperado')).toBe(3);
	});

	it('debería devolver 4 para "resultados excepcionales y disruptivos"', () => {
		expect(calcularPuntaje('resultados excepcionales y disruptivos')).toBe(4);
	});

	it('debería devolver undefined para una respuesta no reconocida', () => {
		expect(calcularPuntaje('una respuesta no reconocida')).toBeUndefined();
	});

	it('debería manejar acentos', () => {
		expect(calcularPuntaje('más de lo esperado')).toBe(3);
		expect(calcularPuntaje('MÁS DE LO ESPERADO')).toBe(3);
	});

	it('debería manejar espacios adicionales', () => {
		expect(calcularPuntaje('  más de lo esperado  ')).toBe(3);
		expect(calcularPuntaje('   MÁS DE LO ESPERADO   ')).toBe(3);
	});

	it('debería manejar diferentes casos de letras', () => {
		expect(calcularPuntaje('Más De Lo Esperado')).toBe(3);
		expect(calcularPuntaje('MÁS DE LO ESPERADO')).toBe(3);
	});

	it('debería devolver undefined para una cadena vacía', () => {
		expect(calcularPuntaje('')).toBeUndefined();
	});

	it('debería devolver undefined para una respuesta con solo espacios', () => {
		expect(calcularPuntaje('   ')).toBeUndefined();
	});

	it('debería manejar acentos en todas las respuestas', () => {
		expect(calcularPuntaje('actualmente no está a su alcance hacerlo')).toBe(0);
		expect(calcularPuntaje('menos de lo esperado')).toBe(1);
		expect(calcularPuntaje('sólo lo requerido')).toBe(2);
		expect(calcularPuntaje('más de lo esperado')).toBe(3);
		expect(calcularPuntaje('resultados excepcionales y disruptivos')).toBe(4);
	});

	it('debería manejar diferentes casos de letras en todas las respuestas', () => {
		expect(calcularPuntaje('Actualmente No Está A Su Alcance Hacerlo')).toBe(0);
		expect(calcularPuntaje('Menos De Lo Esperado')).toBe(1);
		expect(calcularPuntaje('Sólo Lo Requerido')).toBe(2);
		expect(calcularPuntaje('Más De Lo Esperado')).toBe(3);
		expect(calcularPuntaje('Resultados Excepcionales Y Disruptivos')).toBe(4);
	});
});
