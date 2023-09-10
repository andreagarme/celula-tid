<script lang="ts">
	import { Rol } from '$lib/enums/Rol';
	import {
		Alert,
		Button,
		Fileupload,
		Modal,
		Table,
		TableBody,
		TableBodyCell,
		TableBodyRow,
		TableHead,
		TableHeadCell,
		Toggle,
	} from 'flowbite-svelte';
	import { read, utils } from 'xlsx';

	let empleadosImportados: any[] = [];
	let lideresImportados: any[] = [];
	let tercerosImportados: any[] = [];

	let datosEmpleados: any[] = [];
	let datosLideres: any[] = [];
	let datosTerceros: any[] = [];

	let modalAbierto = true;

	const columnasSeleccionadas: Record<string, boolean> = {};

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
		// Extraer la propiedad 'files' del objetivo del evento, asumiendo que es un HTMLInputElement.
		const { files } = event.target as HTMLInputElement;

		try {
			if (files) {
				// Leer el archivo Excel seleccionado como una secuencia binaria.
				const libroExcel = read(await files[0].arrayBuffer(), { type: 'binary' });

				// Convertir la hoja de Excel en un objeto JavaScript (JSON).
				const resultado = utils.sheet_to_json(libroExcel.Sheets[libroExcel.SheetNames[0]]);

				empleadosImportados = resultado.filter(
					(item: any) => item?.Rol?.toLowerCase() === Rol.Empleado,
				);

				lideresImportados = resultado.filter(
					(item: any) => item?.Rol?.toLowerCase() === Rol.Lider,
				);

				tercerosImportados = resultado.filter(
					(item: any) => item?.Rol?.toLowerCase() === Rol.Tercero,
				);

				modalAbierto = true;
			}
		} catch (error) {
			console.error(`Error al procesar el archivo`, error);
		}
	}

	/**
	 * Función para gestionar la selección de una columna en una interfaz de usuario mediante una casilla de verificación.
	 *
	 * Esta función se utiliza para responder a un evento de cambio en una casilla de verificación que representa una columna
	 * en una interfaz de usuario. Cuando se activa o desactiva la casilla de verificación, esta función actualiza la
	 * información de selección de columnas en un objeto `columnasSeleccionadas`.
	 *
	 * @param {Event} event - El evento que se produce cuando se cambia el estado de la casilla de verificación.
	 */
	function seleccionarColumna(event: Event) {
		const { checked, value } = event.target as HTMLInputElement;
		columnasSeleccionadas[value] = checked;
	}

	/**
	 * Función que filtra las columnas de un conjunto de datos importados según las columnas seleccionadas.
	 *
	 * Esta función toma un conjunto de datos importados y filtra las columnas según las columnas seleccionadas en el objeto
	 * `columnasSeleccionadas`. Crea un nuevo conjunto de datos con solo las columnas seleccionadas y devuelve ese conjunto filtrado.
	 *
	 * @param {any[]} datosImportados - El conjunto de datos importados que se desea filtrar.
	 * @returns {any[]} - Un nuevo conjunto de datos que contiene solo las columnas seleccionadas.
	 */
	function filtrarColumnas(datosImportados: any[]) {
		const filtrado = [];

		for (const dato of datosImportados) {
			const nuevoDato: Record<string, unknown> = {};

			for (const columna of Object.keys(columnasSeleccionadas)) {
				if (columnasSeleccionadas[columna]) {
					nuevoDato[columna] = dato[columna];
				}
			}

			filtrado.push(nuevoDato);
		}

		return filtrado;
	}

	/**
	 * Función que importa y filtra los resultados de diferentes roles.
	 *
	 * Esta función se encarga de importar y filtrar los resultados de empleados, líderes y terceros. Utiliza la función
	 * `filtrarColumnas` para seleccionar las columnas relevantes en cada conjunto de datos y almacena los resultados
	 * filtrados en variables separadas.
	 */
	function importarResultados() {
		datosEmpleados = filtrarColumnas(empleadosImportados);
		datosLideres = filtrarColumnas(lideresImportados);
		datosTerceros = filtrarColumnas(tercerosImportados);

		modalAbierto = false;
	}
</script>

{#if empleadosImportados.length || lideresImportados.length || tercerosImportados.length}
	<!-- Bind permite hacer doble enlace -->
	<Modal
		title="Importar resultados"
		size="lg"
		bind:open={modalAbierto}
	>
		<ul class="flex flex-col">
			{#each Object.keys(empleadosImportados?.[0] || lideresImportados?.[0] || tercerosImportados?.[0]) as columna}
				<li class="flex items-center w-full gap-6 border py-2 px-4 border-gray-500/20">
					<div class="flex-1">
						{columna}
					</div>
					<div class="flex justify-end">
						<Toggle
							bind:value={columna}
							on:change={seleccionarColumna}
						/>
					</div>
				</li>
			{/each}
		</ul>

		<svelte:fragment slot="footer">
			<div class="flex justify-end w-full">
				<Button
					color="primary"
					on:click={importarResultados}
				>
					Importar
				</Button>
			</div>
		</svelte:fragment>
	</Modal>
{/if}

<div class="container my-12">
	<Alert
		color="blue"
		dismissable
	>
		<span class="font-medium">Info alert!</span>
		Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, molestiae ipsa. A est earum
		explicabo, dolores accusantium quasi impedit eius.
	</Alert>

	<div class="mt-6 max-w-sm mx-auto">
		<Fileupload on:change={procesarResultados} />
	</div>

	<!-- 
	Este código realiza la generación dinámica de tablas basadas en diferentes conjuntos de datos.
	Itera a través de tres arrays diferentes (datosEmpleados, datosLideres, datosTerceros) y crea una tabla para cada array si contiene datos.
	Las tablas tienen encabezados que corresponden a las claves del primer objeto en el array y filas con celdas para cada valor en los objetos de datos.
	La clase "mt-12" se utiliza para agregar un margen superior al contenedor.
	-->
	{#each [datosEmpleados, datosLideres, datosTerceros] as datos}
		{#if datos.length}
			<div class="mt-12">
				<Table>
					<TableHead>
						{#each Object.keys(datos[0]) as columna}
							<TableHeadCell>{columna}</TableHeadCell>
						{/each}
					</TableHead>
					<TableBody>
						{#each datos as fila}
							<TableBodyRow>
								{#each Object.values(fila) as celda}
									<TableBodyCell>{celda}</TableBodyCell>
								{/each}
							</TableBodyRow>
						{/each}
					</TableBody>
				</Table>
			</div>
		{/if}
	{/each}
</div>
