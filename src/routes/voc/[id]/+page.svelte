<script>
	import Result from '$lib/components/Result.svelte';
	import Vocab from '$lib/components/Vocab.svelte';
	import LoadingSpinner from '$lib/components/LoadingSpinner.svelte';
	import { VOCAB_PROPERTIES as vp, PROJECT_URL as url } from '$lib/constants';
	import { t, locale } from 'svelte-i18n';
	import { db } from '$lib/db';
	import ReportIcon from '$lib/icons/ReportIcon.svelte';
	import ClipboardIcon from '$lib/icons/ClipboardIcon.svelte';
	let { data } = $props();
	let result = $state({});
	let copyToClipboardMessage = $state('');

	$effect(() => {
		if ($db.initialized) {
			result = $db.index?.store?.[data.id];
		}
	});

	function copyToClipboard() {
		navigator.clipboard
			.writeText(window.location.href)
			.then(() => {
				copyToClipboardMessage = $t('event.copy-clipboard');
			})
			.catch((err) => {
				copyToClipboardMessage = $t('event.copy-clipboard-failed');
			});
	}
</script>

<svelte:head>
	<title>{$t('brand')}: {$t('voc.detailview')}</title>
</svelte:head>

{#if $db.initialized}
	<div class="flex w-full flex-col">
		{#if result}
			<div class="flex w-full flex-row flex-wrap">
				<div class="text-md breadcrumbs">
					<ul class="flex-wrap">
						<li>
							<a aria-label={$t('menu.search')} href="/search">{$t('menu.search')}</a>
						</li>
						<li class="truncate">
							<span class="truncate"
								>{$t('voc.label')}:
								{$locale.slice(0, 2) == 'de' ? result[vp.name]?.[1] : result[vp.name]?.[0]}
							</span>
						</li>
					</ul>
				</div>
				<div class="ml-auto">
					<ul class="bg-base-400 menu menu-horizontal menu-sm gap-1 rounded-box">
						<li>
							<a
								class="tooltip"
								data-tip={$t('buttons.report')}
								target="_blank"
								aria-label={$t('buttons.report')}
								href={url.report +
									'?labels=invalid&body=Affected%20data%20URI%3A%20' +
									encodeURIComponent(result[vp.id]) +
									'&title=Data%20issue%20report%3A%20' +
									encodeURIComponent(result[vp.name]?.[0])}
							>
								<ReportIcon />
							</a>
						</li>
						<li>
							<button
								class="tooltip"
								data-tip={copyToClipboardMessage || $t('buttons.clipboard')}
								aria-label={$t('buttons.clipboard')}
								onclick={copyToClipboard}
								onfocusout={() => (copyToClipboardMessage = '')}
							>
								<ClipboardIcon />
							</button>
						</li>
					</ul>
				</div>
			</div>
			<h1 class="text-2xl">{$t('voc.detailview')}</h1>
			<Result id={data.id} hideButtons={[vp.id]} />
			<Vocab id={data.id} />
		{:else}
			<p>{$t('voc.notfound')}</p>
		{/if}
	</div>
{:else}
	<LoadingSpinner />
{/if}
