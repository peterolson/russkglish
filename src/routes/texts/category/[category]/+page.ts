import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { texts } from '@/data/texts';

export const load: PageLoad = ({ params }) => {
	const matchingTexts = texts.filter((t) => t.category === params.category);
	if (matchingTexts.length > 0) {
		return {
			texts: matchingTexts,
			category: params.category
		};
	}
	throw error(404, 'Not found');
};
