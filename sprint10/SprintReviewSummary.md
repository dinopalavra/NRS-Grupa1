# Sprint Review Summary
## Sprint 10

**Sprint broj:** 10
**Datum:** 31.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Planirani sprint goal

Zaokružiti korisnički doživljaj platforme implementacijom preostalih funkcionalnosti: sport pri self-registraciji, reset zaboravljene lozinke, vizualni kalendar, CSV eksport, ponavljajuće rezervacije, autocomplete pri dodavanju igrača, pregled individualne statistike igrača i komunikacija putem komentara na rezervacijama.

---

## Šta je završeno

Planirane aktivnosti koje su završene u ovom sprintu su:

- implementacija obaveznog sporta pri self-registraciji za ne-admin uloge (US10-1)
- implementacija reseta zaboravljene lozinke putem tokena — forgot/reset forma na Login stranici i backend endpointi (US10-2)
- implementacija kalendarskog prikaza utakmica i rezervacija po mjesecu s navigacijom (US10-3)
- implementacija eksporta rasporeda i tabele u CSV format (US10-4)
- implementacija ponavljajućih rezervacija sa tjednim i dvotjednim intervalom (US10-5)
- implementacija autocomplete pretrage korisnika pri dodavanju igrača u roster tima (US10-6)
- implementacija pregleda individualne statistike igrača po ligi — tab Strijelci (US10-7)
- implementacija komentara na rezervacijama sa asinhronim učitavanjem (US10-8)

---

## Šta nije završeno

Sve stavke koje su planirane u okviru Sprinta 10 su završene.

---

## Demonstrirane funkcionalnosti ili artefakti

U ovom sprintu demonstrirane su sljedeće funkcionalnosti i artefakti:

- AI Usage Log
- Decision Log
- Sprint Backlog
- Izvještaj testiranja
- sport dropdown vidljiv samo za ne-admin uloge pri registraciji, ADMIN ne vidi sport
- tok zaboravljene lozinke: unos emaila → token u response → unos tokena → nova lozinka
- kalendarski prikaz s 7-kolonskom mrežom, zlatne oznake za utakmice, zelene za rezervacije
- klik na dan u kalendaru prikazuje listu svih događaja s detaljima
- dugme za preuzimanje CSV rasporeda i CSV tabele u LigaPage StandingsTab
- forma za ponavljajuću rezervaciju s odabirom intervala (sedmica/dvije sedmice) i broja ponavljanja
- tekstualno filtriranje korisnika pri dodavanju igrača u roster — filtrira po imenu, usernameu i sportu
- tab Strijelci u ligi s prikazom igrač → tim → broj golova, poredano po golovima
- sekcija komentara ispod svake rezervacije s asinhronim učitavanjem i slanjem novog komentara

---

## Glavni problemi i blokeri

- Reset lozinke vraća token direktno u HTTP response — produkcijski bi zahtijevao SMTP email servis, dokumentovano kao tehnički dug (DL10-001).
- CSV fajlovi ne sadrže UTF-8 BOM koji zahtijeva stariji Microsoft Excel — dokumentovano.
- Kalendar nema tjedni ni dnevni prikaz, samo mjesečni — ograničenje za korisnike koji žele detaljan pregled dana.
- Ponavljajuće rezervacije kreiraju zasebne unose za svaki datum — pri velikom broju ponavljanja može nastati puno podataka u bazi.

---

## Ključne odluke donesene u sprintu

- **Token za reset lozinke direktno u HTTP response (MVP)** — umjesto SMTP email servisa, radi akademske demonstrabilnosti (DL10-001).
- **Custom kalendar bez vanjske biblioteke** — CSS Grid implementacija radi vizualne konzistentnosti s luxury dark temom (DL10-002).
- **CSV umjesto PDF eksporta** — trivijalna implementacija bez vanjske biblioteke, PDF odložen za budući razvoj (DL10-003).

---

## Povratna informacija Product Ownera

Product Owner je zadovoljan zaokruživanjem sistema — sve kritične funkcionalne praznine su popunjene. Posebno je istaknut kalendar kao vizualno najimpresivnija novost, te sustav komentara koji je jedini modul komunikacije unutar platforme. Naglašeno je da sistem u ovom stanju može biti demonstriran kao potpun akademski projekt. Za budući razvoj preporučuje se produkcijska implementacija reseta lozinke putem emaila i mogućnost PDF eksporta za printanje.

---

## Zaključak za naredni sprint

Sistem je funkcionalno kompletan. Naredni sprint (Sprint 11) fokusira se isključivo na polish i UX poboljšanja: paginacija dugačkih lista, popravka dizajna UI elemenata i unapređenje responzivnog prikaza na mobilnim uređajima.
