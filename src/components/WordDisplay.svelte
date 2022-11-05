<script lang="ts">
	import { lexicon } from '@/data/lexicon';
	import type { WordDisplaySettings } from './WordDisplay.settings';

	export let wordId: number;
	export let settings: WordDisplaySettings = { orthography: 'ipa' };
	export let nextWordId: number | undefined;
	export let prevWordId: number | undefined;

	$: word = lexicon.find((entry) => entry.id === wordId);
	$: nextWord = nextWordId ? lexicon.find((entry) => entry.id === nextWordId) : undefined;
	$: prevWord = prevWordId ? lexicon.find((entry) => entry.id === prevWordId) : undefined;

	let spaceAfter = true;
	let capitalizeFirst = false;
	$: displayWord = word ? word[settings.orthography] : '';
	$: {
		let nextPunct = nextWord?.pos.includes('punct');
		let prevPunct = prevWord?.pos.includes('punct');
		let nextPunctRight = nextWord?.pos.includes('punct-right');
		if (nextPunct || nextPunctRight) {
			spaceAfter = false;
		}
		if (prevPunct || !prevWord) {
			capitalizeFirst = true;
		}

		if (capitalizeFirst) {
			displayWord = displayWord[0].toUpperCase() + displayWord.slice(1);
		}
	}
</script>

{#if word}
	{displayWord}{#if spaceAfter}{@html '&#x20;'}{/if}
{/if}
