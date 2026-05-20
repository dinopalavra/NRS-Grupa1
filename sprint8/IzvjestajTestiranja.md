# Izvještaj testiranja
## Sprint 8

**Datum:** 18.05.2026.
**Projekat:** Sports Manager System
**Tip aplikacije:** Web aplikacija za upravljanje sportskim terminima i ligama

## Uvod

Ovaj izvještaj prikazuje rezultate testiranja funkcionalnosti implementiranih u okviru Sprinta 8. Cilj testiranja bio je potvrditi ispravnost notifikacijskog sistema, mehanizma preraspoređivanja rezervacija, statistike timova, upravljanja profilom, pretrage i responzivnog prikaza.

## Obuhvat testiranja

- preraspoređivanje rezervacija i blokada za liga-vezane termine
- notifikacijski sistem (sve vrste notifikacija, unread badge, mark-as-read)
- statistika timova po ligi
- uređivanje profila i promjena lozinke
- pretraga i filtriranje (timovi, termini, lige)
- responzivni layout na mobilnim uređajima
- personalizirani dashboard po ulozi

## Metodologija testiranja

### 1. Automatsko testiranje

Izvršeni su postojeći automatski testovi kako bi se potvrdilo da nove funkcionalnosti nisu narušile prethodno implementiranu logiku.

Izvršene komande:
1. `mvn test`
2. `mvn clean test`

### 2. Manuelno testiranje

Manuelno testiranje provedeno za sve nove funkcionalnosti Sprinta 8.

## Rezultati automatskih testova

| Test klasa | Broj testova | Opis | Rezultat |
|---|---|---|---|
| `ReservationServiceTest` | 15 | Kreiranje, conflict, reschedule, odobravanje, liga-zaštita | PASS |
| `TimeSlotServiceTest` | 5 | Upravljanje terminima, validacija stanja | PASS |
| `LeagueServiceTest` | 13 | Kreiranje liga, timovi, validacija sporta, kaskadno brisanje | PASS |
| `ResultsServiceTest` | 11 | Utakmice, odabir slota, rezultati, undo+reapply, bodovanje | PASS |
| `NotificationServiceTest` | 8 | Kreiranje i isporuka notifikacija za sve tipove događaja | PASS |
| `TeamServiceTest` | 6 | Kreiranje tima, statistika po ligi, validacija sporta | PASS |

### Sumirani rezultat automatskih testova

- Ukupno izvršenih testova: **58**
- Uspješno prošlih: **58**
- Failures: **0**
- Errors: **0**
- Skipped: **0**

## Rezultati manuelnog testiranja

### Sprint 8 — novi scenariji

| Oznaka | Test scenario | Rezultat |
|---|---|---|
| MT-01 | Preraspoređivanje rezervacije na slobodan termin | PASS |
| MT-02 | Pokušaj preraspoređivanja liga-vezane rezervacije | PASS — sistem blokira s porukom |
| MT-03 | Pokušaj otkazivanja liga-vezane rezervacije | PASS — sistema blokira s porukom |
| MT-04 | Notifikacija pri kreiranju rezervacije | PASS |
| MT-05 | Notifikacija pri odobravanju rezervacije | PASS |
| MT-06 | Notifikacija pri odbijanju rezervacije | PASS |
| MT-07 | Notifikacija pri otkazivanju rezervacije | PASS |
| MT-08 | Notifikacija pri zakazivanju utakmice | PASS |
| MT-09 | Notifikacija pri unosu rezultata | PASS |
| MT-10 | Unread badge se prikazuje ispravno | PASS |
| MT-11 | Mark-as-read za pojedinu notifikaciju | PASS |
| MT-12 | Mark-all-read za sve notifikacije | PASS |
| MT-13 | Pregled statistike tima u odabranoj ligi | PASS |
| MT-14 | Statistika pokazuje ispravne W/D/L i golove | PASS |
| MT-15 | Uređivanje profila (ime i email) | PASS |
| MT-16 | Promjena lozinke s validacijom stare lozinke | PASS |
| MT-17 | Neispravna stara lozinka pri promjeni | PASS — server vraća grešku |
| MT-18 | Pretraga timova po nazivu | PASS |
| MT-19 | Filtriranje timova po sportu | PASS |
| MT-20 | Pretraga termina po lokaciji | PASS |
| MT-21 | Filtriranje termina po datumu | PASS |
| MT-22 | Pretraga liga po nazivu | PASS |
| MT-23 | Filtriranje liga po sportu i statusu | PASS |
| MT-24 | Admin dashboard prikazuje rezervacije na čekanju | PASS |
| MT-25 | Kapiten dashboard prikazuje vlastite rezervacije | PASS |
| MT-26 | Igrač dashboard prikazuje nadolazeće utakmice | PASS |
| MT-27 | Mobilni prikaz — hamburger menu otvara navigaciju | PASS |
| MT-28 | Mobilni prikaz — tablice prilagođene malom ekranu | PASS |
| MT-29 | Brisanje lige s potvrdom i kaskadnim brisanjem utakmica/standings | PASS |
| MT-30 | Provjera oslobađanja termina nakon brisanja lige | PASS |
| MT-31 | Zakazivanje utakmice odabirom slobodnog termina iz dropdowna | PASS |
| MT-32 | Dropdown termina filtrira po sportu lige | PASS |
| MT-33 | Kreiranje termina s obaveznim sportom | PASS |
| MT-34 | Kreiranje termina bez sporta — server vraća grešku | PASS |
| MT-35 | Dropdown termina u rezervacijama filtrira po odabranom sportu | PASS |
| MT-36 | Padajuće liste (sport, status) prikazuju tamnu temu | PASS |

### Regression testovi — prethodni moduli

| Oznaka | Test scenario | Rezultat |
|---|---|---|
| MT-29 | Prijava korisnika i logout | PASS |
| MT-30 | Kreiranje i pregled korisnika (ADMIN) | PASS |
| MT-31 | Kreiranje tima sa sportom | PASS |
| MT-32 | Kreiranje termina i rezervacija | PASS |
| MT-33 | Odobravanje/odbijanje rezervacija | PASS |
| MT-34 | Kreiranje lige i dodavanje timova | PASS |
| MT-35 | Zakazivanje utakmice s auto-rezervacijom termina | PASS |
| MT-36 | Unos i ispravka rezultata, tabela | PASS |

### Sumirani rezultat manuelnog testiranja

- Ukupno manuelnih provjera: **44**
- Uspješno prošlih: **44**
- Nije prošlo: **0**
- Blokirano: **0**

## Evidentirani problemi i korekcije

Tokom razvoja identificirano je da polling svakih 30s može stvoriti lažni dojam "real-time" sistema. Problem je riješen time da se notifikacije osvježavaju odmah nakon svake korisničke akcije (rezervacija, odobravanje, itd.) neovisno o polling intervalu, a polling služi samo kao fallback mehanizam.

## Artefakti testiranja

- `pom.xml`, Maven test output
- `ReservationServiceTest.java`, `TimeSlotServiceTest.java`, `LeagueServiceTest.java`, `ResultsServiceTest.java`
- Novi backend: `NotificationEntity.java`, `NotificationService.java`, `NotificationController.java`
- Novi frontend: `NotificationBell.jsx`, `ProfilePage.jsx`
- Novi test fajlovi: `NotificationServiceTest.java`, `TeamServiceTest.java`
- Ažurirani test fajlovi: `LeagueServiceTest.java` (deleteLeague), `ResultsServiceTest.java` (slotId), `ReservationServiceTest.java` (reschedule)
- Frontend build output: ✓ 0 grešaka

## Zaključak

Sprint 8 testiranje potvrđuje da su sve planirane funkcionalnosti implementirane i funkcionalne. Sistem je sada kompletan s notifikacijama, pretragom, profilom, personaliziranim dashboardom, kaskadnim brisanjem liga i cross-modul filtriranjem po sportu. Svih 58 automatskih testova prolaze, a 44 manuelna scenarija su validirana bez greške.
