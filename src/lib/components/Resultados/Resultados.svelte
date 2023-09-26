<script lang="ts">
	import { Accordion, AccordionItem, Badge } from 'flowbite-svelte';

	export let usuarios: Record<string, any>[];
	export let tienePuntajeAporte = false;
	export let tienePuntajeCalidad = false;
	export let tienePuntajeAlcance = false;
	export let tieneNivelAporte = false;
	export let tieneNivelCalidad = false;
	export let tieneNivelAlcance = false;
	export let tieneNivelFinal = false;
</script>

<Accordion>
	{#each usuarios as usuario}
		<!-- {@const puntajeAporte = sumarPuntaje(usuario, 'APORTE')}
		{@const puntajeCalidad = sumarPuntaje(usuario, 'CALIDAD')}
		{@const puntajeAlcance = sumarPuntaje(usuario, 'ALCANCE')}

		{@const nivelAporte = calcularNivel({ puntaje: puntajeAporte, categoria: 'APORTE' })}
		{@const nivelCalidad = calcularNivel({ puntaje: puntajeCalidad, categoria: 'CALIDAD' })}
		{@const nivelAlcance = calcularNivel({ puntaje: puntajeAlcance, categoria: 'ALCANCE' })}

		{@const nivelFinal = calcularNivelFinal({ nivelAporte, nivelCalidad, nivelAlcance })}
         -->
		{@const puntajeAporte = 10}
		{@const puntajeCalidad = 10}
		{@const puntajeAlcance = 10}

		{@const nivelAporte = 'Expert'}
		{@const nivelCalidad = 'Expert'}
		{@const nivelAlcance = 'Expert'}

		{@const nivelFinal = 'Expert'}

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
								<span class="block text-sm font-medium text-gray-900 truncate dark:text-white">
									{usuario.nombre}
								</span>
								<span class="block text-sm text-gray-500 truncate dark:text-gray-400">
									{usuario.email}
								</span>
							</div>

							<ul class="text-sm font-normal list-disc md:list-none md:flex md:items-center md:gap-2 md:flex-wrap">
								<li>
									{#if tienePuntajeAporte}
										Total Aporte: {puntajeAporte}

										{#if tieneNivelAporte}
											<span class="font-light">({nivelAporte})</span>
										{/if}
									{/if}
									<span class="hidden md:inline ml-1.5">•</span>
								</li>

								<li>
									{#if tienePuntajeCalidad}
										Total Calidad: {puntajeCalidad}

										{#if tieneNivelCalidad}
											<span class="font-light">({nivelCalidad})</span>
										{/if}
									{/if}
									<span class="hidden md:inline ml-1.5">•</span>
								</li>

								<li>
									{#if tienePuntajeAlcance}
										Total Alcance: {puntajeAlcance}

										{#if tieneNivelAlcance}
											<span class="font-light">({nivelAlcance})</span>
										{/if}
									{/if}
								</li>
							</ul>

							<div class="flex items-center gap-2 mt-4 shrink-0">
								<slot name="actions" />
							</div>
						</div>
					</div>

					{#if tieneNivelFinal}
						<div class="flex">
							<Badge color="green">
								{nivelFinal}
							</Badge>
						</div>
					{/if}
				</div>
			</svelte:fragment>

			<!-- {#each obtenerPreguntas() as pregunta, index (index)}
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
					{/each} -->
		</AccordionItem>
	{/each}
</Accordion>
