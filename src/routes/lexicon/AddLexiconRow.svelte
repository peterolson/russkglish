<script lang="ts">
	import ChipInput from '@/components/ChipInput.svelte';
	import { partsOfSpeech, type LexiconEntry, type PartOfSpeech } from '@/data/lexicon.types';
	import { enToIPA, ruToIPA } from '@/lib/toIPA';

	export let isEditing = false;
	export let onCancel: () => void = () => {};
	export let initialEntry: LexiconEntry = {
		id: 0,
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
	let isDisabled = true;
	$: {
		enIPA = enToIPA(en);
		ruIPA = ruToIPA(ru);
		ipaMatches = enIPA === ruIPA;
		isDisabled =
			!en || !ru || !ipaMatches || !ruGloss || !enGloss || !pos.length || !/[а-ё]/i.test(ru);
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

<tr>
	<td>
		{#if ipaMatches}
			<span class="ipa">{enIPA}</span>
		{:else}
			<div class="ipa not-matched">{enIPA}</div>
			<div class="ipa not-matched">{ruIPA}</div>
		{/if}
	</td>
	<td>
		<input type="text" bind:value={en} />
	</td>
	<td>
		<input type="text" bind:value={enGloss} />
	</td>
	<td>
		<input type="text" bind:value={enCognate} />
	</td>
	<td>
		<input type="text" bind:value={ru} />
	</td>
	<td>
		<input type="text" bind:value={ruGloss} />
	</td>
	<td>
		<input type="text" bind:value={ruCognate} />
	</td>
	<td>
		<ChipInput bind:value={pos} type="select" options={partsOfSpeech.map((x) => x)} />
	</td>
	<td>
		<ChipInput bind:value={tags} type="free" />
	</td>
	<td>
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
	</td>
</tr>

<style>
	td {
		text-align: center;
	}
	input {
		width: 95%;
	}
	.ipa {
		font-family: sans-serif;
	}
	.not-matched {
		color: red;
	}
	button {
		margin-left: 4px;
	}
</style>
