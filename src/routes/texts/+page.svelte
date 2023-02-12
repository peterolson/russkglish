<script lang="ts">
	import { textCorpus } from '@/data/textCorpus';

	const textNames = Object.keys(textCorpus);

	let textName = '';
	let editing = new Set<string>();
	let newTextNames: Record<string, string> = {};

	async function addText() {
		await fetch('/api/texts', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				textName
			})
		});
	}

	async function deleteText(textName: string) {
		await fetch('/api/texts', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				textName
			})
		});
	}

	function toggleEditing(textName: string) {
		const isEditing = editing.has(textName);
		if (!isEditing) {
			editing.add(textName);
			if (!(textName in newTextNames)) {
				newTextNames[textName] = textName;
			}
		} else {
			editing.delete(textName);
		}
		editing = new Set(editing);
	}

	async function saveNewName(oldTextName: string, newTextName: string) {
		await fetch('/api/texts', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				oldTextName,
				newTextName
			})
		});
		toggleEditing(oldTextName);
	}
</script>

<h1>Texts</h1>

<div class="texts-grid">
	{#each textNames.sort() as textName}
		{#if editing.has(textName)}
			<input bind:value={newTextNames[textName]} />
		{:else}
			<a href="texts/{textName}">
				{#each textName.split('|') as part}
					<span>{part}</span>
				{/each}
			</a>
		{/if}
		<div>
			{#if editing.has(textName)}
				<button on:click={() => saveNewName(textName, newTextNames[textName])}>Save</button>
			{/if}
			<button on:click={() => toggleEditing(textName)}>{editing.has(textName) ? 'Cancel' : 'Edit'}</button>
			{#if !editing.has(textName)}
				<button on:click={() => deleteText(textName)}>Delete</button>
			{/if}
		</div>
	{/each}
</div>

<form
	on:submit={(e) => {
		e.preventDefault();
		addText();
	}}
>
	<input bind:value={textName} />
	<button type="submit" disabled={!textName || textNames.includes(textName)}>Add text</button>
</form>

<style>
	.texts-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 4px;
		margin: 16px;
	}

	a {
		display: flex;
	}

	a span {
		flex: 1;
	}
</style>
