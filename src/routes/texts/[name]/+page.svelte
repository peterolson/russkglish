<script lang="ts">
	import type { WordDisplaySettings } from '@/components/WordDisplay.settings';
	import WordDisplay from '@/components/WordDisplay.svelte';
	import { lexicon } from '@/data/lexicon';
	import { enToIPA } from '@/lib/toIPA';
	import type { PageData } from './$types';

	export let data: PageData;

	let caretIndex = 0;
	let text = '';
	let original = data.textData.join(',');
	let settings: WordDisplaySettings = { orthography: 'ipa' };
	let textData = data.textData;

	let [enName, ruName] = data.textName.split('|');
	let ipaName = enToIPA(enName);
	let textName = {
		en: enName,
		ru: ruName,
		ipa: ipaName
	};

	$: lexiconEntries = text.length
		? lexicon
				.filter((entry) =>
					`${entry.en} ${entry.enCognate} ${entry.enGloss} ${entry.ru} ${entry.ruGloss} ${entry.ruCognate} ${entry.ipa}`
						.toLowerCase()
						.includes(text.toLowerCase())
				)
				.sort((a, b) => {
					let aIsExact =
						a.en.toLowerCase() === text.toLowerCase() ||
						a.ru.toLowerCase() === text.toLowerCase() ||
						a.ipa.toLowerCase() === text.toLowerCase();
					let bIsExact =
						b.en.toLowerCase() === text.toLowerCase() ||
						b.ru.toLowerCase() === text.toLowerCase() ||
						b.ipa.toLowerCase() === text.toLowerCase();
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
	$: hasChanges = original !== textData.join(',');

	function keydown(event: KeyboardEvent) {
		const keyPressed = event.key;
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
		textData = [...textData];
	}

	async function save() {
		await fetch(`/api/texts/${data.textName}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ textData })
		});
		original = textData.join(',');
	}
</script>

<svelte:window on:keydown={keydown} />

<select bind:value={settings.orthography}>
	<option value="ipa">IPA</option>
	<option value="en">English</option>
	<option value="ru">Russian</option>
</select>

<h1>{textName[settings.orthography]}</h1>
{#if hasChanges}
	<button on:click={save}>Save</button>
{/if}

<div class="text">
	{#each textData as wordId, i}{#if i === caretIndex}
			<span class="caret">&nbsp;</span>
		{/if}<span on:click={() => (caretIndex = i + 1)} on:keydown>
			<WordDisplay {wordId} {settings} nextWordId={textData[i + 1]} prevWordId={textData[i - 1]} />
		</span>{/each}
	{#if caretIndex === textData.length}
		<span class="caret">&nbsp;</span>
	{/if}
</div>

<input value={text} readonly />

<div id="suggestions">
	{#each lexiconEntries as entry, i}
		<div class="suggestion-box">
			<div class="suggestion-box-header">
				<span>{i + 1}</span>
				<span>{entry.ipa}</span>
			</div>
			<div class="suggestion-box-info">
				<div>
					<span>{entry.en}</span>
					<span>{entry.enGloss}</span>
					<span>{entry.enCognate}</span>
				</div>
				<div>
					<span>{entry.ru}</span>
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
