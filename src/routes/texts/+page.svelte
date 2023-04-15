<script lang="ts">
	import CategoryDisplay from '@/components/CategoryDisplay.svelte';
	import TextDisplay from '@/components/TextDisplay.svelte';
	import { texts } from '@/data/texts';

	const sortedTexts = texts.map((x, i) => ({ ...x, index: i })).sort((a, b) => a.title.localeCompare(b.title));

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

<main>
	<h1>Text</h1>

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

	<br />

	<button on:click={addText}>Fabrikátsian text</button>
	<br /><br />
</main>

<style>
	main {
		padding: 16px;
		background-color: rgba(255, 255, 255, 0.9);
	}

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
