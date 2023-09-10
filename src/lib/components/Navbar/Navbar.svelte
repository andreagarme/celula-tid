<script>
	import Logo from '$lib/assets/images/logo-sura.svg';
	import { Button, NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';
</script>

<Navbar
	let:hidden
	let:toggle
>
	<NavBrand href="/">
		<img
			src={Logo}
			class="mr-3 h-6 sm:h-9"
			alt="Logo Sura"
		/>
	</NavBrand>

	<div class="flex md:order-2">
		<Button size="sm">Inicia Sesión</Button>
		<NavHamburger on:click={toggle} />
	</div>

	<NavUl
		{hidden}
		class="order-1"
	>
		<NavLi
			href="/"
			active={true}>Inicio</NavLi
		>
		<NavLi href="/resultados">Resultados</NavLi>
	</NavUl>
</Navbar>
