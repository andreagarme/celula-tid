<script lang="ts">
	import type { DiseñadorCategorias, DiseñadorRespuestas, DiseñadorTitulos } from '$lib/types/diseñador';
	import { calcularPuntaje } from '$lib/utils/calcular-puntaje';
	import { capitalizar } from '$lib/utils/capitalizar';
	import { agruparPor, type Grupos } from '$lib/utils/group-by';
	import { importarXlsx } from '$lib/utils/importar-xlsx';
	import { normalizar } from '$lib/utils/normalize';
	import { quitarClaves } from '$lib/utils/quitar-claves';
	import { Fileupload } from 'flowbite-svelte';

	let categorias: DiseñadorCategorias;
	let titulos: DiseñadorTitulos;
	let empleados: Grupos<DiseñadorRespuestas>;

	async function procesarArchivoXlsx(event: Event) {
		try {
			const { files } = event.target as HTMLInputElement;

			if (!files || files.length === 0) return;

			const datosImportados = await importarXlsx(files[0], { indexEncabezado: 2 });

			if (datosImportados.length < 3) {
				throw new Error('La plantilla debe contener datos para procesar');
			}

			categorias = datosImportados[0] as DiseñadorCategorias;

			titulos = quitarClaves(datosImportados[1] as DiseñadorTitulos, ['id', 'email', 'nombreEvaluador']);

			const empleadosAgrupados = agruparPor<DiseñadorRespuestas>(
				datosImportados.slice(2) as DiseñadorRespuestas[],
				({ nombreEmpleado }) => capitalizar(normalizar(nombreEmpleado)),
			);

			for (const [nmbre, evaluadores] of Object.entries(empleadosAgrupados)) {
				const evaluadoresConPuntaje = evaluadores.map((e) => {
					const evaluador: any = {
						nombreEmpleado: e.nombreEmpleado,
						rol: e.rol,
						pregunta1: { respuesta: e.pregunta1, puntaje: calcularPuntaje(e.pregunta1) },
						pregunta2: { respuesta: e.pregunta2, puntaje: calcularPuntaje(e.pregunta2) },
						pregunta3: { respuesta: e.pregunta3, puntaje: calcularPuntaje(e.pregunta3) },
						pregunta4: { respuesta: e.pregunta4, puntaje: calcularPuntaje(e.pregunta4) },
						pregunta5: { respuesta: e.pregunta5, puntaje: calcularPuntaje(e.pregunta5) },
						pregunta6: { respuesta: e.pregunta6, puntaje: calcularPuntaje(e.pregunta6) },
						pregunta7: { respuesta: e.pregunta7, puntaje: calcularPuntaje(e.pregunta7) },
						pregunta8: { respuesta: e.pregunta8, puntaje: calcularPuntaje(e.pregunta8) },
						pregunta9: { respuesta: e.pregunta9, puntaje: calcularPuntaje(e.pregunta9) },
						pregunta10: { respuesta: e.pregunta10, puntaje: calcularPuntaje(e.pregunta10) },
					};

					evaluador.puntajeAporte =
						evaluador.pregunta1.puntaje +
						evaluador.pregunta2.puntaje +
						evaluador.pregunta3.puntaje +
						evaluador.pregunta4.puntaje;
					evaluador.puntajeCalidad =
						evaluador.pregunta5.puntaje + evaluador.pregunta6.puntaje + evaluador.pregunta7.puntaje;
					evaluador.puntajeAlcance =
						evaluador.pregunta8.puntaje + evaluador.pregunta9.puntaje + evaluador.pregunta10.puntaje;

					return evaluador;
				});

				console.log(evaluadoresConPuntaje);
			}
		} catch (error) {
			alert(error);
		}
	}
</script>

<div class="container my-12">
	<div class="max-w-sm mx-auto mt-6">
		<Fileupload on:change={procesarArchivoXlsx} />
	</div>

	<!-- {#if respuestas}
		<div class="mt-12">
			<Accordion>
				{#each Object.entries(respuestas) as [nombreEmpleado, evaluadores]}
					<AccordionItem>
						<svelte:fragment slot="header">{nombreEmpleado}</svelte:fragment>

						{#each evaluadores as evaluador}
							<Accordion>
								<AccordionItem>
									<svelte:fragment slot="header">{evaluador.nombreEvaluador}</svelte:fragment>

									{#each Object.entries(titulos) as [claveTitulo, titulo], index}
										{@const respuesta = obtenerRespueta(evaluador, claveTitulo)}
										{@const puntaje = calcularPuntaje(respuesta)}

										<div class="mt-6">
											<h3 class="font-semibold">
												{index + 1}. {titulo}
											</h3>

											<p class="my-0.5">{respuesta}</p>

											{#if Number.isInteger(puntaje)}
												<Badge color="green">
													Puntaje: {puntaje}
												</Badge>
											{/if}
										</div>
									{/each}
								</AccordionItem>
							</Accordion>
						{/each}
					</AccordionItem>
				{/each}
			</Accordion>
		</div>
	{/if} -->
</div>
