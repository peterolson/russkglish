import { textCorpus } from '@/data/textCorpus';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (params.name in textCorpus) {
		return {
			textName: params.name,
			textData: textCorpus[params.name]
		};
	}

	throw error(404, 'Not found');
};
