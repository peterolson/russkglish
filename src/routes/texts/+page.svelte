<script lang="ts">
	import { dev } from '$app/environment';
	import TextsList from '@/components/TextsList.svelte';
	import { isDev } from '@/data/config';

	async function addText() {
		await fetch('/api/texts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	async function deleteText(title: string) {
		const confirmed = confirm(`Are you sure you want to delete ${title}?`);
		if (!confirmed) return;
		await fetch('/api/texts', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title
			})
		});
	}
</script>

<svelte:head>
	<title>Russglish text</title>
</svelte:head>

<main>
	<h1>Russglish text</h1>
	<TextsList />
	<br />

	{#if isDev}
		<button on:click={addText}>Fabrikátsian text</button>
		<br /><br />
	{/if}
</main>

<style>
	main {
		padding: 16px;
		background-color: rgba(255, 255, 255, 0.9);
	}
</style>
