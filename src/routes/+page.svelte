<script lang="ts">
	import TextDisplay from '@/components/TextDisplay.svelte';
	import TextsList from '@/components/TextsList.svelte';
	import { texts } from '@/data/texts';
	const text = texts.find((x) => x.title === 'Russglish');
</script>

<main>
	{#if text}
		<TextDisplay {text} hideCategory />
	{/if}
	<div class="texts">
		<h1>Russglish text</h1>
		<TextsList />
		<br /><br />
	</div>
</main>

<style>
	main {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 16px;
	}

	.texts {
		margin-top: 16px;
		max-width: 575px;
		color: #404040;
		background-color: rgba(255, 255, 255, 0.9);
		padding: 0 1rem;
	}
</style>
