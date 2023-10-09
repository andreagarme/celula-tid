import type { Evaluador } from './evaluador';

export type Diseñador = {
	id: number;
	email: string;
	nombreEmpleado: string;
	rol: 'Empleado' | 'Lider' | 'Tercero';
} & Evaluador;

export type DiseñadorTitulos = Partial<Diseñador>;
