<script lang="ts">
	import { Footer } from '$lib/components/Footer';
	import { Header } from '$lib/components/Header';
	import { Navbar } from '$lib/components/Navbar';

	import '../app.pcss';
</script>

<div class="flex flex-col h-full">
	<Header />
	<Navbar />

	<div class="flex-1">
		<slot />
	</div>

	<Footer />
</div>
