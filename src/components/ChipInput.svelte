<script lang="ts">
	import Chips from './Chips.svelte';

	export let value: string[];
	export let type: 'free' | 'select';
	export let options: string[] = [];

	let selectedValue: string = '';

	function selectValue(e: Event) {
		const target = e.target as HTMLInputElement;
		if (target.value) {
			value = Array.from(new Set([...value, target.value]));
			selectedValue = '';
		}
	}

	function pressKey(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			selectValue(e);
		}
	}
</script>

<div>
	{#if value.length}
		<Chips bind:value editable />
	{/if}
	{#if type === 'free'}
		<input bind:value={selectedValue} on:keypress={pressKey} />
	{:else if type === 'select'}
		<select bind:value={selectedValue} on:change={selectValue}>
			<option value="" />
			{#each options as option}
				<option>{option}</option>
			{/each}
		</select>
	{/if}
</div>

<style>
	input {
		width: 80px;
	}
</style>
