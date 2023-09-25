<script lang="ts">
	export let backgroundUrl = '';
</script>

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
