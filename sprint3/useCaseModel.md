# Use Case Model  
## Sistem za upravljanje sportskim terminima i ligama

Ovaj dokument opisuje funkcionalnosti sistema kroz **use case scenarije** koji proizlaze iz planiranog MVP opsega, poslovnih pravila sistema i definisanih korisničkih uloga.

Use case model prikazuje kako akteri koriste sistem, koje procese sistem podržava i koja pravila moraju biti ispoštovana kako bi sistem ostao konzistentan i usklađen sa ostalim projektnim artefaktima.

---

# 1. Akteri sistema

| Akter | Opis |
|---|---|
| **Korisnik (igrač)** | Registrovani korisnik sistema koji može pregledati termine, pregledati rezervacije i biti član tima. |
| **Kapiten tima** | Registrovani korisnik sa ovlaštenjima za kreiranje tima, upravljanje članovima tima i rezervaciju ili otkazivanje termina u ime tima. |
| **Administrator** | Korisnik sa administrativnim ovlaštenjima za upravljanje korisničkim ulogama, ligama, timovima u ligi i rezultatima utakmica. |
| **Ovlaštena osoba za unos rezultata** | Korisnik kojem je dozvoljen unos rezultata utakmica ako mu sistem dodijeli odgovarajuće pravo. |
| **Sistem** | Interni akter koji izvršava validacije, sprječava konflikte rezervacija, provjerava statuse i automatski ažurira tabelu lige. |

---

# 2. Lista use caseova

| ID | Naziv use casea | Primarni akter |
|---|---|---|
| UC-1 | Registracija korisnika | Korisnik |
| UC-2 | Prijava korisnika | Korisnik |
| UC-3 | Upravljanje korisničkim ulogama | Administrator |
| UC-4 | Kreiranje tima | Kapiten tima / Administrator |
| UC-5 | Upravljanje članovima tima | Kapiten tima |
| UC-6 | Pregled dostupnih termina | Korisnik |
| UC-7 | Rezervacija termina | Kapiten tima |
| UC-8 | Pregled rezervacija | Korisnik / Kapiten tima |
| UC-9 | Otkazivanje rezervacije | Kapiten tima |
| UC-10 | Kreiranje lige | Administrator |
| UC-11 | Dodavanje timova u ligu | Administrator |
| UC-12 | Evidencija utakmice u ligi | Administrator |
| UC-13 | Unos rezultata utakmice | Administrator / Ovlaštena osoba za unos rezultata |
| UC-14 | Automatsko ažuriranje tabele lige | Sistem |
| UC-15 | Pregled tabele lige | Korisnik |

---

# 3. Use case specifikacije

## UC-1 — Registracija korisnika

**Primarni akter:** Korisnik  

**Kratak opis:**  
Korisnik unosi osnovne podatke kako bi kreirao novi nalog u sistemu.

**Preduslovi:**  
- Korisnik nema postojeći nalog sa istim emailom ili korisničkim imenom.

**Glavni tok:**  
1. Korisnik otvara formu za registraciju.  
2. Sistem prikazuje polja za unos podataka.  
3. Korisnik unosi puno ime, korisničko ime, email i lozinku.  
4. Sistem provjerava ispravnost i potpunost unosa.  
5. Sistem provjerava da li su email i korisničko ime jedinstveni.  
6. Sistem kreira novi korisnički nalog.  
7. Sistem potvrđuje uspješnu registraciju.  

**Alternativni tokovi:**  
- Ako email već postoji, sistem odbija registraciju i prikazuje poruku o grešci.  
- Ako korisničko ime već postoji, sistem odbija registraciju i prikazuje poruku o grešci.  
- Ako su podaci neispravni ili nepotpuni, sistem traži ispravku unosa.  

**Ishod:**  
Novi korisnik je evidentiran u sistemu i spreman za prijavu.

---

## UC-2 — Prijava korisnika

**Primarni akter:** Korisnik  

**Kratak opis:**  
Korisnik se prijavljuje u sistem korištenjem svojih pristupnih podataka.

**Preduslovi:**  
- Korisnik ima kreiran nalog.  
- Korisnički nalog je aktivan.

**Glavni tok:**  
1. Korisnik otvara formu za prijavu.  
2. Unosi email ili korisničko ime i lozinku.  
3. Sistem provjerava kredencijale.  
4. Sistem provjerava da li je korisnik aktivan.  
5. Sistem kreira prijavljenu sesiju.  
6. Sistem prikazuje početni ekran prema ulozi korisnika.  

**Alternativni tokovi:**  
- Ako su kredencijali pogrešni, sistem odbija prijavu.  
- Ako je korisnik neaktivan, sistem ne dozvoljava pristup.  

**Ishod:**  
Korisnik je prijavljen i dobija pristup funkcionalnostima dozvoljenim za svoju ulogu.

---

## UC-3 — Upravljanje korisničkim ulogama

**Primarni akter:** Administrator  

**Kratak opis:**  
Administrator pregleda korisnike i dodjeljuje ili mijenja njihove sistemske uloge.

**Preduslovi:**  
- Administrator je prijavljen u sistem.

**Glavni tok:**  
1. Administrator otvara pregled korisnika.  
2. Sistem prikazuje korisnike i njihove trenutne uloge.  
3. Administrator bira korisnika.  
4. Administrator mijenja ili dodjeljuje ulogu korisniku.  
5. Sistem validira dozvoljenu promjenu.  
6. Sistem sprema novu ulogu korisnika.  

**Alternativni tokovi:**  
- Ako korisnik nema pravo na ovu akciju, sistem odbija zahtjev.  
- Ako je odabrana neispravna ili nedozvoljena uloga, sistem odbija promjenu.  

**Ishod:**  
Uloga korisnika je ažurirana i nova prava pristupa postaju aktivna.

---

## UC-4 — Kreiranje tima

**Primarni akter:** Kapiten tima / Administrator  

**Kratak opis:**  
Ovlašteni korisnik kreira novi tim koji može učestvovati u rezervacijama i ligama.

**Preduslovi:**  
- Korisnik je prijavljen.  
- Korisnik ima pravo da kreira tim.

**Glavni tok:**  
1. Korisnik bira opciju za kreiranje tima.  
2. Sistem prikazuje formu za unos podataka o timu.  
3. Korisnik unosi naziv tima.  
4. Sistem provjerava ispravnost podataka.  
5. Sistem kreira tim.  
6. Sistem evidentira korisnika kao kreatora tima.  
7. Sistem potvrđuje uspješno kreiranje tima.  

**Alternativni tokovi:**  
- Ako je naziv tima neispravan ili već zauzet prema poslovnim pravilima, sistem odbija kreiranje.  
- Ako korisnik nema odgovarajuća prava, sistem odbija akciju.  

**Ishod:**  
Tim je evidentiran u sistemu i spreman za dalje upravljanje.

---

## UC-5 — Upravljanje članovima tima

**Primarni akter:** Kapiten tima  

**Kratak opis:**  
Kapiten dodaje ili uklanja članove iz svog tima.

**Preduslovi:**  
- Kapiten je prijavljen.  
- Tim postoji u sistemu.  
- Kapiten upravlja timom nad kojim ima ovlaštenje.

**Glavni tok:**  
1. Kapiten otvara pregled svog tima.  
2. Sistem prikazuje postojeće članove tima.  
3. Kapiten bira opciju za dodavanje ili uklanjanje člana.  
4. Sistem provjerava validnost zahtjeva.  
5. Sistem ažurira članstvo u timu.  
6. Sistem prikazuje ažuriranu listu članova.  

**Alternativni tokovi:**  
- Ako korisnik već pripada timu, sistem odbija duplo članstvo unutar istog tima.  
- Ako poslovna pravila ne dozvoljavaju članstvo korisnika u više timova, sistem odbija dodavanje.  
- Ako kapiten pokuša izmijeniti tim nad kojim nema prava, sistem odbija akciju.  

**Ishod:**  
Članstvo tima je ažurirano u skladu sa važećim pravilima sistema.

---

## UC-6 — Pregled dostupnih termina

**Primarni akter:** Korisnik  

**Kratak opis:**  
Korisnik pregledava raspoložive termine za korištenje sportskih resursa.

**Preduslovi:**  
- Korisnik je prijavljen.

**Glavni tok:**  
1. Korisnik otvara pregled termina.  
2. Sistem učitava termine iz evidencije raspoloživih termina.  
3. Sistem prikazuje datum, vrijeme, lokaciju, resurs i status termina.  
4. Sistem jasno razlikuje slobodne, privremeno rezervisane i zauzete termine.  
5. Korisnik po potrebi filtrira termine po datumu, vremenu ili lokaciji.  

**Alternativni tokovi:**  
- Ako nema dostupnih termina za zadate kriterije, sistem prikazuje praznu listu sa odgovarajućom porukom.  

**Ishod:**  
Korisnik dobija pregled termina i može identifikovati slobodne termine za rezervaciju.

---

## UC-7 — Rezervacija termina

**Primarni akter:** Kapiten tima  

**Kratak opis:**  
Kapiten rezerviše slobodan termin u ime svog tima.

**Preduslovi:**  
- Kapiten je prijavljen.  
- Tim za koji vrši rezervaciju postoji.  
- Odabrani termin je raspoloživ za rezervaciju.

**Glavni tok:**  
1. Kapiten otvara pregled slobodnih termina.  
2. Bira željeni termin.  
3. Sistem provjerava status termina.  
4. Sistem provjerava da li postoji konflikt sa postojećim potvrđenim rezervacijama.  
5. Sistem provjerava da tim nema preklapajuću rezervaciju u istom vremenskom periodu.  
6. Sistem kreira rezervaciju i povezuje je sa timom, terminom i korisnikom koji ju je izvršio.  
7. Sistem ažurira status rezervacije i raspoloživost termina prema definisanim pravilima.  
8. Sistem prikazuje potvrdu uspješne rezervacije.  

**Alternativni tokovi:**  
- Ako je termin već zauzet ili više nije dostupan, sistem odbija rezervaciju.  
- Ako postoji konflikt sa drugom rezervacijom, sistem odbija rezervaciju.  
- Ako korisnik nema pravo da rezerviše termin u ime tima, sistem odbija akciju.  

**Ishod:**  
Rezervacija je evidentirana, a termin prelazi u odgovarajuće stanje zauzetosti.

---

## UC-8 — Pregled rezervacija

**Primarni akter:** Korisnik / Kapiten tima  

**Kratak opis:**  
Korisnik pregledava rezervacije povezane sa sobom ili svojim timom.

**Preduslovi:**  
- Korisnik je prijavljen.

**Glavni tok:**  
1. Korisnik otvara pregled rezervacija.  
2. Sistem pronalazi rezervacije povezane sa korisnikom ili timom kojem pripada.  
3. Sistem prikazuje osnovne podatke o rezervaciji, uključujući termin, tim i status rezervacije.  
4. Sistem prikazuje rezervacije sortirane hronološki.  

**Alternativni tokovi:**  
- Ako korisnik nema nijednu rezervaciju, sistem prikazuje odgovarajuću poruku.  

**Ishod:**  
Korisnik dobija pregled relevantnih rezervacija i njihovih statusa.

---

## UC-9 — Otkazivanje rezervacije

**Primarni akter:** Kapiten tima  

**Kratak opis:**  
Kapiten otkazuje postojeću rezervaciju termina za svoj tim.

**Preduslovi:**  
- Kapiten je prijavljen.  
- Postoji aktivna rezervacija povezana sa njegovim timom.  
- Kapiten ima pravo upravljati tom rezervacijom.

**Glavni tok:**  
1. Kapiten otvara pregled rezervacija svog tima.  
2. Bira rezervaciju koju želi otkazati.  
3. Sistem prikazuje detalje rezervacije i traži potvrdu otkazivanja.  
4. Kapiten potvrđuje akciju.  
5. Sistem mijenja status rezervacije u otkazana.  
6. Sistem ažurira raspoloživost povezanog termina.  
7. Sistem prikazuje potvrdu uspješnog otkazivanja.  

**Alternativni tokovi:**  
- Ako rezervacija više nije aktivna, sistem odbija otkazivanje.  
- Ako korisnik nema pravo upravljati rezervacijom, sistem odbija akciju.  

**Ishod:**  
Rezervacija je otkazana, a termin ponovo postaje raspoloživ u skladu sa pravilima sistema.

---

## UC-10 — Kreiranje lige

**Primarni akter:** Administrator  

**Kratak opis:**  
Administrator kreira novu ligu sa osnovnim podacima o sezoni, formatu i statusu.

**Preduslovi:**  
- Administrator je prijavljen.

**Glavni tok:**  
1. Administrator bira opciju za kreiranje lige.  
2. Sistem prikazuje formu za unos podataka o ligi.  
3. Administrator unosi naziv lige, sezonu, format i početni status.  
4. Sistem validira unesene podatke.  
5. Sistem kreira ligu.  
6. Sistem potvrđuje uspješno kreiranje lige.  

**Alternativni tokovi:**  
- Ako podaci nisu validni ili su nepotpuni, sistem odbija kreiranje.  

**Ishod:**  
Liga je evidentirana u sistemu i spremna za dodavanje timova.

---

## UC-11 — Dodavanje timova u ligu

**Primarni akter:** Administrator  

**Kratak opis:**  
Administrator dodaje postojeće timove u postojeću ligu.

**Preduslovi:**  
- Administrator je prijavljen.  
- Liga postoji.  
- Tim postoji.

**Glavni tok:**  
1. Administrator otvara pregled odabrane lige.  
2. Sistem prikazuje osnovne podatke o ligi i dostupne timove.  
3. Administrator bira tim koji želi dodati u ligu.  
4. Sistem provjerava da li tim već nije član iste lige.  
5. Sistem evidentira vezu između lige i tima.  
6. Sistem potvrđuje uspješno dodavanje tima u ligu.  

**Alternativni tokovi:**  
- Ako je tim već pridružen ligi, sistem odbija dodavanje.  
- Ako tim ne ispunjava uslove za učešće, sistem odbija akciju.  

**Ishod:**  
Tim je evidentiran kao učesnik odabrane lige.

---

## UC-12 — Evidencija utakmice u ligi

**Primarni akter:** Administrator  

**Kratak opis:**  
Administrator evidentira utakmicu između dva tima unutar određene lige.

**Preduslovi:**  
- Administrator je prijavljen.  
- Liga postoji.  
- Oba tima postoje i pripadaju istoj ligi.

**Glavni tok:**  
1. Administrator otvara pregled utakmica za ligu.  
2. Bira opciju za dodavanje nove utakmice.  
3. Unosi domaći tim, gostujući tim, datum, vrijeme i status utakmice.  
4. Sistem provjerava da su odabrana dva različita tima.  
5. Sistem provjerava da oba tima pripadaju istoj ligi.  
6. Sistem evidentira utakmicu u sistemu.  
7. Sistem potvrđuje uspješno evidentiranje utakmice.  

**Alternativni tokovi:**  
- Ako su odabrani isti timovi, sistem odbija unos.  
- Ako neki tim ne pripada ligi, sistem odbija unos.  
- Ako podaci nisu validni, sistem odbija kreiranje utakmice.  

**Ishod:**  
Utakmica je planirana i evidentirana u ligi sa odgovarajućim statusom.

---

## UC-13 — Unos rezultata utakmice

**Primarni akter:** Administrator / Ovlaštena osoba za unos rezultata  

**Kratak opis:**  
Ovlašteni korisnik unosi konačni rezultat odigrane utakmice.

**Preduslovi:**  
- Korisnik je prijavljen.  
- Korisnik ima pravo unosa rezultata.  
- Utakmica postoji u sistemu.  
- Status utakmice dozvoljava unos rezultata.

**Glavni tok:**  
1. Ovlašteni korisnik otvara pregled utakmica.  
2. Bira utakmicu za koju želi evidentirati rezultat.  
3. Sistem prikazuje podatke o utakmici.  
4. Korisnik unosi rezultat domaćeg i gostujućeg tima.  
5. Sistem provjerava ovlaštenje korisnika.  
6. Sistem provjerava status utakmice i validnost rezultata.  
7. Sistem evidentira rezultat i korisnika koji ga je unio.  
8. Sistem mijenja status utakmice u odgovarajuće završno stanje.  
9. Sistem pokreće proces ažuriranja tabele lige.  

**Alternativni tokovi:**  
- Ako korisnik nema odgovarajuće pravo, sistem odbija unos.  
- Ako utakmica nije u statusu koji dozvoljava unos rezultata, sistem odbija unos.  
- Ako za utakmicu već postoji konačni rezultat, sistem odbija dupli unos ili zahtijeva poseban postupak izmjene prema pravilima sistema.  

**Ishod:**  
Rezultat utakmice je evidentiran i spreman za obračun stanja na tabeli.

---

## UC-14 — Automatsko ažuriranje tabele lige

**Primarni akter:** Sistem  

**Kratak opis:**  
Sistem nakon validnog unosa rezultata automatski obračunava i ažurira tabelu lige.

**Preduslovi:**  
- Postoji validno evidentiran rezultat utakmice.  
- Utakmica pripada ligi.

**Glavni tok:**  
1. Sistem detektuje novi ili izmijenjeni validni rezultat utakmice.  
2. Sistem pronalazi oba tima i pripadajuću ligu.  
3. Sistem obračunava broj odigranih utakmica, pobjeda, neriješenih rezultata i poraza.  
4. Sistem obračunava date i primljene golove te ukupan broj bodova.  
5. Sistem ažurira zapis ili zapise u tabeli lige.  
6. Sistem određuje novi poredak timova na tabeli.  
7. Sistem prikazuje ažurirano stanje korisnicima.  

**Alternativni tokovi:**  
- Ako rezultat nije validan ili nije konačan, sistem ne ažurira tabelu.  
- Ako ne postoji odgovarajući zapis za tabelu lige, sistem ga kreira ili prijavljuje grešku prema pravilima implementacije.  

**Ishod:**  
Tabela lige je ažurirana na osnovu važećih rezultata utakmica.

---

## UC-15 — Pregled tabele lige

**Primarni akter:** Korisnik  

**Kratak opis:**  
Korisnik pregledava trenutno stanje tabele za odabranu ligu.

**Preduslovi:**  
- Liga postoji u sistemu.

**Glavni tok:**  
1. Korisnik otvara pregled liga ili direktno pregled odabrane lige.  
2. Sistem učitava stanje tabele za odabranu ligu.  
3. Sistem prikazuje timove, broj odigranih utakmica, pobjede, neriješene rezultate, poraze, gol-razliku i bodove.  
4. Korisnik pregledava trenutni poredak timova.  

**Alternativni tokovi:**  
- Ako za ligu još nema obračunate tabele, sistem prikazuje odgovarajuću poruku.  

**Ishod:**  
Korisnik dobija pregled trenutnog stanja i poretka u ligi.

---

# 4. Ključni entiteti sistema

## Korisnik

Predstavlja registrovanog korisnika sistema koji može imati različite sistemske uloge.

**Ključni atributi:**  
- `user_id`  
- `full_name`  
- `email`  
- `username`  
- `password_hash`  
- `role`  
- `active`  

---

## Tim

Predstavlja sportski tim koji učestvuje u rezervacijama termina i ligama.

**Ključni atributi:**  
- `team_id`  
- `team_name`  
- `created_by`  
- `created_at`  
- `status`  

---

## Članstvo u timu

Predstavlja vezu između korisnika i tima.

**Ključni atributi:**  
- `team_member_id`  
- `team_id`  
- `user_id`  
- `member_role`  
- `joined_at`  

---

## Termin

Predstavlja raspoloživi vremenski slot za korištenje sportskog resursa.

**Ključni atributi:**  
- `slot_id`  
- `slot_date`  
- `start_time`  
- `end_time`  
- `location`  
- `resource_name`  
- `availability_status`  

---

## Rezervacija

Predstavlja rezervaciju termina od strane tima.

**Ključni atributi:**  
- `reservation_id`  
- `team_id`  
- `slot_id`  
- `created_by`  
- `status`  
- `created_at`  

---

## Liga

Predstavlja takmičenje ili ligu u kojoj učestvuju timovi.

**Ključni atributi:**  
- `league_id`  
- `league_name`  
- `season`  
- `format`  
- `status`  

---

## Učešće tima u ligi

Predstavlja vezu između tima i lige.

**Ključni atributi:**  
- `league_team_id`  
- `league_id`  
- `team_id`  

---

## Utakmica

Predstavlja utakmicu između dva tima unutar određene lige.

**Ključni atributi:**  
- `match_id`  
- `league_id`  
- `home_team_id`  
- `away_team_id`  
- `match_date`  
- `match_time`  
- `status`  

---

## Rezultat

Predstavlja konačni rezultat odigrane utakmice.

**Ključni atributi:**  
- `result_id`  
- `match_id`  
- `home_score`  
- `away_score`  
- `entered_by`  
- `entered_at`  

---

## Tabela lige

Predstavlja agregirano stanje tima u okviru jedne lige.

**Ključni atributi:**  
- `standing_id`  
- `league_id`  
- `team_id`  
- `played`  
- `wins`  
- `draws`  
- `losses`  
- `goals_for`  
- `goals_against`  
- `points`  

---

# 5. Veze između use caseova i poslovnih pravila

Use case model mora poštovati ključna poslovna pravila definisana kroz model baze podataka, arhitekturu i risk register.

Posebno su važna sljedeća pravila:

- Jedan termin ne smije imati konfliktne potvrđene rezervacije.  
- Jedan tim ne smije imati vremenski preklapajuće rezervacije ako poslovna pravila to ne dozvoljavaju.  
- Korisničke uloge moraju biti jasno razdvojene zbog kontrole pristupa.  
- Jedna utakmica mora imati dva različita tima koji pripadaju istoj ligi.  
- Rezultat se smije evidentirati samo za utakmicu koja je u odgovarajućem statusu.  
- Tabela lige se ažurira samo na osnovu validnih i potvrđenih rezultata.  

---

# 6. Veza sa ostalim artefaktima

Ovaj use case model usklađen je sa ostalim ključnim artefaktima projekta i treba se posmatrati zajedno sa njima.

- **Architecture Overview** definiše module koje ovi use caseovi koriste, uključujući module za korisnike, timove, termine i rezervacije, lige i utakmice te rezultate i tabelu.  
- **Model baze podataka** definiše entitete i relacije koje ovi use caseovi čitaju i mijenjaju.  
- **Test Strategy** koristi ove use caseove kao osnovu za definisanje funkcionalnih i prihvatnih test scenarija.  
- **Risk Register** ukazuje na otvorena pitanja i rizike koje use caseovi moraju eksplicitno obuhvatiti, naročito kod rezervacija, uloga, članstva u timovima i rezultata utakmica.  

---

# 7. Napomene i otvorena pitanja

Iako model pokriva MVP funkcionalnosti, nekoliko pitanja i dalje može uticati na kasniju razradu use caseova.

- Da li jedan korisnik može biti član više timova i pod kojim uslovima.  
- Da li rezervacija termina odmah postaje potvrđena ili postoji proces dodatnog odobravanja.  
- Ko tačno osim administratora može unositi ili mijenjati rezultate utakmica.  
- Da li će MVP podržati više lokacija i više vrsta sportskih resursa bez dodatne razrade pravila raspoloživosti.
