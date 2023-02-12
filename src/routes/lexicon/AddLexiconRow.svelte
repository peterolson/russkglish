<script lang="ts">
	import ChipInput from '@/components/ChipInput.svelte';
	import { lexicon } from '@/data/lexicon';
	import { partsOfSpeech, type LexiconEntry, type PartOfSpeech } from '@/data/lexicon.types';
	import { enToIPA, ruToIPA } from '@/lib/toIPA';

	export let isEditing = false;
	export let onCancel: () => void = () => {};
	export let initialEntry: LexiconEntry = {
		id: -1,
		ipa: '',
		en: '',
		enGloss: '',
		enCognate: '',
		ru: '',
		ruGloss: '',
		ruCognate: '',
		pos: [],
		tags: []
	};

	let { en, enGloss, enCognate, ru, ruGloss, ruCognate, pos, tags } = initialEntry;

	let enIPA = '';
	let ruIPA = '';
	let ipaMatches = true;
	let alreadyExists = false;
	let isDisabled = true;
	$: {
		enIPA = enToIPA(en);
		ruIPA = ruToIPA(ru);
		ipaMatches = enIPA === ruIPA;
		const existingRow = lexicon.find((row) => row.ipa === enIPA);
		alreadyExists = !!existingRow && existingRow.id !== initialEntry.id;
		isDisabled = !en || !ru || !ipaMatches || !ruGloss || !enGloss || !pos.length || alreadyExists;
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
					ipa: enIPA,
					en,
					enGloss,
					enCognate,
					ru,
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
<div />
<div>
	{#if ipaMatches}
		<span class="ipa">{enIPA}</span>
	{:else}
		<div class="ipa not-matched">{enIPA}</div>
		<div class="ipa not-matched">{ruIPA}</div>
	{/if}
	{#if alreadyExists}
		<div class="caption not-matched">already exists</div>
	{/if}
</div>
<div>
	<input type="text" bind:value={en} />
</div>
<div>
	<input type="text" bind:value={enGloss} />
</div>
<div>
	<input type="text" bind:value={enCognate} />
</div>
<div>
	<input type="text" bind:value={ru} />
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
