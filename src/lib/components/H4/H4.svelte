<script lang="ts">
	let className: string = '';

	export { className as class };
</script>

<h4 class="text-3xl font-black leading-none {className}">
	<slot />
</h4>
