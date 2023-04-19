<script lang="ts">
	import type { Text } from '@/lib/markup';
	import CategoryDisplay from './CategoryDisplay.svelte';
	import { afterUpdate } from 'svelte';
	import { lexicon } from '@/data/lexicon';
	import type { LexiconEntry } from '@/data/lexicon.types';
	import { orthographyToIPA } from '@/lib/toIPA';

	export let text: Text;
	export let isExcerpt: boolean = false;
	export let hideCategory: boolean = false;

	afterUpdate(() => {
		if (typeof window !== 'undefined' && (window as any).MathJax) {
			const MathJax = (window as any).MathJax;
			MathJax.typesetPromise();
		}
	});

	let selectedLexiconEntry: LexiconEntry | null = null;
	let hoverDiv: HTMLElement;

	function mouseMove(e: MouseEvent) {
		if (isExcerpt) return;
		selectedLexiconEntry = null;
		const target = e.target as HTMLElement;
		// get data attribute from the element
		const id = target.dataset.id;
		if (!id) return;
		const lexiconEntry = lexicon.find((x) => x.id === +id);
		if (!lexiconEntry) return;
		selectedLexiconEntry = lexiconEntry;
		const height = hoverDiv.clientHeight;
		const width = hoverDiv.clientWidth;
		// if mouse position is too close to the bottom of the screen, move the hover div up
		if (e.clientY + 10 + height > window.innerHeight) {
			hoverDiv.style.top = `${e.clientY - 10 - height + window.scrollY}px`;
		} else {
			hoverDiv.style.top = `${e.clientY + 10 + window.scrollY}px`;
		}
		// if mouse position is too close to the right of the screen, move the hover div left
		if (e.clientX + 10 + width > window.innerWidth) {
			hoverDiv.style.left = `${e.clientX - 10 - width}px`;
		} else {
			hoverDiv.style.left = `${e.clientX + 10}px`;
		}
	}
</script>

<svelte:head>
	{#if !isExcerpt}
		<script async src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js">
		</script>
		<title>{text.title}</title>
	{/if}
</svelte:head>

<article class:excerpt={isExcerpt} on:mousemove={mouseMove}>
	{#if !isExcerpt}
		{#if text.category && !hideCategory}
			<br />
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
	{/if}

	{@html isExcerpt ? text.text.slice(0, 300) : text.text}
	<div style="clear: both;" />
	<br />
</article>

<div bind:this={hoverDiv} class="hover-div" class:hidden={!selectedLexiconEntry}>
	{#if selectedLexiconEntry}
		<div class="lexicon-entry">
			<strong>{selectedLexiconEntry.orthography}</strong>
			<span>/{orthographyToIPA(selectedLexiconEntry.orthography)}/</span>
			<em>{selectedLexiconEntry.pos.join(', ')}</em>
		</div>
		<hr />
		<div style="display: flex; gap: 8px;">
			<div>
				{selectedLexiconEntry.enCognate}
				{#if selectedLexiconEntry.enCognate !== selectedLexiconEntry.enGloss}
					<br />
					{selectedLexiconEntry.enGloss}
				{/if}
			</div>
			<div>
				{selectedLexiconEntry.ruCognate}
				{#if selectedLexiconEntry.ruCognate !== selectedLexiconEntry.ruGloss}
					<br />
					{selectedLexiconEntry.ruGloss}
				{/if}
			</div>
		</div>
		{#each selectedLexiconEntry.tags as tag}
			<div class="tag">{tag}</div>
		{/each}
	{/if}
</div>

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
		background-color: rgba(255, 255, 255, 0.9);
	}
	article.excerpt {
		padding: 0;
		background-color: inherit;
		border: none;
	}
	article.excerpt > :global(*) {
		font-size: 80%;
	}
	.hover-div {
		position: absolute;
		top: 0;
		left: 0;
		pointer-events: none;
		z-index: 2000;
		background-color: white;
		border: 1px solid #ccc;
		padding: 8px;
		box-sizing: border-box;
		word-wrap: break-word;
	}

	.hover-div.hidden {
		display: none;
	}

	.tag {
		display: inline-block;
		background-color: #ccc;
		padding: 2px 4px;
		border-radius: 4px;
		font-size: 80%;
		margin: 2px;
	}

	.lexicon-entry {
		display: flex;
		gap: 8px;
		justify-content: space-between;
	}
</style>
