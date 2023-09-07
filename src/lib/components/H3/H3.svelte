<script lang="ts">
	let className: string = '';

	export { className as class };
</script>

<h3 class="text-4xl font-black leading-none {className}">
	<slot />
</h3>
