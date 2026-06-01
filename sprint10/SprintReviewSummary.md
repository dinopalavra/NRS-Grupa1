# Sprint Review Summary
## Sprint 10

**Datum:** 31.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Planirani sprint cilj

Zaokružiti korisnički doživljaj platforme implementacijom preostalih funkcionalnosti: sport pri registraciji, reset lozinke, kalendar, CSV eksport, ponavljajuće rezervacije, autocomplete igrača, individualna statistika igrača i komentari na rezervacijama.

---

## Šta je završeno

- implementacija sport dropdowna pri self-registraciji za ne-admin uloge (US10-1)
- implementacija toka za reset zaboravljene lozinke putem tokena (US10-2)
- implementacija kalendarskog prikaza utakmica i rezervacija po danima (US10-3)
- implementacija CSV eksporta rasporeda i tabele poretka iz Liga modula (US10-4)
- implementacija ponavljajućih rezervacija s odabirom intervala i broja ponavljanja (US10-5)
- implementacija autocomplete pretrage pri dodavanju igrača u roster tima (US10-6)
- implementacija pregleda individualne statistike igrača po ligi (US10-7)
- implementacija komentara na rezervacijama — komunikacija unutar sistema (US10-8)
- ispravka teksta koji je koristio "fudbalski" umjesto sportski-agnostičnog naziva

---

## Šta nije završeno

Sve stavke Sprinta 10 su završene.

---

## Demonstrirane funkcionalnosti i artefakti

- AI Usage Log
- Decision Log
- Sprint Backlog
- Sport dropdown pri registraciji novog korisnika
- Tok "Zaboravili ste lozinku?" s generisanjem i resetom tokena
- Kalendarski prikaz s navigacijom po mjesecima i listom događaja po danu
- CSV eksport rasporeda i tabele poretka
- Kreiranje ponavljajuće rezervacije (tjedni/dvotjedni interval)
- Autocomplete pretraga igrača pri dodavanju u roster
- Top-scorers / statistika igrača po ligi
- Sekcija komentara na rezervacijama

---

## Glavni problemi i blokeri

- Reset lozinke vraća token direktno u HTTP response umjesto na email (MVP ograničenje bez SMTP servisa). Dokumentovano kao tehnički dug.
- PDF eksport odložen — zahtijeva iText/PDFBox biblioteku. CSV je dovoljan za akademske potrebe.
- Ponavljajuće rezervacije ne podržavaju automatsko otkazivanje cijele serije — svaka se mora otkazati zasebno.

---

## Ključne odluke

- Token za reset lozinke vraća se u response (MVP bez SMTP) — DL10-001
- Kalendar bez vanjske biblioteke (custom CSS Grid) — DL10-002
- CSV umjesto PDF eksport — DL10-003
- Autocomplete filtrira samo korisnike čiji sport odgovara sportu tima — konzistentno s cross-modul filtrom iz Sprinta 8
- Komentari implementirani kao zasebna tabela (`reservation_comments`) radi čistog modela i lakšeg proširenja

---

## Povratna informacija Product Ownera

Sprint 10 zatvorio je sve ključne funkcionalne rupe. Sistem sada pokriva puni životni ciklus sportske organizacije: registracija → timovi → termini → rezervacije → komunikacija → liga → kalendar → eksport. Naglašeno je da je komunikacijska komponenta (komentari) bila jedina koja do ovog sprinta nije bila zastupljena, a sada je implementirana.

---

## Zaključak za naredni sprint

Sprint 11 je fokusiran na stabilizaciju sistema, kvalitet i zatvaranje preostalih tehničkih dugova. Prioriteti: pokrivanje unit testovima novih modula (komentari, recurring, autocomplete), verifikacija svih uloga u end-to-end scenariju, i priprema za završnu demonstraciju.
