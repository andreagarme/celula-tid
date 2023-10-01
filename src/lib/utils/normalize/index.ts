export function normalizar(valor: string) {
	return valor
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.trim();
}
