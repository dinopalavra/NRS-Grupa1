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
