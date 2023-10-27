import type { Evaluador } from './evaluador';

export type Arquitecto = {
	id: number;
	email: string;
	nombreEmpleado: string;
	rol: 'Empleado' | 'Lider' | 'Tercero';
} & Evaluador;

export type ArquitectoTitulos = Partial<Arquitecto>;
