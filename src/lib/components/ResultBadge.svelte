<script>
	let { badgeLabel, badgeStyle = 'badge-primary badge-outline badge-xs' } = $props();
</script>

<div aria-label={badgeLabel} class={`badge ${badgeStyle} m-1 h-auto cursor-default p-2`}>
	{badgeLabel}
</div>
