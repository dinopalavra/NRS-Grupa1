# Acceptance criteria
## 1 Registracija korisnika

- Sistem mora omogućiti unos korisničkog imena, email adrese i lozinke
- Sistem mora provjeriti ispravnost unesenih podataka (format emaila, minimalna dužina lozinke [8])
- Sistem ne smije dozvoliti registraciju sa već postojećom email adresom
- Sistem mora prikazati poruku o grešci u slučaju neispravnih podataka
- Nakon uspješne registracije sistem treba potvrditi kreiranje korisničkog računa

## 2 Prijava korisnika
- Sistem mora omogućiti unos email adrese i lozinke
- Sistem mora provjeriti ispravnost unesenog emaila i lozinke
- Sistem ne smije dozvoliti prijavu s pogrešnim podacima
- Sistem mora prikazati poruku o grešci u slučaju neuspješne prijave
- Sistem mora ograničiti broj neuspjelih prijava
- Nakon uspješne prijave korisnik treba biti preusmjeren na početnu stranicu sistema

## 3 Upravljanje korisničkim ulogama
- Samo korisnik sa administratorskom ulogom može pristupiti upravljanju ulogama
- Administrator može vidjeti listu svih korisnika i njihovih trenutnih uloga
- Administrator može dodijeliti novu ulogu korisniku
- Administrator može promijeniti postojeću ulogu korisniku
- Administrator može ukloniti ulogu korisniku
- Sistem sprječava neovlaštene korisnike da mijenjaju ulogu
- Promjena uloga se odmah primjenjuju u sitemu

## 4 Kreiranje tima

- Sistem mora omogućiti kapitenu tima ili administratoru kreiranje novog tima.
- Prilikom kreiranja tima mora biti unesen najmanje naziv tima.
- Sistem ne smije dozvoliti kreiranje tima bez obaveznih podataka.
- Sistem treba prikazati poruku o uspješnom kreiranju tima.
- Nakon uspješnog kreiranja tim mora biti evidentiran u sistemu i dostupan za daljnje upravljanje.
## 5 Upravljanje članovima tima
- Sistem mora omogućiti dodavanje člana tima
- Sistem mora omogućiti uklanjanje člana tima
- Sistem ne smije dozvoliti dodavanje istog člana više puta
- Nakon izmjene, lista članova mora biti ažurirana
- Sistem mora omogućiti pregled liste članova tima
- Sistem mora prikazati poruku o uspješnoj izmjeni sastava tima

## 6 Pregled dostupnih termina

- Prikazati listu svih dostupnih termina
- Sistem treba jasno razlikovati slobodne i zauzete termine
- Omogućiti filtriranje termina po datumu ili vremenu
- Korisnik treba vidjeti osnovne informacije o terminu (vrijeme, lokacija)
- Nakon promjene, lista termina treba biti ažurirana
- Prikaz termina treba biti jednostavan i pregledan za korisnika

## 7 Rezervacija termina

- Sistem mora omogućiti korisniku rezervaciju dostupnog termina
- Sistem mora spriječiti rezervaciju već zauzetog termina
- Korisnik mora moći odabrati termin iz liste dostupnih termina
- Nakon uspješne rezervacije, termin se označava kao zauzet
- Sistem mora prikazati potvrdu o uspješnoj rezervaciji
- Korisnik mora imati mogućnost otkazivanja rezervacije
- Nakon otkazivanja, termin ponovo postaje dostupan
- Sistem mora ažurirati listu termina nakon svake promjene
- Sistem mora spriječiti rezervaciju bez prijavljenog korisnika

## 8 Pregled rezervacija
- Sistem mora prikazati listu svih rezervacija koje su povezane sa korisnikom ili njegovim timom.
- Lista mora sadržavati ključne detalje: datum, vrijeme, teren i status rezervacije (npr. Aktivna, Otkazana, Završena).
- Sistem treba hronološki sortirati rezervacije tako da se predstojeći termini vide prvi.
- Korisnik mora imati mogućnost filtriranja rezervacija po statusu (npr. samo predstojeće).
- Rezervacije u pregledu moraju se automatski ažurirati ukoliko dođe do otkazivanja od strane administratora ili korisnika.
- Korisnici sa ulogom igrača smiju vidjeti samo rezervacije svog tima, dok kapiteni mogu vidjeti sve rezervacije koje su oni lično napravili.
