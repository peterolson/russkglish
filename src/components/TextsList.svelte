<script lang="ts">
	import { texts } from '@/data/texts';
	import CategoryDisplay from '@/components/CategoryDisplay.svelte';
	import TextDisplay from '@/components/TextDisplay.svelte';

	export let filteredTexts: typeof texts = texts;

	const sortedTexts = filteredTexts.map((x, i) => ({ ...x, index: i })).sort((a, b) => a.title.localeCompare(b.title));
</script>

<div class="grid">
	{#each sortedTexts as text}
		<div class="text-item">
			<a href="/texts/{text.title}">
				<div class="img" style={`background-image: url(${text.img});`} />
			</a>
			<div>
				<h2>
					<a href="/texts/{text.title}">{text.title}</a>
					<!--
                <button on:click={() => deleteText(text.title)}>❌</button>
                -->
				</h2>
				<CategoryDisplay category={text.category} />
				<div class="excerpt">
					{#if text.subtitle}
						<em>{text.subtitle}</em>
					{/if}
					<TextDisplay {text} isExcerpt />
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(325px, 1fr));
		gap: 16px;
	}

	.text-item {
		display: flex;
		gap: 8px;
		align-items: flex-start;
	}

	.img {
		width: 135px;
		height: 135px;
		border: 1px solid rgba(0, 0, 0, 0.1);
		background-size: cover;
		background-position: center;
	}

	h2 {
		margin: 0;
		font-size: 1.1rem;
		display: flex;
		justify-content: space-between;
	}

	em {
		font-size: 0.8rem;
		opacity: 0.8;
	}

	.excerpt {
		height: 90px;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(180deg, #000 60%, transparent);
		mask-image: linear-gradient(180deg, #000 60%, transparent);
	}
</style>
