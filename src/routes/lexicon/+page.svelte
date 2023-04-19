<script context="module" lang="ts">
	declare const agGrid: any;
</script>

<script lang="ts">
	import { lexicon } from '@/data/lexicon';
	import AddLexiconRow from './AddLexiconRow.svelte';
	import LexiconRow from './LexiconRow.svelte';
	import { texts } from '@/data/texts';
	import { onMount } from 'svelte';
	import { orthographyToIPA } from '@/lib/toIPA';
	import { isDev } from '@/data/config';
	import type { LexiconEntry } from '@/data/lexicon.types';
	const frequencies: Record<number, number> = {};
	for (const { raw } of texts) {
		// find tokens of format 'ъъ1234'
		const matches = raw.match(/ъ+(\d+)/g);
		if (matches) {
			for (const match of matches) {
				const id = +match.replace(/ъ+/g, '');
				frequencies[id] = (frequencies[id] ?? 0) + 1;
			}
		}
	}

	let gridNode: HTMLDivElement;
	let selectedRow: LexiconEntry | undefined;

	onMount(() => {
		if (typeof agGrid === 'undefined') return;
		const gridOptions = {
			columnDefs: [
				{ field: 'id', headerName: 'ID', width: 75 },
				{
					field: 'freq',
					headerName: 'Freq',
					width: 85
				},
				{ field: 'orthography', width: 150 },
				{
					field: 'ipa',
					headerName: 'IPA',
					width: 150
				},
				{
					headerName: 'English',
					children: [
						{ field: 'enGloss', headerName: 'Gloss', flex: 1 },
						{ field: 'enCognate', headerName: 'Cognate', flex: 1 }
					]
				},
				{
					headerName: 'Русский',
					children: [
						{ field: 'ruGloss', headerName: 'Глосса', flex: 1 },
						{ field: 'ruCognate', headerName: 'Источник', flex: 1 }
					]
				},
				{ field: 'pos', headerName: 'POS', width: 85 },
				{ field: 'tags', width: 150 }
			],
			defaultColDef: {
				resizable: true,
				sortable: true,
				filter: true
			},
			rowSelection: 'single',
			rowMultiSelectWithClick: true,
			rowData: lexicon.map((x) => ({
				...x,
				freq: frequencies[x.id] ?? 0,
				ipa: orthographyToIPA(x.orthography)
			})),
			onSelectionChanged: (event: any) => {
				const selectedRows = event.api.getSelectedRows();
				selectedRow = selectedRows[0];
				console.log(selectedRow);
			},
			onFirstDataRendered: (event: any) => {
				setTimeout(() => {
					event.api.ensureIndexVisible(lexicon.length - 1);
				}, 100);
			}
		};
		const grid = new agGrid.Grid(gridNode, gridOptions);
	});
</script>

<svelte:head>
	<title>Lexikon</title>
	<!-- Include the JS for AG Grid -->
	<script src="https://cdn.jsdelivr.net/npm/ag-grid-community/dist/ag-grid-community.min.noStyle.js"></script>
	<!-- Include the core CSS, this is needed by the grid -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-grid.css" />
	<!-- Include the theme CSS, only need to import the theme you are going to use -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ag-grid-community/styles/ag-theme-alpine.css" />
</svelte:head>

<div class="grid-container ag-theme-alpine" bind:this={gridNode} />
{#if isDev}
	<div style="display: flex; justify-content: space-around;">
		{#key selectedRow?.id}
			<AddLexiconRow
				isEditing={!!selectedRow}
				onCancel={() => {
					selectedRow = undefined;
				}}
				initialEntry={selectedRow}
			/>
		{/key}
	</div>
{/if}
{#if false}
	<div class="grid">
		<div class="header" style="grid-column: 1/5">{lexicon.length} words</div>
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
		{#each lexicon as entry}
			<LexiconRow {entry} frequency={frequencies[entry.id] ?? 0} />
		{/each}
		<AddLexiconRow />
	</div>
{/if}

<style>
	.grid-container {
		height: calc(100vh - 120px);
	}

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
