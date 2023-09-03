<script lang="ts">
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Navbar from '$lib/components/Navbar/Navbar.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import '../app.postcss';
</script>

<Header />

<Navbar />

<slot />

<Footer />
