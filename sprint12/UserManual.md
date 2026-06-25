# Korisnički priručnik — Sports Manager

**Verzija:** 1.0  
**Datum:** 25.06.2026.

---

## 1. Kome je sistem namijenjen

Sports Manager je namijenjen sportskim organizacijama, studentskim udruženjima, rekreativnim klubovima i ligama koje trebaju organizovati:
- raspored korištenja terena i dvorana
- članstvo i sastave timova
- ligaška natjecanja s tabelama i statistikom
- komunikaciju između administratora, kapitena i igrača

---

## 2. Korisničke uloge

| Uloga | Pristup |
|---|---|
| **Administrator (ADMIN)** | Potpuni pristup — upravljanje korisnicima, timovima, terminima, rezervacijama, ligama i utakmicama |
| **Kapiten (CAPTAIN)** | Upravljanje rosterom svog tima, kreiranje rezervacija za svoj tim, pregled statistike |
| **Igrač (PLAYER)** | Pregled svog tima, kreiranje rezervacija, pregled kalendara i rezultata |
| **Menadžer (MANAGER)** | Upravljanje ligama, utakmicama i rezultatima |

---

## 3. Prijava u sistem

### Prijava s postojećim računom
1. Otvorite aplikaciju u pregledniku (http://localhost:3000)
2. Na ekranu za prijavu unesite **korisničko ime** i **lozinku**
3. Kliknite **"Prijavi se"**
4. Sistem vas preusmjerava na Dashboard

### Registracija novog korisnika
1. Na ekranu za prijavu kliknite **"Registracija"**
2. Popunite formu: puno ime, email, korisničko ime, lozinka
3. Odaberite **ulogu** iz padajuće liste (Player, Captain, Manager)
4. Za uloge Player i Captain odaberite **sport** iz padajuće liste
5. Kliknite **"Registruj se"**
6. Sistem kreira račun i prijavljuje vas automatski

### Zaboravljena lozinka
1. Na ekranu za prijavu kliknite **"Zaboravljena lozinka?"**
2. Unesite email adresu i kliknite **"Pošalji"**
3. Sistem prikazuje **reset token** na ekranu
4. Kopirajte token, unesite ga zajedno s novom lozinkom
5. Kliknite **"Resetuj lozinku"**

---

## 4. Testni korisnici (demo kredencijali)

| Uloga | Korisničko ime | Lozinka |
|---|---|---|
| Administrator | `admin` | `admin123` |
| Menadžer | `manager` | `manager123` |

Ili se registrujte putem forme za bilo koju drugu ulogu.

---

## 5. Glavni ekrani

### 5.1 Dashboard
Početna stranica nakon prijave. Prikazuje:
- Ukupan broj timova, termina, rezervacija i liga u sistemu
- Brzu statistiku prilagođenu ulozi korisnika
- Navigacijski meni na lijevoj strani (desktop) ili hamburger meni (mobilni)

### 5.2 Korisnici (samo ADMIN)
Lista svih registrovanih korisnika u sistemu.
- **Pretraga** po imenu ili korisničkom imenu
- **Filter** po ulozi (Player, Captain, Manager, Admin)
- **Paginacija** — 10 korisnika po stranici
- Mogućnost brisanja korisnika

### 5.3 Timovi
- **ADMIN:** Vidi sve timove, može kreirati nove, pristupiti rosteru i statistici svakog tima
- **CAPTAIN:** Vidi samo svoj tim, može upravljati rosterom (dodavanje/uklanjanje igrača)
- **PLAYER:** Vidi samo tim u kojem je član, bez mogućnosti izmjena rostera

Svaki tim prikazuje: naziv, grad, kapiten, broj članova, sport, status.

### 5.4 Termini
Lista svih vremenskih termina (slotova) za terene i dvorane.
- Svaki termin ima: datum, vrijeme (od-do), lokaciju, naziv resursa, status (Dostupan/Zauzet)
- **ADMIN** može kreirati nove termine
- Pretraga po tekstu, filtriranje po sportu i datumu
- Paginacija — 15 termina po stranici

### 5.5 Rezervacije
Lista svih rezervacija terena.
- Prikazuje: tim, termin, datum, vrijeme, lokaciju, status, komentare
- **Filtri** po statusu: Sve / Na čekanju / Odobrene / Odbijene / Otkazane
- **ADMIN** može odobriti, odbiti, otkazati ili prerasporediti rezervaciju
- **CAPTAIN/PLAYER** može kreirati novu rezervaciju za svoj tim
- Klik na "Komentari" otvara sekciju za razmjenu poruka vezanih uz rezervaciju
- Paginacija — 10 rezervacija po stranici

### 5.6 Liga
Upravljanje ligama i natjecanjima.
- **Tabovi:** Tabela | Utakmice | Timovi | Strijelci
- **Tabela** — automatski izračunata na osnovu rezultata (bodovi, pobjede, gol-razlika)
- **Utakmice** — lista svih utakmica s mogućnošću unosa rezultata
- **Timovi** — dodavanje/uklanjanje timova iz lige
- **Strijelci** — lista top strijelaca u ligi
- CSV eksport rasporeda i tabele (dugme za preuzimanje)

### 5.7 Kalendar
Mjesečni pregled svih utakmica i rezervacija.
- Zlatne oznake — utakmice
- Zelene oznake — rezervacije
- Klik na dan prikazuje detalje svih događaja tog dana
- Navigacija: strelice za prethodni/naredni mjesec, dugme "Danas"

### 5.8 Profil
Osobni profil korisnika.
- Pregled i uređivanje podataka (ime, email)
- Promjena lozinke

### 5.9 Obavijesti
Ikona zvona u navigaciji prikazuje broj nepročitanih obavijesti.
- Klik otvara listu obavijesti
- Obavijesti se generišu automatski za: odobrenja, odbijanja, promjene statusa rezervacija
- Mogućnost označavanja kao pročitano (pojedinačno ili sve)

---

## 6. Korak-po-korak upute za najvažnije korisničke tokove

### Tok 1: Kreiranje tima (ADMIN)

1. U navigaciji kliknite **"Timovi"**
2. Na vrhu stranice popunite formu "Novi tim":
   - Unesite naziv tima (npr. "FK Olimpik")
   - Unesite grad (npr. "Sarajevo")
   - Odaberite sport iz padajuće liste
   - Odaberite kapitena (prikazuju se samo korisnici s ulogom CAPTAIN i odgovarajućim sportom)
   - Postavite maksimalni broj članova
3. Kliknite **"Kreiraj tim"**
4. **Očekivani rezultat:** Zelena poruka "Tim je uspješno kreiran." — tim se pojavljuje u listi ispod.

### Tok 2: Dodavanje igrača u tim (ADMIN ili CAPTAIN)

1. U listi timova kliknite **"Igrači"** kod željenog tima
2. Otvara se modal s rosterom tima
3. U polje "Pretraži igrača..." unesite dio imena ili korisničkog imena
4. Iz padajuće liste odaberite korisnika
5. Opcionalno unesite broj dresa i poziciju
6. Kliknite **"Dodaj"**
7. **Očekivani rezultat:** Igrač se pojavljuje u tabeli rostera. Broj članova tima se povećava.

### Tok 3: Kreiranje rezervacije terena (CAPTAIN ili PLAYER)

1. U navigaciji kliknite **"Rezervacije"**
2. Kliknite **"Nova rezervacija"** (ili scroll do forme)
3. Odaberite tim i slobodan termin iz padajuće liste
4. Opcionalno unesite napomenu
5. Za ponavljajuću rezervaciju: odaberite interval (sedmica/dvije sedmice) i broj ponavljanja
6. Kliknite **"Kreiraj"**
7. **Očekivani rezultat:** Rezervacija se pojavljuje u listi sa statusom "Na čekanju". Administrator dobiva obavijest.

### Tok 4: Odobravanje rezervacije (ADMIN)

1. U navigaciji kliknite **"Rezervacije"**
2. Pronađite rezervaciju sa statusom "Na čekanju"
3. Kliknite **"Odobri"**
4. **Očekivani rezultat:** Status se mijenja u "Odobrena". Kreator rezervacije dobiva obavijest o odobrenju.

### Tok 5: Unos rezultata utakmice (ADMIN ili MANAGER)

1. Kliknite **"Liga"** u navigaciji
2. Odaberite ligu iz liste
3. Idite na tab **"Utakmice"**
4. Kod željene utakmice kliknite **"Unesi rezultat"**
5. Unesite broj golova za domaći i gostujući tim
6. Opcionalno dodajte individualne strijelce
7. Kliknite **"Sačuvaj"**
8. **Očekivani rezultat:** Utakmica dobija status "Završena", tabela se automatski ažurira s novim bodovima, golovima i formom.

### Tok 6: Pregled kalendara

1. Kliknite **"Kalendar"** u navigaciji
2. Koristite strelice za navigaciju po mjesecima
3. Dani s događajima imaju zlatne (utakmice) ili zelene (rezervacije) oznake
4. Kliknite na željeni dan
5. **Očekivani rezultat:** Ispod kalendara se prikazuje lista svih događaja za taj dan s detaljima (tip, naziv, status).

---

## 7. Ograničenja sistema

| Ograničenje | Opis |
|---|---|
| **Bez email obavijesti** | Sistem ne šalje email-ove; obavijesti su samo unutar aplikacije |
| **Reset lozinke bez emaila** | Token za reset se prikazuje direktno na ekranu, ne šalje se na email |
| **Samo mjesečni kalendar** | Nema sedmičnog ni dnevnog prikaza |
| **Jednojezičan** | Aplikacija je isključivo na bosanskom jeziku |
| **Klijentska paginacija** | Svi podaci se učitavaju odjednom; performanse mogu pasti pri hiljadama zapisa |
| **Bez real-time ažuriranja** | Novi podaci se učitavaju tek pri navigaciji ili ručnom osvježavanju |

---

## 8. Šta korisnik NE MOŽE raditi

- Korisnik ne može promijeniti svoju ulogu nakon registracije
- Igrač ne može upravljati rosterom tima (samo pregledati)
- Korisnik ne može obrisati svoj račun (samo ADMIN može brisati korisnike)
- Ne postoji mogućnost eksporta u PDF format (samo CSV)
- Ne postoji chat ili direktna poruka između korisnika — komunikacija je putem komentara na rezervacijama
