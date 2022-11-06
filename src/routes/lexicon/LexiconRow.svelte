<script lang="ts">
	import Chips from '@/components/Chips.svelte';
	import type { LexiconEntry } from '@/data/lexicon.types';
	import { textCorpus } from '@/data/textCorpus';
	import { enToIPA, ruToIPA } from '@/lib/toIPA';
	import AddLexiconRow from './AddLexiconRow.svelte';

	export let entry: LexiconEntry;

	let useCount = 0;
	for (const name in textCorpus) {
		const text = textCorpus[name];
		for (const word of text) {
			if (word === entry.id) {
				useCount++;
			}
		}
	}

	let editMode = false;

	async function toggleEditMode() {
		editMode = !editMode;
	}

	async function deleteRow() {
		await fetch('/api/lexicon', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: entry.id
			})
		});
	}
</script>

{#if editMode}
	<AddLexiconRow isEditing onCancel={toggleEditMode} initialEntry={entry} />
{:else}
	<div>{entry.id}</div>
	<div>{useCount}</div>
	<div class="ipa">
		{entry.ipa}
		{#if enToIPA(entry.en) !== entry.ipa || ruToIPA(entry.ru) !== entry.ipa}
			<div class="error">{enToIPA(entry.en)} {ruToIPA(entry.ru)}</div>
		{/if}
	</div>
	<div>{entry.en}</div>
	<div>{entry.enGloss}</div>
	<div>{entry.enCognate || entry.enGloss}</div>
	<div>{entry.ru}</div>
	<div>{entry.ruGloss}</div>
	<div>{entry.ruCognate || entry.ruGloss}</div>
	<div class="wide"><Chips value={entry.pos} /></div>
	<div><Chips value={entry.tags} /></div>
	<div class="wide">
		<button on:click={toggleEditMode}>Edit</button>
		<button on:click={deleteRow}>Delete</button>
	</div>
{/if}

<style>
	div {
		text-align: center;
		font-family: sans-serif;
		font-size: small;
		word-break: break-word;
		padding: 0 4px;
	}

	.wide {
		width: 125px;
	}

	.ipa {
		white-space: nowrap;
	}

	.error {
		color: red;
	}
</style>
