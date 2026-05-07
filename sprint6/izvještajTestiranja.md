# Izvještaj testiranja
## Sprint 6

**Datum:** 07/05/2026  
**Projekt:** Sports Manager System  
**Tip aplikacije:** Web aplikacija za upravljanje korisnicima, timovima, terminima i rezervacijama

## Uvod

Ovaj izvještaj prikazuje rezultate testiranja funkcionalnosti implementiranih u okviru projekta **Sports Manager System**. Cilj testiranja bio je potvrditi ispravnost poslovne logike, stabilnost ključnih modula i spremnost aplikacije za predaju.

Validacija sistema izvršena je kombinacijom automatskih i manuelnih testova. Poseban fokus stavljen je na modules za autentifikaciju, upravljanje korisnicima i timovima, kao i na tokove kreiranja i obrade rezervacija.

## Obuhvat testiranja

Testiranje je obuhvatilo sljedeće cjeline:

- autentifikaciju korisnika i osnovni login tok
- pregled i upravljanje korisnicima
- pregled i upravljanje timovima
- kreiranje rezervacija
- pregled rezervacija po statusima
- odobravanje i odbijanje rezervacija od strane administratora
- validaciju poslovne logike za time slot i reservation module
- provjeru Maven test lifecycle-a i lokalnog izvršavanja testova

## Metodologija testiranja

Za potrebe validacije korištena su dva pristupa testiranju:

### 1. Automatsko testiranje

Automatsko testiranje izvršeno je putem Maven alata, koristeći postojeći test setup definisan u projektu. Testovi su pokrenuti nad backend dijelom aplikacije i fokusirani su na servisni sloj, odnosno na validaciju poslovne logike nezavisno od korisničkog interfejsa.

Izvršene komande:

1. `mvn test`
2. `mvn clean test`

### 2. Manuelno testiranje

Pored automatskih testova, izvršena je i manuelna provjera ključnih funkcionalnosti aplikacije kroz korisnički interfejs. Na taj način potvrđeno je da osnovni tokovi koje korisnik i administrator koriste u radu sistema funkcionišu ispravno u realnom okruženju.

## Rezultati automatskih testova

Automatski testovi su uspješno izvršeni kroz Maven test lifecycle. Testni run je završen sa statusom **BUILD SUCCESS**, bez zabilježenih grešaka, padova ili preskočenih testova.

### Izvršeni testovi

| Test klasa | Opis | Rezultat |
|---|---|---|
| `ReservationServiceTest` | Testiranje kreiranja rezervacija, konflikta termina, odobravanja i izuzetaka | PASS |
| `TimeSlotServiceTest` | Testiranje logike upravljanja terminima i provjere validnih stanja | PASS |

### Sumirani rezultat

- Ukupan broj izvršenih testova: **12**
- Uspješno prošlih testova: **12**
- Failures: **0**
- Errors: **0**
- Skipped: **0**

Na osnovu dobijenih rezultata može se zaključiti da backend testni sloj funkcioniše ispravno i da su najvažniji scenariji poslovne logike validirani bez greške.

## Rezultati manuelnog testiranja

Manuelnim testiranjem provjereni su ključni korisnički tokovi koji su relevantni za završnu validaciju projekta.

### Validirani scenariji

| Oznaka | Test scenario | Rezultat |
|---|---|---|
| MT-01 | Uspješan login korisnika u sistem | PASS |
| MT-02 | Učitavanje dashboard stranice nakon prijave | PASS |
| MT-03 | Pregled liste korisnika | PASS |
| MT-04 | Dodavanje novog korisnika | PASS |
| MT-05 | Pregled liste timova | PASS |
| MT-06 | Dodavanje novog tima | PASS |
| MT-07 | Kreiranje nove rezervacije | PASS |
| MT-08 | Pregled liste rezervacija | PASS |
| MT-09 | Filtriranje rezervacija po statusu | PASS |
| MT-10 | Odobravanje rezervacije od strane admin korisnika | PASS |
| MT-11 | Odbijanje rezervacije od strane admin korisnika | PASS |
| MT-12 | Osnovna stabilnost aplikacije nakon više uzastopnih radnji | PASS |

### Sumirani rezultat manuelnog testiranja

- Ukupan broj manuelnih provjera: **12**
- Uspješno prošlih: **12**
- Nije prošlo: **0**
- Blokirano: **0**

Rezultati manuelnog testiranja potvrđuju da korisnički interfejs i povezani backend tokovi rade stabilno za funkcionalnosti koje su bile predmet završne provjere.

## Evidentirani problemi i korekcije

Tokom završne validacije identificiran je problem vezan za kreiranje rezervacije, pri čemu je dolazilo do greške u pronalasku korisnika na osnovu `createdByUserId`. Nakon korekcije servisne logike u reservation modulu, funkcionalnost kreiranja rezervacije je uspješno osposobljena i ponovo validirana kroz praktično korištenje aplikacije.

Nakon navedene korekcije nisu evidentirani otvoreni kritični bugovi koji bi blokirali osnovni rad sistema ili predaju projekta.

## Artefakti testiranja

U okviru projekta korišteni su i validirani sljedeći artefakti:

- `pom.xml`
- `ReservationServiceTest.java`
- `TimeSlotServiceTest.java`
- Maven izlaz sa uspješnim izvršavanjem testova
- backend source code projekta
- frontend korisnički interfejs korišten za manuelne provjere

## Zaključak

Na osnovu automatskog i manuelnog testiranja može se zaključiti da je aplikacija u trenutnoj verziji funkcionalna i spremna za predaju. Automatski testovi su prošli bez greške, manuelni scenariji su validirani, a ključni moduli sistema rade stabilno u lokalnom okruženju.

Posebno je značajno što su uspješno potvrđeni tokovi koji su najvažniji za demonstraciju sistema: prijava korisnika, upravljanje korisnicima i timovima, te kompletan tok kreiranja i administracije rezervacija. U skladu s tim, završna verzija sistema može se smatrati tehnički validiranom za potrebe akademske predaje.
