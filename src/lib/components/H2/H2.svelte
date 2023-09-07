<script lang="ts">
	let className: string = '';

	export { className as class };
</script>

<h2 class="text-5xl font-black leading-none {className}">
	<slot />
</h2>
