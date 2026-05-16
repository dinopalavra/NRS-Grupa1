# Sprint Backlog
## Sprint 7

**Datum:** 12.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Sprint cilj

Implementirati kompletan modul za upravljanje ligama — kreiranje liga, upravljanje timovima unutar liga, zakazivanje utakmica, unos rezultata i automatsko ažuriranje tabele poretka. Uz to, proširiti sistem podrškom za odabir vrste sporta pri kreiranju termina i liga, te vezati zakazivanje utakmica u ligi s automatskom rezervacijom termina na terenu.

---

## Ključne stavke koje tim želi završiti

- Kreiranje nove lige s nazivom, sezonom i vrstom sporta
- Dodavanje i uklanjanje timova iz odabrane lige
- Zakazivanje utakmica između timova iste lige s odabirom lokacije, sale/terena i vremena uz automatsku rezervaciju termina
- Unos i ispravka rezultata utakmica uz automatsko ažuriranje tabele
- Pregled tabele poretka s vizualnim isticanjem prvih mjesta
- Odabir vrste sporta pri kreiranju termina za rezervaciju
- Prikaz informacije o vezanom ligaškom terminu u pregledu termina

---

## Rizici i zavisnosti

- Backend zavisi od ispravno konfigurisane baze (DDL auto=update kreira nove kolone automatski)
- Za testiranje utakmica potrebno je imati kreirana barem 2 tima u sistemu
- Bodovanje pretpostavlja standardni sistem: 3 boda za pobjedu, 1 za remi, 0 za poraz
- Automatska rezervacija termina zahtijeva konzistentnost između modula liga i modula termina

---

## Sprint backlog

| ID | Naziv stavke (User Story) | Odgovorna osoba | Status | Napomena |
|---|---|---|---|---|
| US7-1 | Kao organizator, želim kreirati novu ligu s nazivom, sezonom i vrstom sporta, kako bih mogao organizovati takmičenje za određenu sportsku disciplinu. | Bakir Hadžialić | Završeno | Forma sadrži naziv, sezonu i dropdown za sport; liga dobiva status ACTIVE |
| US7-2 | Kao korisnik, želim pregledati sve postojeće lige sa sportom i statusom, kako bih odabrao ligu u kojoj učestvuje moj tim. | Dino Palavra | Završeno | Lista prikazuje naziv, sezonu, sport i status; kad nema liga prikazuje se poruka |
| US7-3 | Kao organizator, želim dodati registrovane timove u odabranu ligu uz provjeru duplikata, kako bih definisao koji timovi učestvuju u takmičenju. | Tarik Avdović | Završeno | Dropdown prikazuje samo timove koji još nisu u ligi; server vraća grešku za duplikat |
| US7-4 | Kao organizator, želim ukloniti tim iz lige, kako bih ispravio grešku bez brisanja tima iz sistema. | Tarik Avdović | Završeno | Dugme za uklanjanje pored svakog tima; tim ostaje u sistemu |
| US7-5 | Kao korisnik, želim pregledati koji timovi učestvuju u odabranoj ligi s podacima o gradu i kapitenu, kako bih imao uvid u sastav takmičenja. | Miralem Pupalović | Završeno | Lista prikazuje naziv, grad i kapitena; osvježava se odmah nakon izmjene |
| US7-6 | Kao organizator, želim zakazati utakmicu između dva tima iste lige s odabirom lokacije, sale/terena, datuma i vremena, kako bi se teren automatski rezervisao i nije dostupan za druge rezervacije. | Ernad Prasko | Završeno | Isti tim ne može biti domaći i gostujući; slot se automatski kreira/rezerviše |
| US7-7 | Kao korisnik, želim pregledati sve utakmice određene lige s prikazom lokacije i termina, kako bih pratio raspored i rezultate. | Harun Muhić | Završeno | Prikaz domaći, rezultat, gostujući, datum, lokacija; sortirano po datumu |
| US7-8 | Kao ovlaštena osoba, želim unijeti i ispraviti rezultat odigrane utakmice, kako bi sistem poništio staru statistiku i primijenio novu. | Amel Divović | Završeno | Forma za unos otvara se klikom na olovku; ispravka radi undo+reapply stats |
| US7-9 | Kao korisnik, želim da se tabela automatski izračunava nakon svakog unesenog rezultata prema standardnom bodovnom sistemu, kako bih uvijek vidio tačan poredak. | Harun Hodžić | Završeno | 3 boda pobjeda, 1 remi, 0 poraz; sort: bodovi DESC, golovi DESC, primljeni ASC |
| US7-10 | Kao korisnik, želim pregledati aktualnu tabelu odabrane lige s vizualnim isticanjem prvih mjesta, kako bih vidio trenutni poredak timova. | Harun Muhić | Završeno | Prva 3 mjesta istaknuta; kad nema utakmica prikazuje se poruka |
| US7-11 | Kao admin, želim odabrati vrstu sporta pri kreiranju termina, kako bi korisnici znali za koji sport je termin namijenjen. | Bakir Hadžialić | Završeno | Dropdown s 7 sportova; sport prikazan u tablici termina |
| US7-12 | Kao korisnik, želim vidjeti u pregledu termina je li termin rezervisan od strane ligaškog rasporeda, kako bih razumio zašto termin nije slobodan. | Harun Hodžić | Završeno | Badge "Liga" prikazan uz rezervisane termine vezane za utakmicu |

---

## Pregled realizacije

- Ukupno user storyja: 12
- Završeno: 12
- Djelimično završeno: 0
- Nezavršeno: 0

## Komentar

Sprint 7 zaokružuje MVP ciklus sistema. Uz kompletan liga modul implementirane su i cross-module funkcionalnosti: odabir sporta pri kreiranju termina i liga, te automatska rezervacija termina pri zakazivanju ligaških utakmica. Svi planirani user storiji su realizovani i validirani.