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

## Release 4: Lige, utakmice, rezultati i tabela

### Cilj izdanja

Cilj četvrtog izdanja je da se sistemu doda sportska takmičarska logika koja omogućava rad sa ligama, utakmicama, rezultatima i tabelom.

### Razlog prioriteta

Nakon što postoje korisnici, timovi i osnovni tok rezervacija, sistem dobija puniji smisao kroz podršku za takmičenja. Ovaj dio projekta predstavlja logičan nastavak razvoja i donosi prepoznatljivu poslovnu vrijednost sistema.

### Planirane funkcionalnosti

- kreiranje i pregled liga
- dodavanje timova u ligu
- evidencija utakmica
- unos rezultata utakmica
- ažuriranje tabele lige
- prikaz rezultata i osnovnog stanja tabele

### Tehničke aktivnosti

- definisanje modela za lige, utakmice, rezultate i tabelu
- implementacija pravila za unos i validaciju rezultata
- implementacija osnovnog obračuna bodova i gol-razlike
- povezivanje frontend stranica sa API slojem
- provjera ispravnosti prikaza tabele nakon unosa rezultata

### Očekivani rezultat

Na kraju ovog izdanja sistem treba omogućiti osnovni MVP scenario takmičenja: postojanje lige, evidentiranje utakmica, unos rezultata i prikaz ažurirane tabele.

### Rizik

Ovo izdanje uvodi poslovna pravila koja mogu biti osjetljiva na nedorečenosti, posebno kada je riječ o statusima utakmica, pravilima bodovanja i ovlaštenjima za unos rezultata.

---

## Release 5: Dorade, validacije i stabilizacija

### Cilj izdanja

Cilj petog izdanja je stabilizovati MVP verziju sistema, poboljšati korisničko iskustvo i smanjiti tehnički i funkcionalni dug nastao kroz prethodne inkremente.

### Planirane aktivnosti

- ispravljanje uočenih grešaka
- dorada validacija i poruka o greškama
- čišćenje i unapređenje strukture koda
- dorada frontend prikaza i osnovne navigacije
- dodatne provjere sigurnosti i prava pristupa
- dorada rubnih slučajeva
- priprema sistema za demonstraciju ili narednu fazu razvoja

### Očekivani rezultat

Na kraju ovog izdanja tim treba imati stabilniju, pregledniju i demonstrabilnu MVP verziju sistema.

---

## Veza izdanja sa glavnim modulima

### Modul korisnici i autentifikacija

Najvećim dijelom pripada Release 2, ali se njegove dorade nastavljaju i u kasnijim izdanjima, posebno kroz autorizaciju i validacije.

### Modul timovi

Počinje u Release 2, a puni smisao dobija u kasnijim izdanjima kada se povezuje sa rezervacijama, ligama i utakmicama.

### Modul termini i rezervacije

Glavni fokus ima u Release 3, uz moguće dorade u Release 5.

### Modul lige i utakmice

Najveći dio implementacije planiran je u Release 4.

### Modul rezultati i tabela

Takođe je dominantno vezan za Release 4, uz dorade i validacije u završnom izdanju.

---

## Zavisnosti između izdanja

Planirana izdanja međusobno su zavisna i treba ih posmatrati kao logičan niz:

- Release 1 stvara tehničku osnovu za sve ostalo
- Release 2 uvodi korisnike i timove, bez kojih ostale funkcionalnosti ne mogu imati puni smisao
- Release 3 uvodi rezervacije, koje se oslanjaju na korisnike, timove i bazne modele
- Release 4 uvodi takmičarsku logiku, koja zavisi od timova i ostalih prethodno implementiranih dijelova sistema
- Release 5 služi za zatvaranje preostalih nedostataka i stabilizaciju MVP-a

Ovakav redoslijed smanjuje rizik da tim prerano krene u složenije dijelove sistema bez stabilne osnove.

---

## Procjena rizika po izdanjima

### Release 1
**Rizici:**
- neusklađenost tehničkog skeletona sa dokumentacijom
- nejasna podjela odgovornosti između backend i frontend dijela

**Mjere ublažavanja:**
- rano usaglašavanje strukture repozitorija
- dosljedno praćenje architecture overview i project structure dokumenata

### Release 2
**Rizici:**
- nejasna pravila korisničkih uloga
- pogrešna ili previše gruba autorizacija

**Mjere ublažavanja:**
- rano definisanje minimalnog skupa uloga
- jednostavna, ali pregledna auth logika u MVP verziji

### Release 3
**Rizici:**
- složenost pravila rezervacije
- konflikti termina i nejasna stanja rezervacija

**Mjere ublažavanja:**
- centralizacija validacije u servisnom sloju
- testiranje tipičnih i rubnih scenarija rezervacije

### Release 4
**Rizici:**
- nejasna pravila bodovanja i tabele
- greške u vezi između utakmica, rezultata i tabele

**Mjere ublažavanja:**
- jednostavna pravila u MVP verziji
- jasno definisana logika obračuna i ograničen broj početnih scenarija

### Release 5
**Rizici:**
- akumulirani tehnički dug
- previše nedovršenih dorada pred završetak MVP-a

**Mjere ublažavanja:**
- planirano vrijeme za dorade
- prioritetno rješavanje kritičnih problema prije estetskih poboljšanja

---

## Kriteriji spremnosti izdanja

Da bi se jedno izdanje smatralo spremnim za prelazak na naredno, potrebno je da:

- ključne planirane funkcionalnosti tog izdanja budu implementirane na osnovnom nivou
- postoji osnovna povezanost frontend, backend i baze podataka za obuhvaćene funkcionalnosti
- najvažnija poslovna pravila budu provjerena
- osnovni poznati problemi budu evidentirani i prioritetizovani
- tim ima dovoljno stabilnu osnovu za nastavak narednog inkrementa

Ovi kriteriji ne znače da sve mora biti savršeno završeno prije narednog koraka, ali znače da prethodni inkrement mora biti dovoljno stabilan i smislen.

---

## Očekivani MVP obuhvat

Na osnovu ovog plana, MVP verzija sistema treba da omogući sljedeće osnovne scenarije:

- korisnik se može registrovati ili prijaviti u sistem
- korisnik može imati definisanu ulogu i odgovarajuća osnovna prava pristupa
- moguće je kreirati i pregledati timove
- moguće je pregledati termine i kreirati rezervacije
- moguće je organizovati ligu i evidentirati utakmice
- moguće je unijeti rezultat utakmice
- moguće je prikazati osnovno stanje tabele lige

To predstavlja minimalni skup funkcionalnosti koji sistem čini prepoznatljivim, upotrebljivim i dovoljno kompletnim za MVP.

---

## Otvorena pitanja i prostor za prilagodbu

Iako ovaj plan daje početni redoslijed razvoja, određena pitanja mogu kasnije uticati na raspored ili obim pojedinih izdanja, na primjer:

- precizna pravila članstva korisnika u timovima
- detaljna pravila potvrde ili odobravanja rezervacija
- pravila upravljanja utakmicama i statusima rezultata
- precizan model ovlaštenja za unos i izmjenu rezultata
- eventualna potreba za podrškom dodatnih resursa, lokacija ili proširenih tipova takmičenja

Zbog toga je plan namjerno postavljen kao početni okvir, a ne kao strogo zaključan raspored.

---

## Zaključak

Initial Release Plan prikazuje logičan i postepen put razvoja sistema **Sistem za upravljanje sportskim terminima i ligama** od početnog skeletona do stabilne MVP verzije.

Plan je organizovan tako da prvo uspostavi tehničku osnovu sistema, zatim uvede korisnike i timove, nakon toga rezervacije, pa tek onda složenije takmičarske funkcionalnosti poput liga, utakmica, rezultata i tabele.

Ovakav redoslijed odgovara i poslovnim prioritetima i tehničkoj arhitekturi sistema, te timu daje pregledan okvir za planiranje narednih sprintova, raspodjelu rada i kontrolu napretka projekta.
