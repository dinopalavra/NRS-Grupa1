# Sprint Backlog
## Sprint 10

**Datum:** 31.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Sprint cilj

Zaokružiti korisnički doživljaj platforme implementacijom preostalih funkcionalnosti: sport pri self-registraciji, reset zaboravljene lozinke, vizualni kalendar, CSV eksport, ponavljajuće rezervacije, autocomplete pri dodavanju igrača, pregled individualne statistike igrača i komunikacija putem komentara na rezervacijama.

---

## Ključne stavke koje tim želi završiti

- Sport obavezan pri self-registraciji za ne-admin uloge
- Reset zaboravljene lozinke putem tokena
- Kalendarski prikaz utakmica i rezervacija po mjesecu
- Eksport rasporeda i tabele u CSV format
- Ponavljajuće rezervacije (tjedni/dvotjedni interval, N ponavljanja)
- Autocomplete/pretraga korisnika pri dodavanju igrača u roster tima
- Pregled individualne statistike igrača (golovi po ligi, nastup)
- Komentari na rezervacijama — komunikacija organizatora i tima

---

## Rizici i zavisnosti

- Reset lozinke u MVP-u vraća token direktno u response (bez email servisa)
- Ponavljajuće rezervacije kreiraju zasebne rezervacije za svaki datum — potrebno paziti na konflikt termina
- Autocomplete pretražuje korisnike koji još nisu u timu i čiji sport odgovara timu
- CSV eksport zahtijeva da liga ima barem jednu utakmicu/tim

---

## Sprint backlog

| ID | Naziv stavke (User Story) | Odgovorna osoba | Status | Napomena |
|---|---|---|---|---|
| US10-1 | Kao novi korisnik koji se registruje, želim odabrati sport pri registraciji, kako bi sistem od početka znao za koji sport se registrujem. | Bakir Hadžialić | Završeno | Dropdown za sport vidljiv samo za ne-admin uloge; `sport` se prosljeđuje backend-u |
| US10-2 | Kao korisnik koji je zaboravio lozinku, želim zatražiti reset putem email adrese i unijeti token za postavljanje nove lozinke, kako bih ponovo pristupio nalogu bez intervencije admina. | Harun Hodžić | Završeno | Backend: `POST /api/auth/forgot-password` i `/reset-password`; token u response (MVP); frontend 3-modalna forma |
| US10-3 | Kao korisnik, želim pregledati kalendar s prikazom svih utakmica i rezervacija u odabranom mjesecu, kako bih jednim pogledom vidio raspoređenost događaja i izbjegao konflikte. | Dino Palavra | Završeno | Nova CalendarPage; 7-kolona mreža; zlatne oznake za utakmice, zelene za rezervacije; klik na dan prikazuje listu događaja |
| US10-4 | Kao organizator, želim eksportovati raspored utakmica i tabelu poretka u CSV format, kako bih ih mogao podijeliti ili odštampati van sistema. | Ernad Prasko | Završeno | `GET /api/results/leagues/{id}/schedule.csv` i `/standings.csv`; dugmad u StandingsTab |
| US10-5 | Kao kapiten ili administrator, želim kreirati ponavljajuću rezervaciju koja se automatski ponavlja sedmično ili dvosedmično zadani broj puta, kako bih izbjegao ručno kreiranje iste rezervacije svake sedmice. | Miralem Pupalović | Završeno | Backend kreira N rezervacija u jednom zahtjevu; provjera konflikta za svaki datum; frontend forma s poljem za interval i broj ponavljanja |
| US10-6 | Kao kapiten ili administrator, želim pretraživati korisnike pri dodavanju igrača u roster tima, kako bih brzo pronašao igrača po imenu ili korisničkom imenu bez skrolanja kroz cijelu listu. | Tarik Avdović | Završeno | Tekstualno polje za filtriranje dostupnih korisnika u Roster modalu; filtrira po imenu/username-u i sportu tima |
| US10-7 | Kao korisnik, želim pregledati individualnu statistiku igrača po ligi (broj golova, nastup), kako bih pratio učinak pojedinih igrača kroz sezonu. | Harun Muhić | Završeno | Backend `GET /api/leagues/{id}/top-scorers`; frontend novi tab "Strijelci" ili sekcija u ligi s prikazom igrač → golovi |
| US10-8 | Kao korisnik koji je uključen u rezervaciju, želim ostaviti komentar ili napomenu na rezervaciji, a kapiten i admin mogu vidjeti sve komentare, kako bi komunikacija o rezervaciji bila unutar sistema. | Amel Divović | Završeno | Backend: komentari kao lista uz rezervaciju (`reservation_comments` tabela); `POST /api/reservations/{id}/comments`; `GET /api/reservations/{id}/comments`; frontend: sekcija s komentarima u detaljima rezervacije |

---

## Pregled realizacije

- Ukupno user storyja: 8
- Završeno: 8
- Djelimično završeno: 0
- Nezavršeno: 0

## Komentar

Sprint 10 je zatvorio sve preostale funkcionalne rupe u sistemu. Uz 4 storije s prioritetne liste (kalendar, forgot password, CSV eksport, sport pri registraciji), implementirane su i ponavljajuće rezervacije koje eliminišu ručno kreiranje tjednih termina, autocomplete koji ubrzava rad kapitena pri dodavanju igrača, individualna statistika igrača i sistem komentara koji upotpunjava komunikacijsku komponentu — jedinu koja je do ovog sprinta bila potpuno nedostajuća.
