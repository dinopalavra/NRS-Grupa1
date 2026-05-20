# Sprint Review Summary
## Sprint 7

**Sprint broj:** 7
**Datum:** 12.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Planirani sprint goal

Implementirati kompletan modul za upravljanje ligama — kreiranje liga, upravljanje timovima unutar liga, zakazivanje utakmica, unos rezultata i automatsko ažuriranje tabele. Uz to, proširiti sistem podrškom za odabir vrste sporta pri kreiranju termina i liga, te vezati zakazivanje utakmica u ligi s automatskom rezervacijom termina na terenu.

---

## Šta je završeno

Planirane aktivnosti koje su završene u ovom sprintu su:

- implementacija kreiranja nove lige s nazivom, sezonom i vrstom sporta (US7-1)
- implementacija pregleda liste svih liga (US7-2)
- implementacija dodavanja timova u ligu uz provjeru duplikata i validaciju sporta (US7-3)
- implementacija uklanjanja tima iz lige (US7-4)
- implementacija pregleda timova u odabranoj ligi (US7-5)
- implementacija zakazivanja utakmica između timova iste lige s odabirom lokacije, terena i vremena (US7-6)
- implementacija automatske rezervacije termina pri zakazivanju utakmice u ligi (US7-6)
- implementacija pregleda utakmica po ligi s prikazom lokacije i termina (US7-7)
- implementacija unosa i ispravke rezultata utakmica uz undo+reapply logiku (US7-8)
- implementacija automatskog ažuriranja tabele nakon unosa rezultata (US7-9)
- implementacija pregleda tabele s vizualnim isticanjem prvih mjesta (US7-10)
- implementacija odabira vrste sporta pri kreiranju termina (US7-11)
- implementacija prikaza informacije o ligaškom terminu u pregledu termina (US7-12)
- ispravka neusklađenosti između rezervacija i ligaškog modula — termini zakazani za ligaške utakmice sada su vidljivi i blokirani u modulu termina
- ispravljanje formata sprint dokumentacije — user storiji su prebačeni u sprint backlog, uklonjen zasebni userStories.md fajl
- ispravljanje formata decisionLog.md prema standardnom predlošku s decision matrix tabelama

---

## Šta nije završeno

Sve stavke koje su planirane u okviru Sprinta 7 su završene.

---

## Demonstrirane funkcionalnosti ili artefakti

U ovom sprintu demonstrirane su sljedeće funkcionalnosti i artefakti:

- AI Usage Log
- Decision Log
- Sprint Backlog
- kreiranje i pregled liga s vrstom sporta
- dodavanje i uklanjanje timova iz lige uz validaciju sporta
- zakazivanje utakmica s odabirom lokacije i termina
- automatska rezervacija termina pri zakazivanju ligaške utakmice
- prikaz ligaške veze termina u modulu termina
- unos i ispravka rezultata utakmica
- automatska tabela poretka s vizualnim rangiranjem
- pregled zajedničkog uvida rezervacija i liga na istom terminu

---

## Glavni problemi i blokeri

- Rezervacije i liga modul nisu bili međusobno povezani — termin rezervisan za ligašku utakmicu nije bio vidljiv niti blokiran u modulu termina za rezervacije. Problem je riješen uvođenjem `leagueMatchId` polja na `TimeSlotEntity` i logike automatske rezervacije u `ResultsService`.
- Zakazivanje utakmica nije imalo polja za lokaciju, teren i vrijeme — dodana su polja `location`, `resourceName`, `startTime`, `endTime` i `linkedSlotId` na `MatchEntity`.
- Sprint dokumentacija iz prethodnih iteracija nije pratila uspostavljeni format grupe — user storiji su bili u zasebnom fajlu, decision log nije imao decision matrix tabele. Sve je ispravljeno prema formatu koji koristi tim.
- Identifikovana je greška gdje se lista timova u ligi nije osvježavala pri prelasku između tabova — problem je riješen osvježavanjem `leagueTeams` stanja pri svakom prelasku.

---

## Ključne odluke donesene u sprintu

- **Eksplicitni join entitet za vezu Liga–Tim** — odabran `LeagueTeamEntity` umjesto `@ManyToMany` anotacije radi boljih mogućnosti validacije, queryja i proširivosti.
- **Undo+reapply za ispravku rezultata** — pri ponovnom unosu rezultata stara statistika se poništava i nova primjenjuje, uz `Math.max(0,...)` zaštitu od negativnih vrijednosti.
- **Single-page master-detail layout za ligu** — korišten tab pristup unutar jednog `LigaPage` umjesto zasebnih ruta, konzistentno s arhitekturom bez React Router-a.
- **Automatska rezervacija termina pri zakazivanju utakmice** — implementirana `find-or-create` logika koja pronalazi ili kreira timeslot i odmah ga rezerviše, osiguravajući konzistentnost između liga i termina modula.

---

## Povratna informacija Product Ownera

Product Owner je istakao da su sve planirane funkcionalnosti implementirane. Posebno je naglašen napredak u integraciji liga modula s modulom termina i rezervacija — sada postoji zajednički uvid koji eliminira moguće dvostruke rezervacije termina. Istaknuto je da tim treba nastaviti s ujednačenim formatom dokumentacije i konzistentnošću između modula.

---

## Zaključak za naredni sprint

S obzirom na uspješnu implementaciju liga modula i rješavanje neusklađenosti između rezervacija i liga, tim može u narednom sprintu fokus staviti na proširenje upotrebljivosti sistema: notifikacije, pretraživanje, profil korisnika i personalizirani dashboard prema ulozi.
