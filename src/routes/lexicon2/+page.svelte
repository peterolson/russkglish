<script lang="ts">
	import { lexicon2 } from '@/data/lexicon2';
	import AddLexiconRow from './AddLexiconRow.svelte';
	import LexiconRow from './LexiconRow.svelte';
</script>

<div class="grid">
	<div class="header" style="grid-column: 1/5">{lexicon2.length} words</div>
	<div class="header" style="grid-column: 5/7;">English</div>
	<div class="header" style="grid-column: 7/9;">Russian</div>
	<div style="grid-column: 9/11;" />
	<div />
	<div class="header r2">ID</div>
	<div class="header r2">Freq</div>
	<div class="header r2">Orthography</div>
	<div class="header r2">IPA</div>
	<div class="header r2">Gloss</div>
	<div class="header r2">Cognate</div>
	<div class="header r2">Gloss</div>
	<div class="header r2">Cognate</div>
	<div class="header r2">Part-of-speech</div>
	<div class="header r2">Tags</div>
	<div />
	{#each lexicon2 as entry}
		<LexiconRow {entry} />
	{/each}
	<AddLexiconRow />
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 50px 50px repeat(9, 1fr);
		grid-gap: 4px;
		position: relative;
	}

	.header {
		font-weight: bold;
		text-align: center;
		border: 1px solid rgba(0, 0, 0, 0.4);
		font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		position: sticky;
		background-color: white;
		top: 0;
	}

	.header.r2 {
		top: 24px;
	}
</style>
