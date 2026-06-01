# Izvještaj testiranja
## Sprint 10

**Datum:** 31.05.2026.
**Projekat:** Sports Manager System

## Uvod

Ovaj izvještaj prikazuje rezultate testiranja funkcionalnosti implementiranih u okviru Sprinta 10: sport pri registraciji, reset zaboravljene lozinke, kalendarski prikaz i CSV eksport.

## Obuhvat testiranja

- sport polje vidljivo i funkcionalno pri self-registraciji za ne-admin uloge
- tok zaboravljene lozinke (zahtjev → token → nova lozinka)
- prikaz kalendarskog pogleda s navigacijom i događajima
- preuzimanje CSV fajlova za raspored i tabelu

## Metodologija

### Automatsko testiranje

```
mvn test
mvn clean test
```

### Manuelno testiranje

Provedeno za sve nove funkcionalnosti Sprinta 10.

## Rezultati automatskih testova

| Test klasa | Broj testova | Opis | Rezultat |
|---|---|---|---|
| `ReservationServiceTest` | 15 | Kreiranje, conflict, reschedule, liga-zaštita | PASS |
| `TimeSlotServiceTest` | 5 | Upravljanje terminima | PASS |
| `LeagueServiceTest` | 13 | Kreiranje liga, timovi, brisanje | PASS |
| `ResultsServiceTest` | 11 | Utakmice, rezultati, bodovanje | PASS |
| `NotificationServiceTest` | 8 | Notifikacije za sve tipove događaja | PASS |
| `TeamServiceTest` | 6 | Tim, statistika, validacija | PASS |

### Sumirani rezultat automatskih testova

- Ukupno: **58**
- Prošlo: **58**
- Failures: **0**
- Errors: **0**
- Skipped: **0**

## Rezultati manuelnog testiranja

| Oznaka | Test scenario | Rezultat |
|---|---|---|
| MT-01 | Registracija PLAYER — sport dropdown vidljiv | PASS |
| MT-02 | Registracija CAPTAIN — sport dropdown vidljiv | PASS |
| MT-03 | Registracija ADMIN — sport dropdown NIJE vidljiv | PASS |
| MT-04 | Registracija bez sporta za ne-admin — greška | PASS |
| MT-05 | Uspješna registracija s odabranim sportom | PASS |
| MT-06 | Forgot password — unos nepostojećeg emaila — greška | PASS |
| MT-07 | Forgot password — unos ispravnog emaila — token vraćen | PASS |
| MT-08 | Reset lozinke s ispravnim tokenom i novom lozinkom | PASS |
| MT-09 | Reset lozinke s pogrešnim tokenom — greška | PASS |
| MT-10 | Reset lozinke s isteklim tokenom — greška | PASS |
| MT-11 | Prijava sa novom lozinkom nakon reseta | PASS |
| MT-12 | Kalendar — navigacija na prethodni mjesec | PASS |
| MT-13 | Kalendar — navigacija na sljedeći mjesec | PASS |
| MT-14 | Kalendar — "Danas" vraća na tekući mjesec | PASS |
| MT-15 | Kalendar — danas datum vizualno istaknut | PASS |
| MT-16 | Kalendar — utakmice prikazane zlatnom oznakom | PASS |
| MT-17 | Kalendar — rezervacije prikazane zelenom oznakom | PASS |
| MT-18 | Kalendar — klik na dan otvara listu događaja | PASS |
| MT-19 | Kalendar — klik na dan bez događaja prikazuje poruku | PASS |
| MT-20 | CSV preuzimanje rasporeda iz LigaPage | PASS |
| MT-21 | CSV preuzimanje tabele iz LigaPage | PASS |
| MT-22 | CSV raspored otvara se ispravno u Excel/Sheets | PASS |
| MT-23 | Regression — prijava i odjava | PASS |
| MT-24 | Regression — kreiranje rezervacije | PASS |
| MT-25 | Regression — kreiranje liga i utakmice | PASS |

### Sumirani rezultat manuelnog testiranja

- Ukupno provjera: **25**
- Prošlo: **25**
- Nije prošlo: **0**
- Blokirano: **0**

## Evidentirani problemi

Nema kritičnih bugova. Napomena: reset token je vidljiv u HTTP response-u što nije produkcijski prihvatljivo — označeno kao tehički dug (DL10-001).

## Zaključak

Sprint 10 je uspješno zatvorio posljednje funkcionalne rupe u sistemu. Svi automatski i manuelni testovi prolaze.
