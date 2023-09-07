<script lang="ts">
	let className: string = '';

	export { className as class };
</script>

<h5 class="text-2xl font-black leading-none {className}">
	<slot />
</h5>
