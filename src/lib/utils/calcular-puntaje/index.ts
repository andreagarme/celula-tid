import { normalizar } from '../normalize';

/**
 * Esta función calcula el puntaje basado en la respuesta proporcionada.
 *
 * @param - respuesta - La respuesta del usuario.
 * @returns - El puntaje correspondiente a la respuesta.
 *
 * @example
 * // returns 2
 * calcularPuntaje('solo lo requerido');
 */
export function calcularPuntaje(respuesta: string) {
	const puntajes: { [key: string]: number } = {
		'actualmente no esta a su alcance hacerlo': 0,
		'menos de lo esperado': 1,
		'solo lo requerido': 2,
		'mas de lo esperado': 3,
		'resultados excepcionales y disruptivos': 4,
	};

	return puntajes[normalizar(respuesta).toLowerCase()];
}
