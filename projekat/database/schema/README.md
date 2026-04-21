# Database

## Opis

Ovaj folder sadrži početne SQL skripte za bazu podataka sistema za upravljanje sportskim terminima i ligama.

Namjena database dijela projekta je da obezbijedi:
- početnu strukturu baze podataka
- relacije između glavnih entiteta sistema
- inicijalne testne podatke za razvoj i demonstraciju

## Organizacija foldera

- `schema/` — SQL skripte za kreiranje strukture baze
- `seeds/` — SQL skripte za unos početnih podataka

## Glavne tabele sistema

Planirane glavne tabele su:
- `users`
- `teams`
- `team_members`
- `time_slots`
- `reservations`
- `leagues`
- `league_teams`
- `matches`
- `results`
- `standings`

## Fajlovi

- `schema/init.sql` — početna SQL skripta za kreiranje tabela i relacija
- `seeds/seed.sql` — početni testni podaci

## Napomena

Ove skripte predstavljaju početnu osnovu baze podataka i mogu se dalje proširivati u skladu sa razvojem backend logike i poslovnih pravila sistema.