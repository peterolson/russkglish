<script lang="ts">
	import type { PageData } from './$types';
	import { lexicon } from '@/data/lexicon';
	import { afterUpdate } from 'svelte';
	import type { LexiconEntry } from '@/data/lexicon.types';
	import { parseMarkup, type Text } from '@/lib/markup';
	import TextDisplay from '@/components/TextDisplay.svelte';
	import { isDev } from '@/data/config';

	export let data: PageData;

	let markup = data.text?.raw ?? '';

	let parsedText: Text;

	const tokenPattern = /ъ+(\d+)/g;

	$: {
		parsedText = parseMarkup(markup);
	}

	let textareaNode: HTMLPreElement;
	let overlayContainer: HTMLDivElement;
	let suggestionContainer: HTMLDivElement;
	let prevScrollY = 0;
	let nodeValues: Map<Node, string> = new Map();
	let overlaysMap: Map<Node, Set<HTMLDivElement>> = new Map();
	let lineCount = 0;

	// https://stackoverflow.com/questions/10730309/find-all-text-nodes-in-html-page
	function textNodesUnder(el: Node) {
		let n: Node | null,
			a = [],
			walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT, null);
		while ((n = walk.nextNode())) a.push(n);
		return a;
	}

	let eventListener: (e: KeyboardEvent) => void;

	afterUpdate(() => {
		if (!isDev) return;
		// clear previous overlays
		suggestionContainer.innerHTML = '';
		const scrollY = window.scrollY;
		let hasScrollChanged = false;
		if (scrollY !== prevScrollY) {
			hasScrollChanged = true;
			prevScrollY = scrollY;
			overlayContainer.innerHTML = '';
		}

		let lineCountChanged = false;
		if (lineCount !== markup.split('\n').length) {
			lineCountChanged = true;
			lineCount = markup.split('\n').length;
		}

		// get ranges of all tokens of format 'ъъ1234'
		const ranges: {
			lexiconEntry: LexiconEntry;
			boundingBox: DOMRect;
			textNode: Node;
		}[] = [];
		if (!textareaNode) return;
		const textNodes = textNodesUnder(textareaNode);
		for (const textNode of textNodes) {
			const text = textNode.nodeValue;
			if (!text) continue;
			// continue if text hasn't changed since last iteration
			if (nodeValues.get(textNode) === text && !hasScrollChanged && !lineCountChanged) continue;
			nodeValues.set(textNode, text);
			const matches = text.matchAll(tokenPattern);
			for (const match of matches) {
				const matchText = match[0];
				const id = parseInt(matchText.replaceAll('ъ', ''));
				const lexiconEntry = lexicon.find((entry) => entry.id === id);
				if (!lexiconEntry) continue;
				const start = match.index;
				if (start === undefined) continue;
				const end = start + match[0].length;
				const range = new Range();
				range.setStart(textNode, start);
				range.setEnd(textNode, end);
				const boundingBox = range.getBoundingClientRect();
				ranges.push({
					lexiconEntry,
					boundingBox,
					textNode
				});
			}
		}

		for (const { textNode } of ranges) {
			const overlays = overlaysMap.get(textNode);
			if (overlays) {
				for (const overlay of overlays) {
					overlay.remove();
				}
			}
			overlaysMap.set(textNode, new Set());
		}

		// overlay lexicon entries on screen at given coordinates
		for (const { lexiconEntry, boundingBox, textNode } of ranges) {
			const text = lexiconEntry.orthography;
			const div = document.createElement('div');
			div.style.position = 'absolute';
			div.style.top = `${boundingBox.top + scrollY}px`;
			div.style.left = `${boundingBox.left}px`;
			div.style.width = `${boundingBox.width}px`;
			div.style.height = `${boundingBox.height}px`;
			div.style.backgroundColor = '#eee';
			div.style.pointerEvents = 'none';
			div.style.fontFamily = 'monospace';
			div.style.overflow = 'hidden';
			div.style.whiteSpace = 'nowrap';
			div.style.zIndex = '1000';
			div.innerText = text;
			const overlaySet = overlaysMap.get(textNode);
			if (overlaySet) {
				overlaySet.add(div);
			}
			overlayContainer.appendChild(div);
		}

		// get the word before the caret
		const selection = document.getSelection();

		if (selection && selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			const start = range.startOffset;
			const end = range.endOffset;
			const textNode = range.startContainer;
			const text = textNode.nodeValue;
			if (!text) return;
			const wordStart = regexLastIndexOf(text, /[^A-Za-z]/g, start - 1) + 1;
			// find last non-alphabetical character before start of word
			const word = text.slice(wordStart, end);
			const suggestions = lexicon
				.filter((entry) => {
					return `${entry.orthography}|${entry.enCognate}|${entry.enGloss}|${entry.ruCognate}|${entry.ruGloss}`
						.toLowerCase()
						.includes(word.toLowerCase());
				})
				.sort((a, b) => {
					function scoreMatch(x: LexiconEntry) {
						const w = word.toLowerCase();
						let score = 0;
						if (x.orthography.toLowerCase() === w) score += 1000;
						if (x.enCognate.toLowerCase() === w) score += 1000;
						if (x.enGloss.toLowerCase() === w) score += 1000;
						if (x.ruCognate.toLowerCase() === w) score += 1000;
						if (x.ruGloss.toLowerCase() === w) score += 1000;
						if (x.orthography.toLowerCase().startsWith(w)) score += 100;
						if (x.enCognate.toLowerCase().startsWith(w)) score += 50;
						if (x.enGloss.toLowerCase().startsWith(w)) score += 30;
						if (x.ruCognate.toLowerCase().startsWith(w)) score += 50;
						if (x.ruGloss.toLowerCase().startsWith(w)) score += 30;
						if (x.orthography.toLowerCase().includes(w)) score += 10;
						if (x.enCognate.toLowerCase().includes(w)) score += 5;
						if (x.ruCognate.toLowerCase().includes(w)) score += 5;
						return score;
					}
					return scoreMatch(b) - scoreMatch(a);
				})
				.slice(0, 9);

			if (word && suggestions.length > 0) {
				// show suggestions
				const boundingBox = range.getBoundingClientRect();
				const suggestionsContainer = document.createElement('div');
				suggestionsContainer.style.position = 'absolute';
				suggestionsContainer.style.top = `${boundingBox.top + window.scrollY}px`;
				suggestionsContainer.style.left = `${boundingBox.right + 1}px`;
				suggestionsContainer.style.width = '300px';
				suggestionsContainer.style.backgroundColor = '#eee';
				suggestionsContainer.style.zIndex = '1001';
				suggestionsContainer.style.fontFamily = 'monospace';
				suggestionsContainer.innerHTML = suggestions
					.map((entry, i) => {
						return `<div style="padding: 4px; border-bottom: 1px solid #ccc;">${i + 1} ${entry.orthography} (${
							entry.enGloss
						} - ${entry.enCognate})</div>`;
					})
					.join('');
				suggestionContainer.appendChild(suggestionsContainer);

				// remove previous event listener
				window.removeEventListener('keydown', eventListener);
				// add event listener to window for numbers 1-9
				eventListener = (e: KeyboardEvent) => {
					if (e.key === 'Escape') {
						suggestionsContainer.remove();
						window.removeEventListener('keydown', eventListener);
						e.preventDefault();
						return;
					}

					const number = parseInt(e.key);
					if (number >= 1 && number <= 9) {
						console.log(number, suggestionContainer.parentNode);
						const entry = suggestions[number - 1];
						suggestionsContainer.remove();
						e.preventDefault();
						window.removeEventListener('keydown', eventListener);

						// replace word before cursor with `ъъ${entry.id}`
						const prefix = text.slice(0, wordStart);
						const suffix = text.slice(end);
						const paddingLength = Math.max(
							0,
							entry.orthography.replace(/[^A-Za-zЭэ-]/g, '').length - String(entry.id).length - 1
						);
						const paddingString = 'ъ'.repeat(paddingLength);
						textNode.nodeValue = `${prefix}ъ${paddingString}${entry.id}${suffix}`;
						markup = textareaNode.innerText;

						// move caret to end of inserted text
						const selection = document.getSelection();
						if (selection) {
							const length = prefix.length + 1 + paddingLength + entry.id.toString().length;
							for (let i = 0; i < length; i++) {
								selection.modify('move', 'forward', 'character');
							}
						}
					}
				};
				window.addEventListener('keydown', eventListener);
			} else {
				window.removeEventListener('keydown', eventListener);
			}
		}
	});

	async function save() {
		await fetch(`/api/texts/${data.text.title}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ markup })
		});
	}

	function regexLastIndexOf(string: string, regex: RegExp, startpos?: number) {
		if (typeof startpos == 'undefined') {
			startpos = string.length;
		} else if (startpos < 0) {
			startpos = 0;
		}
		var stringToWorkWith = string.substring(0, startpos + 1);
		var lastIndexOf = -1;
		var nextStop = 0;
		let result;
		while ((result = regex.exec(stringToWorkWith)) != null) {
			lastIndexOf = result.index;
			regex.lastIndex = ++nextStop;
		}
		return lastIndexOf;
	}
</script>

<div class="container">
	{#if isDev}
		<pre contenteditable="plaintext-only" bind:innerText={markup} bind:this={textareaNode} />
	{/if}
	<div class="output">
		<TextDisplay text={parsedText} />
	</div>
</div>
{#if isDev}
	<button on:click={save}>Save</button>

	<div class="overlay-container" bind:this={overlayContainer} />
	<div class="suggestion-container" bind:this={suggestionContainer} />
{/if}

<style>
	.container {
		display: flex;
		gap: 16px;
		padding: 8px;
	}
	pre {
		width: 100%;
		max-width: 500px;
		white-space: pre-wrap;
		border: 1px solid #ccc;
		overflow: auto;
		padding: 8px;
		background-color: #fff;
	}
	.output {
		width: 100%;
		display: flex;
		justify-content: center;
		overflow: auto;
	}
</style>
