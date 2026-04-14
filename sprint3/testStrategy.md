# Test Strategy

## Uvod

Ovaj dokument definiše sveobuhvatan pristup testiranju sistema za upravljanje sportskim terminima i ligama.  
Test strategy predstavlja osnovu za planiranje, organizaciju i provođenje aktivnosti testiranja kroz sve faze razvoja sistema.

Cilj ovog dokumenta je osigurati da testiranje bude sistematično, konzistentno i usmjereno na provjeru ključnih funkcionalnosti, kvaliteta i pouzdanosti sistema.  
Na ovaj način tim osigurava da razvijeni sistem zadovoljava poslovne zahtjeve, korisnička očekivanja i tehničke standarde.

## Cilj testiranja

Primarni cilj testiranja je potvrditi da sistem ispravno implementira sve funkcionalnosti definisane kroz user stories i acceptance kriterije.

Testiranje treba omogućiti:
- rano otkrivanje grešaka u logici sistema
- identifikaciju konflikata u poslovnim pravilima (npr. rezervacija termina)
- provjeru integracije između različitih modula sistema
- validaciju sigurnosti i kontrole pristupa
- osiguranje pouzdanog i stabilnog rada sistema

Poseban fokus stavlja se na ključne procese sistema, uključujući:
- registraciju i prijavu korisnika
- upravljanje korisničkim ulogama
- upravljanje timovima
- pregled i rezervaciju termina
- organizaciju liga i evidenciju rezultata

## Nivoi testiranja

Testiranje će se provoditi kroz više nivoa, pri čemu svaki nivo ima specifičnu ulogu u osiguravanju kvaliteta sistema.

Testiranje će uključivati kombinaciju ručnih i automatizovanih testova, gdje je to primjenjivo.

Nivoi testiranja uključuju:
- Unit testiranje
- Integraciono testiranje
- Sistemsko testiranje
- Prihvatno testiranje

## Šta se testira u kojem nivou

### Unit testiranje

Unit testiranje obuhvata testiranje pojedinačnih komponenti sistema, kao što su funkcije, metode i poslovna logika.

Cilj ovog nivoa je osigurati da svaka komponenta radi ispravno u izolaciji.

Primjeri:
- validacija korisničkih podataka (email, lozinka)
- provjera pravila rezervacije termina
- sprječavanje konflikta rezervacija
- logika dodavanja i uklanjanja članova tima
- obračun bodova i ažuriranje tabele lige

### Integraciono testiranje

Integraciono testiranje provjerava međusobnu komunikaciju i saradnju različitih modula sistema.

Cilj je osigurati da moduli pravilno razmjenjuju podatke i zajedno funkcionišu kao cjelina.

Primjeri:
- povezivanje modula za rezervacije sa modelom termina
- integracija korisničkih uloga sa sistemom autentifikacije
- veza između rezultata utakmica i tabele lige
- interakcija između timova i liga

### Sistemsko testiranje

Sistemsko testiranje obuhvata testiranje kompletnog sistema kao jedne cjeline.

Na ovom nivou provjerava se da li sistem ispunjava sve funkcionalne i nefunkcionalne zahtjeve.

Primjeri:
- kompletan tok od registracije korisnika do rezervacije termina
- proces kreiranja tima i dodavanja članova
- kreiranje lige, dodavanje timova i unos rezultata
- provjera ponašanja sistema u realnim scenarijima korištenja

### Prihvatno testiranje

Prihvatno testiranje provjerava da li sistem zadovoljava zahtjeve korisnika i definisane acceptance kriterije.

Ovaj nivo testiranja direktno se zasniva na user stories i kriterijima prihvatanja.

Prihvatno testiranje može uključivati:
- validaciju ključnih funkcionalnosti prema acceptance kriterijima
- provjeru da li sistem ispunjava očekivanja krajnjih korisnika
- simulaciju realnih scenarija korištenja sistema

## Veza sa acceptance kriterijima

Acceptance kriteriji predstavljaju osnovu za definisanje test scenarija i provjeru ispravnosti implementacije.

Za svaku user story potrebno je:
- definisati odgovarajuće test scenarije
- povezati ih sa acceptance kriterijima
- provjeriti da li sistem ispunjava sve definisane uslove

Na ovaj način se osigurava da svaka funkcionalnost ima jasne i mjerljive kriterije uspješnosti.

## Primjeri funkcionalnosti koje će se testirati

Tokom razvoja sistema testirat će se sljedeće ključne funkcionalnosti:

- registracija korisnika sa validnim i nevalidnim podacima
- prijava korisnika sa ispravnim i pogrešnim kredencijalima
- upravljanje korisničkim ulogama i kontrola pristupa
- kreiranje i upravljanje timovima
- dodavanje i uklanjanje članova tima
- pregled dostupnih termina
- rezervacija termina bez konflikta
- sprječavanje rezervacije zauzetog termina
- pregled rezervacija
- kreiranje i upravljanje ligama
- dodavanje timova u ligu
- unos i ažuriranje rezultata utakmica
- automatsko ažuriranje tabele nakon unosa rezultata

## Način evidentiranja rezultata testiranja

Rezultati testiranja će se sistematski evidentirati kako bi se omogućilo praćenje kvaliteta sistema i identifikacija problema.

Evidencija testiranja uključuje:
- test slučajeve (test cases)
- opis izvršenih testova
- očekivane rezultate
- stvarne rezultate
- identifikovane greške

Rezultati se mogu čuvati u repozitoriju projekta, kroz dokumentaciju ili odgovarajuće alate za praćenje testiranja.

## Glavni rizici kvaliteta

Tokom razvoja sistema mogu se pojaviti različiti rizici koji utiču na kvalitet:

- neispravna validacija korisničkih podataka
- neadekvatna kontrola pristupa i sigurnosni propusti
- konflikti rezervacija zbog nedovoljno preciznih pravila
- neispravno ažuriranje rezultata i tabele lige
- neusklađenost između acceptance kriterija i implementacije
- problemi pri integraciji modula
- gubitak ili nekonzistentnost podataka

Identifikacija i praćenje ovih rizika omogućava pravovremeno reagovanje i smanjenje negativnog uticaja na sistem.

## Zaključak

Test strategy dokument postavlja osnovu za organizovano i kvalitetno testiranje sistema kroz sve faze razvoja.

Kroz definisane nivoe testiranja, jasnu vezu sa acceptance kriterijima i identifikaciju ključnih rizika, tim osigurava da kvalitet bude sastavni dio razvoja sistema.

Na ovaj način testiranje ne predstavlja završnu aktivnost, već kontinuirani proces koji doprinosi stabilnosti, pouzdanosti i uspješnoj implementaciji sistema.
