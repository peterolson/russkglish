<script lang="ts">
	import type { LexiconEntry } from '@/data/lexicon.types';
	import { lexicon } from '@/data/lexicon';

	export let wordId: number | string;
	export let nextWordId: number | string | undefined;
	export let prevWordId: number | string | undefined;

	let word: LexiconEntry | undefined;
	let nextWord: LexiconEntry | undefined;
	let prevWord: LexiconEntry | undefined;
	let displayWord: string = '';
	let spaceAfter: boolean;

	$: {
		word = lexicon.find((entry) => entry.id === wordId);
		nextWord = nextWordId !== undefined ? lexicon.find((entry) => entry.id === nextWordId) : undefined;
		prevWord = prevWordId !== undefined ? lexicon.find((entry) => entry.id === prevWordId) : undefined;
		displayWord = typeof wordId === 'string' ? wordId : word?.orthography ?? `!!!could not find word ${wordId}!!!`;
		const nextDisplayWord = typeof nextWordId === 'string' ? nextWordId : nextWord?.orthography ?? '';

		let nextPunct = nextWord?.pos.includes('punct') || [',', '.', '!', '?', ':', ')'].includes(String(nextWordId));
		let prevPunct = prevWord?.pos.includes('punct');
		let nextPunctRight = nextWord?.pos.includes('punct-right');
		let thisPunctLeft = word?.pos.includes('punct-left') || ['('].includes(String(wordId));
		let isNum = /^[0-9]+$/.test(displayWord);
		let isNextNum = /^[0-9]+$/.test(nextDisplayWord);
		let betweenNums = isNum && isNextNum;

		spaceAfter = true;
		if (nextPunct || nextPunctRight || thisPunctLeft || betweenNums) {
			spaceAfter = false;
		}
		if (displayWord === ':' && isNextNum) {
			spaceAfter = false;
		}
	}
</script>

{#if displayWord}
	<span
		>{#if displayWord.startsWith('<') && displayWord.endsWith('>')}{@html displayWord}{:else}{displayWord}{/if}{#if spaceAfter}{@html '&#x20;'}{/if}</span
	>
{/if}

<style>
	span {
		font-size: 13px;
	}
</style>
