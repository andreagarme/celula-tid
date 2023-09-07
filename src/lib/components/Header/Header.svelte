<script>
	import Icon from '@iconify/svelte';
	import { DarkMode, Input } from 'flowbite-svelte';
</script>

<div class="bg-transparent py-2">
	<div class="container flex items-center justify-end gap-4">
		<div class="relative">
			<div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
				<Icon icon="ic:sharp-search" />
			</div>
			<Input
				size="sm"
				id="search-navbar"
				class="pl-10"
				placeholder="Search..."
			/>
		</div>

		<DarkMode size="sm" />
	</div>
</div>
