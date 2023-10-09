export function capitalizar(valor: string) {
	return valor
		.toLowerCase()
		.split(' ')
		.filter(Boolean)
		.map((palabra) => `${palabra[0].toUpperCase()}${palabra.slice(1)}`)
		.join(' ');
}
