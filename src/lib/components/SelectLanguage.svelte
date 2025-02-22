<script>
	import { locale } from 'svelte-i18n';
	import { STORAGE_KEYS as sk } from '$lib/constants';

	function toggleLanguage() {
		locale.set($locale.slice(0, 2) === 'de' ? 'en' : 'de');
		localStorage.setItem(sk.language, $locale.slice(0, 2));
	}
</script>

<div class="flex items-center justify-center">
	<span class="mr-2">DE</span>
	<input
		type="checkbox"
		class="toggle"
		checked={$locale.slice(0, 2) === 'en'}
		onchange={toggleLanguage}
	/>
	<span class="ml-2">EN</span>
</div>
