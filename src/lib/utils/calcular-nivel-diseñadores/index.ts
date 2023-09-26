/**
 * Función para calcular el nivel de un usuario basado en su puntaje y categoría.
 *
 * @param {Object} params - Parámetros de entrada.
 * @param {number} params.puntaje - Puntaje del usuario.
 * @param {'APORTE' | 'CALIDAD' | 'ALCANCE'} params.categoria - Categoría del usuario.
 *
 * @returns - Nivel del usuario.
 */
export function calcularNivelDiseñadores({
	puntaje,
	categoria,
}: {
	puntaje: number;
	categoria: 'APORTE' | 'CALIDAD' | 'ALCANCE';
}): 'Bajo' | 'Senior' | 'Expert' | undefined {
	const nivelBajo = categoria === 'APORTE' ? [0, 7] : [0, 5];
	const nivelSenior = categoria === 'APORTE' ? [8, 12] : [6, 9];
	const nivelExpert = categoria === 'APORTE' ? [13, 16] : [10, 12];

	if (puntaje >= nivelBajo[0] && puntaje <= nivelBajo[1]) return 'Bajo';
	if (puntaje >= nivelSenior[0] && puntaje <= nivelSenior[1]) return 'Senior';
	if (puntaje >= nivelExpert[0] && puntaje <= nivelExpert[1]) return 'Expert';
}
