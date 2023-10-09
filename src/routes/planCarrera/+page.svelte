<script lang="ts">
	import video from '$lib/assets/video/video.mp4';
	import Banner from '$lib/components/Banner/banner.svelte';
	import H3 from '$lib/components/H3/H3.svelte';
	import H4 from '$lib/components/H4/H4.svelte';
	import Icon from '@iconify/svelte';
</script>

<div>
	<Banner backgroundUrl={video} />

	<div class="container mt-24 mb-24 text-center">
		<div class="max-w-5xl mx-auto prose prose-lg prose-stone dark:prose-invert">
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

	<div class="container max-w-5xl mx-auto mb-32">
		<H4>Resultados 2023</H4>
		<ul class="mt-10 space-y-1">
			<li>
				<a
					href="/resultadosDiseñadores"
					class="flex items-center transition-transform hover:translate-x-1 hover:text-primary-600"
				>
					<Icon icon="ph:arrow-right-bold" />
					<span class="ml-2">Resultados Plan Carrera Diseñadores</span>
				</a>
			</li>
			<li>
				<a
					href="/resultadosArquitectos"
					class="flex items-center transition-transform hover:translate-x-1 hover:text-primary-600"
				>
					<Icon icon="ph:arrow-right-bold" />
					<span class="ml-2">Resultados Plan Carrera Arquitectos</span>
				</a>
			</li>
		</ul>
	</div>
</div>
