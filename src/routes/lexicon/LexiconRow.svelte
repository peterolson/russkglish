<script lang="ts">
	import Chips from '@/components/Chips.svelte';
	import type { LexiconEntry } from '@/data/lexicon.types';
	import AddLexiconRow from './AddLexiconRow.svelte';

	export let entry: LexiconEntry;

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
	<tr>
		<td class="sans">{entry.ipa}</td>
		<td class="sans">{entry.en}</td>
		<td>{entry.enGloss}</td>
		<td>{entry.enCognate || entry.enGloss}</td>
		<td class="sans">{entry.ru}</td>
		<td>{entry.ruGloss}</td>
		<td>{entry.ruCognate || entry.ruGloss}</td>
		<td class="wide"><Chips value={entry.pos} /></td>
		<td><Chips value={entry.tags} /></td>
		<td class="wide">
			<button on:click={toggleEditMode}>Edit</button>
			<button on:click={deleteRow}>Delete</button>
		</td>
	</tr>
{/if}

<style>
	td {
		padding: 4px;
		text-align: center;
	}

	.sans {
		font-family: sans-serif;
	}

	.wide {
		width: 125px;
	}
</style>
