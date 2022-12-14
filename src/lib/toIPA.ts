export function enToIPA(en: string) {
	const s = en
		.toLocaleUpperCase('tr-TR')
		.replaceAll('AUGHT', 'oc')
		.replaceAll('İGHT', 'ojc')
		.replace(/^QUE/, 'kwə')
		.replace(/QU/, 'kw')
		.replace(/TİON$/, 'jtsiən')
		.replace(/ULL$/, 'ol')
		.replaceAll('TLE', 'tl')
		.replace(/AGE$/, 'aʒ')
		.replace(/([AEİOUY][^AEİOU])ES$/, '$1s')
		.replaceAll('TH', 'θ')
		.replaceAll('SH', 'ʃ')
		.replaceAll('CH', 'tʃ')
		.replaceAll('KH', 'x')
		.replace(/^CE/, 'tse')
		.replaceAll('Cİ', 'sİ')
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
		.replace(/Oİ/, 'oi')
		.replace(/WE$/, 'wɨ')
		.replace(/^(.)E$/, '$1i')
		.replace(/([^AEIOUÁÉÍÓÖÚ][^AEIOUÁÉÍÓÖÚ])E$/, '$1ə')
		.replace(/CY$/, 'si')
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
		.replaceAll('ai', 'ej');

	return applyPhonologicalRules(removeDuplicateLetters(s));
}

export function ruToIPA(ru: string) {
	const s = ru
		.toLowerCase()
		.replace(/(.)\u0301/g, 'ˈ$1')
		.replace(/ция$/, 'jtsiən')
		.replaceAll('вь', 'w')
		.replaceAll('ьв', 'ьw')
		.replaceAll('нь', 'nj')
		.replaceAll('ть', 'θ')
		.replaceAll('иль', 'il')
		.replaceAll('уа', 'wa')
		.replace(/^че/, 'kwə')
		.replace(/ци$/, 'si')
		.replace(/и$/, 'i')
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
		.replaceAll('э', 'ɪ')
		.replaceAll('є', 'je')
		.replaceAll('ю', 'ju')
		.replaceAll('я', 'a');
	return applyPhonologicalRules(removeDuplicateLetters(s));
}

function removeDuplicateLetters(s: string) {
	return s.replace(/(.)\1/g, '$1');
}

function applyPhonologicalRules(s: string) {
	// final a and e to schwa
	s = s.replace(/([ae])$/, 'ə');

	// final j after consonant changes to i
	if (s.endsWith('j')) {
		const beforeLast = s.charAt(s.length - 2);
		if (!/[aeiouɨɪəɵ]/.test(beforeLast)) {
			s = s.slice(0, -1) + 'i';
		}
	}
	// j between consonants is removed
	s = s.replace(/([^aeiouɨɪəɵ])j([^aeiouɨɪəɵ])/g, '$1$2');

	// uw -> u
	s = s.replace(/uw/g, 'u');

	return s;
}
