# Release Notes — Sports Manager v1.0

**Datum izdanja:** 25.06.2026.  
**Verzija:** 1.0 (finalna akademska isporuka)

---

## Šta je uključeno u finalnu verziju

### Autentikacija i korisnici
- JWT-based prijava i registracija
- Self-registracija s odabirom uloge (ADMIN, CAPTAIN, PLAYER, MANAGER) i sporta
- Reset zaboravljene lozinke putem tokena
- Profil korisnika — uređivanje podataka i promjena lozinke
- Admin panel za pretragu, filtriranje i brisanje korisnika

### Upravljanje timovima
- Kreiranje timova s nazivom, gradom, sportom i kapitenom
- Roster management — dodavanje i uklanjanje igrača s autocomplete pretragom
- Statistika tima po ligama (pobjede, porazi, remiji, golovi, forma)
- Pretraga i filter po sportu, paginacija (10 po stranici)

### Rezervacije terena
- Kreiranje pojedinačnih i ponavljajućih rezervacija
- Tok odobrenja s 4 statusa (Na čekanju, Odobrena, Odbijena, Otkazana)
- Preraspodjela (reschedule) na drugi termin
- Komentari na rezervacijama
- Filter čipovi po statusu, paginacija (10 po stranici)

### Termini
- CRUD za vremenske slotove s datumom, vremenom, lokacijom
- Pretraga po tekstu, sportu i datumu
- Paginacija (15 po stranici)

### Lige i natjecanja
- Kreiranje liga s timovima, utakmicama i rezultatima
- Automatski izračun tabele (bodovi, gol-razlika)
- Individualni golovi i top strijelci
- CSV eksport rasporeda i tabele

### Kalendar
- Mjesečni pregled svih utakmica i rezervacija
- Interaktivni klik na dan za detalje

### Obavijesti
- In-app obavijesti s bell ikonom i badge brojem
- Označi kao pročitano (pojedinačno/sve)

### Dashboard
- Role-aware prikaz statistika
- Pregled ključnih metrika sistema

### UI/UX
- Luxury dark tema (gold/cream paleta)
- Responzivni dizajn za mobilne uređaje
- Paginacija na svim listama

### Deployment
- Docker Compose za pokretanje kompletnog sistema jednom komandom
- Deploy skripta s automatskom provjerom dostupnosti

---

## Najvažnije funkcionalnosti

1. **Kompletni tok rezervacija** — od kreiranja, preko odobrenja, do komentara i preraspodjele
2. **Liga sistem** — timovi, utakmice, automatska tabela, individualna statistika strijelaca
3. **Roster management** — dodavanje igrača s autocomplete pretragom i validacijom sporta
4. **Kalendarski prikaz** — vizualni pregled svih aktivnosti po mjesecu
5. **Docker Compose deployment** — kompletni sistem (baza + backend + frontend) jednom komandom

---

## Poznata ograničenja

| Ograničenje | Detalji |
|---|---|
| Klijentska paginacija | Svi podaci se učitavaju u memoriju frontenda; nema server-side paginacije |
| Custom routing | Aplikacija ne koristi React Router — nema URL-based navigacije ni browser historyja |
| Hibernate DDL auto-update | Nema verzionisanih migracija (Flyway/Liquibase) |
| Bez email servisa | Obavijesti i reset lozinke su isključivo in-app |
| Jednojezičan | Samo bosanski jezik |
| Polling obavijesti | Nema WebSocket real-time push-a |

---

## Poznati bugovi

| Bug | Ozbiljnost | Opis |
|---|---|---|
| Kalendar na ekranima <360px | Niska | Ćelije kalendara su premalene na vrlo uskim ekranima (ispod 360px) |
| Scroll indikator za filter čipove | Niska | Na mobilnom nema vizualnog indikatora da se čipovi mogu skrolati horizontalno |
| Seed lozinke u plain textu | Srednja | Lozinke u `seed.sql` su plain text; u produkciji bi trebale biti BCrypt hashevi |
| API endpointi bez auth filtera | Srednja | Svi endpointi su `permitAll()` — JWT se validira ali ne blokira neautorizirane pristupe na Spring Security nivou |

---

## Šta NIJE dio finalne isporuke

| Funkcionalnost | Razlog |
|---|---|
| PDF eksport | Zahtijeva vanjsku biblioteku; CSV eksport zadovoljava potrebe |
| Email obavijesti | Nema SMTP integracije; zahtijeva vanjski servis (SendGrid, Mailgun) |
| Sedmični/dnevni kalendar | Mjesečni prikaz je dovoljan za demonstraciju |
| WebSocket push obavijesti | Polling pristup je funkcionalan za akademsku skalu |
| Cloud deployment (javni URL) | Sistem se pokreće lokalno putem Docker Compose |
| CI/CD GitHub Actions pipeline | Docker Compose ispunjava zahtjev za ponovljiv deployment |
| Višejezičnost (i18n) | Aplikacija je na bosanskom; internacionalizacija je van opsega |
| Email verifikacija pri registraciji | Nije bilo u planiranom opsegu |
