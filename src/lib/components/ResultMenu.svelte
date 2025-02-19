<script>
	let { result, hideButtons = [] } = $props();
	import { t } from 'svelte-i18n';
	import { db } from '$lib/db';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import InternalLinkIcon from '$lib/icons/InternalLinkIcon.svelte';
	import ExternalLinkIcon from '$lib/icons/ExternalLinkIcon.svelte';
	import VocabDownload from '$lib/components/VocabDownload.svelte';
	import SourceCodeIcon from '$lib/icons/SourceCodeIcon.svelte';
	import CloudIcon from '$lib/icons/CloudIcon.svelte';
	import ServiceIcon from '$lib/icons/ServiceIcon.svelte';

	const vocabDistribution = $derived(result[vp.distribution]?.map((e) => $db.index.store[e]));
</script>

<div class="join join-vertical">
	{#if !hideButtons.includes(vp.id)}
		<a
			class="btn btn-outline join-item btn-sm flex h-auto justify-start border-slate-400 py-2"
			aria-label={$t('voc.preview')}
			href={`/voc/${encodeURIComponent(result[vp.id])}`}
			><InternalLinkIcon />
			<span class="hidden md:inline">{$t('details')}</span>
		</a>
	{/if}
	{#if result[vp.url] && !hideButtons.includes(vp.url)}
		<a
			class="btn btn-outline join-item btn-sm flex h-auto justify-start border-slate-400 py-2"
			aria-label={$t('buttons.service')}
			href={result[vp.url]}
			target="_blank"
		>
			<ServiceIcon />
			<span class="hidden md:inline">
				{$t('buttons.service')}
			</span>
		</a>
	{/if}
	{#if result[vp.describedAt] && !hideButtons.includes(vp.describedAt)}
		<a
			class="btn btn-outline join-item btn-sm flex h-auto justify-start border-slate-400 py-2"
			aria-label={$t('buttons.external')}
			href={result[vp.describedAt]}
			target="_blank"
		>
			<ExternalLinkIcon />
			<span class="hidden md:inline">
				{$t('buttons.external')}
			</span>
		</a>
	{/if}
	{#if result[vp.endpointUrl] && !hideButtons.includes(vp.endpointUrl)}
		<a
			class="btn btn-outline join-item btn-sm flex h-auto justify-start border-slate-400 py-2"
			aria-label={$t('buttons.api')}
			href={result[vp.endpointUrl]}
			target="_blank"
		>
			<CloudIcon />
			<span class="hidden md:inline">
				{$t('buttons.api')}
			</span>
		</a>
	{/if}
	{#if result[vp.repo] && !hideButtons.includes(vp.repo)}
		<a
			class="btn btn-outline join-item btn-sm flex h-auto justify-start border-slate-400 py-2"
			aria-label={$t('buttons.repo')}
			href={result[vp.repo]}
			target="_blank"
		>
			<SourceCodeIcon />
			<span class="hidden md:inline">
				{$t('buttons.repo')}
			</span>
		</a>
	{/if}
	{#if vocabDistribution && vocabDistribution.length && !hideButtons.includes(vp.distribution)}
		<VocabDownload {vocabDistribution} />
	{/if}
</div>
