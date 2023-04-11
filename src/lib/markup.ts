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
	// find tokens of format 'ъъ1234' and replace them with the corresponding lexicon entry
	const afterReplacement = afterQuotes.replace(tokenPattern, (match) => {
		const id = parseInt(match.replaceAll('ъ', ''));
		const entry = lexicon.find((entry) => entry.id === id);
		return entry ? entry.orthography : match;
	});
	// capitalize first letter after '.?!', after '\n', or at the beginning of the text
	const afterCapitalization = afterReplacement.replace(/(^|[.?!#]\s+|\n|«)([A-Za-zЭэ])/g, (match, p1, p2) => {
		return p1 + p2.toUpperCase();
	});
	let title = '';
	let subtitle = '';
	let category = '';
	let img = '';
	const lines = afterCapitalization.split('\n');
	const outputLines = [];
	for (const line of lines) {
		const remainder = line.split('.').slice(1).join('.').trim();
		if (line.startsWith('Title.')) {
			title = remainder;
		} else if (line.startsWith('Subtitle.')) {
			subtitle = remainder;
		} else if (line.startsWith('Category.')) {
			category = remainder;
		} else if (line.startsWith('Img.')) {
			img = remainder;
		} else {
			outputLines.push(line);
		}
	}
	const text = outputLines.join('\n');
	return {
		title,
		subtitle,
		category,
		img,
		text: writer.render(reader.parse(text))
	};
}
