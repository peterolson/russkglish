<script lang="ts">
	export let category: string;

	const icons: Record<string, string> = {
		Biblia: '✝️',
		'Beby fantazy': '👼',
		Recipét: '🍳',
		'Klassik literatur': '📖',
		Mith: '🐉',
		História: '📅',
		Mathemátik: '➗',
		Эnciklopédia: '📚'
	};

	const defaultIcon = '📃';

	$: icon = icons[category] ?? defaultIcon;
</script>

<div>
	{icon}
	<a href="/texts/category/{category}">
		{category}
	</a>
</div>

<style>
	a {
		color: inherit;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
