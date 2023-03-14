<script lang="ts">
	import type { WordDisplaySettings } from '@/components/WordDisplay.settings';
	import WordDisplay from '@/components/WordDisplay.svelte';
	import WordDisplay2 from '@/components/WordDisplay2.svelte';
	import { lexicon2 } from '@/data/lexicon2';
	import { orthographyToIPA } from '@/lib/toIPA';
	import type { PageData } from './$types';

	export let data: PageData;

	let caretIndex = 0;
	let text = '';
	let textData = data.textData;
	let originalText = data.textData.join(',');

	let title = data.textName;

	$: lexiconEntries = text.length
		? lexicon2
				.filter((entry) =>
					`${entry.orthography} ${entry.enCognate} ${entry.enGloss} ${entry.ruGloss} ${entry.ruCognate}`
						.toLowerCase()
						.includes(text.toLowerCase())
				)
				.sort((a, b) => {
					let aIsExact =
						a.orthography.toLowerCase() === text.toLowerCase() ||
						a.enCognate.toLowerCase() === text.toLowerCase() ||
						a.ruCognate.toLowerCase() === text.toLowerCase();
					let bIsExact =
						b.orthography.toLowerCase() === text.toLowerCase() ||
						b.enCognate.toLowerCase() === text.toLowerCase() ||
						b.ruCognate.toLowerCase() === text.toLowerCase();
					if (aIsExact && !bIsExact) {
						return -1;
					}
					if (!aIsExact && bIsExact) {
						return 1;
					}
					return a.id - b.id;
				})
				.slice(0, 9)
		: [];
	$: hasChanges = originalText !== textData.join(',');

	let literalMode = false;

	function keydown(event: KeyboardEvent) {
		// if in literal mode, just act like a normal input
		if (literalMode) {
			// but escape literal mode on F2
			if (event.key === 'F2') {
				literalMode = false;
				return false;
			}
			return;
		}

		event.preventDefault();
		event.stopPropagation();
		const keyPressed = event.key;
		// toggle literal mode on F2
		if (keyPressed === 'F2') {
			literalMode = !literalMode;
			return false;
		}

		// is number
		if (keyPressed.match(/\d/)) {
			const number = parseInt(keyPressed);
			if (number <= lexiconEntries.length) {
				const entry = lexiconEntries[number - 1];
				textData.splice(caretIndex, 0, entry.id);
				text = '';
				caretIndex += 1;
			}
		}
		// is other symbol
		else if (keyPressed.length === 1) {
			text += keyPressed;
		}
		// backspace
		if (keyPressed === 'Backspace') {
			if (text) {
				text = text.slice(0, -1);
			} else if (caretIndex > 0) {
				textData.splice(caretIndex - 1, 1);
				caretIndex -= 1;
			}
		}
		// delete
		else if (keyPressed === 'Delete') {
			if (caretIndex < textData.length) {
				textData.splice(caretIndex, 1);
			}
		}
		// right arrow
		else if (keyPressed === 'ArrowRight') {
			if (caretIndex < textData.length) {
				caretIndex += 1;
			}
		}
		// left arrow
		else if (keyPressed === 'ArrowLeft') {
			if (caretIndex > 0) {
				caretIndex -= 1;
			}
		}
		// Enter key
		else if (keyPressed === 'Enter') {
			textData.splice(caretIndex, 0, text);
			text = '';
			caretIndex += 1;
		}
		textData = [...textData];
		return false;
	}

	async function save() {
		await fetch(`/api/texts2/${data.textName}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ textData })
		});
		originalText = textData.join(',');
	}
</script>

<svelte:window on:keydown={keydown} />

<h1>{title}</h1>
{#if hasChanges}
	<button on:click={save}>Save</button>
{/if}

<div class="text">
	{#each textData as wordId, i}{#if i === caretIndex}
			<span class="caret">&nbsp;</span>
		{/if}<span on:click={() => (caretIndex = i + 1)} on:keydown>
			<WordDisplay2 {wordId} nextWordId={textData[i + 1]} prevWordId={textData[i - 1]} />
		</span>{/each}
	{#if caretIndex === textData.length}
		<span class="caret">&nbsp;</span>
	{/if}
</div>

<input bind:value={text} readonly={!literalMode} />
{#if literalMode}
	<span class="literal-mode">LITERAL MODE</span>
{/if}

<div id="suggestions">
	{#each lexiconEntries as entry, i}
		<div class="suggestion-box">
			<div class="suggestion-box-header">
				<span>{i + 1}</span>
				<span>{entry.orthography}</span>
			</div>
			<div class="suggestion-box-info">
				<div>
					<span>{entry.orthography}</span>
					<span>{entry.enGloss}</span>
					<span>{entry.enCognate}</span>
				</div>
				<div>
					<span>{orthographyToIPA(entry.orthography)}</span>
					<span>{entry.ruGloss}</span>
					<span>{entry.ruCognate}</span>
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.text {
		padding: 16px;
		font-family: sans-serif;
	}

	#suggestions {
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 8px;
		margin: 16px 0;
		font-family: sans-serif;
	}

	.suggestion-box {
		border: 1px solid black;
		border-radius: 8px;
		padding: 8px;
	}

	.suggestion-box-header {
		display: flex;
		justify-content: space-between;
		font-weight: bold;
	}

	.suggestion-box-info {
		display: flex;
		justify-content: space-evenly;
	}

	.suggestion-box-info > div {
		display: flex;
		flex-direction: column;
	}

	.caret {
		animation: blink 1s infinite;
		background-color: yellow;
	}

	@keyframes blink {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}
</style>
