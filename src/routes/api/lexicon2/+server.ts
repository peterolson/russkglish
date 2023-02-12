import { lexicon2 } from '@/data/lexicon2';
import type { RequestHandler } from './$types';
import * as fs from 'fs/promises';
import type { LexiconEntry2 } from '@/data/lexicon.types';

export const POST: RequestHandler = async ({ request }) => {
	const { row } = await request.json();
	let nextId = 0;
	for (const entry of lexicon2) {
		if (entry.id >= nextId) {
			nextId = entry.id + 1;
		}
	}
	const newLexicon = lexicon2.concat({ id: nextId, ...row });
	await updateLexicon(newLexicon);
	return new Response('OK');
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { id } = await request.json();
	const newLexicon = lexicon2.filter((entry) => entry.id !== id);
	await updateLexicon(newLexicon);
	return new Response('OK');
};

export const PUT: RequestHandler = async ({ request }) => {
	const { id, row } = await request.json();
	const newLexicon = lexicon2.map((entry) => (entry.id === id ? { id, ...row } : entry));
	await updateLexicon(newLexicon);
	return new Response('OK');
};

async function updateLexicon(newLexicon: LexiconEntry2[]) {
	const fileContents = `import type { LexiconEntry2 } from './lexicon.types';
export const lexicon2: LexiconEntry2[] = ${JSON.stringify(newLexicon, null, 4)};`;

	await fs.writeFile('src/data/lexicon2.ts', fileContents);
}
