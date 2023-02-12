<script lang="ts">
	import Chips from '@/components/Chips.svelte';
	import type { LexiconEntry2 } from '@/data/lexicon.types';
	import { enToIPA, orthographyToIPA, ruToIPA } from '@/lib/toIPA';
	import AddLexiconRow from './AddLexiconRow.svelte';

	export let entry: LexiconEntry2;

	let editMode = false;

	async function toggleEditMode() {
		editMode = !editMode;
	}

	async function deleteRow() {
		await fetch('/api/lexicon2', {
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
	<div>{0}</div>
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
		margin-top: 2px;
		font-family: sans-serif;
		font-size: 11px;
	}
</style>
