import type { RequestHandler } from './$types';
import * as fs from 'fs/promises';
import { textCorpus } from '@/data/textCorpus';

export const POST: RequestHandler = async ({ request }) => {
	const { textName } = await request.json();
	textCorpus[textName] = [];
	await updateTexts(textCorpus);
	return new Response('OK');
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { textName } = await request.json();
	delete textCorpus[textName];
	await updateTexts(textCorpus);
	return new Response('OK');
};

export const PUT: RequestHandler = async ({ request }) => {
	const { oldTextName, newTextName } = await request.json();
	textCorpus[newTextName] = textCorpus[oldTextName];
	delete textCorpus[oldTextName];
	await updateTexts(textCorpus);
	return new Response('OK');
};

export async function updateTexts(newTexts: Record<string, number[]>) {
	const fileContents = `export const textCorpus: Record<string, (number | string)[]> = ${JSON.stringify(newTexts, null, 4)};`;
	await fs.writeFile('src/data/textCorpus.ts', fileContents);
}
