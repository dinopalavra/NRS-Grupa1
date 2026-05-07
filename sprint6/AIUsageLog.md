# AIUsageLog
## Sprint 6

**Datum:** 07/05/2026  
**Projekt:** Sistem za upravljanje sportskim terminima i ligama  
**Dokument:** Evidencija korištenja AI alata tokom razvoja i završne validacije sprinta

## Svrha dokumenta

Ovaj dokument evidentira načine na koje je AI alat korišten tokom rada na projektu. Cilj evidencije je jasno prikazati u kojim aktivnostima je AI pružio podršku, koja je bila priroda te podrške, te na koji način je izvršena ljudska provjera i konačna odluka prije uključivanja rezultata u projekt.

Dokument ne predstavlja zamjenu za razvojni rad članova tima, već pregled asistiranih aktivnosti u kojima je AI korišten kao pomoćni alat za analizu problema, prijedloge poboljšanja, pripremu dokumentacije i ubrzavanje završne validacije projekta.

## Način korištenja AI alata

AI je korišten prvenstveno u četiri kategorije aktivnosti:

1. analiza i dijagnostika grešaka u kodu,
2. pomoć pri formulisanju i uređivanju servisne logike,
3. pomoć pri pripremi projektne dokumentacije,
4. savjeti za korisnički interfejs i organizaciju završnih provjera.

U svim slučajevima, AI prijedlozi nisu automatski prihvatani. Svaka izmjena je pregledana, ručno unesena ili prilagođena, zatim pokrenuta lokalno i potvrđena kroz stvarno izvršavanje aplikacije ili Maven testova.

## Evidentirane AI asistirane aktivnosti

### 1. Dijagnostika problema pri kreiranju rezervacije

AI je korišten za analizu problema u reservation modulu nakon što je aplikacija vraćala grešku vezanu za korisnički ID prilikom kreiranja rezervacije. Na osnovu pregleda servisne logike i povratnih poruka iz aplikacije, identifikovan je problem u dijelu koda koji se oslanja na `createdByUserId` i direktni lookup korisnika u `ReservationService`.

AI je pružio pomoć u:
- tumačenju greške `User not found`,
- povezivanju login odgovora i reservation request logike,
- predlaganju brze korekcije koja omogućava prolazak funkcionalnosti u završnoj verziji sistema.

### 2. Korekcija i finalizacija backend logike

AI je korišten za pripremu prilagođene verzije `ReservationService.java`, nakon što je utvrđeno da je potrebno brzo osposobiti tok rezervacija za potrebe završne demonstracije i predaje. Predložena izmjena je zatim ručno pregledana, kopirana u projekt i testirana lokalno.

Ova asistencija obuhvatila je:
- refaktorisanje dijela metode `create(...)`,
- uklanjanje debug ispisa nakon validacije,
- pripremu punog fajla spremnog za copy-paste i lokalno testiranje.

### 3. Pomoć pri pokretanju i interpretaciji testova

AI je korišten za pojašnjenje kako lokalno pokrenuti Maven testove, kako razlikovati `mvn test` i `mvn clean test`, te kako interpretirati rezultat `BUILD SUCCESS`. Pored toga, pružena je pomoć pri razumijevanju ranije greške gdje su test klase bile na pogrešnoj lokaciji i ulazile u compile fazu glavnog koda.

AI je u ovom dijelu pomogao kroz:
- tumačenje Maven izlaza,
- objašnjenje ispravnog mjesta za test klase,
- potvrdu da prolazak svih testova predstavlja ispravan signal spremnosti za predaju.

### 4. Pomoć pri izradi izvještaja o testiranju

AI je korišten za izradu formalnijeg i detaljnijeg izvještaja o testiranju, na osnovu primjera koleginog dokumenta i stvarnog stanja našeg projekta. Pri tome je zadržana struktura pogodna za akademsku predaju, ali je sadržaj prilagođen našim automatizovanim i manuelnim provjerama.

AI podrška je uključivala:
- prilagođavanje strukture postojećeg uzorka,
- formulaciju uvoda, metodologije i zaključka,
- usklađivanje sadržaja sa Maven testovima i stvarnim funkcionalnostima projekta.

### 5. Savjeti za frontend doradu i vraćanje izmjena

AI je korišten i za prijedloge vizuelnog uređivanja frontend dijela aplikacije, posebno za reservations ekran, kao i za pojašnjenje načina vraćanja izmjena u Visual Studio Code editoru kada su promjene procijenjene kao nepoželjne.

Ova podrška se odnosila na:
- prijedlog alternativnog izgleda stranice,
- objašnjenje `undo` postupka u VS Code,
- smanjenje rizika od neželjenih izmjena pred samu predaju.

## Vrsta AI izlaza

Tokom sprinta AI je generisao ili predložio sljedeće vrste izlaza:

- objašnjenja grešaka i mogućih uzroka,
- prijedloge izmjena Java i React koda,
- tekstualne prijedloge za projektne dokumente,
- strukturirane nacrte za izvještaje,
- kratke proceduralne upute za lokalni razvoj i testiranje.

## Ljudska validacija i odgovornost

Svaki AI izlaz pregledan je od strane člana tima prije primjene. Nijedna izmjena nije prihvaćena bez lokalne provjere kroz barem jedan od sljedećih koraka:

- pregled koda u editoru,
- ponovno pokretanje backend aplikacije,
- provjera funkcionalnosti kroz korisnički interfejs,
- pokretanje Maven testova,
- poređenje dobijenog rezultata sa očekivanim ponašanjem sistema.

Konačna odgovornost za prihvaćene izmjene, tačnost dokumentacije i predatu verziju projekta ostaje na članovima tima.

## Prednosti korištenja AI alata

Korištenje AI alata donijelo je nekoliko praktičnih koristi u završnoj fazi sprinta:

- ubrzano razumijevanje grešaka i izuzetaka,
- brže formuliranje ispravki u kodu,
- efikasniju pripremu formalne dokumentacije,
- bržu finalnu provjeru pred predaju,
- lakše strukturiranje tehničkih objašnjenja i zaključaka.

## Rizici i ograničenja

Iako je AI bio koristan pomoćni alat, uočena su i određena ograničenja:

- pojedini prijedlozi mogu biti previše generički ako se ne prilagode konkretnom projektu,
- kod generisan uz pomoć AI alata zahtijeva dodatnu ručnu provjeru,
- estetski prijedlozi za frontend ne moraju uvijek odgovarati postojećem dizajnu aplikacije,
- dokumentacija generisana uz AI pomoć mora biti usklađena sa stvarnim stanjem projekta i ne smije sadržavati izmišljene podatke.

Zbog toga je AI korišten isključivo kao pomoćno sredstvo, a ne kao autonomni nosilac razvoja.

## Zaključak

AI alat je u okviru Sprinta 6 korišten odgovorno i ciljano, kao podrška pri dijagnostici problema, finalizaciji pojedinih funkcionalnosti i izradi završne dokumentacije. Najveću vrijednost imao je u ubrzavanju analize grešaka, pripremi tehničkih objašnjenja i strukturiranju dokumenata za predaju.

Na osnovu evidentiranih aktivnosti može se zaključiti da je AI imao ulogu asistenta u procesu razvoja i validacije, dok su ključne odluke, provjere i konačna implementacija ostale u nadležnosti članova tima.
