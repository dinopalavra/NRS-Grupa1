# Initial Release Plan

## Uvod

Ovaj dokument predstavlja početni plan izdanja za projekat **Sistem za upravljanje sportskim terminima i ligama**.

Njegova svrha je da prikaže kako se planirane funkcionalnosti sistema mogu rasporediti kroz naredne sprintove i inkremente, uzimajući u obzir MVP pristup, prethodno definisanu arhitekturu sistema i trenutno postavljeni tehnički skeleton projekta.

Initial Release Plan ne predstavlja fiksan i nepromjenjiv raspored rada, nego početni planski okvir koji timu pomaže da poveže zahtjeve sistema sa realnim redoslijedom implementacije. Plan se može prilagođavati u zavisnosti od rizika, tehničkih ograničenja, napretka tima i novih saznanja do kojih se dođe tokom narednih sprintova.

---

## Svrha dokumenta

Cilj ovog dokumenta je da:

- definiše početni redoslijed implementacije glavnih funkcionalnosti sistema
- prikaže kako se razvoj raspoređuje kroz više sprintova
- omogući bolju procjenu prioriteta, zavisnosti i rizika
- usmjeri tim na postepenu izgradnju MVP verzije sistema
- poveže poslovne cjeline projekta sa planiranim inkrementima

Ovaj plan posebno je važan zato što projekat obuhvata više međusobno povezanih modula, uključujući korisnike, timove, termine, rezervacije, lige, utakmice, rezultate i tabelu. Zbog toga funkcionalnosti nije poželjno razvijati nasumično, nego u logičnom redoslijedu koji prati i poslovne zavisnosti i tehničku arhitekturu sistema.

---

## Kontekst planiranja

Projekat je zamišljen kao full-stack informacioni sistem sa odvojenim frontend dijelom, backend dijelom i bazom podataka.

Sa arhitektonske strane sistem je postavljen kao slojevita i modularna aplikacija. To znači da se u svakom sprintu ne razvija samo “jedan ekran” ili “jedna tabela”, nego se funkcionalnosti posmatraju kroz više povezanih slojeva:
- korisnički interfejs
- poslovna logika
- pristup podacima
- baza podataka

Pored toga, sistem je modularno organizovan po glavnim poslovnim cjelinama:
- korisnici i autentifikacija
- timovi i članstvo
- termini i rezervacije
- lige i utakmice
- rezultati i tabela

Zbog ovakve organizacije release plan mora poštovati dvije vrste zavisnosti:
1. **poslovne zavisnosti**, na primjer da korisnik mora postojati prije nego što koristi rezervacije ili timove
2. **tehničke zavisnosti**, na primjer da autentifikacija, osnovni modeli i baza moraju postojati prije većeg broja naprednijih funkcionalnosti

---

## Planerski pristup

Za ovaj projekat koristi se **MVP pristup**. To znači da se u ranim izdanjima implementiraju osnovne i najvrjednije funkcionalnosti koje omogućavaju upotrebljiv sistem, dok se složenije ili manje prioritetne mogućnosti ostavljaju za kasnije inkremente.

Pristup planiranju zasniva se na sljedećim principima:

- prvo se razvijaju funkcionalnosti bez kojih ostatak sistema ne može smisleno raditi
- prioritet imaju jezgrene poslovne cjeline sistema
- svako naredno izdanje treba da bude funkcionalno bogatije od prethodnog
- rizici se pokušavaju smanjiti ranom realizacijom tehnički osjetljivih dijelova
- plan mora ostati dovoljno fleksibilan da podrži prilagodbe tokom rada

Drugim riječima, cilj nije da se odmah razvije cijeli sistem, nego da se kroz više kontrolisanih inkremenata dođe do stabilne MVP verzije.

---

## Pretpostavke planiranja

Ovaj initial release plan zasniva se na sljedećim početnim pretpostavkama:

- tim radi iterativno kroz sprintove
- tehnički stack projekta je već odabran i uključuje backend, frontend i bazu podataka
- osnovni skeleton projekta i struktura repozitorija postoje
- raniji analitički artefakti već su definisali osnovne funkcionalne cjeline sistema
- MVP verzija sistema treba podržati glavne tokove rada, a ne sve moguće proširene scenarije

Važno je naglasiti da se plan ne zasniva na pretpostavci potpune implementacije svih detalja domene u jednoj fazi. Naprotiv, funkcionalnosti će se uvoditi postepeno, tako da svaki inkrement doprinese stabilnijem i upotrebljivijem sistemu.

---

## Kriteriji prioritizacije

Pri određivanju redoslijeda funkcionalnosti korišteni su sljedeći kriteriji:

### 1. Poslovna važnost

Najveći prioritet imaju funkcionalnosti koje direktno omogućavaju osnovnu svrhu sistema:
- prijava i upravljanje korisnicima
- rad sa timovima
- pregled termina i rezervacija
- rad sa ligama i rezultatima

### 2. Zavisnosti između funkcionalnosti

Pojedine funkcionalnosti ne mogu se razvijati izolovano. Na primjer:
- bez korisnika i osnovnih uloga teško je smisleno definisati prava pristupa
- bez timova nema logičke osnove za lige, utakmice i rezervacije
- bez utakmica nema ni rezultata ni tabele

### 3. Tehnički rizik

Rizičniji dijelovi sistema, poput autentifikacije, kontrole pristupa, validacije rezervacija i logike ažuriranja tabele, planiraju se dovoljno rano da bi se eventualni problemi otkrili prije kasnijih sprintova.

### 4. MVP vrijednost

Prioritet imaju funkcionalnosti koje najbrže vode do upotrebljive MVP verzije sistema.

---

## Pregled planiranih izdanja

Planirana izdanja organizovana su kroz više uzastopnih inkremenata. Svaki inkrement gradi se na prethodnom i uvodi novi skup funkcionalnosti.

### Pregled po izdanjima

| Izdanje | Fokus izdanja | Glavni rezultat |
|---|---|---|
| Release 1 | Tehnička osnova i jezgrena infrastruktura | Stabilan skeleton projekta, baza, osnovni backend i frontend tok |
| Release 2 | Korisnici, autentifikacija i timovi | Korisnici mogu pristupiti sistemu i raditi sa timovima |
| Release 3 | Termini i rezervacije | Omogućen pregled termina i osnovni tok rezervacije |
| Release 4 | Lige, utakmice, rezultati i tabela | MVP verzija sistema sa glavnim sportskim funkcionalnostima |
| Release 5 | Dorade, validacije i stabilizacija | Poboljšanje kvaliteta, ispravljanje grešaka i završna stabilizacija MVP-a |

---

## Release 1: Tehnička osnova i jezgrena infrastruktura

### Cilj izdanja

Cilj prvog izdanja je da se potvrdi tehnička osnova sistema i omogući dalji razvoj svih ostalih funkcionalnosti.

### Fokus

U ovom izdanju prioritet imaju:
- stabilna struktura repozitorija
- osnovni backend skeleton
- osnovni frontend skeleton
- inicijalna konfiguracija baze podataka
- početni modeli, kontroleri i stranice
- potvrda komunikacije između slojeva sistema

### Planirane aktivnosti

- finalizacija osnovne strukture foldera i fajlova
- postavljanje početnih README fajlova i tehničke dokumentacije
- priprema osnovne Maven i frontend konfiguracije
- postavljanje inicijalnih SQL skripti
- definisanje osnovnih ulaznih tačaka backend i frontend aplikacije
- priprema minimalnih placeholder klasa i komponenti za glavne module

### Očekivani rezultat

Na kraju ovog izdanja tim treba imati repozitorij u kojem je jasno postavljena tehnička osnova projekta i potvrđeno da backend, frontend i baza podataka mogu služiti kao stabilan temelj za dalji razvoj.

### Napomena

Ovo izdanje ne donosi punu poslovnu funkcionalnost, ali je ključno jer smanjuje neizvjesnost i stvara uslove za implementaciju narednih modula.

---

## Release 2: Korisnici, autentifikacija i timovi

### Cilj izdanja

Cilj drugog izdanja je da se omogući osnovno upravljanje korisnicima i timovima, kao i početna kontrola pristupa sistemu.

### Razlog prioriteta

Korisnici i autentifikacija predstavljaju osnovu za gotovo sve ostale funkcionalnosti sistema. Bez njih je teško kontrolisati prava pristupa, odgovornosti i tokove rada. Timovi takođe predstavljaju jednu od centralnih poslovnih cjelina projekta i služe kao osnova za rezervacije, lige i utakmice.

### Planirane funkcionalnosti

- registracija korisnika
- prijava korisnika
- osnovna dodjela i provjera korisničkih uloga
- osnovna autorizacija pristupa funkcionalnostima
- kreiranje tima
- pregled timova
- osnovno upravljanje članovima tima

### Tehničke aktivnosti

- definisanje korisničkog modela i osnovnih relacija
- implementacija auth logike u backendu
- povezivanje frontend forme sa auth API-jem
- implementacija osnovnog stanja prijavljenog korisnika na frontend strani
- priprema početnih servisa i ruta za timove

### Očekivani rezultat

Na kraju ovog izdanja korisnik treba moći da pristupi sistemu, prijavi se i koristi osnovne funkcionalnosti povezane sa timovima, uz osnovnu kontrolu pristupa prema korisničkim ulogama.

---

## Release 3: Termini i rezervacije

### Cilj izdanja

Cilj trećeg izdanja je da se implementira osnovni tok rada za pregled termina i kreiranje rezervacija.

### Razlog prioriteta

Rezervacije predstavljaju jednu od najvažnijih poslovnih funkcionalnosti sistema. Osim toga, ovaj dio sistema uvodi i značajnija poslovna pravila, kao što su provjera dostupnosti termina, izbjegavanje konflikata i kontrola dozvoljenih akcija korisnika.

### Planirane funkcionalnosti

- pregled dostupnih termina
- prikaz osnovnih informacija o terminima
- kreiranje rezervacije
- pregled rezervacija
- osnovna validacija zauzetosti termina
- osnovna obrada statusa rezervacije

### Tehničke aktivnosti

- proširenje modela baze za termine i rezervacije
- implementacija servisne logike za validaciju rezervacija
- povezivanje frontend prikaza sa backend API pozivima
- priprema osnovnih poruka o greškama i validacijama
- testiranje osnovnih konflikata i rubnih slučajeva

### Očekivani rezultat

Na kraju ovog izdanja korisnik treba moći pregledati termine i kreirati rezervaciju u skladu sa osnovnim poslovnim pravilima sistema.

### Rizik

Ovdje se prvi put izraženije pojavljuje domena poslovnih pravila, pa je važno da se validacija ne rasprši kroz više slojeva sistema nego ostane centralizovana u poslovnoj logici.

---

