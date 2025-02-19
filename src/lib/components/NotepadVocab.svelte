<script>
	import Vocab from '$lib/components/Vocab.svelte';
	import { VOCAB_PROPERTIES as vp, METADATA_KEYS as mdk } from '$lib/constants';
	import Result from './Result.svelte';
	import InternalLinkIcon from '$lib/icons/InternalLinkIcon.svelte';

	import ResultInfo from './ResultInfo.svelte';
	import { t } from 'svelte-i18n';
	import { db, toggleSelected } from '$lib/db';
	import ResultBadge from '$lib/components/ResultBadge.svelte';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';

	let { id } = $props();

	let vocabData = $derived($db.index?.store?.[id]);
	function hasResultInfo() {
		return mdk.some((key) => vocabData[vp[key]]);
	}
</script>

<div class="flex max-w-96 flex-col">
	<div class="flex flex-col text-lg font-medium">
		<div class="flex items-center">
			<!-- Name of vocabulary and maintainer -->
			<a
				class="hover:text-accent"
				aria-label={$t('voc.preview')}
				href={`/voc/${encodeURIComponent(vocabData[vp.id])}`}
				>{vocabData[vp.name]}
			</a>
			<!-- Details Icon -->
			<a
				class="btn join-item btn-sm flex h-auto py-2"
				aria-label={$t('voc.preview')}
				href={`/voc/${encodeURIComponent(vocabData[vp.id])}`}
				><InternalLinkIcon />
			</a>
			<button
				onclick={() => toggleSelected('selectedVocabs', id)}
				class="btn join-item btn-sm ml-auto mr-0 flex h-auto py-2"><CloseIcon /></button
			>
		</div>
		{vocabData[vp.maintainedBy] ? `(${vocabData[vp.maintainedBy]})` : ''}
		<!-- Year issued (Year "last updated" would be better) -->
		<div class="flex flex-row">
			{#if vocabData[vp.issued] && !isNaN(new Date(vocabData[vp.issued]).getFullYear())}
				<ResultBadge
					badgeStyle="badge-xs"
					badgeLabel={new Date(vocabData[vp.issued]).getFullYear()}
				/>
			{/if}
			{#if hasResultInfo()}
				<ResultInfo result={vocabData} />
			{/if}
		</div>
	</div>

	<Vocab {id} />
</div>
