<script lang="ts">
	import ChipInput from '@/components/ChipInput.svelte';
	import { lexicon } from '@/data/lexicon';
	import { partsOfSpeech, type LexiconEntry } from '@/data/lexicon.types';
	import { orthographyToIPA } from '@/lib/toIPA';

	export let isEditing = false;
	export let onCancel: () => void = () => {};
	export let initialEntry: LexiconEntry = {
		id: -1,
		orthography: '',
		enGloss: '',
		enCognate: '',
		ruGloss: '',
		ruCognate: '',
		pos: [],
		tags: []
	};

	let { orthography, enGloss, enCognate, ruGloss, ruCognate, pos, tags } = initialEntry;

	let alreadyExists = false;
	let isDisabled = true;
	let ipa = '';
	$: {
		orthography = normalizeOrthography(orthography);
		ipa = orthographyToIPA(orthography);
		const existingRow = lexicon.find((row) => ipa === orthographyToIPA(row.orthography) || row.orthography === orthography);
		alreadyExists = !!existingRow && existingRow.id !== initialEntry.id;
		isDisabled = !orthography || !ruGloss || !enGloss || !pos.length || alreadyExists;
	}

	function normalizeOrthography(text: string) {
		const allowedChars = "-0123456789abcdefghijklmnopqrstuvwxyzAꙖБCDEЭҨFGHIJKLMNOПQRSTUVWXYZ'!ÁÉÍÓÚÝЭ́";
		// strip out all characters that are not in the allowedChars string
		let normalized = text
			.split('')
			.filter((char) => allowedChars.includes(char))
			.join('');
		// simple replacements
		normalized = normalized
			.replace(/a/g, 'A')
			.replaceAll('b', 'Б')
			.replaceAll('c', 'C')
			.replaceAll('d', 'D')
			.replaceAll('e', 'E')
			.replaceAll('f', 'F')
			.replaceAll('g', 'G')
			.replaceAll('h', 'H')
			.replaceAll('i', 'I')
			.replaceAll('j', 'J')
			.replaceAll('k', 'K')
			.replaceAll('l', 'L')
			.replaceAll('m', 'M')
			.replaceAll('n', 'N')
			.replaceAll('o', 'O')
			.replaceAll('p', 'П')
			.replaceAll('q', 'Q')
			.replaceAll('r', 'R')
			.replaceAll('s', 'S')
			.replaceAll('t', 'T')
			.replaceAll('u', 'U')
			.replaceAll('v', 'V')
			.replaceAll('w', 'W')
			.replaceAll('x', 'X')
			.replaceAll('y', 'Y')
			.replaceAll('z', 'Z');
		// fancy replacements
		normalized = normalized.replaceAll('A!', 'Ꙗ').replaceAll('E!', 'Э').replaceAll('O!', 'Ҩ').replaceAll('!', '');
		// add accents
		normalized = normalized
			.replaceAll("A'", 'Á')
			.replaceAll("E'", 'É')
			.replaceAll("I'", 'Í')
			.replaceAll("O'", 'Ó')
			.replaceAll("U'", 'Ú')
			.replaceAll("Y'", 'Ý')
			.replaceAll("Э'", 'Э́')
			.replaceAll("'", '');
		return normalized;
	}

	async function addRow() {
		await fetch('/api/lexicon', {
			method: isEditing ? 'PUT' : 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: initialEntry.id,
				row: {
					orthography,
					enGloss,
					enCognate,
					ruGloss,
					ruCognate,
					pos,
					tags
				}
			})
		});
	}
</script>

<div />
<div>
	{#if alreadyExists}
		<div class="caption not-matched">already exists</div>
	{/if}
</div>
<div>
	<input type="text" bind:value={orthography} />
</div>
<div class="ipa">
	{ipa}
</div>
<div>
	<input type="text" bind:value={enGloss} />
</div>
<div>
	<input type="text" bind:value={enCognate} />
</div>
<div>
	<input type="text" bind:value={ruGloss} />
</div>
<div>
	<input type="text" bind:value={ruCognate} />
</div>
<div>
	<ChipInput bind:value={pos} type="select" options={partsOfSpeech.map((x) => x)} />
</div>
<div>
	<ChipInput bind:value={tags} type="free" />
</div>
<div>
	<button disabled={isDisabled} on:click={addRow}>
		{#if isEditing}
			Save
		{:else}
			Add
		{/if}
	</button>
	{#if isEditing}
		<button on:click={onCancel}>Cancel</button>
	{/if}
</div>

<style>
	div {
		text-align: center;
	}
	input {
		width: 95%;
	}
	.ipa {
		font-family: sans-serif;
		white-space: nowrap;
	}
	.not-matched {
		color: red;
	}
	button {
		margin-left: 4px;
	}
	.caption {
		font-size: 0.8em;
	}
</style>
