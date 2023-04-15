function removeDuplicateLetters(s: string) {
	return s.replace(/(.)\1/g, '$1');
}

function applyPhonologicalRules(s: string) {
	// final j after consonant changes to i
	if (s.endsWith('j')) {
		const beforeLast = s.charAt(s.length - 2);
		if (!/[ɑaeiouɨɪɛəɵ]/.test(beforeLast)) {
			s = s.slice(0, -1) + 'i';
		}
	}
	// j between consonants is changed to ɪj
	s = s.replace(/([^ˈɑaeiouɨɪəɛɵ])j([^ˈɑaeiouɨɪəɛɵ])/g, '$1ɪj$2');

	// final ɪ changes to i
	s = s.replace(/ɪ$/, 'i');

	// stressed ɪ changes to i
	s = s.replace(/ˈɪ/g, 'ˈi');

	// uw -> u
	s = s.replace(/uw/g, 'u');

	return s;
}

export function orthographyToIPA(orthography: string) {
	// AꙖБCDEЭFGHIJKLMNOҨПQRSTUVWXYZÁÉÍÓÚЭ́"
	let ipa = removeDuplicateLetters(orthography.toUpperCase())
		.replaceAll('10', 'dˈeka')
		.replaceAll('0', 'nˈul')
		.replaceAll('1', 'oˈin')
		.replaceAll('2', 'twˈɑ')
		.replaceAll('3', 'θrˈi')
		.replaceAll('4', 'kwˈɛtir')
		.replaceAll('5', 'pˈɪft')
		.replaceAll('6', 'ʃˈɪkst')
		.replaceAll('7', 'sˈɛvɪm')
		.replaceAll('8', 'ˈoktem')
		.replaceAll('9', 'nˈevɑ')
		.replaceAll('SIAN', 'siə̃')
		.replaceAll('SH', 'ʃ')
		.replaceAll('ZH', 'ʒ')
		.replaceAll('CH', 'tʃ')
		.replaceAll('KH', 'x')
		.replaceAll('TH', 'θ')
		.replaceAll('Á', 'ˈɑ')
		.replaceAll('É', 'ˈe')
		.replaceAll('Í', 'ˈɪ')
		.replaceAll('Ó', 'ˈo')
		.replaceAll('Ú', 'ˈu')
		.replaceAll('Э́', 'ˈɛ')
		.replaceAll('A', 'ɑ')
		.replaceAll('Б', 'b')
		.replaceAll('B', 'b')
		.replaceAll('C', 'ts')
		.replaceAll('D', 'd')
		.replaceAll('E', 'e')
		.replaceAll('Э', 'ɛ')
		.replaceAll('F', 'f')
		.replaceAll('G', 'ɡ')
		.replaceAll('H', 'h')
		.replaceAll('I', 'ɪ')
		.replaceAll('J', 'dʒ')
		.replaceAll('K', 'k')
		.replaceAll('L', 'l')
		.replaceAll('M', 'm')
		.replaceAll('N', 'n')
		.replaceAll('O', 'o')
		.replaceAll('П', 'p')
		.replaceAll('P', 'p')
		.replaceAll('R', 'r')
		.replaceAll('S', 's')
		.replaceAll('T', 't')
		.replaceAll('U', 'u')
		.replaceAll('V', 'v')
		.replaceAll('W', 'w')
		.replaceAll('X', 'ks')
		.replaceAll('Y', 'j')
		.replaceAll('Z', 'z');
	// add stress to first vowel if there are no stress markers
	if (!ipa.includes('ˈ')) {
		ipa = ipa.replace(/([ɑaeiouɛæɨɪəɵ])/, 'ˈ$1');
	}
	return applyPhonologicalRules(ipa);
}
