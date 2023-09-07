<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import H1 from '../H1/H1.svelte';

	export let backgroundUrl = '';
</script>

<div
	class="h-[600px] bg-no-repeat bg-center bg-cover w-full bg-black/80 bg-blend-soft-light"
	style={`background-image: url(${backgroundUrl});`}
>
	<div class="container h-full flex items-center">
		<div class="max-w-md">
			<H1 class="text-white">Lorem ipsum dolor sit amet consectetur adipisicing elit.</H1>

			<p class="mt-6 text-xl text-zinc-200">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nobis, nulla maxime enim
				nostrum officiis libero quas. Nihil veritatis tenetur velit.
			</p>

			<Button class="mt-6">Explorar</Button>
		</div>
	</div>
</div>
