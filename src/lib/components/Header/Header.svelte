<script>
	import { Navbar, NavBrand, NavLi, NavUl, NavHamburger, Button, Input } from 'flowbite-svelte';
	import Logo from '$lib/assets/images/logo-sura.svg';
	import Favicone from '$lib/assets/images/logo-sura.svg';
</script>

<Navbar let:hidden let:toggle>
	<NavUl {hidden} class="order-1">
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/docs/components/navbar">Navbar</NavLi>
		<NavLi href="/pricing">Pricing</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>

<Navbar let:hidden let:toggle>
	<NavBrand href="/">
		<img src={Logo} class="mr-3 h-6 sm:h-9" alt="Logo Sura" />
	</NavBrand>

	<div class="flex md:order-2">
		<Button size="sm">Inicia Sesión</Button>
		<NavHamburger on:click={toggle} />
	</div>

	<NavUl {hidden} class="order-1">
		<NavLi href="/" active={true}>Home</NavLi>
		<NavLi href="/about">About</NavLi>
		<NavLi href="/docs/components/navbar">Navbar</NavLi>
		<NavLi href="/pricing">Pricing</NavLi>
		<NavLi href="/contact">Contact</NavLi>
	</NavUl>
</Navbar>
