# Sprint Backlog - Sprint 5

## Sprint cilj

Uspostaviti prvi funkcionalni inkrement sistema kroz operativan backend, povezivanje sa PostgreSQL bazom, funkcionalne API endpoint-e za rad sa korisnicima i timovima, te osposobljen frontend za komunikaciju sa backendom.

## Sprint backlog

| ID | Naziv stavke | Tip | Odgovorna osoba | Status | Napomena |
|---|---|---|---|---|---|
| SB5-1 | Konfigurisati PostgreSQL i bazu `sports_manager` | Technical Task | Amel Divović | Završeno | Baza uspješno postavljena i dostupna za backend konekciju |
| SB5-2 | Podesiti `application.properties` za konekciju na bazu | Technical Task | Dino Palavra | Završeno | Backend uspješno koristi podešene konekcione parametre |
| SB5-3 | Kreirati osnovnu tabelu `users` | Technical Task | Miralem Pupalović | Završeno | Struktura tabele validirana kroz bazu podataka |
| SB5-4 | Dodati testne korisnike u bazu | Technical Task | Tarik Avdović | Završeno | Testni podaci uspješno uneseni i dostupni za provjeru |
| SB5-5 | Implementirati `GET /api/users` endpoint | Feature | Harun Hodžić | Završeno | Endpoint vraća listu korisnika iz baze |
| SB5-6 | Pokrenuti frontend skeleton lokalno | Technical Task | Harun Muhić | Završeno | Frontend se uspješno pokreće i prikazuje osnovni interfejs |
| SB5-7 | Povezati frontend sa backendom preko service sloja | Feature | Bakir Hadžialić | Završeno | Frontend ostvaruje komunikaciju sa backend servisima |
| SB5-8 | Riješiti CORS za frontend-backend komunikaciju | Technical Task | Ernad Prasko | Završeno | Omogućena nesmetana komunikacija između frontenda i backenda |
| SB5-9 | Validirati endpoint kroz browser, Postman ili Query Tool | Testing | Amel Divović | Završeno | Endpoint-i uspješno testirani i potvrđeni |
| SB5-10 | Kreirati početni Decision Log | Documentation | Miralem Pupalović | Završeno | Evidencija tehničkih odluka uspostavljena |
| SB5-11 | Kreirati početni AI Usage Log | Documentation | Harun Hodžić | Završeno | Evidencija korištenja AI alata dokumentovana |

## Kratak pregled realizacije

- Završene stavke: 11
- Djelimično završene stavke: 0
- Nezavršene stavke: 0

## Komentar

Sprint backlog u Sprintu 5 bio je usmjeren na tehničko osposobljavanje prvog funkcionalnog inkrementa sistema. U okviru sprinta uspješno su realizovani backend setup, konekcija sa bazom podataka, osnovni API endpoint-i, početno povezivanje frontenda i backenda, kao i rješavanje CORS komunikacije. Na kraju sprinta uspostavljena je stabilna osnova za dalji razvoj funkcionalnosti u narednim sprintovima.