<script lang="ts">
	let className: string = '';

	export { className as class };
</script>

<h6 class="text-xl font-black leading-none {className}">
	<slot />
</h6>
