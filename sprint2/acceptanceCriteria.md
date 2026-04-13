# Acceptance Criteria

Acceptance kriteriji su formulisani tako da budu jasni, mjerljivi i testabilni.

## Sprint 5

### US-1 — Registracija korisnika
- Sistem mora omogućiti unos korisničkog imena, email adrese i lozinke.
- Sistem mora provjeriti ispravnost unesenih podataka, uključujući format emaila i minimalnu dužinu lozinke.
- Sistem ne smije dozvoliti registraciju sa već postojećom email adresom.
- Sistem mora prikazati poruku o grešci u slučaju neispravnih podataka.
- Nakon uspješne registracije sistem treba potvrditi kreiranje korisničkog računa.

### US-2 — Prijava korisnika
- Sistem mora omogućiti unos email adrese i lozinke.
- Sistem mora provjeriti ispravnost unesenog emaila i lozinke.
- Sistem ne smije dozvoliti prijavu s pogrešnim podacima.
- Sistem mora prikazati poruku o grešci u slučaju neuspješne prijave.
- Sistem mora ograničiti broj neuspjelih prijava.
- Nakon uspješne prijave korisnik treba biti preusmjeren na početnu stranicu sistema.

### US-3 — Upravljanje korisničkim ulogama
- Samo korisnik sa administratorskom ulogom može pristupiti upravljanju ulogama.
- Administrator može vidjeti listu svih korisnika i njihovih trenutnih uloga.
- Administrator može dodijeliti novu ulogu korisniku.
- Administrator može promijeniti postojeću ulogu korisniku.
- Administrator može ukloniti ulogu korisniku.
- Sistem mora spriječiti neovlaštene korisnike da mijenjaju uloge.
- Promjena uloga se odmah primjenjuje u sistemu.

### US-4 — Kreiranje tima
- Sistem mora omogućiti kapitenu tima ili administratoru kreiranje novog tima.
- Prilikom kreiranja tima mora biti unesen najmanje naziv tima.
- Sistem ne smije dozvoliti kreiranje tima bez obaveznih podataka.
- Sistem treba prikazati poruku o uspješnom kreiranju tima.
- Nakon uspješnog kreiranja tim mora biti evidentiran u sistemu i dostupan za daljnje upravljanje.

### US-5 — Upravljanje članovima tima
- Sistem mora omogućiti dodavanje člana tima.
- Sistem mora omogućiti uklanjanje člana tima.
- Sistem ne smije dozvoliti dodavanje istog člana više puta.
- Nakon izmjene lista članova mora biti ažurirana.
- Sistem mora omogućiti pregled liste članova tima.
- Sistem mora prikazati poruku o uspješnoj izmjeni sastava tima.

## Sprint 6

### US-6 — Pregled dostupnih termina
- Sistem mora prikazati listu svih dostupnih termina.
- Sistem treba jasno razlikovati slobodne i zauzete termine.
- Sistem mora omogućiti filtriranje termina po datumu ili vremenu.
- Korisnik treba vidjeti osnovne informacije o terminu, uključujući vrijeme i lokaciju.
- Nakon promjene lista termina treba biti ažurirana.
- Prikaz termina treba biti jednostavan i pregledan za korisnika.

### US-7 — Rezervacija termina
- Sistem mora omogućiti korisniku rezervaciju dostupnog termina.
- Sistem mora spriječiti rezervaciju već zauzetog termina.
- Korisnik mora moći odabrati termin iz liste dostupnih termina.
- Nakon uspješne rezervacije termin se označava kao zauzet.
- Sistem mora prikazati potvrdu o uspješnoj rezervaciji.
- Korisnik mora imati mogućnost otkazivanja rezervacije.
- Nakon otkazivanja termin ponovo postaje dostupan.
- Sistem mora ažurirati listu termina nakon svake promjene.
- Sistem mora spriječiti rezervaciju bez prijavljenog korisnika.

### US-8 — Pregled rezervacija
- Sistem mora prikazati listu svih rezervacija koje su povezane sa korisnikom ili njegovim timom.
- Lista mora sadržavati ključne detalje, uključujući datum, vrijeme, teren i status rezervacije.
- Sistem treba hronološki sortirati rezervacije tako da se predstojeći termini vide prvi.
- Korisnik mora imati mogućnost filtriranja rezervacija po statusu.
- Rezervacije u pregledu moraju se automatski ažurirati ukoliko dođe do otkazivanja od strane administratora ili korisnika.
- Igrači smiju vidjeti samo rezervacije svog tima, dok kapiteni i ovlaštene osobe vide rezervacije u skladu sa svojim ovlaštenjima.