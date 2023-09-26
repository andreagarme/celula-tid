import { calcularPuntaje } from '../calcular-puntaje';

/**
 * This function calculates the total score for a specific category.
 *
 * @param params - The parameters for the function.
 * @param params.usuario - The user object.
 * @param params.categorias - The categories object.
 * @param params.categoria - The category to calculate the score for.
 *
 * @returns The total score for the specified category.
 *
 * @example
 * const total = sumarPuntaje({
 *   usuario: { aporte: 10, calidad: 20, alcance: 30 },
 *   categorias: { aporte: 'APORTE', calidad: 'CALIDAD', alcance: 'ALCANCE' },
 *   categoria: 'APORTE'
 * });
 * console.log(total); // 10
 */
export function sumarPuntaje({
	usuario,
	categorias,
	categoria,
}: {
	usuario: Record<string, any>;
	categorias: Record<string, any>;
	categoria: 'APORTE' | 'CALIDAD' | 'ALCANCE';
}) {
	let suma = 0;

	const grupo = Object.entries(categorias ?? {}).filter(([, value]) => value === categoria);

	for (const [key] of grupo) {
		suma += calcularPuntaje(usuario[key]);
	}

	return suma;
}
