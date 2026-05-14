# Izvještaj testiranja
## Sprint 7

*Datum:* 12.05.2026.
*Projekt:* Sports Manager System
*Tip aplikacije:* Web aplikacija za upravljanje korisnicima, timovima, terminima, rezervacijama i ligama

## Uvod

Ovaj izvještaj prikazuje rezultate testiranja funkcionalnosti implementiranih u okviru Sprinta 7 na projektu *Sports Manager System*. Cilj testiranja bio je potvrditi ispravnost liga modula, validirati logiku ispravke rezultata i provjeriti konzistentnost korisničkog interfejsa nakon dizajn refaktora.

Validacija sistema izvršena je kombinacijom automatskih testova za postojeće i nove module, te manuelnog testiranja za end-to-end provjeru liga modula kroz korisnički interfejs.

## Obuhvat testiranja

Testiranje je obuhvatilo sljedeće cjeline:

- kreiranje i pregled liga
- dodavanje i uklanjanje timova iz liga
- zakazivanje utakmica između timova u ligi
- unos rezultata utakmica i automatsko ažuriranje tabele
- ispravku već unesenog rezultata i ponovni izračun tabele
- pregled tabele poretka sa rangiranjem
- regression provjeru prethodno implementiranih modula (korisnici, timovi, termini, rezervacije)

## Metodologija testiranja

### 1. Automatsko testiranje

Automatsko testiranje izvršeno je putem Maven alata za backend. Testovi su fokusirani na servisni sloj i pokrivaju poslovnu logiku rezervacija, termina, liga i rezultata.

Izvršene komande:

1. mvn test
2. mvn clean test

### 2. Manuelno testiranje

Liga modul je validiran manuelnim testiranjem kroz korisnički interfejs. Manuelnim testovima provjereni su svi ključni tokovi korisnika, uključujući pozitivne i negativne scenarije.

### 3. Build validacija

Frontend build validiran je kroz npm run build koji je prošao bez grešaka (45 modula transformisano, 0 grešaka).

## Rezultati automatskih testova

Automatski testovi su uspješno izvršeni kroz Maven test lifecycle. Testni run je završen sa statusom *BUILD SUCCESS*, bez zabilježenih grešaka, padova ili preskočenih testova.

### Izvršeni testovi

| Test klasa | Opis | Rezultat |
|---|---|---|
| ReservationServiceTest | Testiranje kreiranja rezervacija, konflikta termina, odobravanja i izuzetaka | PASS |
| TimeSlotServiceTest | Testiranje logike upravljanja terminima i provjere validnih stanja | PASS |
| LeagueServiceTest | Testiranje kreiranja liga, dodavanja i uklanjanja timova, provjere duplikata | PASS |
| ResultsServiceTest | Testiranje kreiranja utakmica, unosa rezultata, ispravke rezultata i bodovanja | PASS |

### Sumirani rezultat automatskih testova

- Ukupan broj izvršenih testova: *28*
- Uspješno prošlih: *28*
- Failures: *0*
- Errors: *0*
- Skipped: *0*

## Rezultati manuelnog testiranja

### Liga modul — novi scenariji

| Oznaka | Test scenario | Rezultat |
|---|---|---|
| MT-01 | Kreiranje nove lige sa nazivom i sezonom | PASS |
| MT-02 | Prikaz liste svih liga | PASS |
| MT-03 | Odabir lige i prikaz detalja | PASS |
| MT-04 | Dodavanje tima u odabranu ligu | PASS |
| MT-05 | Pokušaj dodavanja istog tima dva puta u ligu | PASS — sistem vraća grešku |
| MT-06 | Uklanjanje tima iz lige | PASS |
| MT-07 | Zakazivanje utakmice između dva tima iz iste lige | PASS |
| MT-08 | Pokušaj odabira istog tima kao domaćeg i gostujućeg | PASS — forma ne dozvoljava |
| MT-09 | Unos rezultata za zakazanu utakmicu | PASS |
| MT-10 | Provjera automatskog ažuriranja tabele nakon unosa rezultata | PASS |
| MT-11 | Ispravka već unesenog rezultata | PASS |
| MT-12 | Provjera tabele nakon ispravke — stara statistika poništena | PASS |
| MT-13 | Pregled tabele sa medalama za prva tri mjesta | PASS |
| MT-14 | Prikaz poruke kad nema odigranih utakmica | PASS |
| MT-15 | Osvježavanje liste timova pri prelasku između tabova | PASS |

### Regression testovi — prethodni moduli

| Oznaka | Test scenario | Rezultat |
|---|---|---|
| MT-16 | Prijava korisnika u sistem | PASS |
| MT-17 | Pregled i dodavanje korisnika (ADMIN) | PASS |
| MT-18 | Brisanje korisnika (ADMIN) | PASS |
| MT-19 | Pregled i kreiranje timova | PASS |
| MT-20 | Pregled dostupnih termina | PASS |
| MT-21 | Kreiranje rezervacije | PASS |
| MT-22 | Odobravanje i odbijanje rezervacije (ADMIN) | PASS |

### Sumirani rezultat manuelnog testiranja

- Ukupan broj manuelnih provjera: *22*
- Uspješno prošlih: *22*
- Nije prošlo: *0*
- Blokirano: *0*

## Evidentirani problemi i korekcije

Tokom testiranja identificiran je problem gdje se lista timova u ligi nije osvježavala pri prelasku na tab "Utakmice". Problem je uzrokovao prikaz zastarjelog stanja u dropdown-u za odabir timova pri zakazivanju utakmica. Korekcija je implementirana osvježavanjem leagueTeams stanja pri svakom prelasku između tabova. Nakon ispravke, scenario MT-15 je prošao bez problema.

Nisu evidentirani drugi otvoreni kritični bugovi koji bi blokirali funkcionalnosti liga modula ili prethodno implementiranih modula.

## Artefakti testiranja

- pom.xml
- ReservationServiceTest.java
- TimeSlotServiceTest.java
- LeagueServiceTest.java
- ResultsServiceTest.java
- LeagueTeamEntity.java, LeagueTeamRepository.java
- LeagueService.java, LeagueController.java
- ResultsService.java, ResultsController.java
- LigaPage.jsx
- Maven izlaz sa statusom BUILD SUCCESS
- Frontend build izlaz sa statusom ✓ built in 482ms

## Zaključak

Na osnovu automatskog i manuelnog testiranja može se zaključiti da je liga modul u trenutnoj verziji funkcionalan i spreman za predaju. Automatski testovi za sve četiri test klase prošli su bez greške, svi manuelni scenariji su validirani, a jedini identificirani problem je ispravljen tokom sprinta.

Posebno je značajno što je ispravka rezultata — tehnički najsloženija funkcionalnost — validirana kako kroz automatske testove (ResultsServiceTest) tako i kroz manuelne scenarije MT-11 i MT-12. Završna verzija sistema pokriva kompletan takmičarski tok od kreiranja lige do tabele poretka.
