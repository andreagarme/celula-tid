import { describe, expect, it } from 'vitest';
import { calcularNivelDiseñadores } from '.';

describe('calcularNivelDiseñadores', () => {
	it('debería devolver "Bajo" para la categoría "APORTE" y puntaje 5', () => {
		const resultado = calcularNivelDiseñadores({ puntaje: 5, categoria: 'APORTE' });
		expect(resultado).toBe('Bajo');
	});

	it('debería devolver "Senior" para la categoría "APORTE" y puntaje 10', () => {
		const resultado = calcularNivelDiseñadores({ puntaje: 10, categoria: 'APORTE' });
		expect(resultado).toBe('Senior');
	});

	it('debería devolver "Expert" para la categoría "APORTE" y puntaje 15', () => {
		const resultado = calcularNivelDiseñadores({ puntaje: 15, categoria: 'APORTE' });
		expect(resultado).toBe('Expert');
	});

	it('debería devolver "Bajo" para la categoría "CALIDAD" y puntaje 3', () => {
		const resultado = calcularNivelDiseñadores({ puntaje: 3, categoria: 'CALIDAD' });
		expect(resultado).toBe('Bajo');
	});

	it('debería devolver "Senior" para la categoría "CALIDAD" y puntaje 7', () => {
		const resultado = calcularNivelDiseñadores({ puntaje: 7, categoria: 'CALIDAD' });
		expect(resultado).toBe('Senior');
	});

	it('debería devolver "Expert" para la categoría "CALIDAD" y puntaje 11', () => {
		const resultado = calcularNivelDiseñadores({ puntaje: 11, categoria: 'CALIDAD' });
		expect(resultado).toBe('Expert');
	});
});
