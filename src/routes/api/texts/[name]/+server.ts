import type { RequestHandler, RouteParams } from './$types';
import { _updateTexts } from '../+server';
import { texts } from '@/data/texts';

export const PUT: RequestHandler = async ({ request, params }: { request: Request; params: RouteParams }) => {
	const { markup } = await request.json();
	const textName = params.name;
	let foundMatch = false;
	const updated = texts.map((t) => {
		if (foundMatch) return t.raw;
		if (t.title === textName) {
			foundMatch = true;
			return markup;
		} else {
			return t.raw;
		}
	});
	if (!foundMatch) updated.push(markup);
	await _updateTexts(updated);
	return new Response('OK');
};
