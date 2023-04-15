<script lang="ts">
	import TextDisplay from '@/components/TextDisplay.svelte';
	import { texts } from '@/data/texts';
	const text = texts.find((x) => x.title === 'Russglish');
</script>

<main>
	{#if text}
		<TextDisplay {text} hideCategory />
	{/if}
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		margin: 16px;
	}
</style>
