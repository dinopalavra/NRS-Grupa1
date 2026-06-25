# Završni izvještaj o radu tima

**Projekat:** Sports Manager — Sistem za upravljanje sportskim terminima i ligama  
**Tim:** NRS Grupa 1  
**Datum:** 25.06.2026.

---

## 1. Svrha projekta

Sports Manager je web aplikacija namijenjena sportskim organizacijama, studentskim udruženjima i rekreativnim klubovima za centralizirano upravljanje sportskim terminima, rezervacijama terena, timovima, ligama i rezultatima utakmica. Sistem omogućava administratorima, kapitenicma i igračima da koordiniraju svoje aktivnosti kroz jednu platformu umjesto da koriste razasute komunikacijske kanale (WhatsApp grupe, Excel tabele, papirne rasporede).

---

## 2. Problem koji sistem rješava

Prije ovog sistema, sportske organizacije su se suočavale s:

- **Neorganiziranim rasporedom terena** — rezervacije se vodile ručno, dolazilo je do duplih rezervacija i konflikata
- **Nejasnom evidencijom timova** — članstvo, kapetani i kontakti za svaki tim su bili razasuti
- **Nedostupnom statistikom** — rezultati utakmica i tabele su se vodile na papiru ili u Excel tabelama
- **Otežanom komunikacijom** — nije postojao jedinstven kanal za obavijesti o promjenama termina, odobrenjima ili otkazivanjima
- **Nedostatkom transparentnosti** — igrači nisu imali uvid u raspored, rezervacije ili status svojih zahtjeva

Sports Manager rješava sve ove probleme kroz role-based pristup s jasno definisanim ovlaštenjima za svaku ulogu.

---

## 3. Glavne korisničke uloge

| Uloga | Opis | Ključna ovlaštenja |
|---|---|---|
| **ADMIN** | Sistemski administrator | Kreiranje korisnika i timova, upravljanje terminima, odobravanje/odbijanje rezervacija, kreiranje liga i utakmica, upravljanje rosterom svih timova, pregled svih podataka |
| **CAPTAIN** | Kapiten tima | Upravljanje rosterom svog tima (dodavanje/uklanjanje igrača), kreiranje rezervacija za svoj tim, pregled statistike svog tima |
| **PLAYER** | Igrač | Pregled svog tima i rostera, kreiranje rezervacija za svoj tim, pregled kalendara i rezultata |
| **MANAGER** | Liga menadžer | Upravljanje ligama, kreiranje utakmica, unos rezultata, pregled tabela i statistike |

---

## 4. Glavne implementirane funkcionalnosti

### Korisnici i autentikacija
- Prijava i registracija s JWT autentikacijom
- Self-registracija s odabirom uloge i sporta
- Reset zaboravljene lozinke putem tokena
- Profil korisnika s mogućnošću promjene podataka i lozinke
- Pretraga i filtriranje korisnika po imenu i ulozi (ADMIN)

### Upravljanje timovima
- Kreiranje timova s odabirom sporta, kapitena, grada i maksimalnog broja članova
- Roster management — dodavanje/uklanjanje igrača iz tima
- Autocomplete pretraga pri dodavanju igrača (filtrira po imenu, usernameu i sportu)
- Statistika tima po ligama (pobjede, porazi, remiji, gol-razlika, forma)
- Pretraga timova po nazivu, gradu i sportskom tipu
- Paginacija liste timova (10 po stranici)

### Rezervacije terena
- Kreiranje pojedinačnih i ponavljajućih rezervacija (sedmični/dvosedmični interval)
- Tok odobrenja: Na čekanju → Odobrena / Odbijena / Otkazana
- Preraspodjela (reschedule) postojeće rezervacije na drugi termin
- Komentari na rezervacije — asinhrona komunikacija između korisnika
- Filtriranje po statusu s filter čipovima
- Paginacija (10 po stranici)

### Termini (Time Slots)
- Kreiranje novih termina s datumom, vremenom, lokacijom i resursom
- Pregled dostupnih i zauzetih termina
- Pretraga i filtriranje po tekstu, sportu i datumu
- Paginacija (15 po stranici)

### Lige i natjecanja
- Kreiranje liga s nazivom, sezonom i statusom
- Dodavanje/uklanjanje timova iz lige
- Kreiranje utakmica između timova u ligi
- Unos rezultata utakmica s individualnim golovima i strijelcima
- Automatski izračun tabele (bodovi, gol-razlika, forma)
- Tab za top strijelce po ligi
- CSV eksport rasporeda i tabele

### Kalendar
- Mjesečni prikaz svih utakmica i rezervacija
- Navigacija po mjesecima
- Klik na dan prikazuje detalje svih događaja tog dana
- Responzivni prikaz na mobilnim uređajima

### Obavijesti
- Sistemske obavijesti za odobrenja, odbijanja i promjene statusa
- Bell ikona s brojem nepročitanih obavijesti
- Označavanje pojedinačne ili svih obavijesti kao pročitane

### Dashboard
- Pregled ključnih statistika (broj timova, rezervacija, termina, liga)
- Brzi pristup funkcionalnostima ovisno o ulozi

### UX poboljšanja (Sprint 11)
- Paginacija na svim stranicama s dugačkim listama
- Responzivni dizajn za mobilne uređaje (kalendar, tabele, liga kartice)
- Konzistentan dizajn select elemenata (login dropdown)
- Horizontalni scroll za filter čipove na mobilnom

---

## 5. Pregled rada kroz sprintove

| Sprint | Fokus | Ključni isporučeni artefakti |
|---|---|---|
| **Sprint 1** | Vizija i planiranje | Product Vision, Product Backlog, Stakeholder Map, Team Charter |
| **Sprint 2** | Zahtjevi | User Stories, Acceptance Criteria, NFR zahtjevi |
| **Sprint 3** | Arhitektura | Architecture Overview, Domain Model, Database Model, Use Case Model, Risk Register, Test Strategy |
| **Sprint 4** | Tehnički setup | Project Structure, Technical Setup, Sprint Goal, Definition of Done, Initial Release Plan |
| **Sprint 5** | Prva implementacija | Osnovni CRUD za korisnike, timove, termine i rezervacije; Login/Registracija; Decision Log |
| **Sprint 6** | Proširene funkcionalnosti | Tok odobrenja rezervacija (approve/reject/cancel), prošireni korisnički moduli; Izvještaj testiranja |
| **Sprint 7** | Lige i rezultati | Kreiranje liga, utakmica, unos rezultata, tabele, pregled standinga |
| **Sprint 8** | Napredne funkcionalnosti | Roster management (dodavanje/uklanjanje igrača), statistika timova, golovi, top strijelci |
| **Sprint 9** | Komunikacija i eksport | Obavijesti (notifications), CSV eksport, dashboard, profil korisnika, preraspodjela rezervacija |
| **Sprint 10** | Zaokruživanje | Self-registration sport, reset lozinke, kalendar, ponavljajuće rezervacije, autocomplete za igrače, komentari na rezervacije, individualna statistika |
| **Sprint 11** | Polish i UX | Paginacija na svim listama, pretraga korisnika, login select popravka, responzivni dizajn za mobilne uređaje |
| **Sprint 12** | Finalna isporuka | Deployment procedura, Docker Compose, korisnički priručnik, završna dokumentacija, QA izvještaj |

---

## 6. Status funkcionalnosti

### Završeno (Done)
- Kompletni CRUD za sve module (Users, Teams, TimeSlots, Reservations, Leagues, Results)
- JWT autentikacija i autorizacija po ulogama
- Self-registracija s odabirom sporta i uloge
- Tok odobrenja rezervacija s 4 statusa
- Ponavljajuće rezervacije (sedmične/dvosedmične)
- Komentari na rezervacije
- Roster management s autocomplete pretragom
- Liga sistem: timovi, utakmice, rezultati, tabela, top strijelci
- CSV eksport rasporeda i tabele
- Kalendarski prikaz (mjesečni)
- Obavijesti s bell ikonom
- Dashboard s role-based statistikom
- Profil korisnika (edit podataka, promjena lozinke)
- Reset zaboravljene lozinke
- Paginacija i pretraga/filtriranje na svim stranicama
- Responzivni dizajn za mobilne uređaje
- Docker Compose deployment

### Djelimično završeno (Partially Done)
- **Email notifikacije** — reset lozinke vraća token direktno u HTTP response umjesto slanja emaila (dokumentovano kao MVP odluka, objašnjeno u Decision Logu Sprint 10)

### Nije završeno (Not Done)
- **PDF eksport** — odložen u korist CSV eksporta koji ne zahtijeva vanjsku biblioteku
- **Tjedni/dnevni prikaz kalendara** — implementiran samo mjesečni prikaz
- **Real-time WebSocket obavijesti** — obavijesti se učitavaju polling-om, ne push notifikacijama
- **Lokalizacija (i18n)** — aplikacija je isključivo na bosanskom jeziku
- **Zaboravljena lozinka putem emaila** — koristi se token-based pristup bez SMTP servisa

---

## 7. Glavne tehničke odluke

| Odluka | Razlog |
|---|---|
| **H2 za lokalni razvoj, PostgreSQL za produkciju** | Brži development loop bez potrebe za lokalnom PostgreSQL instancom; H2 u PostgreSQL kompatibilnom modu minimizira razlike |
| **JWT umjesto session-based autentikacije** | Stateless arhitektura pogodna za horizontalno skaliranje; frontend čuva token u localStorage |
| **Hibernate DDL auto-update umjesto migration tool-a** | Jednostavnost za akademski projekat; Flyway/Liquibase bi bili preporučeni za produkciju |
| **Klijentska paginacija umjesto server-side** | Svi podaci se već učitavaju u frontend kontekst; klijentski slice je trivialan za akademsku skalu podataka |
| **Custom routing umjesto React Router** | Jednostavniji pristup za SPA bez potrebe za URL-based routing; navigacija se vrši kroz AppContext state |
| **CSS custom properties za temu** | Luxury dark tema s gold/cream paletom; CSS varijable omogućavaju konzistentnost i lako održavanje |
| **Docker Compose za deployment** | Ponovljiv, izoliran deployment kompletnog sistema jednom komandom; ne zahtijeva cloud hosting |

---

## 8. Najveći problemi tokom razvoja i način rješavanja

### Problem 1: Inline stilovi blokiraju responzivni dizajn
**Opis:** CalendarPage je koristila isključivo React inline stilove za CSS Grid layout. Media queries ne mogu override-ovati inline stilove jer imaju niži CSS prioritet.  
**Rješenje:** Migrirani svi layout stilovi na CSS klase (`cal-cell`, `cal-grid`, `cal-day-num`, `cal-event-chip`) koje se mogu overridati media queryima.

### Problem 2: Grid vs Flex konfuzija pri responzivnim popravkama
**Opis:** `.liga-match-teams` koristi `display: grid`, ali inicijalna popravka je pokušala primijeniti `flex-direction: column` što nije imalo efekta.  
**Rješenje:** Provjera existing CSS-a prije pisanja overridea; korišten `gap` i `padding` pristup umjesto mijenjanja display tipa.

### Problem 3: JSX Fragment wrapper greške
**Opis:** Dodavanje paginacije u ReservationsPage rezultiralo je build greškom jer ternarna grana je vraćala dva sibling JSX elementa bez wrappera.  
**Rješenje:** Dodani React Fragment wrapperi (`<>...</>`) oko multiple siblings u ternarnim izrazima.

### Problem 4: Select dropdown nevidljiv na dark temi
**Opis:** Native HTML `<select>` elementi na Login stranici imali su bijelu pozadinu opcija i nevidljiv tekst na dark temi.  
**Rješenje:** Dodano `color-scheme: dark` i custom CSS sa zlatnom SVG strelicom i tamnom pozadinom opcija.

### Problem 5: Reset lozinke bez email servisa
**Opis:** SMTP integracija za slanje email-a s reset tokenom zahtijeva vanjski servis i konfiguraciju.  
**Rješenje:** Token se vraća direktno u HTTP response (MVP pristup). Dokumentovano kao poznato ograničenje s preporukom za produkcijsku implementaciju.

---

## 9. Šta bi tim unaprijedio da se projekat nastavlja

1. **Server-side paginacija** — migrirati na Spring `Pageable` s `Page<T>` response-om za bolje performanse pri velikom broju podataka
2. **React Router** — zamijeniti custom switch-based routing sa React Router za URL-based navigaciju, deep linking i browser history support
3. **Email notifikacije** — integrirati SMTP servis (SendGrid, Mailgun) za reset lozinke i obavijesti o statusu rezervacija
4. **WebSocket real-time obavijesti** — zamijeniti polling sa Spring WebSocket za instant push notifikacije
5. **Flyway migracije** — zamijeniti Hibernate DDL auto-update s verzionisanim SQL migracijama za sigurnije schema evolucije
6. **Role-based API security** — dodati Spring Security filter koji provjerava JWT token na svakom zaštićenom endpointu (trenutno su svi endpointi `permitAll()`)
7. **Automatski testovi za frontend** — proširiti sa component testovima i E2E testovima (Cypress/Playwright)
8. **PDF eksport** — dodati iText ili OpenPDF biblioteku za generisanje printable PDF rasporeda
9. **Lokalizacija** — dodati i18n podršku za engleski jezik
10. **CI/CD pipeline na GitHub Actions** — automatsko pokretanje testova i deployment pri svakom pushu na main
