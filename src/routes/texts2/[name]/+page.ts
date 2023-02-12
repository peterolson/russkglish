import { textCorpus2 } from '@/data/textCorpus2';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	if (params.name in textCorpus2) {
		return {
			textName: params.name,
			textData: textCorpus2[params.name]
		};
	}

	throw error(404, 'Not found');
};
