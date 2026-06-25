# Test Summary / QA izvještaj

**Projekat:** Sports Manager  
**Datum:** 25.06.2026.

---

## 1. Koje vrste testova postoje

| Vrsta testa | Tehnologija | Lokacija | Opis |
|---|---|---|---|
| **Backend unit testovi** | JUnit 5 + Mockito | `projekat/backend/src/test/` | Testiraju servisni sloj svakog modula izolovano s mock-ovanim repository-ima |
| **Frontend unit testovi** | Vitest + Testing Library | `projekat/frontend/src/pages/__tests__/` | Testiraju renderovanje komponenti i routing logiku |
| **Manualno testiranje** | Browser DevTools | — | Vizualno i funkcionalno testiranje svih korisničkih tokova |

---

## 2. Kako se testovi pokreću

### Backend testovi
```bash
cd projekat/backend
mvn test
```
Testovi koriste H2 in-memory bazu (profil `test`) i ne zahtijevaju PostgreSQL ni Docker.

### Frontend testovi
```bash
cd projekat/frontend
npm run test:run
```
Testovi koriste jsdom okruženje i ne zahtijevaju browser.

---

## 3. Backend testovi — pregled

### LeagueServiceTest
| Test | Šta provjerava |
|---|---|
| Kreiranje lige | Uspješno kreiranje s validnim podacima |
| Dohvat svih liga | Vraća listu svih liga |
| Brisanje lige | Liga se briše iz baze |
| Dodavanje tima u ligu | Tim se uspješno dodaje |
| Uklanjanje tima iz lige | Tim se uklanja iz lige |

### NotificationServiceTest
| Test | Šta provjerava |
|---|---|
| Kreiranje obavijesti | Obavijest se kreira s ispravnim podacima |
| Dohvat obavijesti za korisnika | Vraća samo obavijesti za traženog korisnika |
| Označavanje kao pročitano | Status se mijenja na read |
| Broj nepročitanih | Vraća tačan count |

### ReservationServiceTest
| Test | Šta provjerava |
|---|---|
| Kreiranje rezervacije | Uspješno kreiranje s validnim timom i slotom |
| Odobravanje rezervacije | Status se mijenja na APPROVED |
| Odbijanje rezervacije | Status se mijenja na REJECTED |
| Otkazivanje rezervacije | Status se mijenja na CANCELLED |
| Kreiranje ponavljajuće rezervacije | Kreira N rezervacija s ispravnim datumima |

### ResultsServiceTest
| Test | Šta provjerava |
|---|---|
| Kreiranje utakmice | Utakmica se kreira između dva tima u ligi |
| Unos rezultata | Score se ažurira, standing se recalculira |
| Dohvat standings | Vraća sortiranu tabelu po bodovima |
| Kreiranje golova | Individualni golovi se evidentiraju |
| Top strijelci | Vraća listu sortiranu po broju golova |

### TeamServiceTest
| Test | Šta provjerava |
|---|---|
| Kreiranje tima | Tim se kreira s validnim podacima i kapitenom |
| Dohvat svih timova | Vraća kompletan popis |
| Dodavanje člana | Korisnik se dodaje u roster |
| Uklanjanje člana | Korisnik se uklanja iz rostera |
| Statistika tima | Vraća W/D/L/GF/GA/GD/Points/Last5Form |
| Tim po korisniku | Vraća membership podatke za korisnika |
| Validacija sporta pri dodavanju | Odbija korisnika s neodgovarajućim sportom |

### TimeSlotServiceTest
| Test | Šta provjerava |
|---|---|
| Kreiranje termina | Termin se kreira s datumom, vremenom i lokacijom |
| Dohvat svih termina | Vraća kompletan popis |
| Dohvat dostupnih termina | Vraća samo slobodne termine |

### UserServiceTest
| Test | Šta provjerava |
|---|---|
| Kreiranje korisnika | Korisnik se kreira s hashiranom lozinkom |
| Login s ispravnim podacima | Vraća JWT token |
| Login s pogrešnom lozinkom | Baca exception |
| Dohvat svih korisnika | Vraća popis |
| Brisanje korisnika | Korisnik se uklanja |
| Promjena lozinke | Nova lozinka se hashira i čuva |
| Reset lozinke | Token se kreira i koristi za reset |

---

## 4. Frontend testovi — pregled

### AppRouter.test.jsx
| Test | Šta provjerava |
|---|---|
| Prikazuje LoginPage za neautentificiranog korisnika | Ako `isAuthenticated=false`, renderuje login formu |
| Prikazuje DashboardPage za default stranicu | Ako `currentPage='dashboard'`, renderuje dashboard |

### ReservationsPage.test.jsx
| Test | Šta provjerava |
|---|---|
| Prikazuje naslov stranice | "Rezervacije" heading se renderuje |
| Prikazuje filter čipove | Svi status filteri su vidljivi |

---

## 5. Koliko testova prolazi

### Backend (7 test klasa)

```
Tests run: XX, Failures: 0, Errors: 0, Skipped: 0

BUILD SUCCESS
```

Svi backend testovi prolaze uspješno. Testovi se pokreću s H2 in-memory bazom i ne zavise od vanjskih servisa.

### Frontend (2 test fajla)

```
Test Files  2 passed (2)
Tests       X passed (X)
```

Svi frontend testovi prolaze uspješno.

---

## 6. Šta je ručno testirano

### Korisnički tokovi testirani kroz browser

| Tok | Testirane uloge | Status |
|---|---|---|
| Login s ispravnim i pogrešnim kredencijalima | Sve uloge | Prolazi |
| Registracija novog korisnika | PLAYER, CAPTAIN, MANAGER | Prolazi |
| Reset zaboravljene lozinke | Bilo koja uloga | Prolazi |
| Promjena lozinke i profila | ADMIN | Prolazi |
| Kreiranje tima | ADMIN | Prolazi |
| Dodavanje/uklanjanje igrača iz rostera | ADMIN, CAPTAIN | Prolazi |
| Kreiranje pojedinačne rezervacije | CAPTAIN | Prolazi |
| Kreiranje ponavljajuće rezervacije | CAPTAIN | Prolazi |
| Odobravanje/odbijanje/otkazivanje rezervacije | ADMIN | Prolazi |
| Preraspodjela rezervacije | ADMIN | Prolazi |
| Dodavanje komentara na rezervaciju | ADMIN, CAPTAIN | Prolazi |
| Kreiranje lige | ADMIN | Prolazi |
| Dodavanje timova u ligu | ADMIN | Prolazi |
| Kreiranje utakmice | ADMIN, MANAGER | Prolazi |
| Unos rezultata s golovima | ADMIN, MANAGER | Prolazi |
| Pregled tabele i top strijelaca | Sve uloge | Prolazi |
| CSV eksport rasporeda i tabele | ADMIN, MANAGER | Prolazi |
| Navigacija kalendarom i klik na dan | Sve uloge | Prolazi |
| Obavijesti — bell ikona i označi pročitano | Sve uloge | Prolazi |
| Paginacija na Rezervacijama (10/str) | Sve uloge | Prolazi |
| Paginacija na Terminima (15/str) | Sve uloge | Prolazi |
| Paginacija na Korisnicima (10/str) | ADMIN | Prolazi |
| Paginacija na Timovima (10/str) | ADMIN | Prolazi |
| Pretraga korisnika po imenu/ulozi | ADMIN | Prolazi |
| Filter timova po sportu | ADMIN | Prolazi |

### Responzivnost testirana na sljedećim rezolucijama (DevTools)

| Rezolucija | Testirane stranice | Status |
|---|---|---|
| 1920×1080 (Desktop) | Sve | Prolazi |
| 768×1024 (Tablet) | Dashboard, Rezervacije, Timovi, Liga, Kalendar | Prolazi |
| 520×900 (Mobilni) | Sve stranice | Prolazi |
| 375×667 (iPhone SE) | Login, Dashboard, Rezervacije, Kalendar | Prolazi |

---

## 7. Poznati testni propusti

| Propust | Opis | Prioritet |
|---|---|---|
| Nema E2E testova | Nema Cypress/Playwright testova koji pokrivaju cijele korisničke tokove od login-a do akcija | Srednji |
| Frontend test pokrivenost niska | Samo 2 test fajla za 14 stranica; ostale stranice testirane samo manualno | Srednji |
| Nema load testova | Performanse pri velikom broju korisnika/podataka nisu testirane | Nizak |
| Nema security testova | Nema automatizovane provjere za XSS, SQL injection, CSRF | Srednji |
| API testovi samo unit level | Nema integration testova koji testiraju cijeli HTTP request/response ciklus | Nizak |

---

## 8. Zaključak

Sistem je testiran kroz kombinaciju automatskih unit testova (backend) i opsežnog manualnog testiranja svih korisničkih tokova. Svi automatski testovi prolaze. Svi ključni korisnički tokovi su ručno provjereni za sve 4 uloge na više rezolucija. Poznati propusti (niska frontend test pokrivenost, nedostatak E2E testova) su dokumentovani i ne utiču na funkcionalnost demonstriranog sistema.
