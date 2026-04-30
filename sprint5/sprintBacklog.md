# Sprint Backlog - Sprint 5

## Sprint cilj

Uspostaviti prvi funkcionalni inkrement sistema kroz operativan backend, povezivanje sa lokalnom PostgreSQL bazom, radni testni users API endpoint i pripremu frontenda za komunikaciju sa backendom.

## Sprint backlog

| ID | Naziv stavke | Tip | Odgovorna osoba | Status | Napomena |
|---|---|---|---|---|---|
| SB5-1 | Konfigurisati lokalni PostgreSQL i bazu `sportsmanager` | Technical Task | [Tarik Avdovic] | Završeno | Baza dostupna lokalno |
| SB5-2 | Podesiti `application.properties` za konekciju na bazu | Technical Task | [Amel Divovic] | Završeno | Backend koristi lokalni PostgreSQL |
| SB5-3 | Kreirati osnovnu tabelu `users` | Technical Task | [Dino Palavra] | Završeno | Tabela validirana kroz SQL |
| SB5-4 | Dodati testne korisnike u bazu | Technical Task | [Harun Muhic] | Završeno | Ručni insert test podataka |
| SB5-5 | Implementirati `GET /api/users` endpoint | Feature | [Miralem Pupalovic] | Završeno | Endpoint vraća testne korisnike |
| SB5-6 | Pokrenuti frontend skeleton lokalno | Technical Task | [Harun Hodzic] | Završeno | Frontend se prikazuje |
| SB5-7 | Povezati frontend sa backendom preko service sloja | Feature | [Harun Muhic] | Nije završeno | Nema aktivnog fetch/axios poziva |
| SB5-8 | Riješiti CORS za frontend-backend komunikaciju | Technical Task | [Tarik Avdovic] | Nije završeno | Potrebna backend dozvola za origin |
| SB5-9 | Validirati endpoint kroz browser/Postman/Query Tool | Testing | [Amel Divovic] | Završeno | Endpoint provjeren |
| SB5-10 | Kreirati početni Decision Log | Documentation | [Dino Palavra] | Završeno | Evidencija odluka uspostavljena |
| SB5-11 | Kreirati početni AI Usage Log | Documentation | [Harun Hodzic] | Završeno | Evidencija AI upotrebe uspostavljena |
| SB5-12 | Evidentirati osnovne rezultate testiranja | Testing | [Miralem Pupalovic] | Završeno | Ručna validacija dokumentovana |

## Kratak pregled realizacije

- Završene stavke: 11
- Djelimično završene stavke: 0
- Nezavršene stavke: 2

## Komentar

Sprint backlog je bio usmjeren na tehničko osposobljavanje prvog inkrementa. Nezavršene stavke prenose se u naredni sprint sa fokusom na stvarno povezivanje frontenda i backenda.
