<script>
	import { sort, db } from '$lib/db';
	import { VOCAB_PROPERTIES as vp } from '$lib/constants';
	import { t } from 'svelte-i18n';

	function updateSort(event) {
		const [selectedKey, selectedOrder] = event.target.value.split(' ');
		const key = selectedKey || vp.name;
		const order = selectedOrder || 'asc';
		sort(key, order);
	}
</script>

<select
	class="my-3 ml-auto select-none rounded-md border bg-base-100 p-2"
	on:change={updateSort}
	value={$db.sort.key + ' ' + $db.sort.order}
>
	<option value=" asc">{$t('sort.choose')}</option>
	<option value={vp.name + ' asc'}>
		{$t('md.name')}
		{$t('sort.asc')}
	</option><option value={vp.name + ' desc'}>
		{$t('md.name')}
		{$t('sort.desc')}
	</option>
	<option value={vp.issued + ' asc'}>
		{$t('md.issued')}
		{$t('sort.asc')}
	</option>
	<option value={vp.issued + ' desc'}>
		{$t('md.issued')}
		{$t('sort.desc')}
	</option>
</select>
