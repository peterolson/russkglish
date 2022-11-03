export function enToIPA(en: string) {
	const s = en
		.toUpperCase()
		.replaceAll('AUGHT', 'oc')
		.replace(/^QUE/, 'kwə')
		.replaceAll('TLE', 'tl')
		.replaceAll('TH', 'θ')
		.replaceAll('SH', 'ʃ')
		.replaceAll('CH', 'tʃ')
		.replaceAll('KH', 'x')
		.replace(/([AEIOUÁÉÍÓÖÚ])S([AEIOUÁÉÍÓÖÚ])/g, '$1z$2')
		.replace(/EE(.)E$/, 'e$1ə')
		.replace(/Ú(.)E$/, 'jˈu$1')
		.replace(/Ú(.)E/, 'jˈu$1e')
		.replace(/ÉLLE/, 'ˈel')
		.replace(/ÉE/, 'ˈi')
		.replace(/EE/, 'i')
		.replace(/EA/, 'i')
		.replace(/OO/, 'u')
		.replace(/I$/, 'i')
		.replace(/I([^AEIOUÁÉÍÓÖÚ])E$/, 'i$1')
		.replace(/I(.[AEIOUÁÉÍÓÖÚ])/g, 'i$1')
		.replace(/I([AEIOUÁÉÍÓÖÚ])/, 'i$1')
		.replace(/OI/, 'oi')
		.replace(/WE$/, 'wɨ')
		.replace(/^(.)E$/, '$1i')
		.replace(/([^AEIOUÁÉÍÓÖÚ][^AEIOUÁÉÍÓÖÚ])E$/, '$1ə')
		.replace(/CY$/, 'si')
		.replace(/([^AEIOUÁÉÍÓÖÚ][^AEIOUÁÉÍÓÖÚ])Y$/, '$1ɨ')
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
		.replaceAll('Y', 'j');
	return removeDuplicateLetters(s);
}

export function ruToIPA(ru: string) {
	const s = ru
		.toLowerCase()
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
		.replace(/(\u0301?[аеёиоуыэюя])и/, '$1i')
		.replace(/и(\u0301?[аеёиоуыэюя])/, 'i$1')
		.replace(/и(.\u0301?[аеёиоуыэюя])/g, 'i$1')
		.replaceAll('а́', 'ˈа')
		.replaceAll('е́', 'ˈе')
		.replaceAll('и́', 'ˈi')
		.replaceAll('о́', 'ˈо')
		.replaceAll('у́', 'ˈу')
		.replaceAll('ы́', 'ˈы')
		.replaceAll('э́', 'ˈэ')
		.replaceAll('ю́', 'jˈu')
		.replaceAll('я́', 'ˈя')
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
		.replaceAll('ч', 'c')
		.replaceAll('ш', 'ʃ')
		.replaceAll('щ', 'tʃ')
		.replaceAll('ꙑ', 'ɵ')
		.replaceAll('ы', 'ɨ')
		.replaceAll('ь', '')
		.replaceAll('э', 'ɪ')
		.replaceAll('ю', 'ju')
		.replaceAll('я', 'a');
	return removeDuplicateLetters(s);
}

function removeDuplicateLetters(s: string) {
	return s.replace(/(.)\1/g, '$1');
}

const tests = `
nomer	nomer	номер
oin	oin	оин
twa	twa	твьа
θri	three	тьри
kwərtɪr	quertir	чертир
pɪfθ	pifth	пифть
ʃɪksθ	shixth	шиксть
sevɪm	sevim	севим
oktem	octem	октем
neva	neva	невя
deka	deca	дека
mi	me	ми
braθa	bratha	братья
i	i	и
sɪstra	sistra	систра
moj	moy	мой
titul	titul	титул
lejdi	leydi	лейди
rezidˈensi	residéncy	резиде́нци
an	an	ан
apˈartament	apártament	апа́ртамент
doca	daughta	доча
njet	nyet	ньет
volontˈir	volontéer	волонти́р
njamnjam	nyamnyam	ньямньям
suʃi	sushi	суши
stejk	steyk	стейк
sɵn	sön	сꙑн
gɵrl	görl	гꙑрл
sɪd	sid	сид
stul	stool	стул
glotglot	glotglot	глотглот
mɪlko	milko	милко
awtomobil	awtomobile	авьтомобиль
kraxʃ	crahsh	крахш
nido	needo	нидо
martʃ	march	марщ
to	to	то
mexˈanɪk	mekhánic	меха́ник
kampjˈuter	campúter	кампью́тер
masɪv	massiv	массив
smalɨ	smally	смалый
θwoj	thwoy	тьвой
θi	thee	тьи
alo	allo	алло
problem	problem	проблем
mademwazˈel	mademwasélle	мадемуазе́ль
madˈam	madám	мада́м
mɪster	mister	мистер
dʒentlmen	djentlemen	джентльмен
tsar	tsar	царь
super	super	супер
wolk	wolk	вьолк
publɪk	public	публик
out	out	оут
amˈerika	américa	аме́рика
stat	stat	стат
teksas	texas	тексас
minut	minut	минут
moment	moment	момент
mwɨ	mwe	мы
start	start	старт
dialog	dialog	диалог
ranglˈiski	ranglíski	рангли́ский
anglɪʃ	anglish	англиш
ruski	russki	русский
ɪt	it	эт
smeʃ	smesh	смеш
kotɪdʒ	cottidj	коттидж
top	top	топ
pik	peak	пийк`
	.split('\n')
	.filter(Boolean)
	.map((x) => x.split('\t'))
	.map((x) => ({
		ipa: x[0],
		en: x[1],
		ru: x[2]
	}));

console.clear();
let passed = 0;
let total = 0;
let failed = 0;
for (const test of tests) {
	const { en, ru, ipa } = test;
	const enIPA = enToIPA(en);
	const ruIPA = ruToIPA(ru);
	total++;
	if (ipa !== enIPA) {
		//console.warn(en, ipa, enIPA);
		failed++;
	} else if (ipa !== ruIPA) {
		//console.warn(ru, ipa, ruIPA);
		failed++;
	} else {
		//console.log(en, ru, ipa, enIPA);
		passed++;
	}
}

//console.log(`${passed} passed. ${failed} failed. ${total} total.`);
