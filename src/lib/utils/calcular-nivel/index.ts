import type { Nivel } from '$lib/types/nivel';

export function calcularNivel(
	validacion: (frecuencia: Record<string, number>) => boolean,
	opciones: {
		niveles: Nivel[];
		nivelPorDefecto: Nivel;
	},
): Nivel {
	const frecuencia: Record<string, number> = {};
	for (const nivel of opciones.niveles) {
		if (!nivel) {
			continue;
		}

		if (frecuencia[nivel as string]) {
			frecuencia[nivel as string]++;
		} else {
			frecuencia[nivel as string] = 1;
		}
	}

	if (validacion(frecuencia)) {
		return opciones.nivelPorDefecto;
	} else {
		let maxFrecuencia = 0;
		let media;
		for (let nivel in frecuencia) {
			if (frecuencia[nivel] > maxFrecuencia) {
				maxFrecuencia = frecuencia[nivel];
				media = nivel;
			}
		}

		return media as Nivel;
	}
}
