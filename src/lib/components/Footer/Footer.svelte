<script>
	import {
		Footer,
		FooterCopyright,
		FooterLinkGroup,
		FooterBrand,
		FooterLink
	} from 'flowbite-svelte';
	import Logo from '$lib/assets/images/logo-sura.svg';
</script>

<Footer footerType="logo">
	<div class="sm:flex sm:items-center sm:justify-between">
		<FooterBrand src={Logo} alt="Logo Sura" />
		<FooterLinkGroup
			ulClass="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 dark:text-gray-400"
		>
			<FooterLink href="https://www.gruposura.com/nuestra-compania/">Grupo Sura</FooterLink>
			<FooterLink href="https://www.somossura.com/">Somos Sura</FooterLink>
			<FooterLink href="https://sura.sistemaetico.com/">Línea Ética</FooterLink>
		</FooterLinkGroup>
	</div>
	<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
	<FooterCopyright href="/" by="Grupo SURA" />
</Footer>
