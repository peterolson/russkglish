<script lang="ts">
	import type { LexiconEntry2 } from '@/data/lexicon.types';
	import { lexicon2 } from '@/data/lexicon2';

	export let wordId: number | string;
	export let nextWordId: number | string | undefined;
	export let prevWordId: number | string | undefined;

	let word: LexiconEntry2 | undefined;
	let nextWord: LexiconEntry2 | undefined;
	let prevWord: LexiconEntry2 | undefined;
	let displayWord: string = '';
	let spaceAfter: boolean;

	$: {
		word = lexicon2.find((entry) => entry.id === wordId);
		nextWord = nextWordId !== undefined ? lexicon2.find((entry) => entry.id === nextWordId) : undefined;
		prevWord = prevWordId !== undefined ? lexicon2.find((entry) => entry.id === prevWordId) : undefined;
		displayWord = typeof wordId === 'string' ? wordId : word?.orthography ?? '';

		let nextPunct = nextWord?.pos.includes('punct') || [',', '.', '!', '?'].includes(String(nextWordId));
		let prevPunct = prevWord?.pos.includes('punct');
		let nextPunctRight = nextWord?.pos.includes('punct-right');
		let thisPunctLeft = word?.pos.includes('punct-left');

		spaceAfter = true;
		if (nextPunct || nextPunctRight || thisPunctLeft) {
			spaceAfter = false;
		}
	}
</script>

{#if displayWord}
	<span
		>{#if displayWord.startsWith('<')}{@html displayWord}{:else}{displayWord}{/if}{#if spaceAfter}{@html '&#x20;'}{/if}</span
	>
{/if}

<style>
	span {
		font-size: 13px;
	}
</style>
