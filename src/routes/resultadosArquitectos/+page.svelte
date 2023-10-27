<script lang="ts">
	import video from '$lib/assets/video/arquitectos.mp4';
	import Banner from '$lib/components/Banner/banner.svelte';
	import H3 from '$lib/components/H3/H3.svelte';
	import type { Categoria } from '$lib/types/categoria';
	import type { Arquitecto, ArquitectoTitulos } from '$lib/types/arquitecto';
	import type { Evaluador, EvaluadorCategorias } from '$lib/types/evaluador';
	import type { Feedback } from '$lib/types/feedback';
	import type { Nivel } from '$lib/types/nivel';
	import { calcularNivel } from '$lib/utils/calcular-nivel';
	import { capitalizar } from '$lib/utils/capitalizar';
	import { agruparPor } from '$lib/utils/group-by';
	import { normalizar } from '$lib/utils/normalize';
	import { quitarClaves } from '$lib/utils/quitar-claves';
	import { importarXlsx } from '$lib/utils/importar-xlsx';
	import { Accordion, AccordionItem, Alert, Badge, Button, Fileupload, Modal } from 'flowbite-svelte';
	import { feedbackArquitectos } from './arquitectos';

	type ArquitectoConNiveles = Arquitecto & {
		nivelAlcance: Nivel;
		nivelAporte: Nivel;
		nivelCalidad: Nivel;
		puntajeAlcance: number;
		puntajeAporte: number;
		puntajeCalidad: number;
		nivelTotal: Nivel;
	};
	type DatosArquitecto = {
		nombreEmpleado: string;
		evaluadores: ArquitectoConNiveles[];
	};

	let categorias: EvaluadorCategorias;
	let titulos: ArquitectoTitulos;
	let arquitectos: DatosArquitecto[] = [];

	async function procesarArchivoXlsx(event: Event) {
		try {
			const { files } = event.target as HTMLInputElement;

			if (!files || files.length === 0) return;

			const datosImportados = await importarXlsx(files[0], { indexEncabezado: 2 });

			if (datosImportados.length < 3) {
				throw new Error('La plantilla debe contener datos para procesar');
			}

			categorias = datosImportados[0] as EvaluadorCategorias;

			titulos = quitarClaves(datosImportados[1] as ArquitectoTitulos, ['id', 'email', 'nombreEvaluador']);

			const arquitectosAgrupados = agruparPor<Arquitecto>(datosImportados.slice(2) as Arquitecto[], ({ nombreEmpleado }) =>
				capitalizar(normalizar(nombreEmpleado)),
			);

			arquitectos = Object.entries(arquitectosAgrupados).map(([nombreEmpleado, evaluadores]) => ({
				...generarResultados({ nombreEmpleado, evaluadores }),
			}));
		} catch (error) {
			alert(error);
		}
	}

	function obtenerRespuesta(evaluador: Evaluador, pregunta: string): string {
		return evaluador[pregunta as keyof Evaluador];
	}

	function calcularPuntaje(respuesta: string): number {
		const puntajes: { [key: string]: number } = {
			'actualmente no esta a su alcance hacerlo': 0,
			'menos de lo esperado': 1,
			'solo lo requerido': 2,
			'mas de lo esperado': 3,
			'resultados excepcionales y disruptivos': 4,
		};

		return puntajes[normalizar(respuesta).toLowerCase()];
	}

	function sumarPuntajeEvaluador(opciones: { evaluador: Evaluador; categoria: Categoria }): number {
		const preguntasCategoria = Object.entries(categorias ?? {})
			.filter(([_, categoria]) => categoria === opciones.categoria)
			.map(([pregunta]) => pregunta);

		const preguntasEvaluador = Object.entries(opciones.evaluador ?? {})
			.filter(([pregunta]) => preguntasCategoria.includes(pregunta))
			.map(([_, respuesta]) => respuesta);

		return preguntasEvaluador.reduce((total, respuestaActual) => total + calcularPuntaje(respuestaActual), 0);
	}

	function calcularNivelPuntaje({ puntaje, categoria }: { puntaje: number; categoria: Categoria }): Nivel | undefined {
		const nivelBajo = categoria === 'APORTE' ? [0, 7] : [0, 6];
		const nivelSenior = categoria === 'APORTE' ? [8, 10] : [7, 8];
		const nivelExpert = categoria === 'APORTE' ? [11, 13] : [9, 10];
		const nivelMaster = categoria === 'APORTE' ? [14, 16] : [11, 12];

		if (puntaje >= nivelBajo[0] && puntaje <= nivelBajo[1]) return 'Bajo';
		if (puntaje >= nivelSenior[0] && puntaje <= nivelSenior[1]) return 'Senior';
		if (puntaje >= nivelExpert[0] && puntaje <= nivelExpert[1]) return 'Expert';
		if (puntaje >= nivelMaster[0] && puntaje <= nivelMaster[1]) return 'Master';
	}

	function obtenerDatosEvaluador(evaluador: Evaluador): {
		puntajeAporte: number;
		puntajeCalidad: number;
		puntajeAlcance: number;
		nivelAporte: Nivel;
		nivelCalidad: Nivel;
		nivelAlcance: Nivel;
		nivelTotal: Nivel;
	} {
		const puntajeAporte = sumarPuntajeEvaluador({ evaluador, categoria: 'APORTE' });
		const puntajeCalidad = sumarPuntajeEvaluador({ evaluador, categoria: 'CALIDAD' });
		const puntajeAlcance = sumarPuntajeEvaluador({ evaluador, categoria: 'ALCANCE' });
		const nivelAporte = calcularNivelPuntaje({ puntaje: puntajeAporte, categoria: 'APORTE' })!;
		const nivelCalidad = calcularNivelPuntaje({ puntaje: puntajeCalidad, categoria: 'CALIDAD' })!;
		const nivelAlcance = calcularNivelPuntaje({ puntaje: puntajeAlcance as number, categoria: 'ALCANCE' })!;
		const nivelTotal = calcularNivel(
			(frecuencia) =>
				frecuencia['Bajo'] === 1 &&
				frecuencia['Senior'] === 1 &&
				frecuencia['Expert'] === 1 &&
				frecuencia['Master'] === 1,
			{
				niveles: [nivelAporte, nivelCalidad, nivelAlcance],
				nivelPorDefecto: 'Senior',
			},
		);

		return {
			puntajeAporte,
			puntajeCalidad,
			puntajeAlcance,
			nivelAporte,
			nivelCalidad,
			nivelAlcance,
			nivelTotal,
		};
	}

	function calcularNivelFinal({ evaluadores }: { evaluadores: ArquitectoConNiveles[] }): {
		evaluador: Evaluador;
		nivel: Nivel;
	} {
		const x = evaluadores
			.map((evaluador) => ({
				...evaluador,
				puntajeTotal: evaluador.puntajeAporte + evaluador.puntajeCalidad + evaluador.puntajeAlcance,
			}))
			.sort((a, b) => a.puntajeTotal - b.puntajeTotal);

		const y = x[0].nivelTotal;

		return {
			evaluador: x[0],
			nivel: y,
		};
	}

	function generarResultados({
		nombreEmpleado,
		evaluadores,
	}: {
		nombreEmpleado: string;
		evaluadores: Arquitecto[];
	}): DatosArquitecto {
		const xyz: DatosArquitecto = {
			nombreEmpleado: nombreEmpleado,
			evaluadores: [],
		};

		for (const evaluador of evaluadores) {
			const evaluadorConNiveles = { ...evaluador, ...obtenerDatosEvaluador(evaluador) };
			xyz.evaluadores?.push(evaluadorConNiveles);
		}

		return xyz;
	}

	function generarRetroalimentacion(evaluador: Evaluador, pregunta: string): Feedback | undefined {
		const puntaje = calcularPuntaje(evaluador[pregunta as keyof Evaluador]);

		if (puntaje === 0 || puntaje === 1) {
			return {
				puntaje: puntaje,
				descripcion: feedbackArquitectos[pregunta][0],
				color: 'red',
			};
		}

		if (puntaje === 2) {
			return {
				puntaje,
				descripcion: feedbackArquitectos[pregunta][1],
				color: 'yellow',
			};
		}

		if (puntaje === 3) {
			return {
				puntaje,
				descripcion: feedbackArquitectos[pregunta][2],
				color: 'green',
			};
		}

		if (puntaje === 4) {
			return {
				puntaje,
				descripcion: feedbackArquitectos[pregunta][3],
				color: 'blue',
			};
		}
	}
</script>

<div>
	<Banner backgroundUrl={video} />

	<div class="container mt-24 mb-24 text-center">
		<div class="max-w-5xl mx-auto prose prose-lg prose-stone dark:prose-invert">
			<H3 class="text-center">Resultados Plan Carrera Arquitectos</H3>
			<br />
			<p class="text-justify">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam inventore dolorem temporibus iusto quisquam
				ipsum, sint dolores quod magnam dignissimos maxime odio nemo perspiciatis beatae harum eum rerum explicabo.
				Numquam accusamus pariatur sunt vero ratione odit adipisci iste provident distinctio quibusdam impedit veniam
				necessitatibus
			</p>
		</div>
	</div>
</div>

<div class="container my-12">
	<Alert
		class="max-w-5xl mx-auto prose prose-lg prose-stone dark:prose-invert"
		color="blue"
		dismissable
	>
		<span class="font-medium"> Bienvenidos!</span>
		Para ver los resultados de Plan Carrera Diseñadores elige la plantilla correspondiente desde tu computador.
	</Alert>
	<div class="max-w-sm mx-auto mt-6">
		<Fileupload on:change={procesarArchivoXlsx} />
	</div>
	{#if arquitectos}
		<div class="mt-12">
			<Accordion multiple>
				{#each arquitectos as arquitecto}
					{@const nivelFinal = calcularNivelFinal({ evaluadores: arquitecto.evaluadores })}

					<AccordionItem>
						<svelte:fragment slot="header">
							{arquitecto.nombreEmpleado} ({arquitecto.evaluadores.length} evaluadores)
						</svelte:fragment>

						{#each arquitecto.evaluadores as evaluador}
							<Accordion flush>
								<AccordionItem>
									<svelte:fragment slot="header">
										<div class="flex items-center justify-between w-full pr-4">
											<div class="flex flex-col">
												<span class="flex items-center gap-2">
													{evaluador.nombreEvaluador}
													<Badge color="dark">{evaluador.rol}</Badge>
												</span>

												<div class="mt-2">
													<ul
														class="text-sm font-normal list-disc md:list-none md:flex md:items-center md:gap-2 md:flex-wrap"
													>
														<li>
															Total Aporte: {evaluador.puntajeAporte}
															<span class="font-light">({evaluador.nivelAporte})</span>
															<span class="hidden md:inline ml-1.5">•</span>
														</li>

														<li>
															Total Calidad: {evaluador.puntajeCalidad}
															<span class="font-light">({evaluador.nivelCalidad})</span>
															<span class="hidden md:inline ml-1.5">•</span>
														</li>

														<li>
															Total Alcance: {evaluador.puntajeAlcance}
															<span class="font-light">({evaluador.nivelAlcance})</span>
														</li>

														<li>
															Total Puntaje: {evaluador.puntajeAporte +
																evaluador.puntajeCalidad +
																evaluador.puntajeAlcance}
														</li>
													</ul>
												</div>
											</div>

											<Badge color="green">
												Nivel: {evaluador.nivelTotal}
											</Badge>
										</div>
									</svelte:fragment>

									{#each Object.entries(titulos) as [pregunta, titulo], index}
										{@const respuesta = obtenerRespuesta(evaluador, pregunta)}
										{@const puntaje = calcularPuntaje(respuesta)}

										<div class="mt-6">
											<h3 class="font-semibold">
												{index + 1}. {titulo}
											</h3>

											<p class="my-1">{respuesta}</p>

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

						<div class="mt-6">
							<Accordion>
								<AccordionItem
									defaultClass="flex items-center justify-between w-full font-medium text-left group-first:rounded-t-xl border-gray-200 dark:border-gray-700 bg-primary-200 dark:bg-primary-900"
								>
									<svelte:fragment slot="header">
										<div class="flex items-center justify-between w-full pr-4">
											<div class="flex flex-col">
												<span class="flex items-center gap-2">
													{nivelFinal.evaluador.nombreEvaluador}
												</span>
											</div>

											<Badge color="green">
												Nivel: {nivelFinal.nivel}
											</Badge>
										</div>
									</svelte:fragment>

									{#each Object.entries(titulos).filter( ([pregunta]) => pregunta.startsWith('pregunta'), ) as [pregunta, titulo], index}
										{@const feedback = generarRetroalimentacion(nivelFinal.evaluador, pregunta)}

										{#if feedback}
											<div class="mt-2">
												<Alert color={feedback.color}>
													<h3 class="font-semibold">
														{index + 1}. {titulo}
													</h3>

													<p class="my-2">{feedback.descripcion}</p>

													<Badge color={feedback.color}>
														Puntaje: {feedback.puntaje}
													</Badge>
												</Alert>
											</div>
										{/if}
									{/each}
								</AccordionItem>
							</Accordion>
						</div>
					</AccordionItem>
				{/each}
			</Accordion>
		</div>
	{/if}
</div>
