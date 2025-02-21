<script>
	import '../app.css';
	import '$lib/i18n.js';
	import { isLoading, locale, getLocaleFromNavigator } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import { db, createIndex } from '$lib/db';
	import { t } from 'svelte-i18n';
	import NotepadIcon from '$lib/icons/NotepadIcon.svelte';
	import Notepad from '$lib/components/Notepad.svelte';
	import { LANGUAGES, STORAGE_KEYS as sk } from '$lib/constants';
	import Menu from '$lib/components/Menu.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import ScrollTop from '$lib/components/ScrollTop.svelte';

	let { children } = $props();

	// Initialize the search index, load locale and selected vocabs
	onMount(async () => {
		await createIndex();

		// get language
		let savedLang = sessionStorage.getItem(sk.language) || getLocaleFromNavigator() || '';
		$locale = LANGUAGES.includes(savedLang) ? savedLang : 'en';

		// get selected vocabs from localStorage
		const selectedVocabsString = sessionStorage.getItem(sk.notepad) || '{"selectedVocabs": []}';
		const selectedVocabs = await JSON.parse(selectedVocabsString);
		db.update((db) => ({ ...db, ...selectedVocabs }));
	});
</script>

{#if !$isLoading}
	<div class="drawer drawer-end">
		<input id="my-drawer" type="checkbox" class="drawer-toggle" />
		<div class="drawer-content overflow-auto">
			<div class="mt-4 flex flex-row max-lg:px-2 lg:px-8">
				<div class="mx-auto w-full max-lg:pr-8 lg:w-3/4">
					<!-- page content -->
					<!-- Navbar -->
					<Menu />
					<!-- Right Sidebar -->
					{#if $db.selectedVocabs.length}
						<div class="fixed bottom-0 right-0 h-32 w-16 rounded-tl-lg bg-base-100 md:hidden">
							<div class="absolute bottom-16 right-2">
								<label for="my-drawer" class="btn btn-outline">
									<NotepadIcon />
								</label>
							</div>
						</div>
						<div class="fixed right-0 top-16 z-30 hidden origin-bottom-right -rotate-90 md:flex">
							<label for="my-drawer" class="btn flex border-slate-400 py-2">
								<NotepadIcon />
								<span>{$t('notepad.title')}</span>
							</label>
						</div>
						<ScrollTop />
					{/if}
					{@render children()}
					<!-- Footer -->
					<Footer />
				</div>
			</div>
		</div>
		<div class="drawer-side z-50">
			<label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
			<ul class="menu h-screen min-h-full w-full bg-base-200 p-4 text-base-content md:w-3/4">
				<div class="flex h-screen w-full items-center">
					<div class="flex h-3/4 w-full">
						<!-- Drawer Content -->
						<Notepad />
					</div>
				</div>
			</ul>
		</div>
	</div>
{/if}
