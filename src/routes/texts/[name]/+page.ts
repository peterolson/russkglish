import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { texts } from '@/data/texts';

export const load: PageLoad = ({ params }) => {
	const matchingText = texts.find((t) => t.title === params.name);
	if (matchingText) {
		return {
			text: matchingText
		};
	}
	throw error(404, 'Not found');
};
