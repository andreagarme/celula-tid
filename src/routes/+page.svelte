<script>
	import conocenos from '$lib/assets/images/conocenos.png';
	import quehacemos from '$lib/assets/images/quehacemos.png';
	import { H2 } from '$lib/components/H2';
	import { Hero } from '$lib/components/Hero';
</script>

<Hero backgroundUrl="https://www.sura-am.com/sites/default/files/2019-07/GettyImages-1010836444%20%282%29.jpg" />

<main class="container mt-24 mb-32">
	<section>
		<H2 class="text-center">¿Quiénes Somos?</H2>

		<div class="grid grid-cols-1 gap-32 mt-24 xl:grid-cols-2">
			<div class="prose prose-lg prose-stone dark:prose-invert xl:max-w-xl">
				<p class="text-justify mt-11">
					Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam inventore dolorem temporibus iusto quisquam
					ipsum, sint dolores quod magnam dignissimos maxime odio nemo perspiciatis beatae harum eum rerum explicabo.
					Numquam accusamus pariatur sunt vero ratione odit adipisci iste provident distinctio quibusdam impedit veniam
					necessitatibus
				</p>
			</div>
			<div>
				<img
					src={conocenos}
					alt="Imágen Célula TID"
					class="object-cover rounded-3xl"
				/>
			</div>
		</div>
	</section>

	<section>
		<H2 class="mt-32 text-center">¿Qué Hacemos?</H2>

		<div class="grid grid-cols-1 gap-32 mt-24 xl:grid-cols-2">
			<div class="prose prose-lg prose-stone dark:prose-invert xl:max-w-xl">
				<div>
					<img
						src={quehacemos}
						alt="Imágen Célula TID"
						class="object-cover rounded-3xl"
					/>
				</div>
			</div>
			<div class="prose prose-lg prose-stone dark:prose-invert xl:max-w-xl">
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
