<script lang="ts">
	import video from '$lib/assets/video/diseñadores.mp4';
	import Banner from '$lib/components/Banner/banner.svelte';
	import H3 from '$lib/components/H3/H3.svelte';
	import H4 from '$lib/components/H4/H4.svelte';
	import Resultados from '$lib/components/Resultados/Resultados.svelte';
	import Icon from '@iconify/svelte';
	import exceljs from 'exceljs';
	import { Accordion, AccordionItem, Alert, Button, Fileupload, Spinner } from 'flowbite-svelte';
	import { feedbackDiseñadores } from './diseñadores';

	let selectedColor = 'blue'; // Valor predeterminado
	let isEmbedded = true; // Valor predeterminado
	let isLoading = false;

	let resultado: Record<string, any>[] = [];
	let empleadosImportados: Record<string, any>[] = [];
	let lideresImportados: Record<string, any>[] = [];
	let tercerosImportados: Record<string, any>[] = [];
	let resultadosFinales: Record<string, any>[] = [];

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

		isLoading = true;

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

			empleadosImportados = resultado.filter((item) => item.rol?.toLowerCase() === 'empleado');
			lideresImportados = resultado.filter((item) => item.rol?.toLowerCase() === 'lider');
			tercerosImportados = resultado.filter((item) => item.rol?.toLowerCase() === 'tercero');
		} catch (error) {
			console.log(error);

			alert(`Error al procesar el archivo ${JSON.stringify(error)}`);
		} finally {
			isLoading = false;
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
			'actualmente no esta a su alcance hacerlo': 0,
			'menos de lo esperado': 1,
			'solo lo requerido': 2,
			'mas de lo esperado': 3,
			'resultados excepcionales y disruptivos': 4,
		};

		const respuestaNormalizada = respuesta
			.normalize()
			.replace(/[\u0300-\u036f]/g, '')
			.toLowerCase()
			.trim();

		return puntajes[respuestaNormalizada];
	}

	function sumarPuntaje(usuario: Record<string, any>, categoria: 'APORTE' | 'CALIDAD' | 'ALCANCE') {
		let suma = 0;

		const grupo = Object.entries(resultado?.[0] ?? []).filter(([, value]) => value === categoria);

		for (const [key] of grupo) {
			suma += calcularPuntaje(usuario[key]);
		}

		return suma;
	}

	function calcularNivel({
		puntaje,
		categoria,
	}: {
		puntaje: number;
		categoria: 'APORTE' | 'CALIDAD' | 'ALCANCE';
	}): 'Bajo' | 'Senior' | 'Expert' | undefined {
		const nivelBajo = categoria === 'APORTE' ? [0, 7] : [0, 5];
		const nivelSenior = categoria === 'APORTE' ? [8, 12] : [6, 9];
		const nivelExpert = categoria === 'APORTE' ? [13, 16] : [10, 12];

		if (puntaje >= nivelBajo[0] && puntaje <= nivelBajo[1]) return 'Bajo';
		if (puntaje >= nivelSenior[0] && puntaje <= nivelSenior[1]) return 'Senior';
		if (puntaje >= nivelExpert[0] && puntaje <= nivelExpert[1]) return 'Expert';
	}

	function generarRetroalimentacion(usuario: Record<string, any>) {
		modalFeedback = [];

		for (const [preguntaClave, pregunta] of obtenerPreguntas()) {
			const puntaje = calcularPuntaje(usuario[preguntaClave]);

			if (puntaje === 0 || puntaje === 1) {
				modalFeedback.push({ pregunta, puntaje, color: 'red', descripcion: feedbackDiseñadores[preguntaClave][0] });
			} else if (puntaje === 2) {
				modalFeedback.push({ pregunta, puntaje, color: 'yellow', descripcion: feedbackDiseñadores[preguntaClave][1] });
			} else if (puntaje === 3) {
				modalFeedback.push({ pregunta, puntaje, color: 'green', descripcion: feedbackDiseñadores[preguntaClave][2] });
			} else if (puntaje === 4) {
				modalFeedback.push({ pregunta, puntaje, color: 'blue', descripcion: feedbackDiseñadores[preguntaClave][3] });
			}
		}
	}
</script>

<div>
	<Banner backgroundUrl={video} />

	<div class="container mt-24 mb-24 text-center">
		<div class="max-w-5xl mx-auto prose prose-lg prose-stone dark:prose-invert">
			<H3 class="text-center">Resultados Plan Carrera Diseñadores</H3>
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
			Para ver los resultados de Plan Carrera Diseñadores elige la plantilla correspondiente desde tu computador.
		</Alert>

		<div class="max-w-sm mx-auto mt-6">
			<Fileupload on:change={procesarResultados} />
		</div>

		{#if isLoading}
			<div class="grid mt-16 place-items-center">
				<Spinner />
			</div>
		{:else}
			{#if empleadosImportados.length || lideresImportados.length || tercerosImportados.length}
				<section class="mt-16">
					<H4 class="mb-4">Resultados por rol</H4>

					<div class="max-w-4xl mx-auto">
						{#each [empleadosImportados, lideresImportados, tercerosImportados] as usuarios, index}
							<!-- <pre class="overflow-auto">{JSON.stringify(usuario)}</pre> -->
							<!-- {@const puntajeAporte = sumarPuntaje(usuario, 'APORTE')}
						{@const puntajeCalidad = sumarPuntaje(usuario, 'CALIDAD')}
						{@const puntajeAlcance = sumarPuntaje(usuario, 'ALCANCE')} -->
							{#if usuarios.length}
								<div class="mt-3">
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

												({usuarios.length})
											</svelte:fragment>

											<Resultados
												{usuarios}
												tienePuntajeAporte
												tienePuntajeCalidad
												tienePuntajeAlcance
											>
												<svelte:fragment slot="actions">
													<Button
														color="alternative"
														on:click={(event) => {
															event.stopImmediatePropagation();
														}}
													>
														<Icon
															icon="solar:eye-outline"
															class="mr-2 text-xl"
														/>

														Ver retroalimentación
													</Button>
												</svelte:fragment>
											</Resultados>
										</AccordionItem>
									</Accordion>
								</div>
							{/if}
						{/each}
					</div>
				</section>
			{/if}

			{#if resultadosFinales.length}
				<section class="mt-12">
					<H4 class="mb-4">Resultados finales</H4>

					<Accordion>
						<AccordionItem>
							<svelte:fragment slot="header">Resultados finales</svelte:fragment>

							<Resultados
								usuarios={resultadosFinales}
								tienePuntajeAporte
								tienePuntajeCalidad
								tienePuntajeAlcance
								tieneNivelAporte
								tieneNivelCalidad
								tieneNivelAlcance
								tieneNivelFinal
							/>
						</AccordionItem>
					</Accordion>
				</section>
			{/if}
		{/if}
	</div>
</div>
<!-- 
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

<form>
	<div class="container max-w-5xl mx-auto prose prose-lg prose-stone dark:prose-invert">
		<H6>Elige los Textos de Retroalimentación</H6>
		<Textarea
			class="mt-10 mb-24"
			placeholder="Write a comment"
		>
			<div
				slot="footer"
				class="flex items-center justify-between"
			>
				<Button type="submit">Post comment</Button>
			</div>
		</Textarea>
	</div>
</form>

<form on:submit={handleSubmit}>
	<label for="colorSelect">Selecciona un color:</label>
	<select
		id="colorSelect"
		bind:value={selectedColor}
	>
		<option value="blue">Azul</option>
		<option value="red">Rojo</option>
		<option value="green">Verde</option>
	</select>

	<label>
		<input
			type="checkbox"
			bind:checked={isEmbedded}
		/> Embebido
	</label>

	<button type="submit">Guardar</button>
</form> -->
