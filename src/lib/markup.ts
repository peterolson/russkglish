import { lexicon } from '../data/lexicon';
import * as commonmark from 'commonmark';
const reader = new commonmark.Parser();
const writer = new commonmark.HtmlRenderer();

export type Text = {
	title: string;
	subtitle: string;
	category: string;
	img: string;
	text: string;
};

const tokenPattern = /ъ+(\d+)/g;

export function parseMarkup(markup: string): Text {
	// replace `` and '' with left and right quotes
	const afterQuotes = markup.replaceAll('``', '«').replaceAll("''", '»');
	function replaceWords(text: string, addSpans = false) {
		// find tokens of format 'ъъ1234' and replace them with the corresponding lexicon entry
		const afterReplacement = text.replace(tokenPattern, (match) => {
			const id = parseInt(match.replaceAll('ъ', ''));
			const entry = lexicon.find((entry) => entry.id === id);
			if (addSpans) {
				return entry ? `<span data-id="${id}">${entry.orthography}</span>` : match;
			}
			return entry ? `${entry.orthography}` : match;
		});
		// capitalize first letter after '.?!', after '\n', or at the beginning of the text
		const afterCapitalization = afterReplacement.replace(
			/(^|[.?!#]\s+|\n|«|\n - |\n - \*\*|<p>|<h[1-6]>|<li>|<li><strong>|<th>)(<span[^>]*>)?([A-Za-zЭэ])(<\/span[^>]*>)?/g,
			(match, p1, p2, p3, p4) => {
				return p1 + (p2 ?? '') + p3.toUpperCase() + (p4 ?? '');
			}
		);
		return afterCapitalization;
	}

	let title = '';
	let subtitle = '';
	let category = '';
	let img = '';
	const lines = afterQuotes.split('\n');
	const outputLines = [];
	for (const line of lines) {
		const remainder = line.split('.').slice(1).join('.').trim();
		if (line.startsWith('title.')) {
			title = remainder;
		} else if (line.startsWith('subtitle.')) {
			subtitle = remainder;
		} else if (line.startsWith('category.')) {
			category = remainder;
		} else if (line.startsWith('img.')) {
			img = remainder;
		} else {
			outputLines.push(line);
		}
	}
	const text = outputLines.join('\n');
	return {
		title: replaceWords(title),
		subtitle: replaceWords(subtitle),
		category: replaceWords(category),
		img,
		text: replaceWords(writer.render(reader.parse(text)), true)
	};
}
