# Architecture Overview

## Uvod

Sistem za upravljanje sportskim terminima i ligama planiran je kao informacioni sistem koji podržava upravljanje korisnicima, timovima, terminima, rezervacijama, ligama, utakmicama i rezultatima.  
Arhitektonski pristup treba biti dovoljno jednostavan za MVP, ali i dovoljno pregledan da omogući kasnije proširenje sistema bez narušavanja osnovne strukture.

Predložena arhitektura proizlazi iz poslovnih zahtjeva i planiranog MVP opsega. Fokus nije na složenim tehnološkim rješenjima, nego na jasnom razdvajanju odgovornosti između dijelova sistema, lakšoj kontroli poslovnih pravila i boljoj osnovi za kasniji razvoj i testiranje.

---

## Kratak opis arhitektonskog pristupa

Za sistem se predlaže **slojevita i modularna arhitektura**.

Slojevita arhitektura podrazumijeva jasno odvajanje:
- korisničkog interfejsa,
- poslovne logike,
- sloja za pristup podacima,
- baze podataka.

Modularna podjela znači da se sistem organizuje po glavnim poslovnim cjelinama, kao što su korisnici, timovi, termini, lige i rezultati. Ovakav pristup olakšava razumijevanje sistema, ograničava miješanje odgovornosti i stvara dobru osnovu za implementaciju, testiranje i održavanje.

---

## Arhitektonski slojevi

| Sloj | Uloga |
|---|---|
| **Korisnički interfejs** | Omogućava korisniku interakciju sa sistemom kroz forme, preglede i akcije dostupne prema ulozi korisnika. |
| **Poslovna logika** | Sadrži pravila sistema, validacije, kontrolu prava pristupa i obradu zahtjeva. |
| **Sloj za pristup podacima** | Posreduje između poslovne logike i baze podataka, te omogućava čitanje i upis podataka. |
| **Baza podataka** | Trajno čuva podatke o korisnicima, timovima, terminima, rezervacijama, ligama, utakmicama i rezultatima. |

### Dodatno pojašnjenje slojeva

- **Korisnički interfejs** ne treba sadržavati složena poslovna pravila, nego samo prikupljanje unosa i prikaz rezultata.
- **Poslovna logika** predstavlja centralno mjesto za primjenu pravila kao što su kontrola rezervacija, ovlaštenja korisnika i obračun tabele lige.
- **Sloj za pristup podacima** treba omogućiti da ostatak sistema ne zavisi direktno od strukture baze.
- **Baza podataka** treba osigurati konzistentnost i integritet podataka.

---

## Glavne komponente sistema

Sistem je podijeljen na sljedeće glavne komponente:

1. Modul za korisnike i autentifikaciju  
2. Modul za timove  
3. Modul za termine i rezervacije  
4. Modul za lige i utakmice  
5. Modul za rezultate i tabelu  
6. Baza podataka  
7. Korisnički interfejs  

---

## Odgovornosti komponenti

| Komponenta | Odgovornosti |
|---|---|
| **Modul za korisnike i autentifikaciju** | Registracija korisnika, prijava korisnika, upravljanje korisničkim ulogama, provjera prava pristupa. |
| **Modul za timove** | Kreiranje tima, upravljanje članovima tima, pregled timova i osnovnih podataka o timu. |
| **Modul za termine i rezervacije** | Pregled dostupnih termina, validacija zauzetosti termina, kreiranje i pregled rezervacija. |
| **Modul za lige i utakmice** | Kreiranje lige, dodavanje timova u ligu, planiranje i evidencija utakmica. |
| **Modul za rezultate i tabelu** | Unos rezultata utakmica, obračun bodova i gol-razlike, ažuriranje tabele lige. |
| **Baza podataka** | Trajno čuvanje podataka i održavanje relacija između entiteta sistema. |
| **Korisnički interfejs** | Prikaz funkcionalnosti sistema i prilagođavanje dostupnih opcija prema ulozi prijavljenog korisnika. |

---

## Zašto je ovakav pristup pogodan za MVP

Predložena arhitektura odgovara MVP opsegu jer omogućava da se sistem razvija postepeno, bez nepotrebne tehničke složenosti.

Njene glavne prednosti za ovaj projekat su:

- jasno razdvajanje odgovornosti između dijelova sistema,
- lakše testiranje poslovnih pravila,
- jednostavnije održavanje i proširenje sistema,
- bolja preglednost za timski rad,
- lakše povezivanje zahtjeva, modela i implementacije.

Za projekat ovog tipa posebno je važno da poslovna pravila ne budu rasuta kroz više dijelova sistema, nego objedinjena u sloju poslovne logike. To se naročito odnosi na:
- kontrolu prava pristupa,
- pravila rezervacije termina,
- validaciju statusa utakmica,
- unos rezultata i ažuriranje tabele lige.

---

## Tok podataka i interakcija

Osnovni tok rada u sistemu može se opisati na sljedeći način:

1. Korisnik kroz interfejs pokreće akciju, na primjer prijavu, kreiranje tima, rezervaciju termina ili unos rezultata.
2. Korisnički interfejs prosljeđuje zahtjev sloju poslovne logike.
3. Poslovna logika provjerava da li korisnik ima pravo izvršiti akciju i da li su ispunjena poslovna pravila sistema.
4. Ako je zahtjev validan, poslovna logika koristi sloj za pristup podacima kako bi pročitala ili upisala potrebne podatke.
5. Baza podataka vraća rezultat upita ili potvrdu uspješnog upisa.
6. Poslovna logika obrađuje rezultat i vraća korisničkom interfejsu odgovor u obliku potvrde, greške ili ažuriranog prikaza podataka.

### Primjer: rezervacija termina

| Korak | Opis |
|---|---|
| 1 | Korisnik pregledava slobodne termine kroz interfejs. |
| 2 | Korisnik bira termin i potvrđuje zahtjev za rezervaciju. |
| 3 | Poslovna logika provjerava dostupnost termina i eventualne konflikte sa postojećim rezervacijama. |
| 4 | Ako su pravila ispunjena, sistem evidentira rezervaciju kroz sloj za pristup podacima. |
| 5 | Baza podataka čuva rezervaciju i vraća potvrdu uspješnog upisa. |
| 6 | Interfejs korisniku prikazuje potvrdu rezervacije ili odgovarajuću poruku o grešci. |

### Primjer: unos rezultata utakmice

| Korak | Opis |
|---|---|
| 1 | Ovlašteni korisnik otvara pregled utakmica. |
| 2 | Bira utakmicu i unosi rezultat. |
| 3 | Poslovna logika provjerava ovlaštenje korisnika i status utakmice. |
| 4 | Ako su uslovi ispunjeni, rezultat se evidentira u bazi podataka. |
| 5 | Sistem pokreće ažuriranje tabele lige na osnovu unesenog rezultata. |
| 6 | Interfejs prikazuje ažurirani rezultat i stanje tabele. |

---

## Ključne tehničke odluke

### Pregled odluka

| Odluka | Opis | Razlog |
|---|---|---|
| **Slojevita arhitektura** | Sistem se dijeli na prikaz, poslovnu logiku, pristup podacima i bazu. | Olakšava razumijevanje, održavanje i testiranje sistema. |
| **Modularna podjela po poslovnim cjelinama** | Funkcionalnosti su organizovane u module prema domeni problema. | Omogućava jasnije odgovornosti i lakšu razradu MVP funkcionalnosti. |
| **Centralna relacijska baza podataka** | Podaci sistema čuvaju se u jedinstvenoj relacijskoj bazi. | Entiteti imaju jasne veze i zavisnosti, pa relacijski model odgovara potrebama sistema. |

### Dodatno obrazloženje

#### Odluka 1: Slojevita arhitektura

Izabrana je kako bi se odvojili prikaz, logika i podaci, čime se olakšava razvoj i održavanje sistema. Ovakva organizacija omogućava da se poslovna pravila mijenjaju i proširuju uz manji uticaj na ostatak sistema.

#### Odluka 2: Modularna podjela po poslovnim cjelinama

Sistem je podijeljen na module koji prate glavne funkcionalnosti projekta: korisnici, timovi, termini, lige i rezultati. Time se postiže bolja preglednost i smanjuje rizik da različite funkcionalnosti budu implementirane nepovezano.

#### Odluka 3: Centralna relacijska baza podataka

Podaci sistema imaju jasne veze i zavisnosti, pa relacijski model dobro odgovara potrebama projekta. Ovaj pristup je posebno pogodan za entitete kao što su korisnici, timovi, rezervacije, utakmice i rezultati, gdje je konzistentnost podataka od velike važnosti.

---

## Ograničenja i rizici arhitekture

| Rizik / ograničenje | Obrazloženje |
|---|---|
| **Složenost pravila rezervacije** | Pravila rezervacije termina mogu postati složena ako se uvede više vrsta resursa, lokacija ili dodatna ograničenja. |
| **Zavisnost tabele od poslovnih pravila** | Obračun tabele lige zavisi od jasno definisanih pravila bodovanja i statusa utakmica. |
| **Kontrola pristupa** | Ako se korisničke uloge ne razdvoje precizno, može doći do problema u ovlaštenjima i sigurnosti sistema. |
| **Rizik prevelike složenosti MVP-a** | Arhitektura MVP verzije mora ostati jednostavna kako ne bi nepotrebno povećala složenost ranih sprintova. |

### Napomena

Najveći dio arhitektonske kompleksnosti u ovom sistemu nije u infrastrukturi, nego u pravilima domene. Zato posebnu pažnju treba posvetiti validaciji rezervacija, ovlaštenjima korisnika, statusima utakmica i ažuriranju tabele lige.

---

## Otvorena pitanja

| Pitanje | Zašto je važno | Mogući uticaj na sistem |
|---|---|---|
| Da li jedan korisnik može biti član više timova? | Utiče na pravila članstva i upravljanja timovima. | Može uticati na domain model, model baze i pravila autorizacije. |
| Da li rezervacije zahtijevaju dodatno odobrenje ili se odmah potvrđuju? | Utiče na tok rezervacije i status rezervacije. | Može promijeniti logiku validacije i statusa termina. |
| Da li sistem treba podržati više lokacija i više vrsta sportskih resursa već u MVP-u? | Utiče na složenost modela termina i rezervacija. | Može proširiti model baze i pravila dostupnosti termina. |
| Ko tačno ima pravo unosa i izmjene rezultata utakmica? | Utiče na kontrolu pristupa i poslovna pravila. | Može promijeniti use caseove, autorizaciju i auditabilnost sistema. |

---

## Veza sa ostalim artefaktima

Ovaj architecture overview povezan je sa ostalim ključnim projektnim artefaktima:

- **Domain Model** definiše glavne entitete i poslovna pravila na kojima se zasniva podjela modula.
- **Use Case Model** opisuje interakcije korisnika sa sistemom koje arhitektura treba podržati.
- **Model baze podataka** predstavlja logičku realizaciju podataka kojima arhitektura upravlja.
- **Risk Register** prepoznaje rizike koji su direktno povezani sa pravilima rezervacija, korisničkim ulogama, rezultatima i tabelom lige.

Arhitektura tako predstavlja most između zahtjeva, modela i buduće implementacije.

---

## Zaključak

Predložena arhitektura proizlazi iz zahtjeva sistema i predstavlja dobru osnovu za prelazak iz analitičke u implementacionu fazu razvoja.  
Slojevita i modularna organizacija sistema omogućava preglednu podjelu odgovornosti, lakšu kontrolu poslovnih pravila i dobru osnovu za razvoj MVP verzije, testiranje i kasnije proširenje sistema.
