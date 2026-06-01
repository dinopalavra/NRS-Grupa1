# Sprint Backlog
## Sprint 10

**Datum:** 31.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Sprint cilj

Zaokružiti korisnički doživljaj platforme uvođenjem preostalih funkcionalnosti koje sistem podižu na nivo gotovog produkta: sport pri self-registraciji korisnika, reset zaboravljene lozinke, vizualni kalendarski prikaz svih događaja i eksport podataka iz liga u CSV format.

---

## Ključne stavke koje tim želi završiti

- Sport obavezan pri self-registraciji (za ne-admin uloge)
- Reset zaboravljene lozinke putem tokena
- Kalendarski prikaz utakmica i rezervacija po mjesecu
- Eksport rasporeda utakmica i tabele poretka u CSV format
- Ispravke teksta koji još koristi "fudbalski" umjesto sportski-agnostičnog naziva

---

## Rizici i zavisnosti

- Reset lozinke u MVP-u vraća token direktno u response (bez email servisa); u produkciji potreban SMTP
- Kalendar prikazuje sve događaje kojima korisnik ima pristup; za igrače prikazuje utakmice i rezervacije svog tima
- CSV eksport zahtijeva da liga ima barem jednu utakmicu/tim u standings-u

---

## Sprint backlog

| ID | Naziv stavke (User Story) | Odgovorna osoba | Status | Napomena |
|---|---|---|---|---|
| US10-1 | Kao novi korisnik koji se registruje, želim odabrati sport pri registraciji, kako bi sistem od početka znao za koji sport se registrujem. | Bakir Hadžialić | Završeno | Dropdown za sport vidljiv samo za ne-admin uloge; `sport` se prosljeđuje backend-u koji ga već podržava |
| US10-2 | Kao korisnik koji je zaboravio lozinku, želim zatražiti reset putem email adrese i unijeti dobiveni token, kako bih ponovo pristupio svom nalogu bez intervencije admina. | Harun Hodžić | Završeno | Backend: `POST /api/auth/forgot-password` i `POST /api/auth/reset-password`; token se vraća u response (MVP bez email servisa); frontend: "Zaboravili ste lozinku?" link + forma |
| US10-3 | Kao korisnik, želim pregledati kalendar s prikazom svih utakmica i rezervacija po danima u mjesecu, kako bih jednim pogledom vidio gustoću dana i izbjegao konflikte. | Dino Palavra | Završeno | Nova CalendarPage s mrežom 7 kolona; navigacija po mjesecima; zlatne oznake za utakmice, zelene za rezervacije; klik na dan otvara listu događaja |
| US10-4 | Kao organizator, želim eksportovati raspored utakmica i tabelu poretka u CSV format, kako bih ih mogao podijeliti ili odštampati van sistema. | Ernad Prasko | Završeno | Backend: `GET /api/results/leagues/{id}/schedule.csv` i `GET /api/results/leagues/{id}/standings.csv`; dugmad u tabeli poretka u Liga modulu |

---

## Pregled realizacije

- Ukupno user storyja: 4
- Završeno: 4
- Djelimično završeno: 0
- Nezavršeno: 0

## Komentar

Sprint 10 zatvarao je posljednje funkcionalne rupe u sistemu i poliran je korisnički tok od registracije do eksporta podataka. Sve četiri stavke su implementirane. Sistem je sada potpuno funkcionalan za sva planirana akademska scenarija korištenja.
