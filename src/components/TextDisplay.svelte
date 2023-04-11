<script lang="ts">
	import type { Text } from '@/lib/markup';
	import CategoryDisplay from './CategoryDisplay.svelte';
	import { afterUpdate } from 'svelte';

	export let text: Text;

	afterUpdate(() => {
		if (typeof window !== 'undefined' && (window as any).MathJax) {
			const MathJax = (window as any).MathJax;
			MathJax.typesetPromise();
		}
	});
</script>

<svelte:head>
	<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
	</script>
</svelte:head>

<article>
	{#if text.category}
		<CategoryDisplay category={text.category} />
	{/if}
	<h1>{text.title}</h1>
	{#if text.subtitle}
		<div><em>{text.subtitle}</em></div>
		<br />
	{/if}

	{#if text.img}
		<img src={text.img} alt="" />
	{/if}

	{@html text.text}
</article>

<style>
	img {
		max-width: 80%;
		max-height: 300px;
	}
	article {
		max-width: 575px;
		padding: 0 1rem;
		line-height: 1.5;
		color: #404040;
	}
</style>
