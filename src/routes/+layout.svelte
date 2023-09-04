<script lang="ts">
	import Footer from '$lib/components/Footer/Footer.svelte';
	import Header from '$lib/components/Header/Header.svelte';
	import '../app.postcss';
</script>

<Header />

<slot />

<Footer />
