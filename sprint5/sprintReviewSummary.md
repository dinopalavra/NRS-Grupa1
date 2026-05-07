# SprintReviewSummary
## Sprint 6

**Datum:** 07/05/2026  
**Projekt:** Sistem za upravljanje sportskim terminima i ligama  
**Dokument:** Sažetak sprint review sastanka i isporučenih rezultata

## Svrha dokumenta

Ovaj dokument sumira rezultate Sprinta 6, pregled isporučenih funkcionalnosti, tehničkih poboljšanja i potvrđenih izlaza rada. Sprint review je fokusiran na ono što je tim uspio završiti, demonstrirati i validirati do trenutka završetka sprinta.

## Cilj sprinta

Primarni cilj Sprinta 6 bio je dovršiti i stabilizovati ključne funkcionalnosti sistema **Sports Manager System**, posebno u domenu upravljanja rezervacijama, korisnicima, timovima i terminima, te potvrditi da aplikacija može biti pokrenuta i testirana lokalno bez kritičnih problema.

Pored toga, cilj sprinta obuhvatao je i završnu provjeru testova, dokumentacije i spremnosti sistema za predaju.

## Isporučeno u sprintu

Tokom Sprinta 6 tim je završio i validirao sljedeće cjeline:

### 1. Autentifikacija i osnovni pristup sistemu

Implementiran je i potvrđen osnovni login tok korisnika. Sistem vraća autentifikacione podatke korisnika i omogućava prelazak iz login dijela aplikacije u glavni radni tok.

### 2. Upravljanje korisnicima

Validiran je pregled postojećih korisnika i tok dodavanja novih korisnika. Ovaj dio aplikacije predstavlja jednu od osnovnih administrativnih funkcionalnosti sistema i lokalno je potvrđen kroz praktično korištenje.

### 3. Upravljanje timovima

Potvrđen je pregled timova i funkcionalnost dodavanja novih timova. Time je zaokružen administrativni dio rada nad osnovnim entitetima sistema.

### 4. Upravljanje terminima i time slot logikom

Servisna logika za time slot modul je zadržana kao važan dio backend validacije. Omogućeno je upravljanje dostupnošću termina i provjera stanja termina kroz backend sloj.

### 5. Kreiranje i obrada rezervacija

Najvažniji isporučeni rezultat sprinta jeste stabilizacija reservation toka. Omogućeno je kreiranje rezervacije, pregled rezervacija, filtriranje po statusu, te adminsko odobravanje i odbijanje zahtjeva.

Ova funkcionalnost je bila ključna za završnu validaciju projekta jer direktno povezuje korisnički interfejs, poslovnu logiku i backend obradu statusa rezervacija.

### 6. Automatizovano testiranje

Potvrđeno je uspješno pokretanje Maven testova kroz standardne komande `mvn test` i `mvn clean test`. Testovi za reservation i time slot module prošli su bez greške, što je značajno doprinijelo stabilizaciji projekta pred predaju.

### 7. Dokumentacija za završnu predaju

Pripremljena je ili finalizirana dokumentacija vezana za testiranje i završnu validaciju projekta. Time je sprint proširen i na formalni dio pripreme za akademsku evaluaciju.

## Demonstrirane funkcionalnosti

Na review-u su posebno značajne sljedeće demonstrabilne funkcionalnosti:

- prijava korisnika u sistem,
- učitavanje aplikacije nakon autentifikacije,
- pregled korisnika i timova,
- dodavanje korisnika i timova,
- kreiranje rezervacije,
- pregled rezervacija,
- promjena statusa rezervacije kroz adminsko odobravanje ili odbijanje,
- uspješan prolazak lokalnih Maven testova.

## Ostvareni rezultat sprinta

Sprint je rezultirao funkcionalnom verzijom sistema koja se može pokrenuti lokalno, koristiti za demonstraciju i provjeriti kroz automatizovane i manuelne testove. Posebna vrijednost sprinta je u tome što su uklonjeni blokirajući problemi koji su ugrožavali reservation tok i testni proces.

Tim je time dobio verziju aplikacije koja pokriva najvažnije scenarije za završnu akademsku prezentaciju i predaju.

## Problemi uočeni tokom review-a

Iako je sprint uspješno završen, tokom rada su uočeni i određeni problemi:

- reservation tok je u jednom trenutku bio blokiran problemom vezanim za korisnički ID,
- testovi su ranije bili nepravilno organizovani i uzrokovali build probleme,
- frontend dio rezervacija vizuelno je zaostajao za ostalim ekranima,
- dio završnog vremena sprinta potrošen je na stabilizaciju umjesto na dodatno uljepšavanje ili proširenje funkcionalnosti.

Uprkos navedenom, problemi nisu ostali kritični u završnoj verziji sprinta.

## Šta nije u fokusu ove isporuke

U ovoj sprint isporuci prioritet je stavljen na ispravnost i demonstrabilnost, a ne na potpunu produkcijsku doradu. Zbog toga nisu bili primarni:

- dublje arhitektonsko čišćenje svih rubnih slučajeva,
- opsežniji UI polish svih ekrana,
- proširenje test pokrivenosti na veći broj modula izvan najkritičnijih,
- naprednije optimizacije i dodatne sigurnosne dorade.

## Zaključak

Sprint 6 može se ocijeniti uspješnim jer su završene i validirane ključne funkcionalnosti sistema, uklonjene su najvažnije blokade, a projekt je doveden u stanje pogodno za lokalnu demonstraciju i predaju. Posebno je značajno što su reservation funkcionalnosti, testni setup i završna dokumentacija uspješno privedeni kraju.

Na osnovu ostvarenih rezultata sprint isporuka ispunjava svoj osnovni cilj: sistem je funkcionalan, testiran i spreman za akademsku evaluaciju.
