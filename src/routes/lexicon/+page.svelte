<script lang="ts">
	import { lexicon } from '@/data/lexicon';
	import AddLexiconRow from './AddLexiconRow.svelte';
	import LexiconRow from './LexiconRow.svelte';
</script>

<div class="grid">
	<div class="header" style="grid-column: 1/4;">{lexicon.length} words</div>
	<div class="header" style="grid-column: 4/7;">English</div>
	<div class="header" style="grid-column: 7/10;">Russian</div>
	<div class="header" style="grid-column: 10/12;">&nbsp;á é í ó ö ú &nbsp; а́ е́ и́ о́ у́ ы́ э́ ю́ я́ ꙑ ү</div>
	<div />
	<div class="header r2">ID</div>
	<div class="header r2">Freq</div>
	<div class="header r2">IPA</div>
	<div class="header r2">Orthography</div>
	<div class="header r2">Gloss</div>
	<div class="header r2">Cognate</div>
	<div class="header r2">Orthography</div>
	<div class="header r2">Gloss</div>
	<div class="header r2">Cognate</div>
	<div class="header r2">Part-of-speech</div>
	<div class="header r2">Tags</div>
	<div />
	{#each lexicon as entry}
		<LexiconRow {entry} />
	{/each}
	<AddLexiconRow />
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: 50px 50px repeat(10, 1fr);
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
