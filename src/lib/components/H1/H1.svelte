<script lang="ts">
	let className: string = '';

	export { className as class };
</script>

<!-- Se agrega un alias a classname para pasar el prop como class y se agrega una interpolación por si quiero concatenar clases diferentes-->

<h1 class="text-6xl font-black leading-none {className}">
	<slot />
</h1>
