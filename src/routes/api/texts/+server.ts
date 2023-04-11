import { texts } from '@/data/texts';
import type { RequestHandler } from './$types';
import * as fs from 'fs/promises';

export const POST: RequestHandler = async () => {
	await _updateTexts([
		...texts.map((x) => x.raw),
		'title. New Text\nsubtitle. New Subtitle\ncategory. New Category\nimg. New Image\n\nNew Text'
	]);
	return new Response('OK');
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { title } = await request.json();
	await _updateTexts([...texts.filter((x) => x.title !== title).map((x) => x.raw)]);
	return new Response('OK');
};

export async function _updateTexts(texts: string[]) {
	const fileContents = `import { parseMarkup } from '@/lib/markup';

    const rawTexts: string[] = ${JSON.stringify(texts, null, 4)};
    
    export const texts = rawTexts.map((t) => ({ raw: t, ...parseMarkup(t) }));`;
	await fs.writeFile('src/data/texts.ts', fileContents);
}
