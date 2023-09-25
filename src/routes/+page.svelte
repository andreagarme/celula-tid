<script>
	import { H2 } from '$lib/components/H2';
	import { Hero } from '$lib/components/Hero';
</script>

<Hero backgroundUrl="https://www.sura-am.com/sites/default/files/2019-07/GettyImages-1010836444%20%282%29.jpg" />

<main class="container mt-24 mb-32">
	<section>
		<H2 class="ml-11 text-center">¿Quiénes Somos?</H2>

		<div class="grid grid-cols-1 xl:grid-cols-2 gap-32 mt-24">
			<div class="prose prose-stone dark:prose-invert prose-lg xl:max-w-xl">
				<p class="mt-11 text-justify">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam inventore dolorem temporibus iusto quisquam
					ipsum, sint dolores quod magnam dignissimos maxime odio nemo perspiciatis beatae harum eum rerum explicabo.
					Numquam accusamus pariatur sunt vero ratione odit adipisci iste provident distinctio quibusdam impedit veniam
					necessitatibus
				</p>
			</div>
			<div>
				<img
					src="./src/lib/assets/images/conocenos.png"
					alt="Imágen Célula TID"
					class="object-cover rounded-3xl"
				/>
			</div>
		</div>
	</section>

	<section>
		<H2 class="ml-11 mt-32 text-center">¿Qué Hacemos?</H2>

		<div class="grid grid-cols-1 xl:grid-cols-2 gap-32 mt-24">
			<div class="prose prose-stone dark:prose-invert prose-lg xl:max-w-xl">
				<div>
					<img
						src="./src/lib/assets/images/quehacemos.png"
						alt="Imágen Célula TID"
						class="object-cover rounded-3xl"
					/>
				</div>
			</div>
			<div class="prose prose-stone dark:prose-invert prose-lg xl:max-w-xl">
				<p class="mt-20 text-justify">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam inventore dolorem temporibus iusto quisquam
					ipsum, sint dolores quod magnam dignissimos maxime odio nemo perspiciatis beatae harum eum rerum explicabo.
					Numquam accusamus pariatur sunt vero ratione odit adipisci iste provident distinctio quibusdam impedit veniam
					necessitatibus
				</p>
			</div>
		</div>
	</section>
</main>
