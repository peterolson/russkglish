<script lang="ts">
	import Chips from '@/components/Chips.svelte';
	import type { LexiconEntry } from '@/data/lexicon.types';
	import { textCorpus } from '@/data/textCorpus';
	import { orthographyToIPA } from '@/lib/toIPA';
	import AddLexiconRow from './AddLexiconRow.svelte';

	export let entry: LexiconEntry;

	let editMode = false;

	let frequency = 0;
	for (const textName in textCorpus) {
		const wordIds = textCorpus[textName];
		frequency += wordIds.filter((id) => id === entry.id).length;
	}

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
	<div>{frequency}</div>
	<div class="orthography">{entry.orthography}</div>
	<div class="ipa">
		/{orthographyToIPA(entry.orthography)}/
	</div>
	<div>{entry.enGloss}</div>
	<div>{entry.enCognate || entry.enGloss}</div>
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
		font-family: sans-serif;
		white-space: nowrap;
	}

	.orthography {
		font-family: sans-serif;
	}
</style>
