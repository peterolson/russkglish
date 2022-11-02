<script lang="ts">
	export let value: string[];
	export let editable: boolean = false;
</script>

<div class="chips">
	{#each value as chip}
		<div class="chip">
			{chip}
			{#if editable}
				<button on:click={() => (value = value.filter((v) => v !== chip))}>x</button>
			{/if}
		</div>
	{/each}
</div>

<style>
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin: 4px;
		justify-content: center;
	}
	.chip {
		padding: 4px 8px;
		border-radius: 4px;
		background-color: rgba(0, 0, 0, 0.1);
		font-family: sans-serif;
		font-size: small;
	}
	button {
		border: none;
		background-color: transparent;
		color: rgba(0, 0, 0, 0.5);
		font-size: small;
		padding: 0;
		margin: 0;
		cursor: pointer;
	}
</style>
