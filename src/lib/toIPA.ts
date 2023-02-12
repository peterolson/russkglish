export function enToIPA(en: string) {
	const s = en
		.toLocaleUpperCase('tr-TR')
		.replaceAll('AUGHT', 'oc')
		.replaceAll('İGHT', 'ojc')
		.replace(/^QUE/, 'kwə')
		.replace(/QU/, 'kw')
		.replace(/TİON$/, 'jtsiən')
		.replace(/SİON$/, 'siən')
		.replace(/ULL$/, 'ol')
		.replaceAll('TLE', 'tl')
		.replace(/AGE$/, 'aʒ')
		.replace(/([TDB])RE$/, '$1r')
		.replace(/DGE$/, 'dʒ')
		.replace(/([AEİOUY][^AEİOU])ES$/, '$1s')
		.replaceAll('TH', 'θ')
		.replaceAll('SH', 'ʃ')
		.replaceAll('CH', 'tʃ')
		.replaceAll('KH', 'x')
		.replace(/^CE/, 'tse')
		.replace(/CE$/, 's')
		.replaceAll('Cİ', 'sİ')
		.replace(/CY$/, 'si')
		.replace(/([AEİOUÁÉÍÓÖÚ])S([AEİOUÁÉÍÓÖÚ])/g, '$1z$2')
		.replace(/EE(.)E$/, 'e$1ə')
		.replace(/Ú(.)E$/, 'jˈu$1')
		.replace(/Ú(.)E/, 'jˈu$1e')
		.replace(/ÉLLE/, 'ˈel')
		.replace(/ÉE/, 'ˈi')
		.replace(/EE/, 'i')
		.replace(/EA/, 'i')
		.replace(/OO/, 'u')
		.replace(/AY/, 'e')
		.replace(/İ$/, 'i')
		.replace(/İ([^AEİOUÁÉÍÓÖÚ])E$/, 'i$1')
		.replace(/İ(.[AEİOUÁÉÍÓÖÚ])/g, 'i$1')
		.replace(/İ([AEİOUÁÉÍÓÖÚ])/, 'i$1')
		.replace(/([AEİOUÁÉÍÓÖÚ])İ/, '$1i')
		.replace(/Oİ/, 'oi')
		.replace(/WE$/, 'wɨ')
		.replace(/^(.)E$/, '$1i')
		.replace(/([^AEIOUÁÉÍÓÖÚ][^AEIOUÁÉÍÓÖÚ])E$/, '$1ə')
		.replace(/([^AEIOUÁÉÍÓÖÚaeiou][^AEIOUÁÉÍÓÖÚ])Y$/, '$1ɨ')
		.replaceAll('Á', 'ˈa')
		.replaceAll('É', 'ˈe')
		.replaceAll('Í', 'ˈi')
		.replaceAll('Ó', 'ˈo')
		.replaceAll('Ö', 'ɵ')
		.replaceAll('Ú', 'ˈu')
		.replaceAll('A', 'a')
		.replaceAll('B', 'b')
		.replaceAll('C', 'k')
		.replaceAll('D', 'd')
		.replaceAll('E', 'e')
		.replaceAll('F', 'f')
		.replaceAll('G', 'g')
		.replaceAll('H', 'x')
		.replaceAll('İ', 'ɪ')
		.replaceAll('I', 'ɪ')
		.replaceAll('J', 'ʒ')
		.replaceAll('K', 'k')
		.replaceAll('L', 'l')
		.replaceAll('M', 'm')
		.replaceAll('N', 'n')
		.replaceAll('O', 'o')
		.replaceAll('P', 'p')
		.replaceAll('R', 'r')
		.replaceAll('S', 's')
		.replaceAll('T', 't')
		.replaceAll('U', 'u')
		.replaceAll('V', 'v')
		.replaceAll('W', 'w')
		.replaceAll('X', 'ks')
		.replaceAll('Y', 'j')
		.replaceAll('“', '«')
		.replaceAll('”', '»')
		.replace(/aik$/, 'ejɪk')
		.replaceAll('ai', 'ej');

	return applyPhonologicalRules(removeDuplicateLetters(s));
}

export function ruToIPA(ru: string) {
	const s = ru
		.toLowerCase()
		.replace(/(.)\u0301/g, 'ˈ$1')
		.replace(/ция$/, 'jtsiən')
		.replace(/сия$/, 'siən')
		.replaceAll('вь', 'w')
		.replaceAll('ьв', 'ьw')
		.replace(/нь$/, 'jn')
		.replaceAll('нь', 'nj')
		.replaceAll('ть', 'θ')
		.replaceAll('иль', 'il')
		.replaceAll('уа', 'wa')
		.replace(/^че/, 'kwə')
		.replace(/ци$/, 'si')
		.replace(/и$/, 'i')
		.replace(/ˈи/, 'ˈi')
		.replace(/ий/, 'i')
		.replace(/ый$/, 'ɨ')
		.replace(/^мы/, 'mwɨ')
		.replace(/([аеёиоуыэюя])и/, '$1i')
		.replace(/и(ˈ?[аеёиоуыэюя])/, 'i$1')
		.replace(/и(.ˈ?[аеёиоуыэюя])/g, 'i$1')
		.replaceAll('а', 'a')
		.replaceAll('б', 'b')
		.replaceAll('в', 'v')
		.replaceAll('г', 'g')
		.replaceAll('д', 'd')
		.replaceAll('е', 'e')
		.replaceAll('ё', 'o')
		.replaceAll('ж', 'ʒ')
		.replaceAll('з', 'z')
		.replaceAll('и', 'ɪ')
		.replaceAll('й', 'j')
		.replaceAll('к', 'k')
		.replaceAll('л', 'l')
		.replaceAll('м', 'm')
		.replaceAll('н', 'n')
		.replaceAll('о', 'o')
		.replaceAll('п', 'p')
		.replaceAll('р', 'r')
		.replaceAll('с', 's')
		.replaceAll('т', 't')
		.replaceAll('у', 'u')
		.replaceAll('ф', 'f')
		.replaceAll('х', 'x')
		.replaceAll('ц', 'ts')
		.replace(/^ч/, 'tʃ')
		.replaceAll('ч', 'c')
		.replaceAll('ш', 'ʃ')
		.replaceAll('щ', 'tʃ')
		.replaceAll('ꙑ', 'ɵ')
		.replaceAll('ү', 'ɵw')
		.replaceAll('ы', 'ɨ')
		.replaceAll('ь', '')
		.replaceAll('э', 'e')
		.replaceAll('є', 'je')
		.replaceAll('ю', 'ju')
		.replaceAll('я', 'a');
	return applyPhonologicalRules(removeDuplicateLetters(s));
}

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
	// j between consonants is removed
	s = s.replace(/([^ɑaeiouɨɪəɛɵ])j([^ɑaeiouɨɪəɛɵ])/g, '$1$2');

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
	let ipa = removeDuplicateLetters(orthography)
		.replaceAll('TSIAN', 'tsiə̃')
		.replaceAll('SH', 'ʃ')
		.replaceAll('ZH', 'ʒ')
		.replaceAll('CH', 'tʃ')
		.replaceAll('TH', 'θ')
		.replaceAll('Á', 'ˈɑ')
		.replaceAll('É', 'ˈe')
		.replaceAll('Í', 'ˈɪ')
		.replaceAll('Ó', 'ˈo')
		.replaceAll('Ú', 'ˈu')
		.replaceAll('Э́', 'ˈɛ')
		.replaceAll('A', 'ɑ')
		.replaceAll('Ꙗ', 'ə̃')
		.replaceAll('Б', 'b')
		.replaceAll('C', 'ts')
		.replaceAll('D', 'd')
		.replaceAll('E', 'e')
		.replaceAll('Э', 'ɛ')
		.replaceAll('F', 'f')
		.replaceAll('G', 'ɡ')
		.replaceAll('H', 'h')
		.replaceAll('I', 'ɪ')
		.replaceAll('J', 'j')
		.replaceAll('K', 'k')
		.replaceAll('L', 'l')
		.replaceAll('M', 'm')
		.replaceAll('N', 'n')
		.replaceAll('O', 'o')
		.replaceAll('Ҩ', 'ɵ')
		.replaceAll('П', 'p')
		.replaceAll('Q', 'k')
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
