# Technical Setup

## Uvod

Ovaj dokument opisuje osnovni tehnički setup projekta *Sistem za upravljanje sportskim terminima i ligama* u okviru Sprinta 4.

Njegova svrha nije da predstavi završenu implementaciju sistema, nego da definiše početnu tehničku osnovu na kojoj će se graditi naredni sprintovi. U ovoj fazi fokus nije na punoj realizaciji funkcionalnosti, nego na uspostavljanju pregledne i održive tehničke strukture koja je usklađena sa ranije definisanom arhitekturom sistema, modelom baze podataka i project structure dokumentom.

Sprint 4 predstavlja prijelaz iz analitičke i planske faze projekta u početnu tehničku pripremu za implementaciju. Zbog toga je važno da tim ne postavi samo pojedinačne fajlove i foldere, nego da jasno definiše kako su organizovani backend, frontend, baza podataka i pomoćna dokumentacija, koje su osnovne tehnologije izabrane i na koji način tehnička organizacija podržava glavne funkcionalne cjeline sistema.

---

## Cilj tehničkog setupa

Cilj tehničkog setupa u ovom sprintu je da se uspostavi stabilna i pregledna osnova za dalji razvoj full-stack web aplikacije.

To konkretno znači da projekat na kraju Sprinta 4 treba imati:
- jasno organizovan repozitorij
- razdvojene sprint artefakte i tehnički skeleton aplikacije
- definisane glavne tehničke cjeline sistema
- početne konfiguracione i ulazne fajlove
- osnovu za dalji razvoj backend, frontend i database dijela

Ovakav pristup je posebno važan jer sistem obuhvata više međusobno povezanih poslovnih cjelina, uključujući korisnike, timove, termine, rezervacije, lige, utakmice, rezultate i tabelu. Bez unaprijed postavljenog tehničkog okvira, dalji razvoj bi lako mogao postati nepregledan, neusklađen i teško održiv.

---

## Organizacija repozitorija

U skladu sa trenutnim project structure dokumentom, repozitorij je organizovan tako da se jasno razdvoje sprint artefakti od stvarnog skeletona aplikacije.

Na vrhu repozitorija nalaze se dva glavna dijela:
- sprint4/
- Projekat/

Folder sprint4/ sadrži formalne artefakte Sprinta 4:
- SprintGoal.md
- definitionOfDone.md
- initialReleasePlan.md
- projectStructure.md
- technicalSetup.md

Folder Projekat/ predstavlja stvarni tehnički skeleton aplikacije i sadrži:
- README.md
- .gitignore
- backend/
- frontend/
- database/
- docs/

Ovakva podjela je važna zato što sprint dokumentacija i tehnička osnova aplikacije nemaju istu svrhu. Folder sprint4/ dokumentuje šta je urađeno u ovom sprintu, dok folder Projekat/ predstavlja početnu verziju stvarne aplikacije koja će se dalje razvijati u narednim sprintovima.

---

## Tehnološki stack

Na osnovu trenutno usvojene strukture projekta, tehnička osnova sistema zasniva se na sljedećem stacku:

| Sloj | Tehnologija |
|---|---|
| Backend | Java + Spring Boot |
| Frontend | React + Vite |
| Baza podataka | PostgreSQL |
| Build alat za backend | Maven |
| Autentifikacija | Spring Security + JWT |

Ovaj izbor tehnologija odgovara planiranoj slojevitoj i modularnoj arhitekturi sistema. Backend tehnologije omogućavaju implementaciju poslovne logike, API sloja i pristupa podacima, frontend tehnologije omogućavaju razvoj korisničkog interfejsa, a PostgreSQL pruža relacijsku osnovu za rad sa entitetima i vezama definisanim modelom baze podataka.

---

## Usklađenost sa arhitekturom

Tehnički setup direktno prati prethodno definisani Architecture Overview dokument. Sistem je planiran kao slojevita i modularna aplikacija u kojoj su razdvojeni:
- korisnički interfejs
- poslovna logika
- sloj za pristup podacima
- baza podataka

Ovaj princip prenesen je i u tehničku organizaciju projekta.

Backend dio sistema preuzima odgovornost za poslovnu logiku, validacije, kontrolu prava pristupa i komunikaciju sa bazom podataka. Frontend dio sistema zadužen je za prikaz podataka, forme, navigaciju i interakciju korisnika sa funkcionalnostima sistema. Database dio sadrži SQL skripte i početnu osnovu za strukturu baze podataka.

Pored slojevitosti, tehnički setup poštuje i modularnu podjelu po poslovnim cjelinama sistema. Zbog toga su i backend i frontend organizovani tako da podrže module za korisnike, timove, rezervacije, lige i rezultate.

---

## Backend setup

Backend dio sistema nalazi se u folderu Projekat/backend/ i organizovan je kao *Spring Boot* aplikacija sa Maven build sistemom.

Njegova osnovna svrha je da omogući:
- implementaciju poslovne logike sistema
- obradu HTTP zahtjeva kroz REST API
- validaciju pravila sistema
- kontrolu autentifikacije i autorizacije
- pristup podacima i komunikaciju sa bazom podataka

### Osnovni backend fajlovi

Backend skeleton predviđa sljedeće ključne fajlove i lokacije:

- Projekat/backend/README.md — opis backend dijela projekta
- Projekat/backend/pom.xml — Maven konfiguracija projekta
- Projekat/backend/src/main/java/ba/sportsmanager/SportsManagerApplication.java — ulazna tačka backend aplikacije
- Projekat/backend/src/main/resources/application.properties — osnovna konfiguracija backend sistema

### Organizacija Java paketa

Unutar src/main/java/ba/sportsmanager/ backend je organizovan kroz više foldera sa jasno definisanom namjenom:

- config/ — konfiguracione klase, npr. CORS, sigurnosna i aplikaciona podešavanja
- controller/ — REST kontroleri koji primaju zahtjeve i prosljeđuju ih servisnom sloju
- service/ — poslovna logika sistema
- repository/ — pristup podacima i komunikacija sa bazom podataka kroz JPA repozitorije
- model/ — entiteti i domenski modeli
- dto/ — objekti za razmjenu podataka između slojeva i prema klijentu
- security/ — autentifikacija, autorizacija i pomoćne sigurnosne komponente
- exception/ — centralizovano upravljanje greškama i izuzecima
- modules/ — poslovna modularizacija sistema

### Backend moduli

Folder modules/ dodatno grupiše backend kod po glavnim poslovnim cjelinama sistema:
- users/
- teams/
- reservations/
- leagues/
- results/

Ovakva organizacija omogućava da se slojevita arhitektura i domenska modularnost kombinuju u istoj tehničkoj strukturi. Time backend nije organizovan samo po tehničkim slojevima, nego i po funkcionalnim cjelinama koje prate zahtjeve sistema.

### Backend konfiguracija

Osnovni konfiguracioni setup predviđa da se u application.properties definišu:
- naziv aplikacije
- port servera
- parametri konekcije prema PostgreSQL bazi
- osnovne JPA postavke
- osnovni JWT parametri za razvojnu fazu

U ovoj fazi cilj nije potpuna sigurnosna konfiguracija, nego postavljanje minimalne tehničke osnove na kojoj se sigurnosni i API sloj mogu dalje razvijati.

---

## Frontend setup

Frontend dio sistema nalazi se u folderu Projekat/frontend/ i organizovan je kao *React + Vite* aplikacija.

Njegova osnovna svrha je da omogući korisnicima interakciju sa sistemom kroz forme, prikaze podataka i navigaciju između glavnih funkcionalnosti sistema.

### Osnovni frontend fajlovi

Frontend skeleton predviđa sljedeće ključne fajlove:
- Projekat/frontend/README.md — opis frontend dijela projekta
- Projekat/frontend/package.json — osnovna konfiguracija i zavisnosti frontend projekta
- Projekat/frontend/src/main.jsx — ulazna tačka frontend aplikacije
- Projekat/frontend/src/App.jsx — centralna aplikaciona komponenta

### Organizacija frontend strukture

Unutar src/ frontend je organizovan na pregledan način kroz više odgovornosti:

- assets/ — slike, ikone i drugi statički resursi
- components/ — višekratno upotrebljive UI komponente
- pages/ — glavne stranice sistema
- services/ — komunikacija sa backend API-jem
- routes/ — definisanje navigacije i ruta
- context/ — zajedničko stanje aplikacije, npr. prijavljeni korisnik i auth stanje
- utils/ — pomoćne funkcije
- modules/ — poslovna modularizacija frontend dijela

### Frontend moduli

Folder modules/ prati iste glavne poslovne cjeline kao i backend:
- users/
- teams/
- reservations/
- leagues/
- results/

Time se postiže bolja usklađenost između frontend i backend dijela sistema, što olakšava razvoj, preglednost i timsku saradnju.

### Frontend uloga u sistemu

Frontend je zamišljen tako da ne sadrži složenu poslovnu logiku, nego da služi kao korisnički interfejs koji komunicira sa backend API slojem. Na taj način poštuje se osnovni princip arhitekture da validacije i ključna pravila sistema budu centralizovani u backend sloju.

---

## Setup baze podataka

Database dio sistema nalazi se u folderu Projekat/database/ i predstavlja početnu osnovu za relacijsku bazu podataka sistema.

Njegova uloga je da obezbijedi:
- početnu strukturu baze podataka
- relacije između glavnih entiteta sistema
- osnovu za testne i demonstracione podatke

### Organizacija database dijela

Folder database/ sadrži:
- README.md — opis database dijela projekta
- schema/ — SQL skripte za definisanje strukture baze
- seeds/ — SQL skripte za unos početnih podataka

Ključni fajlovi u ovoj fazi su:
- Projekat/database/schema/init.sql
- Projekat/database/seeds/seed.sql

### Usklađenost sa modelom baze podataka

Tehnički setup baze podataka direktno prati prethodno definisani model baze. Prema trenutnom modelu, sistem se zasniva na sljedećim glavnim tabelama:
- users
- teams
- team_members
- time_slots
- reservations
- leagues
- league_teams
- matches
- results
- standings

Ove tabele podržavaju glavne poslovne cjeline sistema i njihove međusobne odnose. Zbog toga database setup nije odvojen od ostatka tehničkog rješenja, nego je direktno povezan sa backend modulima i planiranom logikom sistema.

---

## Konfiguracioni i pomoćni fajlovi

Pored glavnih dijelova sistema, tehnički setup uključuje i niz pomoćnih fajlova koji omogućavaju uredniji i pregledniji razvoj.

### Projekat/.gitignore

Ovaj fajl služi za isključivanje lokalnih, build i privremenih fajlova iz verzionisanja. Njegova svrha je da repozitorij ostane čist i da se u Git ne uključuju fajlovi koji nisu dio stvarnog izvornog koda ili dokumentacije.

### README.md fajlovi

U okviru projekta predviđeni su posebni README fajlovi za glavni projekat, backend, frontend i database dio. Njihova svrha je da članovima tima olakšaju snalaženje u strukturi projekta i da ukratko opišu ulogu svakog dijela sistema.

### docs/

Folder Projekat/docs/ služi kao prostor za pomoćnu tehničku dokumentaciju vezanu uz samu aplikaciju. U ovoj fazi može ostati minimalan, ali je važno da postoji kao predviđeno mjesto za internu tehničku dokumentaciju tokom narednih sprintova.

---

## Standardi rada tima

Da bi ovakav tehnički setup bio održiv i koristan u narednim sprintovima, tim treba poštovati nekoliko osnovnih pravila rada.

### Verzije i repozitorij

Git repozitorij predstavlja centralno mjesto za verzionisanje projekta. Sve promjene trebaju biti evidentirane kroz commitove, a struktura projekta mora ostati usklađena sa dogovorenim project structure dokumentom.

### Dosljedno imenovanje

Nazivi foldera, paketa, fajlova i komponenti trebaju biti dosljedni i dovoljno jasni da se iz samog naziva može razumjeti njihova svrha.

### Razdvajanje odgovornosti

Frontend, backend i database dio ne trebaju se miješati, nego razvijati kao odvojene, ali povezane cjeline. Isto važi i unutar samog backend i frontend dijela, gdje moduli i slojevi trebaju ostati pregledno razdvojeni.

### Usklađenost sa artefaktima

Tehnička organizacija treba ostati usklađena sa Architecture Overview, Project Structure i modelom baze podataka. Time se osigurava da tehnički setup ne bude proizvoljan, nego zasnovan na već definisanim zahtjevima i projektnim odlukama.

### Dokumentovanje tehničkih odluka

Važnije tehničke odluke, naročito one koje utiču na strukturu projekta i način razvoja modula, trebaju biti dokumentovane kroz sprint artefakte i prateću tehničku dokumentaciju.

---

## Minimalni rezultat Sprinta 4

U okviru Sprinta 4 tehnički setup ne znači završenu aplikaciju niti potpunu implementaciju poslovnih funkcionalnosti.

Minimalni rezultat ovog sprinta je da projekat ima:
- pregledno organizovan repozitorij
- jasno razdvojene sprint artefakte i tehnički skeleton aplikacije
- osnovni backend, frontend i database setup
- početne konfiguracione i ulazne fajlove
- tehničku osnovu usklađenu sa arhitekturom sistema i modelom baze podataka

Drugim riječima, uspjeh ovog sprinta ne mjeri se time da sistem već radi kao gotov proizvod, nego time da je postavljena stabilna osnova za naredne implementacione sprintove.

---

## Zaključak

Tehnički setup definisan u ovom dokumentu predstavlja početni, ali veoma važan temelj za razvoj sistema *Sistem za upravljanje sportskim terminima i ligama*.

U odnosu na raniju verziju tehničke organizacije, sadašnji setup je usklađen sa trenutnim project structure dokumentom i jasno razlikuje sprint dokumentaciju u folderu sprint4/ od stvarnog skeletona aplikacije u folderu Projekat/.

Takva organizacija omogućava da se naredni sprintovi usmjere na implementaciju bez tehničke nepreglednosti, uz jasno razdvojene slojeve sistema, definisane module i dobru osnovu za dalji razvoj MVP verzije aplikacije.
