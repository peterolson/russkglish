export const partsOfSpeech = [
	'verb',
	'noun',
	'adj',
	'pron',
	'pron.poss',
	'conj',
	'interj',
	'neg',
	'num',
	'prep',
	'punct',
	'punct-left',
	'punct-right',
	'punct-middle'
] as const;

export type PartOfSpeech = typeof partsOfSpeech[number];

export type LexiconEntry = {
	id: number;
	orthography: string;
	enGloss: string;
	ruGloss: string;
	enCognate: string;
	ruCognate: string;
	pos: PartOfSpeech[];
	tags: string[];
};
