<script>
	import { t } from 'svelte-i18n';
	let { item, extended = true } = $props();
	import { locale } from 'svelte-i18n';
</script>

<svelte:head>
	<title>{$t('brand')}: {item.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={item.title} />
</svelte:head>
{#if extended}
	<div class="text-md breadcrumbs">
		<ul>
			<li>
				<a aria-label={$t('menu.content')} href={`/content/${$locale.slice(0, 2)}`}
					>{$t('menu.content')}</a
				>
			</li>
			<li>
				{item.title}
			</li>
		</ul>
	</div>
{/if}
<article class="card prose mb-5 max-w-full bg-base-100 shadow-md">
	<div class="card-body mt-1 p-0">
		<hgroup>
			<h1 class="card-title">
				<a href={`/content/${$locale.slice(0, 2)}/${item.slug}`}>{item.title}</a>
			</h1>
			<p>{item.date}</p>
		</hgroup>
		{#if extended}
			<div>
				<item.content />
			</div>
		{/if}
	</div>
</article>
