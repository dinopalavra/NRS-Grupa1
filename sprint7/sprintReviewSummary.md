# SprintReviewSummary
## Sprint 7

**Datum:** 12.05.2026.
**Projekt:** Sistem za upravljanje sportskim terminima i ligama
**Dokument:** Sažetak sprint review sastanka i isporučenih rezultata

## Svrha dokumenta

Ovaj dokument sumira rezultate Sprinta 7, pregled isporučenih funkcionalnosti, tehničkih odluka i potvrđenih izlaza rada. Sprint review je fokusiran na ono što je tim uspio završiti, demonstrirati i validirati do trenutka završetka sprinta.

## Cilj sprinta

Primarni cilj Sprinta 7 bio je implementirati kompletan modul za upravljanje ligama unutar sistema **Sports Manager System**. Ovo podrazumijeva kreiranje liga, upravljanje timovima unutar liga, zakazivanje utakmica, unos i ispravku rezultata te automatsko ažuriranje tabele poretka.

Sprint 7 predstavlja završni razvojni sprint MVP ciklusa i zaokružuje sve ključne funkcionalnosti sistema planiranog produktnim backlogom.

## Isporučeno u sprintu

Tokom Sprinta 7 tim je završio i validirao sljedeće cjeline:

### 1. Backend — entiteti i repozitoriji

Implementiran je eksplicitni join entitet `LeagueTeamEntity` sa unique constraintom na paru liga-tim, koji zamjenjuje anotacijski `@ManyToMany` pristup. Kreiran je `LeagueTeamRepository` sa metodama `findByLeague_Id`, `findByLeague_IdAndTeam_Id` i `existsByLeague_IdAndTeam_Id`.

### 2. Backend — servisni sloj

`LeagueService` je proširen metodama za dodavanje, uklanjanje i pregled timova unutar lige. `ResultsService` je proširen metodom `getMatchesByLeague` i logikom ispravke rezultata — pri ponovnom unosu rezultata stara statistika se poništava kroz `removeStats`, a nova se primjenjuje kroz `applyStats`. Koristi se `Math.max(0, ...)` zaštita od negativnih vrijednosti.

### 3. Backend — kontroleri

`LeagueController` je proširen endpointima: `GET /api/leagues/{id}`, `GET /api/leagues/{id}/teams`, `POST /api/leagues/{id}/teams`, `DELETE /api/leagues/{id}/teams/{teamId}`. `ResultsController` je proširen endpointom `GET /api/results/leagues/{leagueId}/matches`.

### 4. Frontend — API i kontekst

`api.js` je proširen svim potrebnim funkcijama za rad s ligama, utakmicama i tabelom. `AppContext` je proširen stanjem `leagues`, `loadingLeagues`, `loadLeagues` te svim liga akcijama koje koriste komponente.

### 5. Frontend — Liga stranica

Implementiran je kompletan `LigaPage` koji zamjenjuje raniji placeholder. Stranica se sastoji od panela s listom liga i kreiranje forme, te master-detail panela sa tri taba: Timovi, Utakmice i Tabela. Svaki tab nudi punu funkcionalnost odgovarajućeg dijela liga modula.

### 6. Frontend — polish i dizajn sistem

Redesignirani su `UsersPage`, `TeamsPage`, `UserModule` i `TeamModule` kako bi koristili zajednički dizajn sistem: `page-hero`, `content-card`, `inline-form`, `field` komponente, `slots-table`, `status-chip` i `role-chip` klase. Dodan je CSS za Liga modul i dark top accent na `liga-panel`.

## Demonstrirane funkcionalnosti

Na review-u su posebno značajne sljedeće demonstrabilne funkcionalnosti:

- kreiranje nove lige sa nazivom i sezonom,
- pregled liste svih liga,
- dodavanje i uklanjanje timova iz odabrane lige,
- zakazivanje utakmice između dva tima iz iste lige,
- pregled svih utakmica po ligi sa statusima,
- unos rezultata i automatsko ažuriranje tabele,
- ispravka već unesenog rezultata uz ponovni izračun tabele,
- pregled tabele sa rangiranjem i vizualnim isticanjem prva tri mjesta.

## Ostvareni rezultat sprinta

Sprint je rezultirao potpuno funkcionalnim liga modulom koji zaokružuje MVP ciklus sistema. Sve planirane user story stavke su realizovane. Sistem je end-to-end funkcionalan: korisnik može kreirati ligu, dodati timove, zakazati utakmice, unijeti rezultate i pratiti tabelu u realnom vremenu.

## Problemi uočeni tokom review-a

Tokom razvoja identifikovana je i odmah ispravljena greška gdje se lista timova u ligi nije osvježavala pri prelasku na tab utakmica. Problem je riješen osvježavanjem `leagueTeams` stanja pri svakom prelasku između tabova.

Nije evidentirano ostalih kritičnih grešaka koje bi blokirale funkcionalnosti.

## Šta nije u fokusu ove isporuke

U ovoj sprint isporuci prioritet je stavljen na funkcionalnu ispravnost i kompletnost liga modula. Zbog toga nisu bili primarni:

- napredna statistika igrača i timova,
- notifikacije o promjenama rezultata,
- optimizacija broja API poziva,
- mobilni prikaz i responsive dorade za manje ekrane.

## Zaključak

Sprint 7 može se ocijeniti uspješnim jer su sve planirane funkcionalnosti implementirane, validirane i integrisane u konzistentan korisnički interfejs. Sistem je doveden do stanja u kojem pokriva kompletan tok od registracije korisnika, upravljanja timovima i rezervacijama, do organizacije liga i praćenja takmičarskih rezultata.

Na osnovu ostvarenih rezultata, sprint isporuka ispunjava i premašuje početni cilj: liga modul je funkcionalan, tabela se automatski ažurira, a dizajn sistem je ujednačen kroz cijelu aplikaciju.