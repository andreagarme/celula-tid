<script lang="ts">
	let className: string = '';

	export { className as class };
</script>

<h1 class="text-6xl font-black leading-none {className}">
	<slot />
</h1>
