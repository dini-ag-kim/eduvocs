<script>
	import VocabConcept from '$lib/components/VocabConcept.svelte';
	let { concept } = $props();
	import { locale } from 'svelte-i18n';
</script>

{#if concept}
	<div class="my-1">
		<a
			target="_blank"
			href={concept.id}
			class={concept.id ? 'hover:text-blue-800 hover:underline' : ''}
		>
			{concept.prefLabel?.[$locale] ||
				concept.prefLabel?.[$locale.slice(0, 2)] ||
				concept.prefLabel?.de ||
				concept.prefLabel?.en}
		</a>
		{#if concept.narrower && concept.narrower.length}
			<div style="margin-left: 20px;">
				{#each concept.narrower as narrower}
					<VocabConcept concept={narrower} />
				{/each}
			</div>
		{/if}
	</div>
{/if}
