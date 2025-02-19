<script>
	import MenuIcon from '$lib/icons/MenuIcon.svelte';
	import BrandIcon from '$lib/icons/BrandIcon.svelte';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { t } from 'svelte-i18n';
	import { locale } from 'svelte-i18n';
	import { LANGUAGES } from '$lib/constants';
	import SelectLanguage from './SelectLanguage.svelte';
	let lang = $locale.slice(0, 2);

	//lang = $locale.slice(0, 2); //LANGUAGES.includes($locale.slice(0, 2)) ? $locale.slice(0, 2) : LANGUAGES[0];
	let open = false;
</script>

<!--- Top Navigation -->
<nav class="navbar mb-4 bg-base-100 p-0 pt-2">
	<button aria-label={$t('menu.home')} class="btn btn-outline" onclick={() => (open = !open)}>
		<MenuIcon />
	</button>
	<div class="ml-auto">
		<p class="tracking-wide antialiased max-sm:hidden">
			{$t('claim')}
		</p>
		<div class="divider divider-horizontal max-sm:hidden"></div>
		<p class="text-md tracking-wide antialiased">
			<a class="font-bold hover:text-primary" href="/"><BrandIcon />{$t('brand')}</a>
		</p>
	</div>
</nav>

<!-- Close sidebar navigation -->
<button
	type="button"
	class={`fixed inset-0 z-40 bg-gray-800 bg-opacity-75 transition-opacity  ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
	onclick={() => (open = false)}
	aria-label={$t('sidebar.close')}
	onkeydown={(e) => e.key === 'Enter' && (open = false)}
></button>

<!-- Sidebar Navigation -->
<div
	class={`fixed inset-y-0 left-0 z-50 w-64 transform bg-base-100 shadow-md transition-transform  ${open ? 'translate-x-0' : '-translate-x-full'}`}
>
	<nav class="flex flex-col gap-2 p-4">
		<a aria-label={$t('menu.home')} href="/"><BrandIcon /></a>
		<div class="flex justify-center">
			<ThemeToggle />
		</div>
		<a aria-label={$t('menu.search')} href="/search" class="btn btn-ghost">{$t('menu.search')}</a>
		<a
			aria-label={$t('menu.contact')}
			href={`/content/${$locale.slice(0, 2)}/contact`}
			class="btn btn-ghost"
		>
			{$t('menu.contact')}
		</a>
		<SelectLanguage />
	</nav>
</div>
