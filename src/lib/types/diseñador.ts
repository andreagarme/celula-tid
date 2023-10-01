export type DiseñadorRespuestas = {
	id: number;
	email: string;
	nombreEvaluador: string;
	nombreEmpleado: string;
	rol: 'Empleado' | 'Lider' | 'Tercero';
	pregunta1: string;
	pregunta2: string;
	pregunta3: string;
	pregunta4: string;
	pregunta5: string;
	pregunta6: string;
	pregunta7: string;
	pregunta8: string;
	pregunta9: string;
	pregunta10: string;
};

export type DiseñadorTitulos = Partial<DiseñadorRespuestas>;

export type DiseñadorCategorias = {
	pregunta1: 'APORTE';
	pregunta2: 'APORTE';
	pregunta3: 'APORTE';
	pregunta4: 'APORTE';
	pregunta5: 'CALIDAD';
	pregunta6: 'CALIDAD';
	pregunta7: 'CALIDAD';
	pregunta8: 'ALCANCE';
	pregunta9: 'ALCANCE';
	pregunta10: 'ALCANCE';
};
