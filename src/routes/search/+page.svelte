<script>
	import { db, search } from '$lib/db';
	import DropdownFilter from '$lib/components/DropdownFilter.svelte';
	import Results from '$lib/components/Results.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import ResetFilters from '$lib/components/ResetFilters.svelte';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import { t } from 'svelte-i18n';
	import DropdownSort from '$lib/components/DropdownSort.svelte';
</script>

<svelte:head>
	<title>{$t('brand')}: {$t('search')}</title>
</svelte:head>

<div class="flex flex-col">
	<form onsubmit={(e) => search(e)}>
		<div>
			<div class="flex w-full gap-2 md:flex-row">
				<label class="input input-bordered flex items-center max-lg:w-3/4 lg:w-full">
					<input
						class="grow"
						type="text"
						name="searchbox"
						onkeyup={(e) => search(e)}
						bind:value={$db.query}
						placeholder="{$t('search')}..."
					/>
					<SearchIcon />
				</label>
				<div class="ml-auto flex items-center md:justify-end lg:w-1/4">
					<ResetFilters />
				</div>
			</div>
			<div class="flex flex-row flex-wrap items-center gap-2">
				<DropdownFilter title={$t('filter.about')} filterKey={vp.about} />
				<DropdownFilter title={$t('filter.educationalLevel')} filterKey={vp.educationalLevel} />
				<DropdownFilter title={$t('filter.maintainedBy')} filterKey={vp.maintainedBy} />

				<div class="ml-auto">
					<DropdownSort />
				</div>
			</div>
		</div>
	</form>

	<Results />
</div>
