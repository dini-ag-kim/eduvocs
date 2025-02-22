<script>
	import { db, toggleSelected } from '$lib/db';
	import { VOCAB_PROPERTIES as vp, METADATA_KEYS as mdk } from '$lib/constants';
	import { config } from '$lib/config';
	import { t, locale } from 'svelte-i18n';
	import ResultBadge from '$lib/components/ResultBadge.svelte';
	import ResultMenu from './ResultMenu.svelte';
	import ResultInfo from './ResultInfo.svelte';
	let { id, hideButtons = [] } = $props();

	const result = $db.index?.store?.[id] ?? {};
	$state.snapshot(result);

	let isOpen = $state(false);

	function hasResultInfo() {
		return mdk.some((key) => result[vp[key]]);
	}

	function highlight(text = '') {
		const keyword = $db.query || '';
		const regex = new RegExp(`(${keyword})`, 'gi');
		return text.replace(regex, '<mark>$1</mark>');
	}
</script>

{#if result}
	<div>
		<ul class="mt-2 flex flex-col">
			<!-- Card -->
			<li class="flex flex-row flex-wrap rounded border border-slate-400 bg-base-100 shadow-md">
				<div class="w-3/4 lg:pr-5">
					<!-- Card title -->
					<div class="ml-4 mt-2">
						<div class="flex flex-wrap items-center text-lg font-medium">
							<!-- Name of vocabulary and maintainer -->
							<a
								class="hover:text-accent"
								aria-label={$t('voc.preview')}
								href={`/voc/${encodeURIComponent(result[vp.id])}`}
							>
								<span>
									{$locale.slice(0, 2) == 'de' ? result[vp.name]?.[1] : result[vp.name]?.[0]}
								</span>
							</a>
							{#if result[vp.maintainedBy]}
								<span>&nbsp({result[vp.maintainedBy]})</span>
							{/if}
							<!-- Year issued (Year "last updated" would be better) -->
							{#if result[vp.issued] && !isNaN(new Date(result[vp.issued]).getFullYear())}
								<ResultBadge
									badgeStyle="badge-xs"
									badgeLabel={new Date(result[vp.issued]).getFullYear()}
								/>
							{/if}
							{#if hasResultInfo()}
								<ResultInfo {result} />
							{/if}
						</div>
					</div>
					<!-- Card content -->
					<div class="class:collapse-open={isOpen} collapse">
						<input
							aria-label={$t('result.expand')}
							name="card-content"
							type="checkbox"
							bind:checked={isOpen}
						/>
						<div class="collapse-title">
							<p class={!isOpen ? 'line-clamp-3' : ''}>
								{#if $locale.slice(0, 2) == 'de'}
									{@html highlight(result[vp.description]?.[1])}
								{:else}
									{@html highlight(result[vp.description]?.[0])}
								{/if}
							</p>
						</div>
						<div class="collapse-content">
							<!-- Additional space for content -->
							<!-- Alternative place for metadata badges -->
						</div>
					</div>
				</div>
				<!-- Card menu -->
				<div class="mt-2 flex w-1/4 flex-wrap content-start justify-end p-2">
					<ResultMenu {result} {hideButtons} />
				</div>
				<!-- Card footer -->
				<div class="flex w-full flex-wrap content-start items-center p-2">
					<div class="divider !m-0 w-full"></div>
					{#each config.filterKeys as key}
						{#if result[vp[key]]}
							<ResultBadge badgeLabel={$t('terms.' + result[vp[key]])} />
						{/if}
					{/each}
					<div class="form-control md:ml-auto md:mr-0">
						<label class="label cursor-pointer gap-1">
							<input
								onclick={() => toggleSelected('selectedVocabs', result[vp.id])}
								type="checkbox"
								checked={$db.selectedVocabs.includes(result[vp.id])}
								class="checkbox checkbox-sm"
							/>
							<span class="label-text">{$t('notepad.add')}</span>
						</label>
					</div>
				</div>
			</li>
		</ul>
	</div>
{/if}
