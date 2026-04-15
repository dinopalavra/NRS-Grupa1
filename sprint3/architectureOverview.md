# Architecture Overview

## Uvod

Sistem za upravljanje sportskim terminima i ligama planiran je kao informacioni sistem koji podržava upravljanje korisnicima, timovima, terminima, rezervacijama, ligama, utakmicama i rezultatima.  
Arhitektonski pristup treba biti dovoljno jednostavan za MVP, ali i dovoljno pregledan da omogući kasnije proširenje sistema.

## Kratak opis arhitektonskog pristupa

Predlaže se slojevita arhitektura sa jasnim odvajanjem korisničkog interfejsa, poslovne logike i sloja za pristup podacima.  
Ovakav pristup olakšava razumijevanje sistema, testiranje i kasnije održavanje.

## Glavne komponente sistema

1. Modul za korisnike i autentifikaciju  
2. Modul za timove  
3. Modul za termine i rezervacije  
4. Modul za lige i utakmice  
5. Modul za rezultate i tabelu  
6. Baza podataka  
7. Korisnički interfejs

## Odgovornosti komponenti

### 1. Modul za korisnike i autentifikaciju
- registracija korisnika
- prijava korisnika
- upravljanje korisničkim ulogama
- provjera prava pristupa

### 2. Modul za timove
- kreiranje tima
- upravljanje članovima tima
- pregled timova i njihovih osnovnih podataka

### 3. Modul za termine i rezervacije
- pregled dostupnih termina
- validacija zauzetosti termina
- kreiranje i pregled rezervacija

### 4. Modul za lige i utakmice
- kreiranje lige
- dodavanje timova u ligu
- planiranje i evidencija utakmica

### 5. Modul za rezultate i tabelu
- unos rezultata utakmica
- obračun bodova i gol-razlike
- ažuriranje tabele lige

### 6. Baza podataka
- trajno čuvanje podataka o korisnicima, timovima, terminima, ligama i rezultatima
- održavanje relacija između entiteta

### 7. Korisnički interfejs
- omogućava pristup svim funkcionalnostima sistema kroz pregledan prikaz
- prilagođava dostupne opcije ulozi prijavljenog korisnika

## Tok podataka i interakcija

Korisnik kroz interfejs šalje zahtjev sistemu, na primjer za prijavu, kreiranje tima ili rezervaciju termina.  
Poslovna logika obrađuje zahtjev, provjerava pravila sistema i po potrebi pristupa bazi podataka.  
Nakon obrade, rezultat se vraća korisničkom interfejsu u obliku potvrde, greške ili ažuriranog prikaza podataka.

## Ključne tehničke odluke

### Odluka 1: Slojevita arhitektura
Izabrana je kako bi se odvojili prikaz, logika i podaci, čime se olakšava razvoj i održavanje sistema.

### Odluka 2: Modularna podjela po poslovnim cjelinama
Sistem je podijeljen na module koji prate glavne funkcionalnosti projekta: korisnici, timovi, termini, lige i rezultati.

### Odluka 3: Centralna relacijska baza podataka
Podaci sistema imaju jasne veze i zavisnosti, pa relacijski model dobro odgovara potrebama projekta.

## Ograničenja i rizici arhitekture

- Pravila rezervacije termina mogu postati složena ako se uvede više vrsta resursa ili dodatna ograničenja.
- Obračun tabele lige zavisi od jasno definisanih pravila bodovanja.
- Ako se korisničke uloge ne razdvoje precizno, može doći do problema u kontroli pristupa.
- Arhitektura MVP verzije mora ostati jednostavna kako ne bi nepotrebno povećala složenost ranih sprintova.

## Otvorena pitanja

- Da li jedan korisnik može biti član više timova?
- Da li rezervacije zahtijevaju dodatno odobrenje ili se odmah potvrđuju?
- Da li sistem treba podržati više lokacija i više vrsta sportskih resursa već u MVP-u?
- Ko tačno ima pravo unosa i izmjene rezultata utakmica?

## Zaključak

Predložena arhitektura proizlazi iz zahtjeva sistema i predstavlja dobru osnovu za prelazak iz analitičke u implementacionu fazu razvoja.
