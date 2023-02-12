import type { RequestHandler } from './$types';
import * as fs from 'fs/promises';
import { textCorpus2 } from '@/data/textCorpus2';

export const POST: RequestHandler = async ({ request }) => {
	const { textName } = await request.json();
	textCorpus2[textName] = [];
	await updateTexts(textCorpus2);
	return new Response('OK');
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { textName } = await request.json();
	delete textCorpus2[textName];
	await updateTexts(textCorpus2);
	return new Response('OK');
};

export const PUT: RequestHandler = async ({ request }) => {
	const { oldTextName, newTextName } = await request.json();
	textCorpus2[newTextName] = textCorpus2[oldTextName];
	delete textCorpus2[oldTextName];
	await updateTexts(textCorpus2);
	return new Response('OK');
};

export async function updateTexts(newTexts: Record<string, number[]>) {
	const fileContents = `export const textCorpus2: Record<string, (number | string)[]> = ${JSON.stringify(newTexts, null, 4)};`;
	await fs.writeFile('src/data/textCorpus2.ts', fileContents);
}
