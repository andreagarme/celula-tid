<script lang="ts">
	import video from '$lib/assets/video/arquitectos.mp4';
	import Banner from '$lib/components/Banner/banner.svelte';
	import H3 from '$lib/components/H3/H3.svelte';
	import Icon from '@iconify/svelte';
	import exceljs from 'exceljs';
	import { Accordion, AccordionItem, Alert, Badge, Button, Fileupload, Modal } from 'flowbite-svelte';
	import { feedbackArquitectos } from './arquitectos';

	type Nivel = 'Junior' | 'Senior' | 'Expert' | 'Master';

	let resultado: Record<string, any>[] = [];
	let empleadosImportados: Record<string, any>[] = [];
	let lideresImportados: Record<string, any>[] = [];
	let tercerosImportados: Record<string, any>[] = [];

	let modalFeedback: {
		pregunta: string;
		puntaje: number;
		color: 'red' | 'yellow' | 'green' | 'blue';
		descripcion: string;
	}[] = [];
	let modalFeedbackAbierto = false;

	/**
	 * Función asincrónica para procesar los resultados de un evento de entrada, típicamente desencadenado por una carga de archivo.
	 *
	 * Esta función lee y analiza un archivo Excel cargado, extrae datos y los categoriza según el campo 'Rol'.
	 * Luego, establece ciertas variables globales y actualiza el estado de un modal.
	 *
	 * @async
	 * @param {Event} event - El evento de entrada desencadenado por la selección de un archivo.
	 *
	 * @throws {Error} Lanza un error si hay algún problema durante el procesamiento.
	 */
	async function procesarResultados(event: Event) {
		// Extraer la propiedad 'files' del target del evento, asumiendo que es un HTMLInputElement.
		const { files } = event.target as HTMLInputElement;

		if (!files) return;

		try {
			const libro = new exceljs.Workbook();
			await libro.xlsx.load(await files[0].arrayBuffer());
			const hoja = libro.worksheets[0];

			hoja.eachRow((row, rowNumber) => {
				const rowValue: Record<string, any> = {};

				row.eachCell((cell, colNumber) => {
					rowValue[hoja.getRow(2).getCell(colNumber).value as string] = cell.value;
				});

				if (rowNumber !== 2) {
					resultado.push(rowValue);
				}
			});

			empleadosImportados = resultado.filter((item) => item.rol === 'empleado');
			lideresImportados = resultado.filter((item) => item.rol === 'lider');
			tercerosImportados = resultado.filter((item) => item.rol === 'tercero');
		} catch (error) {
			console.log(error);

			alert(`Error al procesar el archivo ${JSON.stringify(error)}`);
		}
	}

	function obtenerPreguntas() {
		return Object.entries(resultado?.[1] ?? []).slice(3);
	}

	function encontrarRespuesta(usuario: Record<string, any>, pregunta: string) {
		return Object.entries(usuario).find((entry) => entry[0] === pregunta)?.[1];
	}

	function calcularPuntaje(respuesta: string) {
		const puntajes: { [key: string]: number } = {
			'actualmente no está a su alcance hacerlo': 0,
			'menos de lo esperado': 1,
			'solo lo requerido': 2,
			'mas de lo esperado': 3,
			'resultados excepcionales y disruptivos': 4,
		};

		return puntajes[respuesta.toLowerCase().trim()];
	}

	function calcularNivel({
		puntaje,
		categoria,
	}: {
		puntaje: number;
		categoria: 'APORTE' | 'CALIDAD' | 'ALCANCE';
	}): 'Junior' | 'Senior' | 'Expert' | 'Master' | undefined {
		const nivelJunior = categoria === 'APORTE' ? [0, 7] : [0, 6];
		const nivelSenior = categoria === 'APORTE' ? [8, 10] : [7, 8];
		const nivelExpert = categoria === 'APORTE' ? [11, 13] : [9, 10];
		const nivelMaster = categoria === 'APORTE' ? [14, 16] : [11, 12];

		if (puntaje >= nivelJunior[0] && puntaje <= nivelJunior[1]) return 'Junior';
		if (puntaje >= nivelSenior[0] && puntaje <= nivelSenior[1]) return 'Senior';
		if (puntaje >= nivelExpert[0] && puntaje <= nivelExpert[1]) return 'Expert';
		if (puntaje >= nivelMaster[0] && puntaje <= nivelMaster[1]) return 'Master';
	}

	function calcularNivelFinal({
		nivelAporte,
		nivelCalidad,
		nivelAlcance,
	}: {
		nivelAporte: Nivel | undefined;
		nivelCalidad: Nivel | undefined;
		nivelAlcance: Nivel | undefined;
	}): Nivel | undefined {
		const niveles = [nivelAporte, nivelCalidad, nivelAlcance];
		const conteo: Record<Nivel, number> = { Junior: 0, Senior: 0, Expert: 0, Master: 0 };

		niveles.forEach((nivel) => {
			if (nivel) {
				conteo[nivel]++;
			}
		});

		if (conteo.Junior === 1 && conteo.Senior === 1 && conteo.Expert === 1) return 'Senior';
		if (conteo.Junior === 1 && conteo.Senior === 1 && conteo.Master === 1) return 'Senior';
		if (conteo.Junior === 1 && conteo.Expert === 1 && conteo.Master === 1) return 'Senior';
		if (conteo.Senior === 1 && conteo.Expert === 1 && conteo.Master === 1) return 'Expert';
		if (conteo.Junior === 1 && conteo.Junior === 1 && conteo.Junior === 1) return 'Junior';
		if (conteo.Senior === 1 && conteo.Senior === 1 && conteo.Senior === 1) return 'Senior';
		if (conteo.Expert === 1 && conteo.Expert === 1 && conteo.Expert === 1) return 'Expert';
		if (conteo.Master === 1 && conteo.Master === 1 && conteo.Master === 1) return 'Master';

		let maxCount = 0;
		let maxLevel = undefined;

		for (const nivel in conteo) {
			if (conteo[nivel as Nivel] > maxCount) {
				maxCount = conteo[nivel as Nivel];
				maxLevel = nivel;
			}
		}

		return maxLevel as Nivel;
	}

	function sumarPuntaje(usuario: Record<string, any>, categoria: 'APORTE' | 'CALIDAD' | 'ALCANCE') {
		let suma = 0;

		const grupo = Object.entries(resultado?.[0] ?? []).filter(([, value]) => value === categoria);

		for (const [key] of grupo) {
			suma += calcularPuntaje(usuario[key]);
		}

		return suma;
	}

	function generarRetroalimentacion(usuario: Record<string, any>) {
		modalFeedback = [];

		for (const [preguntaClave, pregunta] of obtenerPreguntas()) {
			const puntaje = calcularPuntaje(usuario[preguntaClave]);

			if (puntaje === 0 || puntaje === 1) {
				modalFeedback.push({ pregunta, puntaje, color: 'red', descripcion: feedbackArquitectos[preguntaClave][0] });
			} else if (puntaje === 2) {
				modalFeedback.push({ pregunta, puntaje, color: 'yellow', descripcion: feedbackArquitectos[preguntaClave][1] });
			} else if (puntaje === 3) {
				modalFeedback.push({ pregunta, puntaje, color: 'green', descripcion: feedbackArquitectos[preguntaClave][2] });
			} else if (puntaje === 4) {
				modalFeedback.push({ pregunta, puntaje, color: 'blue', descripcion: feedbackArquitectos[preguntaClave][3] });
			}
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

	<div class="container mt-20 mb-24">
		<Alert
			class="max-w-5xl mx-auto prose prose-lg prose-stone dark:prose-invert"
			color="blue"
			dismissable
		>
			<span class="font-medium"> Bienvenidos!</span>
			Para ver los resultados de Plan Carrera Arquitectos elige la plantilla correspondiente desde tu computador.
		</Alert>

		<div class="max-w-sm mx-auto mt-6">
			<Fileupload on:change={procesarResultados} />
		</div>

		<!-- 
	Este código realiza la generación dinámica de tablas basadas en diferentes conjuntos de datos.
	Itera a través de tres arrays diferentes (datosEmpleados, datosLideres, datosTerceros) y crea una tabla para cada array si contiene datos.
	Las tablas tienen encabezados que corresponden a las claves del primer objeto en el array y filas con celdas para cada valor en los objetos de datos.
	La clase "mt-12" se utiliza para agregar un margen superior al contenedor.
	-->
		<div class="max-w-4xl mx-auto">
			{#each [empleadosImportados, lideresImportados, tercerosImportados] as roles, index}
				{#if roles.length}
					<div class="mt-6">
						<Accordion>
							<AccordionItem>
								<svelte:fragment slot="header">
									{#if index === 0}
										Empleados
									{:else if index === 1}
										Líderes
									{:else if index === 2}
										Terceros
									{/if}

									({roles.length} usuarios)
								</svelte:fragment>

								<Accordion>
									{#each roles as usuario}
										{@const puntajeAporte = sumarPuntaje(usuario, 'APORTE')}
										{@const puntajeCalidad = sumarPuntaje(usuario, 'CALIDAD')}
										{@const puntajeAlcance = sumarPuntaje(usuario, 'ALCANCE')}

										{@const nivelAporte = calcularNivel({ puntaje: puntajeAporte, categoria: 'APORTE' })}
										{@const nivelCalidad = calcularNivel({ puntaje: puntajeCalidad, categoria: 'CALIDAD' })}
										{@const nivelAlcance = calcularNivel({ puntaje: puntajeAlcance, categoria: 'ALCANCE' })}

										{@const nivelFinal = calcularNivelFinal({ nivelAporte, nivelCalidad, nivelAlcance })}

										<AccordionItem>
											<svelte:fragment slot="header">
												<div class="flex flex-wrap items-center justify-between w-full gap-4 pr-6">
													<div class="flex gap-3">
														<div class="flex-shrink-0">
															<img
																class="object-cover w-8 h-8 rounded-full"
																src="https://picsum.photos/200"
																alt="Neil"
															/>
														</div>

														<div class="flex flex-col gap-2">
															<div class="flex-1 min-w-[300px] truncate">
																<span
																	class="block text-sm font-medium text-gray-900 truncate dark:text-white"
																>
																	{usuario.nombre}
																</span>
																<span
																	class="block text-sm text-gray-500 truncate dark:text-gray-400"
																>
																	{usuario.email}
																</span>
															</div>

															<ul
																class="text-sm font-normal list-disc md:list-none md:flex md:items-center md:gap-2 md:flex-wrap"
															>
																<li>
																	Total Aporte: {puntajeAporte}
																	<span class="font-light">({nivelAporte})</span>
																	<span class="hidden md:inline ml-1.5">•</span>
																</li>

																<li>
																	Total Calidad: {puntajeCalidad}
																	<span class="font-light">({nivelCalidad})</span>
																	<span class="hidden md:inline ml-1.5">•</span>
																</li>

																<li>
																	Total Alcance: {puntajeAlcance}
																	<span class="font-light">({nivelAlcance})</span>
																</li>
															</ul>

															<div class="mt-4 shrink-0">
																<Button
																	color="alternative"
																	on:click={(event) => {
																		event.stopImmediatePropagation();
																		generarRetroalimentacion(usuario);
																		modalFeedbackAbierto = true;
																	}}
																>
																	<Icon
																		icon="solar:eye-outline"
																		class="mr-2 text-xl"
																	/>

																	Ver retroalimentación
																</Button>
															</div>
														</div>
													</div>

													<div class="flex">
														<Badge color="green">
															{nivelFinal}
														</Badge>
													</div>
												</div>
											</svelte:fragment>

											{#each obtenerPreguntas() as pregunta, index}
												<div class="mt-12">
													<h3 class="font-semibold">
														{index + 1}. {pregunta[1]}
													</h3>

													{#if pregunta}
														{@const respuesta = encontrarRespuesta(usuario, pregunta[0])}
														{@const puntaje = calcularPuntaje(respuesta)}

														<p class="my-0.5">{respuesta}</p>

														<Badge
															id="puntaje"
															color="green"
														>
															Puntaje: {puntaje}
														</Badge>
													{/if}
												</div>
											{/each}
										</AccordionItem>
									{/each}
								</Accordion>
							</AccordionItem>
						</Accordion>
					</div>
				{/if}
			{/each}
		</div>
	</div>
</div>

<Modal
	title="Retroalimentación"
	bind:open={modalFeedbackAbierto}
	autoclose
>
	<div class="flex flex-col gap-4">
		{#each modalFeedback as { pregunta, puntaje, color, descripcion }, index}
			<Alert
				class="border-t-4"
				{color}
			>
				<h4 class="font-semibold">{index + 1}. {pregunta}</h4>

				<p class="mt-2">{descripcion}</p>

				<div class="flex items-center justify-between mt-2">
					<span class="font-semibold">
						Puntaje: {puntaje}
					</span>
				</div>
			</Alert>
		{/each}
	</div>

	<svelte:fragment slot="footer">
		<Button on:click={() => (modalFeedbackAbierto = false)}>Aceptar</Button>
	</svelte:fragment>
</Modal>
