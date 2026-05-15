# User Stories — Sprint 7

## US7-1: Kreiranje nove lige

*Opis:*  
Kao organizator, želim kreirati novu ligu sa nazivom i sezonom, kako bih mogao organizovati takmičenje timova.

*Acceptance Criteria:*
- Forma sadrži polja: naziv lige i sezona
- Obje vrijednosti su obavezne
- Nakon kreiranja, liga je odmah vidljiva u listi
- Novokreirana liga ima status ACTIVE

*Prioritet:* Visok  
*Procjena:* 3

---

## US7-2: Pregled liste liga

*Opis:*  
Kao korisnik, želim pregledati sve postojeće lige, kako bih odabrao ligu u kojoj učestvuje moj tim.

*Acceptance Criteria:*
- Lista prikazuje naziv, sezonu i status svake lige
- Lista je sortirana po datumu kreiranja
- Kad nema liga, prikazuje se odgovarajuća poruka

*Prioritet:* Visok  
*Procjena:* 2

---

## US7-3: Dodavanje timova u ligu

*Opis:*  
Kao organizator, želim dodati registrovane timove u odabranu ligu, kako bih definisao koji timovi učestvuju u takmičenju.

*Acceptance Criteria:*
- Dropdown prikazuje samo timove koji još nisu u ligi
- Isti tim ne može biti dodan dva puta u istu ligu (server vraća grešku)
- Nakon dodavanja, tim se odmah pojavljuje u listi timova u ligi

*Prioritet:* Visok  
*Procjena:* 5

---

## US7-4: Uklanjanje tima iz lige

*Opis:*  
Kao organizator, želim ukloniti tim iz lige, kako bih ispravio grešku ili prilagodio sastav takmičenja.

*Acceptance Criteria:*
- Dugme za uklanjanje je dostupno pored svakog tima u ligi
- Nakon potvrde, tim je odmah uklonjen iz liste
- Akcija ne briše tim iz sistema, samo iz te lige

*Prioritet:* Srednji  
*Procjena:* 3

---

## US7-5: Pregled timova u ligi

*Opis:*  
Kao korisnik, želim pregledati koji timovi učestvuju u odabranoj ligi, kako bih imao uvid u sastav takmičenja.

*Acceptance Criteria:*
- Prikazuje se naziv, grad i kapiten svakog tima
- Lista se ažurira odmah nakon dodavanja ili uklanjanja tima

*Prioritet:* Visok  
*Procjena:* 2

---

## US7-6: Zakazivanje utakmice

*Opis:*  
Kao organizator, želim zakazati utakmicu između dva tima iz iste lige, kako bih definisao raspored takmičenja.

*Acceptance Criteria:*
- Forma sadrži: domaći tim, gostujući tim, datum
- Isti tim ne može biti i domaći i gostujući
- Dropdown prikazuje samo timove koji su u toj ligi
- Utakmica se kreira sa statusom SCHEDULED

*Prioritet:* Visok  
*Procjena:* 5

---

## US7-7: Pregled utakmica po ligi

*Opis:*  
Kao korisnik, želim pregledati sve utakmice određene lige, kako bih pratio raspored i rezultate.

*Acceptance Criteria:*
- Prikazuju se: domaći tim, rezultat (ili "vs" ako nije odigrana), gostujući tim, datum, status
- Zakazane utakmice imaju oznaku ZAKAZANO, završene ZAVRŠENO
- Utakmice su sortirane po datumu

*Prioritet:* Visok  
*Procjena:* 3

---

## US7-8: Unos i ispravka rezultata utakmica

*Opis:*  
Kao ovlaštena osoba (admin ili sudija), želim unijeti konačni rezultat odigrane utakmice, kako bi sistem automatski ažurirao tabelu.

*Acceptance Criteria:*
- Forma za unos rezultata otvara se pritiskom na ikonu olovke pored utakmice
- Rezultat se unosi za oba tima (broj golova ≥ 0)
- Ako je rezultat već unesen, sistem ispravlja prethodni i ponovo izračunava tabelu
- Status utakmice se mijenja u COMPLETED

*Prioritet:* Visok  
*Procjena:* 8

---

## US7-9: Automatsko ažuriranje tabele

*Opis:*  
Kao korisnik, želim da se tabela automatski ažurira nakon svakog unesenog rezultata, kako bih uvijek vidio tačan poredak.

*Acceptance Criteria:*
- Za pobjedu: 3 boda, za remi: 1 bod, za poraz: 0 bodova
- Tabela je sortirana: bodovi DESC, golovi za DESC, golovi primljeni ASC
- Tabela prikazuje: rang, naziv tima, odigrano, pobjede, remiji, porazi, gol-razlika, bodovi

*Prioritet:* Visok  
*Procjena:* 8

---

## US7-10: Pregled tabele lige

*Opis:*  
Kao korisnik, želim pregledati aktualnu tabelu odabrane lige, kako bih vidio trenutni poredak timova.

*Acceptance Criteria:*
- Tabela je dostupna kroz tab "Tabela" unutar detalja lige
- Prva tri mjesta su vizualno istaknuta (zlato, srebro, bronza)
- Kad nema odigranih utakmica, prikazuje se odgovarajuća poruka

*Prioritet:* Visok  
*Procjena:* 3
