<script lang="ts">
	import { lexicon } from '@/data/lexicon';
	import type { WordDisplaySettings } from './WordDisplay.settings';

	export let wordId: number;
	export let settings: WordDisplaySettings = { orthography: 'ipa' };
	export let nextWordId: number | undefined;
	export let prevWordId: number | undefined;

	$: word = lexicon.find((entry) => entry.id === wordId);
	$: nextWord = nextWordId !== undefined ? lexicon.find((entry) => entry.id === nextWordId) : undefined;
	$: prevWord = prevWordId !== undefined ? lexicon.find((entry) => entry.id === prevWordId) : undefined;

	let spaceAfter: boolean;
	let capitalizeFirst: boolean;
	$: displayWord = word ? word[settings.orthography] : '';
	$: {
		let nextPunct = nextWord?.pos.includes('punct');
		let prevPunct = prevWord?.pos.includes('punct');
		let nextPunctRight = nextWord?.pos.includes('punct-right');

		spaceAfter = true;
		if (nextPunct || nextPunctRight) {
			spaceAfter = false;
		}

		capitalizeFirst = false;
		if (prevPunct || !prevWord) {
			capitalizeFirst = true;
		}
		if (settings.orthography === 'ipa') {
			capitalizeFirst = false;
		}

		if (capitalizeFirst) {
			displayWord = displayWord[0].toUpperCase() + displayWord.slice(1);
		}
	}
</script>

{#if word}
	{#if displayWord.startsWith('<')}{@html displayWord}{:else}{displayWord}{/if}{#if spaceAfter}{@html '&#x20;'}{/if}
{/if}
