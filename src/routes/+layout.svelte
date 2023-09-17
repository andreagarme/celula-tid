<script lang="ts">
	import { Footer } from '$lib/components/Footer';
	import { Navbar } from '$lib/components/Navbar';

	import '../app.pcss';
</script>

<div class="flex flex-col h-full">
	<Navbar />

	<div class="flex-1">
		<slot />
	</div>

	<Footer />
</div>
