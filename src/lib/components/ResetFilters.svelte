<script>
	import { resetFilters } from '$lib/db';
	import CloseIcon from '$lib/icons/CloseIcon.svelte';
	import { t } from 'svelte-i18n';
</script>

<button
	onclick={resetFilters}
	type="button"
	aria-label={$t('filter.reset')}
	onkeydown={(e) => e.key === 'Enter' && resetFilters()}
	tabindex="0"
	class="btn btn-outline btn-sm my-2 h-full rounded-md border"
>
	<CloseIcon />
	<span class="hidden md:flex">{$t('filter.reset')}</span>
</button>
