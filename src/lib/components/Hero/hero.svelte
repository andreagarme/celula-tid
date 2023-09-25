<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import H1 from '../H1/H1.svelte';

	export let backgroundUrl = '';
</script>

<div
	class="h-[800px] bg-no-repeat bg-center bg-cover w-full bg-black/60 bg-blend-soft-light"
	style={`background-image: url(${backgroundUrl});`}
>
	<div class="container h-full flex items-center">
		<div class="max-w-md">
			<H1 class="text-white">Ya están listos los resultados de Plan Carrera!</H1>

			<p class="mt-6 text-xl text-zinc-200">
				Ingresa para conocer los resultados de las pruebas realizadas a los diseñadores y arquitectos de TID
			</p>

			<Button class="mt-6"><a href="/planCarrera"> Explorar</a></Button>
		</div>
	</div>
</div>
