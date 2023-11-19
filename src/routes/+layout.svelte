<script lang="ts">
	import { Footer } from '$lib/components/Footer';
	import { Navbar } from '$lib/components/Navbar';

	import '../app.pcss';
</script>

<div class="flex flex-col h-full">
	<Navbar />

	<!-- El enrutamiento funciona a través de los slot (espacio o comodin que trae el contenido de la etiqueta). Son los props children en react-->

	<div class="flex-1">
		<slot />
	</div>

	<Footer />
</div>
