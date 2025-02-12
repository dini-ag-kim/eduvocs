<script>
	import { db, handleFilterSelect } from '$lib/db';
	import { t } from 'svelte-i18n';
	import CaretDown from '$lib/icons/CaretDown.svelte';

	let { title, filterKey } = $props();

	let searchTerm = $state('');
	let filteredValues = $state([]);

	$effect(() => {
		if ($db.initialized) {
			filteredValues = $db.filters[filterKey] || [];
		}
	});

	function filterByTerm() {
		filteredValues = [...$db.filters[filterKey]].filter((filterVal) =>
			filterVal.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}
</script>

<div class="dropdown max-md:my-1 max-md:w-full">
	<div
		tabindex="0"
		aria-label={$t('dropdown.filter', { values: { filterName: title } })}
		role="button"
		class="select-none rounded-md border p-2 md:my-3"
	>
		<div class="flex flex-row items-center justify-between gap-1">
			<span>{title}</span>
			<CaretDown />
		</div>
		<ul
			class="menu dropdown-content z-[20] max-h-96 flex-nowrap gap-2 overflow-y-auto rounded-box bg-base-100 p-2 shadow max-md:w-full md:w-64"
		>
			<!-- Search Box -->
			<li class="p-2">
				<input
					type="text"
					name="{$t('search')} - {title}"
					aria-label={$t('search')}
					bind:value={searchTerm}
					oninput={filterByTerm}
					placeholder={$t('search')}
					class="input input-sm input-bordered w-full"
				/>
			</li>
			{#each filteredValues as filterVal}
				<li class="overflow-hidden rounded">
					<button
						type="button"
						role="option"
						class="btn btn-ghost font-normal"
						class:btn-active={$db.selectedFilters[filterKey].includes(filterVal)}
						aria-selected={$db.selectedFilters[filterKey].includes(filterVal)}
						onclick={() => {
							handleFilterSelect(filterKey, filterVal);
							searchTerm = '';
						}}
					>
						{$t(`terms.${filterVal}`, { default: filterVal })}
					</button>
				</li>
			{/each}
		</ul>
	</div>
</div>
