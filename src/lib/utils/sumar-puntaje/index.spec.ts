import { describe, expect, it } from 'vitest';
import { sumarPuntaje } from '.';

describe('sumarPuntaje', () => {
	it('calcula el puntaje total para una categoría específica', () => {
		const usuario = { aporte: 10, calidad: 20, alcance: 30 };
		const categorias = { aporte: 'APORTE', calidad: 'CALIDAD', alcance: 'ALCANCE' };
		const categoria = 'APORTE';

		const resultado = sumarPuntaje({ usuario, categorias, categoria });

		expect(resultado).toBe(10);
	});
});
