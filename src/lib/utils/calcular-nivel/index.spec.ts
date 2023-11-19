// import { describe, expect, it } from 'vitest';
// import { calcularNivel } from '.';

// describe('calcularNivel', () => {
//   it('devuelve el nivel por defecto cuando se proporciona una lista vacía de niveles', () => {
//     const nivelPorDefecto = { nombre: 'Nivel por defecto', valor: 0 };
//     const niveles = [];
//     const resultado = calcularNivel(() => true, { niveles:[], nivelPorDefecto: [] });
//     expect(resultado).toBe(nivelPorDefecto);
//   });

//   it('devuelve el nivel único cuando se proporciona una lista de niveles con un solo nivel', () => {
//     const nivelUnico = { nombre: 'Nivel único', valor: 1 };
//     const niveles = [nivelUnico];
//     const resultado = calcularNivel(() => true, { niveles, nivelPorDefecto: null });
//     expect(resultado).toBe(nivelUnico);
//   });

//   it('devuelve el nivel más frecuente cuando se proporciona una lista de niveles con varios niveles', () => {
//     const nivel1 = { nombre: 'Nivel 1', valor: 1 };
//     const nivel2 = { nombre: 'Nivel 2', valor: 2 };
//     const nivel3 = { nombre: 'Nivel 3', valor: 3 };
//     const niveles = [nivel1, nivel2, nivel2, nivel3, nivel3, nivel3];
//     const resultado = calcularNivel(() => true, { niveles, nivelPorDefecto: null });
//     expect(resultado).toBe(nivel3);
//   });

//   it('devuelve el nivel más bajo cuando se proporciona una lista de niveles con varios niveles y dos o más niveles tienen la misma frecuencia', () => {
//     const nivel1 = { nombre: 'Nivel 1', valor: 1 };
//     const nivel2 = { nombre: 'Nivel 2', valor: 2 };
//     const nivel3 = { nombre: 'Nivel 3', valor: 3 };
//     const niveles = [nivel1, nivel2, nivel2, nivel3, nivel3, nivel3, nivel1];
//     const resultado = calcularNivel(() => true, { niveles, nivelPorDefecto: null });
//     expect(resultado).toBe(nivel1);
//   });
// });
