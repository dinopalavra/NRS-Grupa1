# Sprint Goal — Sprint 7

**Sprint broj:** 7
**Datum:** 12.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

## Sprint cilj

Implementirati kompletan modul za upravljanje ligama — kreiranje liga, upravljanje timovima unutar liga, zakazivanje utakmica, unos rezultata i automatsko ažuriranje tabele.

## Ključne stavke

- US7-1: Kreiranje nove lige
- US7-2: Pregled liste liga
- US7-3: Dodavanje timova u ligu
- US7-4: Uklanjanje tima iz lige
- US7-5: Pregled timova u ligi
- US7-6: Zakazivanje utakmica
- US7-7: Pregled utakmica po ligi
- US7-8: Unos i ispravka rezultata utakmica
- US7-9: Automatsko ažuriranje tabele
- US7-10: Pregled tabele lige

## Rizici i zavisnosti

- Backend zavisi od ispravno konfigurisane baze (DDL auto=update kreira tabele `league_teams` i `matches`)
- Tim mora imati kreiran barem 2 tima u sistemu kako bi mogao testirati utakmice
- Bodovanje pretpostavlja standardni fudbalski sistem: 3 boda za pobjedu, 1 za remi, 0 za poraz
