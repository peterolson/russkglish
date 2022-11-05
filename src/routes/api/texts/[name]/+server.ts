import type { RequestHandler, RouteParams } from './$types';
import { textCorpus } from '@/data/textCorpus';
import { updateTexts } from '../+server';

export const PUT: RequestHandler = async ({ request, params }: { request: Request; params: RouteParams }) => {
	const { textData } = await request.json();
	const textName = params.name;
	await updateTexts({
		...textCorpus,
		[textName]: textData
	});
	return new Response('OK');
};
