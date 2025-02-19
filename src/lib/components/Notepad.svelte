<script>
	import { db, resetSelected } from '$lib/db';
	import { t } from 'svelte-i18n';
	import NotepadVocab from '$lib/components/NotepadVocab.svelte';
</script>

<div class="flex w-full flex-col">
	<div class="fixed right-0 top-2 ml-auto flex w-full justify-between">
		<label
			for="my-drawer"
			aria-label="close sidebar"
			onclick={() => resetSelected('selectedVocabs')}
			class="btn btn-outline ml-2">{$t('notepad.reset')}</label
		>
		<label
			for="my-drawer"
			aria-label="close sidebar"
			class="btn btn-outline fixed right-2 top-2 ml-auto mr-2 w-fit">{$t('notepad.close')}</label
		>
	</div>

	<div class="flex w-full flex-row gap-2 overflow-auto pb-4">
		{#key $db.selectedVocabs.length}
			{#each $db.selectedVocabs as v (v)}
				<NotepadVocab id={v} />
			{/each}
		{/key}
	</div>
</div>
