# Project Structure

## Uvod

Ovaj dokument opisuje početnu strukturu projekta pripremljenu u okviru Sprinta 4 za projekat **Sistem za upravljanje sportskim terminima i ligama**.

Predložena struktura i skeleton namijenjeni su razvoju **full-stack web aplikacije**. Sistem je organizovan kao informacioni sistem sa jasno odvojenim frontend dijelom, backend dijelom, bazom podataka i pratećom dokumentacijom.

Ovakav pristup nije izabran nasumično, nego direktno proizlazi iz ranije definisane arhitekture sistema. U arhitektonskom smislu projekat je postavljen kao **slojevita i modularna web aplikacija** u kojoj su razdvojeni korisnički interfejs, poslovna logika, sloj pristupa podacima i baza podataka.

Cilj ovog dokumenta nije da predstavi završenu implementaciju, nego da objasni kako je tehnička osnova projekta organizovana prije početka AI-enabled implementacione faze.

---

## Tehnički stack

| Sloj | Tehnologija |
|------|-------------|
| Backend | Java + Spring Boot |
| Frontend | React + Vite |
| Baza podataka | PostgreSQL |
| Build alat (backend) | Maven |
| Autentifikacija | Spring Security + JWT |

---

## Kontekst projekta

Projekat se odnosi na informacioni sistem koji treba podržati upravljanje korisnicima, timovima, terminima, rezervacijama, ligama, utakmicama, rezultatima i tabelom lige.

Prema ranije definisanim artefaktima, sistem treba omogućiti:
- registraciju i prijavu korisnika
- upravljanje korisničkim ulogama i pravima pristupa
- kreiranje i upravljanje timovima
- pregled termina i rezervaciju sportskih resursa
- organizaciju liga i evidentiranje utakmica
- unos rezultata i ažuriranje tabele

Zbog ovakvog opsega, projekat prirodno odgovara web arhitekturi u kojoj:
- frontend služi za interakciju korisnika sa sistemom
- backend implementira poslovna pravila i API sloj
- baza podataka trajno čuva podatke i odnose između entiteta
- dokumentacija opisuje odluke, plan i strukturu sistema

---

## Povezanost sa arhitekturom

Predložena struktura direktno prati ranije definisani **Architecture Overview**.

U tom artefaktu sistem je postavljen kao slojevita i modularna arhitektura sa sljedećim osnovnim slojevima:
- korisnički interfejs
- poslovna logika
- sloj za pristup podacima
- baza podataka

Isti princip je prenesen i u repozitorijsku strukturu. Zato su unutar skeletona jasno razdvojeni `frontend/`, `backend/`, `database/` i pomoćna dokumentacija.

Pored slojevitosti, u arhitekturi je naglašena i modularna podjela po glavnim poslovnim cjelinama sistema. Zbog toga i backend i frontend unutar sebe sadrže podjelu na module: korisnici, timovi, rezervacije, lige i rezultati.

Time struktura repozitorija ne služi samo kao tehnički foldering, nego i kao odraz domenskog modela sistema. To je posebno važno jer poslovna pravila rezervacija, prava pristupa i ažuriranja tabele ne bi smjela biti rasuta nepovezano kroz kod.

---

## Veza sa modelom baze podataka

Predložena struktura direktno je povezana sa modelom baze podataka u kojem su definisane ključne tabele sistema:
- `users`
- `teams`
- `team_members`
- `time_slots`
- `reservations`
- `leagues`
- `league_teams`
- `matches`
- `results`
- `standings`

Backend moduli, frontend moduli i SQL skripte u `database/` folderu zamišljeni su tako da podrže upravo ove entitete i odnose među njima.

---

## Osnovna struktura repozitorija

```text
repository-root/
├── sprint4/
│   ├── SprintGoal.md
│   ├── definitionOfDone.md
│   ├── initialReleasePlan.md
│   ├── projectStructure.md
│   └── technicalSetup.md
└── Projekat/
    ├── README.md
    ├── .gitignore
    ├── backend/
    │   ├── README.md
    │   ├── pom.xml
    │   └── src/
    │       ├── main/
    │       │   ├── java/
    │       │   │   └── ba/
    │       │   │       └── sportsmanager/
    │       │   │           ├── SportsManagerApplication.java
    │       │   │           ├── config/
    │       │   │           ├── controller/
    │       │   │           ├── service/
    │       │   │           ├── repository/
    │       │   │           ├── model/
    │       │   │           ├── dto/
    │       │   │           ├── security/
    │       │   │           ├── exception/
    │       │   │           └── modules/
    │       │   │               ├── users/
    │       │   │               ├── teams/
    │       │   │               ├── reservations/
    │       │   │               ├── leagues/
    │       │   │               └── results/
    │       │   └── resources/
    │       │       ├── application.properties
    │       │       └── data/
    │       └── test/
    ├── frontend/
    │   ├── README.md
    │   ├── package.json
    │   ├── public/
    │   └── src/
    │       ├── main.jsx
    │       ├── App.jsx
    │       ├── assets/
    │       ├── components/
    │       ├── pages/
    │       ├── services/
    │       ├── routes/
    │       ├── context/
    │       ├── utils/
    │       └── modules/
    │           ├── users/
    │           ├── teams/
    │           ├── reservations/
    │           ├── leagues/
    │           └── results/
    ├── database/
    │   ├── README.md
    │   ├── schema/
    │   │   └── init.sql
    │   └── seeds/
    │       └── seed.sql
    └── docs/
```

---

## Zašto je skeleton izdvojen iz foldera `sprint4/`

Folder `sprint4/` sadrži dokumentaciju i formalne deliverable-e Sprinta 4: sprint goal, definition of done, initial release plan, project structure i technical setup. To su artefakti koji opisuju šta je tim uradio i kako je planirao rad u ovoj fazi.

Folder `Projekat/` predstavlja stvarni tehnički prostor sa početnim skeletonom aplikacije. On nije artefakt jednog sprinta, nego početna osnova cijelog sistema koji se razvija kroz naredne sprintove.

Ovakva organizacija čini repozitorij preglednijim i pogodnijim za nastavak rada u Sprintu 5 i dalje.

---

## Backend dio skeletona

Backend je organizovan kao **Spring Boot** aplikacija sa Maven build sistemom.

### `pom.xml`

Maven konfiguracija sa osnovnim Spring Boot ovisnostima: `spring-boot-starter-web`, `spring-boot-starter-data-jpa`, `spring-boot-starter-security`, `postgresql` drajver i `jjwt` za JWT podršku.

### `SportsManagerApplication.java`

Ulazna tačka backend aplikacije. Sadrži `main` metodu koja pokreće Spring Boot kontekst.

### `config/`

Folder namijenjen konfiguracionim klasama: podešavanja CORS-a, Spring Security konfiguracija i JWT konfiguracija.

### `controller/`

Folder za REST kontrolere koji primaju HTTP zahtjeve i prosljeđuju ih servisnom sloju. U skeletu su prisutni prazni kontroleri za svaki modul.

### `service/`

Folder za servisne klase koje sadrže poslovnu logiku sistema. Ovdje se nalaze pravila rezervacija, validacija ovlaštenja i obračun tabele.

### `repository/`

Folder za JPA repozitorije koji posreduju između servisnog sloja i baze podataka kroz Spring Data.

### `model/`

Folder za JPA entitet klase koje odgovaraju tabelama u bazi podataka.

### `dto/`

Folder za Data Transfer Objekte koji se koriste za razmjenu podataka između kontrolera i klijenta, bez direktnog izlaganja domenskih modela.

### `security/`

Folder za sigurnosne komponente: JWT filter, korisničke detalje i pomoćne klase za autentifikaciju.

### `exception/`

Folder za upravljanje greškama: globalni exception handler i prilagođene exception klase.

### `modules/`

Folder koji grupira fajlove po poslovnim cjelinama sistema. Sadrži podmodule:
- `users/` — upravljanje korisnicima i ulogama
- `teams/` — upravljanje timovima i članovima
- `reservations/` — upravljanje terminima i rezervacijama
- `leagues/` — upravljanje ligama i utakmicama
- `results/` — unos rezultata i obračun tabele

### `resources/application.properties`

Konfiguracija baze podataka, porta servera, JWT parametara i Spring Security postavki.

---

## Frontend dio skeletona

Frontend je organizovan kao **React + Vite** aplikacija.

### `main.jsx`

Ulazna tačka frontend aplikacije.

### `App.jsx`

Centralna aplikaciona komponenta koja povezuje routing i osnovni prikaz aplikacije.

### `components/`

Višekratno upotrebljive UI komponente zajedničke za više dijelova sistema.

### `pages/`

Glavne stranice sistema: prijava, pregled timova, termini, rezervacije, lige, utakmice i rezultati.

### `services/`

Komunikacija sa backend API-jem. Sadrži funkcije za HTTP pozive prema Spring Boot serveru.

### `routes/`

Definisanje ruta i navigacije kroz aplikaciju.

### `context/`

Zajedničko stanje aplikacije: prijavljeni korisnik i njegova uloga.

### `utils/`

Pomoćne funkcije koje nisu vezane za samo jednu komponentu.

### `modules/`

Modularna organizacija frontend dijela po istim poslovnim cjelinama kao i backend:
- `users/`
- `teams/`
- `reservations/`
- `leagues/`
- `results/`

---

## Database dio skeletona

Folder `database/` sadrži SQL skripte direktno povezane sa modelom baze podataka.

### `database/schema/init.sql`

Početna SQL skripta za kreiranje strukture baze podataka. Sadrži definicije tabela, primarnih i stranih ključeva i ograničenja integriteta za sve entitete sistema: `users`, `teams`, `team_members`, `time_slots`, `reservations`, `leagues`, `league_teams`, `matches`, `results` i `standings`.

### `database/seeds/seed.sql`

Skripta za unos inicijalnih testnih podataka. Koristi se za lakšu demonstraciju i testiranje sistema u razvojnoj fazi.

---

## Kako struktura podržava glavne funkcionalne cjeline projekta

### Korisnici i autentifikacija

Predviđeni dijelovi: backend modul `users`, sigurnosni paket `security/`, tabela `users` u bazi, frontend modul `users` i `context/` za globalni auth state.

### Timovi i članstvo

Predviđeni dijelovi: backend modul `teams`, tabele `teams` i `team_members`, frontend modul `teams`.

### Termini i rezervacije

Predviđeni dijelovi: backend modul `reservations` sa servisnom logikom za validaciju zauzetosti i konflikata, tabele `time_slots` i `reservations`, frontend modul `reservations`.

### Lige i utakmice

Predviđeni dijelovi: backend modul `leagues`, tabele `leagues`, `league_teams` i `matches`, frontend modul `leagues`.

### Rezultati i tabela

Predviđeni dijelovi: backend modul `results` sa logikom obračuna bodova i gol-razlike, tabele `results` i `standings`, frontend modul `results`.

---

## Šta ova struktura još ne predstavlja

Ova struktura ne znači da su sve funkcionalnosti implementirane. Ona pokazuje postavljene foldere, osnovne ulazne tačke, konfiguracione fajlove i mjesta na kojima će biti razvijana logika sistema. To je u skladu sa svrhom Sprinta 4, koji je prijelaz između analitičke human-first faze i implementacione AI-enabled faze.

Skeleton pokazuje spremnost za razvoj, a ne završetak razvoja.

---

## Zaključna napomena

Predložena struktura direktno je usklađena sa definisanom arhitekturom sistema, modelom baze podataka i glavnim funkcionalnim cjelinama projekta. Zahvaljujući tome, struktura nije samo formalni sprint artefakt, nego stvarna tehnička osnova za implementaciju MVP verzije sistema u narednim sprintovima.
