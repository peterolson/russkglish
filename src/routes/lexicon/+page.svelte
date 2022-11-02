<script lang="ts">
	import { lexicon } from '@/data/lexicon';
	import AddLexiconRow from './AddLexiconRow.svelte';
	import LexiconRow from './LexiconRow.svelte';
</script>

<table>
	<thead>
		<tr>
			<th>{lexicon.length} words</th>
			<th colspan="3">English</th>
			<th colspan="3">Русский</th>
			<td />
			<td />
			<td />
		</tr>
		<tr>
			<th>IPA</th>
			<th>Orthography</th>
			<th>Gloss</th>
			<th>Cognate</th>
			<th>Orthography</th>
			<th>Gloss</th>
			<th>Cognate</th>
			<th>Part-of-speech</th>
			<th>Tags</th>
			<td />
		</tr>
	</thead>
	<tbody>
		{#each lexicon as entry}
			<LexiconRow {entry} />
		{/each}
		<AddLexiconRow />
	</tbody>
</table>

<style>
	table {
		border-collapse: collapse;
	}
	th {
		border: 1px solid #ccc;
		padding: 4px;
		text-align: center;
	}
</style>
