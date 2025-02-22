<script>
	import { onMount } from 'svelte';
	import SunIcon from '$lib/icons/SunIcon.svelte';
	import MoonIcon from '$lib/icons/MoonIcon.svelte';
	import { t } from 'svelte-i18n';

	const themeAttribute = 'data-theme';
	const lightTheme = 'fantasy';
	const darkTheme = 'night';

	let theme = $state(lightTheme);
	let isDarkMode = $derived(theme === darkTheme);

	const toggleTheme = () => {
		theme = isDarkMode ? lightTheme : darkTheme;
		localStorage.setItem(themeAttribute, theme);
		document.documentElement.setAttribute(themeAttribute, theme);
	};

	onMount(() => {
		const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
		const prefTheme = prefersDarkMode ? darkTheme : lightTheme;
		const currentTheme =
			document.documentElement.getAttribute(themeAttribute) === darkTheme ? darkTheme : lightTheme;
		const storedTheme = localStorage.getItem(themeAttribute);
		theme = storedTheme || currentTheme || prefTheme;
	});
</script>

<button aria-label={$t('switch.colormode')} onclick={toggleTheme} class="btn btn-square btn-ghost">
	<label class="swap swap-rotate h-12 w-12">
		<input type="checkbox" name="toggle-theme" onchange={toggleTheme} checked={!isDarkMode} />
		<span class="swap-on" title={$t('switch.lightmode')}><MoonIcon /></span>
		<span class="swap-off" title={$t('switch.darkmode')}><SunIcon /></span>
	</label>
</button>
