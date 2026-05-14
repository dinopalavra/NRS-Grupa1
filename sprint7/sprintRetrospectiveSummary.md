# SprintRetrospectiveSummary
## Sprint 7

*Datum:* 12.05.2026.
*Projekt:* Sistem za upravljanje sportskim terminima i ligama
*Dokument:* Sažetak sprint retrospektive

## Svrha dokumenta

Ovaj dokument sumira najvažnija zapažanja sa retrospektive Sprinta 7. Fokus retrospektive bio je na tome šta je tokom sprinta funkcionisalo dobro, koje su poteškoće uočene, šta je iz toga naučeno i koje konkretne akcije tim prenosi u buduće sprintove.

## Šta je prošlo dobro

### 1. Kompletna isporuka planiranog opsega

Sve planirane user story stavke (US7-1 do US7-10) su implementirane i validirane unutar sprinta. Nije bilo nedovršenih stavki ni prebacivanja u naredni sprint, što predstavlja značajan napredak u poređenju s prethodnim sprintovima.

### 2. Primijenjene lekcije iz retrospektive Sprinta 6

Retrospektiva Sprinta 6 je identifikovala potrebu za ranijom validacijom end-to-end toka. U Sprintu 7 to je primijenjeno — integracija frontend-backend je provjeravana kontinuirano tokom razvoja, a ne tek pri predaji.

### 3. Arhitektonske odluke su bile jasne i utemeljene

Odabir eksplicitnog join entiteta umjesto @ManyToMany i odluka o undo+reapply pristupu za ispravku rezultata donijete su svjesno i dokumentovane u decision logu. Ovo je timu olakšalo implementaciju i izbjeglo naknadne komplikacije.

### 4. Dizajn sistem je konzistentno primijenjen

Frontend polish koji je uključivao redesign korisničkog i timskog modula donio je vidljivo ujednačeniji izgled aplikacije. Zajednički CSS klase su sada korektno primijenjene kroz sve module.

### 5. Greška je identifikovana i ispravljena brzo

Bug vezan za neosveržavanje liste timova pri prelasku između tabova je identificiran odmah tokom testiranja i ispravljen u istoj sesiji rada, bez utjecaja na isporuku.

## Šta nije prošlo dobro

### 1. Liga modul je bio značajno veći od tipičnih sprint zadataka

Opseg liga modula — backend entiteti, prošireni servisi, novi endpointi, kompletan frontend sa tri taba i CSS — bio je zahtjevan za jedan sprint. Raspodjela na dva manja sprinta bi smanjila rizik.

### 2. Testna pokrivenost liga modula ostaje ručna

Za razliku od reservation i time slot modula koji imaju automatske testove, liga modul validiran je isključivo manuelnim testiranjem. Nedostatak automatskih testova za ResultsService logiku ispravke rezultata predstavlja tehnički dug.

### 3. Dokumentacija je pisana pretežno na kraju sprinta

Iako su odluke donijete i primijenjene tokom razvoja, formalna dokumentacija (decision log, user stories) je zapisivana pri kraju sprinta. Kontinuiraniji pristup bi smanjio pritisak pri finalnoj predaji.

## Glavne lekcije sprinta

- veći moduli trebaju biti razbijeni na manje inkrement planove unutar sprinta,
- automatski testovi za novu servisnu logiku trebaju biti pisani zajedno s implementacijom,
- decision log treba ažurirati odmah nakon svake važnije odluke, ne na kraju,
- rani frontend pregled sa svim rolama korisnika pomaže otkriti UX probleme prije finalnog testa.

## Šta ćemo raditi drugačije ubuduće

### 1. Pisati testove uz implementaciju

Za svaki novi servisni metod koji sadrži poslovnu logiku pisati automatski test u istoj iteraciji. Ovo posebno vrijedi za logiku sa složenim uvjetima poput ispravke rezultata.

### 2. Decision log ažurirati kontinuirano

Svaki put kad tim donese odluku o arhitekturi ili pristupu, odmah je zabilježiti u decision logu, čak i u kratkoj formi. Dokumentacija napisana uz razvoj je uvijek tačnija od rekonstrukcije na kraju.

### 3. Razbijati veće module na jasne podzadatke

Pri planiranju sprinta, za module koji imaju više od 3-4 vezane komponente, unaprijed definisati redoslijed i zavisnosti zadataka kako bi se izbjegla blokada jednih na druge.

## Akcioni koraci

- Dodati automatske testove za ResultsService.recordResult i getMatchesByLeague,
- Razmotriti pokrivenost LeagueService metoda automatskim testovima u budućem radu,
- Uvesti praksu kratkog daily decision loga pri svakom sprintu,
- Planirati kompleksnije module kroz podzadatke sa jasnim zavisnostima.

## Zaključak

Retrospektiva Sprinta 7 pokazuje da je tim isporučio pun opseg planiranog rada i primijenio lekcije iz prethodnih sprintova. Najvažniji uspjeh je kompletna isporuka liga modula koji zaokružuje MVP sistem.

Ključna area za poboljšanje ostaje automatska testna pokrivenost novih modula i kontinuiraniji pristup dokumentovanju odluka tokom razvoja, a ne samo pri kraju sprinta.
