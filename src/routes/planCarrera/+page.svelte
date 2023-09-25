<script lang="ts">
	import Icon from '@iconify/svelte';
	import exceljs from 'exceljs';
	import { Accordion, AccordionItem, Alert, Badge, Button, Fileupload, Modal } from 'flowbite-svelte';
	import { feedback } from './feedback';
	import Banner from '$lib/components/Banner/banner.svelte';
	import H3 from '$lib/components/H3/H3.svelte';
	import H4 from '$lib/components/H4/H4.svelte';
</script>

<div>
	<Banner backgroundUrl="./src/lib/assets/video/video.mp4" />

	<div class="container mt-24 mb-24 text-center">
		<div class="prose prose-stone dark:prose-invert prose-lg mx-auto max-w-5xl">
			<H3 class="text-center">¿En qué consiste plan carrera?</H3>
			<br />
			<p class="text-justify">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam inventore dolorem temporibus iusto quisquam
				ipsum, sint dolores quod magnam dignissimos maxime odio nemo perspiciatis beatae harum eum rerum explicabo.
				Numquam accusamus pariatur sunt vero ratione odit adipisci iste provident distinctio quibusdam impedit veniam
				necessitatibus
			</p>
			<p class="text-justify">
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam inventore dolorem temporibus iusto quisquam
				ipsum, sint dolores quod magnam dignissimos maxime odio nemo perspiciatis beatae harum eum rerum explicabo.
				Numquam accusamus pariatur sunt vero ratione odit adipisci iste provident distinctio quibusdam impedit veniam
				necessitatibus
			</p>
		</div>
	</div>

	<div class="container mx-auto max-w-5xl mb-32">
		<H4>Resultados 2023</H4>
		<ul class="mt-10 space-y-1">
			<li>
				<a href="/resultadosDiseñadores">
					<div class="flex items-center">
						<Icon icon="ph:arrow-right-bold" />
						<span class="ml-2">Resultados Plan Carrera Diseñadores</span>
					</div>
				</a>
			</li>
			<li>
				<a href="/resultadosArquitectos">
					<div class="flex items-center">
						<Icon icon="ph:arrow-right-bold" />
						<span class="ml-2">Resultados Plan Carrera Arquitectos</span>
					</div>
				</a>
			</li>
		</ul>
	</div>
</div>
