<script lang="ts">
	import { lexicon } from '@/data/lexicon';
	import AddLexiconRow from './AddLexiconRow.svelte';
	import LexiconRow from './LexiconRow.svelte';
</script>

<table>
	<thead>
		<tr class="thead1">
			<th>{lexicon.length} words</th>
			<th colspan="3">English</th>
			<th colspan="3">Русский</th>
			<th colspan="2">&nbsp;á é í ó ö ú &nbsp; а́ е́ и́ о́ у́ ы́ э́ ю́ я́ ꙑ </th>
			<td />
		</tr>
		<tr class="thead2">
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
		position: relative;
	}
	th {
		border: 1px solid #ccc;
		padding: 4px;
		text-align: center;
		position: sticky;
		top: 0;
		background-color: white;
	}

	.thead2 th {
		top: 24px;
	}
</style>
