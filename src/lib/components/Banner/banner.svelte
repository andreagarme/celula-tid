<script lang="ts">
	export let backgroundUrl: string;
</script>

<!-- Se agrega el prop backgroundUrl para poder modificar los videos en las distintas páginas -->

<div class="relative w-full h-full">
	<video
		class="w-full h-[700px] object-cover"
		autoplay
		muted
		loop
	>
		<source
			type="video/mp4"
			src={backgroundUrl}
		/>
	</video>
</div>
