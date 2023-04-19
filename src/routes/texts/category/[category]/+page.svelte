<script lang="ts">
	import TextsList from '@/components/TextsList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main>
	<h1>
		<a href="/texts">Text</a> ›
		{data.category}
	</h1>

	<TextsList filteredTexts={data.texts} />
	<br />
</main>

<style>
	main {
		padding: 16px;
		background-color: rgba(255, 255, 255, 0.9);
	}
</style>
