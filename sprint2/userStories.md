# User Stories

Ovdje se nalaze objašnjenja funkcionalnosti sistema napisana iz perspektive krajnjeg korisnika.  
User stories pomažu da se funkcionalnosti ne posmatraju samo kroz to kako sistem radi, nego i kroz to ko koristi određenu funkciju i koju vrijednost ona donosi.

## Sprint 5 goal

Omogućiti osnovni pristup sistemu, upravljanje korisničkim nalozima, kreiranje timova i upravljanje članovima tima.

---

### ID storyja
US-1

### Naziv storyja
Registracija korisnika

**Opis**  
Kao novi korisnik, želim kreirati korisnički račun, kako bih mogao pristupiti sistemu i koristiti njegove osnovne funkcionalnosti.

**Poslovna vrijednost**  
Registracija je osnovni preduslov za korištenje sistema i omogućava identifikaciju korisnika i povezivanje njegovih aktivnosti sa nalogom.

**Prioritet**  
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da korisnik prilikom registracije unosi osnovne podatke kao što su korisničko ime, email adresa i lozinka.
- Potrebno je dodatno razjasniti da li je potrebna potvrda email adrese nakon registracije.

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa prijavom korisnika i upravljanjem korisničkim ulogama.

---

### ID storyja
US-2

### Naziv storyja
Prijava korisnika

**Opis**  
Kao registrovani korisnik, želim se prijaviti u sistem koristeći email adresu i lozinku, kako bih mogao pristupiti svom nalogu i funkcionalnostima sistema.

**Poslovna vrijednost**  
Prijava omogućava sigurnu autentifikaciju korisnika i pristup funkcionalnostima u skladu sa njegovom ulogom.

**Prioritet**  
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da korisnik ima prethodno kreiran račun.
- Potrebno je dodatno razjasniti kako sistem reaguje nakon više neuspjelih pokušaja prijave.

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa registracijom korisnika i upravljanjem korisničkim ulogama.

---

### ID storyja
US-3

### Naziv storyja
Upravljanje korisničkim ulogama

**Opis**  
Kao administrator sistema, želim upravljati korisničkim ulogama, kako bih mogao kontrolisati pristup funkcionalnostima sistema.

**Poslovna vrijednost**  
Ova funkcionalnost omogućava pravilnu raspodjelu ovlasti i sigurnije korištenje sistema od strane različitih tipova korisnika.

**Prioritet**  
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da sistem podržava najmanje uloge administratora, kapitena, igrača i sudije/zapisničara.
- Potrebno je razjasniti da li jedan korisnik može imati više uloga istovremeno.

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa registracijom, prijavom i svim funkcionalnostima kojima se pristupa prema ulozi korisnika.

---

### ID storyja
US-4

### Naziv storyja
Kreiranje tima

**Opis**  
Kao kapiten tima ili administrator, želim kreirati tim, kako bih mogao organizovati učesnike i pripremiti tim za rezervacije termina i učešće u ligi.

**Poslovna vrijednost**  
Tim je osnovna organizaciona jedinica sistema i bez njega nije moguće dalje upravljati članovima, rezervacijama i takmičenjem.

**Prioritet**  
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da tim ima naziv i odgovornu osobu.
- Potrebno je dodatno razjasniti da li jedan korisnik može kreirati više timova.

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa upravljanjem članovima tima, rezervacijom termina i dodavanjem timova u ligu.

---

### ID storyja
US-5

### Naziv storyja
Upravljanje članovima tima

**Opis**  
Kao kapiten tima, želim dodavati i uklanjati članove tima, kako bih mogao održavati tačan i ažuran sastav tima.

**Poslovna vrijednost**  
Ažuran sastav tima omogućava bolju organizaciju učesnika i tačnije upravljanje rezervacijama i takmičenjem.

**Prioritet**  
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da samo ovlaštena osoba može mijenjati sastav tima.
- Potrebno je razjasniti da li igrač može biti član više timova istovremeno.

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa kreiranjem tima, rezervacijom termina i ligama.

---

## Sprint 6 goal

Omogućiti pregled dostupnih termina, rezervaciju termina bez konflikta i pregled postojećih rezervacija.

---

### ID storyja
US-6

### Naziv storyja
Pregled dostupnih termina

**Opis**  
Kao korisnik sistema, želim pregledati dostupne termine, kako bih mogao odabrati termin koji odgovara mom timu ili aktivnosti.

**Poslovna vrijednost**  
Pregled termina omogućava korisnicima da na jednostavan način vide raspoloživost resursa i planiraju svoje aktivnosti bez konflikta.

**Prioritet**  
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da termin sadrži osnovne informacije kao što su datum, vrijeme i lokacija.
- Potrebno je razjasniti da li korisnik vidi samo slobodne termine ili i zauzete termine sa statusom.

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa rezervacijom termina i pregledom rezervacija.

---

### ID storyja
US-7

### Naziv storyja
Rezervacija termina

**Opis**  
Kao kapiten tima ili ovlašteni korisnik, želim rezervisati slobodan termin, kako bih osigurao termin za svoj tim bez preklapanja sa postojećim rezervacijama.

**Poslovna vrijednost**  
Rezervacija termina je jedna od ključnih funkcionalnosti sistema jer direktno rješava problem ručnog i nepreglednog upravljanja zauzećem resursa.

**Prioritet**  
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da se može rezervisati samo slobodan termin.
- Potrebno je dodatno razjasniti pravila otkazivanja i izmjene već kreirane rezervacije.

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa pregledom dostupnih termina, pregledom rezervacija i upravljanjem timovima.

---

### ID storyja
US-8

### Naziv storyja
Pregled rezervacija

**Opis**  
Kao kapiten tima, administrator ili organizator, želim pregledati postojeće rezervacije, kako bih imao uvid u raspored zauzeća i planirane aktivnosti.

**Poslovna vrijednost**  
Pregled rezervacija omogućava bolju kontrolu rasporeda, smanjuje nesporazume i pomaže korisnicima da lakše planiraju naredne aktivnosti.

**Prioritet**  
Srednji

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da rezervacije mogu biti pregledane po timu ili terminu.
- Potrebno je razjasniti da li korisnici vide sve rezervacije ili samo one za koje imaju ovlaštenje.

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa pregledom dostupnih termina i rezervacijom termina.

---

## Sprint 7 goal

Omogućiti osnovni modul lige kroz kreiranje lige, dodavanje timova u ligu, unos rezultata utakmica i automatsko ažuriranje tabele.

---

### ID storyja
US-9

### Naziv storyja
Kreiranje lige

**Opis**  
Kao organizator ili administrator, želim kreirati novu ligu ili takmičenje, kako bih mogao organizovati takmičarski dio sistema.

**Poslovna vrijednost**  
Ova funkcionalnost predstavlja osnovu modula takmičenja i omogućava da se u sistem kasnije povežu timovi, utakmice, rezultati i tabela.

**Prioritet**  
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da liga mora imati osnovne identifikacione podatke prije kreiranja.
- Potrebno je razjasniti ko sve može kreirati ligu i koje informacije su obavezne pri unosu.

### Veze sa drugim storyjima ili zavisnostima
- Povezano sa dodavanjem timova u ligu, unosom rezultata utakmica i automatskim ažuriranjem tabele.

---

### ID storyja
US-10

### Naziv storyja
Dodavanje timova u ligu

**Opis**  
Kao organizator ili administrator, želim dodavati timove u odabranu ligu, kako bih mogao formirati učesnike takmičenja.

**Poslovna vrijednost**  
Ova funkcionalnost je važna jer bez povezivanja timova sa ligom nije moguće organizovati takmičenje niti kasnije evidentirati rezultate.

**Prioritet**  
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da timovi već postoje u sistemu prije dodavanja u ligu.
- Potrebno je razjasniti da li jedan tim može učestvovati u više liga i da li postoje ograničenja broja timova po ligi.

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od kreiranja lige i kreiranja timova.
- Povezano je sa unosom rezultata utakmica i automatskim ažuriranjem tabele.

---

### ID storyja
US-11

### Naziv storyja
Unos rezultata utakmica

**Opis**  
Kao ovlaštena osoba, želim unositi i ažurirati rezultate utakmica, kako bi sistem imao tačne podatke o odigranim mečevima.

**Poslovna vrijednost**  
Unos rezultata je ključan jer direktno utiče na tabelu i tok takmičenja.

**Prioritet**  
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da je utakmica već definisana u okviru odgovarajuće lige.
- Potrebno je razjasniti ko tačno ima pravo unosa i izmjene rezultata te da li se svaka izmjena posebno evidentira.

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od kreiranja lige i dodavanja timova u ligu.
- Povezano je sa automatskim ažuriranjem tabele.

---

### ID storyja
US-12

### Naziv storyja
Automatsko ažuriranje tabele

**Opis**  
Kao korisnik sistema, želim da se tabela automatski ažurira na osnovu unesenih rezultata, kako bih uvijek imao tačan pregled bodova i poretka.

**Poslovna vrijednost**  
Ova funkcionalnost je važna jer automatizuje obračun bodova i poretka te smanjuje mogućnost greške pri praćenju stanja lige.

**Prioritet**  
Visok

### Pretpostavke i otvorena pitanja
- Pretpostavlja se da sistem ima definisana pravila obračuna bodova i poretka.
- Potrebno je razjasniti po kojim pravilima se rješavaju situacije kada timovi imaju isti broj bodova.

### Veze sa drugim storyjima ili zavisnostima
- Zavisi od unosa rezultata utakmica.
- Povezano je sa kreiranjem lige i dodavanjem timova u ligu.
