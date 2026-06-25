# Architecture / Technical Overview

**Projekat:** Sports Manager  
**Datum:** 25.06.2026.

---

## 1. Pregled arhitekture

Sports Manager koristi **troslojnu klijent-server arhitekturu**:

```
┌─────────────────────────────────────────────────────────┐
│                    KORISNIK (Browser)                    │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP (port 3000)
┌────────────────────────▼────────────────────────────────┐
│              FRONTEND (React + Nginx)                   │
│  - React 18 SPA                                         │
│  - Vite build tool                                      │
│  - Nginx reverse proxy (/api/ → backend)                │
│  - Docker kontejner                                     │
└────────────────────────┬────────────────────────────────┘
                         │ HTTP proxy (port 8080)
┌────────────────────────▼────────────────────────────────┐
│              BACKEND (Spring Boot REST API)              │
│  - Java 17 + Spring Boot 3.3.5                          │
│  - Spring Security + JWT autentikacija                  │
│  - Spring Data JPA + Hibernate ORM                      │
│  - BCrypt password hashing                              │
│  - Docker kontejner                                     │
└────────────────────────┬────────────────────────────────┘
                         │ JDBC (port 5432)
┌────────────────────────▼────────────────────────────────┐
│              BAZA PODATAKA (PostgreSQL 15)               │
│  - 10+ tabela (users, teams, reservations, leagues...)  │
│  - Hibernate auto-schema (ddl-auto=update)              │
│  - Docker kontejner s persistentnim volumenom           │
└─────────────────────────────────────────────────────────┘
```

**Nema vanjskih servisa** — sistem ne zavisi od trećih strana (nema SMTP, nema cloud API-ja, nema payment providera).

---

## 2. Glavne komponente / moduli

### Backend moduli

```
ba.sportsmanager/
├── config/           — SecurityConfig (CORS, BCrypt), JwtService (token gen/validate)
├── exception/        — GlobalExceptionHandler, BadRequest, Conflict, NotFound
├── common/           — SportType enum
└── modules/
    ├── users/        — AuthController, UserController, UserService, UserEntity
    │                   Autentikacija, registracija, profil, reset lozinke
    ├── teams/        — TeamController, TeamService, TeamEntity, TeamMemberEntity
    │                   CRUD timova, roster management, statistika
    ├── timeslots/    — TimeSlotController, TimeSlotService, TimeSlotEntity
    │                   Upravljanje vremenskim slotovima za terene
    ├── reservations/ — ReservationController, ReservationService, ReservationEntity
    │                   Rezervacije, tok odobrenja, ponavljajuće, komentari
    ├── leagues/      — LeagueController, LeagueService, LeagueEntity, LeagueTeamEntity
    │                   Kreiranje liga, upravljanje timovima u ligi
    ├── results/      — ResultsController, ResultsService, MatchEntity, StandingEntity
    │                   Utakmice, rezultati, tabele, golovi, top strijelci, CSV eksport
    └── notifications/— NotificationController, NotificationService, NotificationEntity
                        In-app obavijesti, badge count, označi pročitano
```

Svaki modul slijedi **Controller → Service → Repository → Entity** pattern:
- **Controller** — REST endpointi, prima HTTP zahtjeve i delegira servisu
- **Service** — Poslovna logika, validacija, koordinacija između repozitorija
- **Repository** — Spring Data JPA interface za pristup bazi
- **Entity** — JPA anotirana Java klasa koja mapira tabelu u bazi

### Frontend struktura

```
frontend/src/
├── context/AppContext.jsx  — Centralizirani state management (React Context)
│                             Auth state, svi podaci, 60+ CRUD metoda
├── services/api.js         — HTTP klijent, 40+ fetch poziva prema backend API-ju
├── routes/AppRouter.jsx    — Custom switch-based routing (ne koristi React Router)
├── components/             — Reusable UI komponente
│   ├── Layout.jsx          — Navigacija, sidebar, hamburger meni
│   ├── Pagination.jsx      — Paginacija s ellipsis logikom
│   ├── NotificationBell.jsx— Bell ikona s badge brojem
│   ├── DataTable.jsx       — Reusable tabela
│   ├── SectionCard.jsx     — Card wrapper
│   └── StatCard.jsx        — Statistička kartica
├── pages/                  — Stranice (po ruti)
│   ├── LoginPage.jsx       — Login, registracija, forgot/reset password
│   ├── DashboardPage.jsx   — Početna stranica sa statistikama
│   ├── UsersPage.jsx       — Korisnici (ADMIN only)
│   ├── TeamsPage.jsx       — Timovi
│   ├── TimeSlotsPage.jsx   — Termini
│   ├── ReservationsPage.jsx— Rezervacije
│   ├── LigaPage.jsx        — Lige i natjecanja
│   ├── CalendarPage.jsx    — Kalendarski prikaz
│   └── ProfilePage.jsx     — Korisnički profil
└── modules/                — Business logika po domeni
    ├── users/UserModule.jsx
    ├── teams/TeamModule.jsx
    ├── reservations/ReservationModule.jsx
    ├── leagues/LeagueModule.jsx
    └── results/ResultModule.jsx
```

---

## 3. Gdje se nalazi ključni kod

| Funkcionalnost | Backend fajl | Frontend fajl |
|---|---|---|
| Login/JWT | `config/JwtService.java`, `users/AuthController.java` | `pages/LoginPage.jsx`, `context/AppContext.jsx` |
| Timovi + roster | `teams/TeamService.java` | `modules/teams/TeamModule.jsx` |
| Rezervacije + tok odobrenja | `reservations/ReservationService.java` | `pages/ReservationsPage.jsx` |
| Liga tabela + rezultati | `results/ResultsService.java` | `pages/LigaPage.jsx` |
| Kalendar | — (koristi match + reservation endpointe) | `pages/CalendarPage.jsx` |
| Obavijesti | `notifications/NotificationService.java` | `components/NotificationBell.jsx` |
| Paginacija | — (klijentska) | `components/Pagination.jsx` |
| Stilovi / tema | — | `styles.css` (CSS custom properties) |
| Docker deployment | `backend/Dockerfile` | `frontend/Dockerfile`, `nginx.conf` |
| Orkestracija | `docker-compose.yml` | — |

---

## 4. Kako komponente komuniciraju

### Frontend → Backend komunikacija

```
React Component
    │
    ▼
AppContext (useCallback)
    │ poziva
    ▼
api.js (fetch wrapper)
    │ HTTP request + JWT Bearer token
    ▼
Spring Boot Controller
    │ delegira
    ▼
Spring Service (poslovna logika)
    │ koristi
    ▼
Spring Data JPA Repository
    │ SQL query
    ▼
PostgreSQL
```

1. **Korisnik** interaguje s React komponentom (klik, forma)
2. Komponenta poziva metodu iz **AppContext** (npr. `registerTeam()`)
3. AppContext poziva odgovarajuću funkciju iz **api.js** (npr. `createTeam()`)
4. api.js šalje **HTTP fetch** s JWT Bearer tokenom u Authorization headeru
5. Spring Boot **Controller** prima zahtjev i delegira **Service-u**
6. Service obavlja poslovnu logiku i koristi **Repository** za pristup bazi
7. Repository koristi Hibernate za generisanje SQL-a prema **PostgreSQL-u**
8. Response putuje nazad istim lancem do React komponente

### Docker Compose mrežna komunikacija

```
Browser → :3000 → Nginx (frontend kontejner)
                    │
                    ├── statički fajlovi (React build) → direktno servira
                    │
                    └── /api/* → proxy_pass → backend:8080 (interni Docker network)
                                                  │
                                                  └── JDBC → db:5432 (interni Docker network)
```

Frontend Nginx koristi **reverse proxy** za `/api/` putanje — prosljeđuje zahtjeve na backend kontejner putem Docker interne mreže. Ovo eliminira CORS probleme jer browser vidi samo jedan origin (localhost:3000).

---

## 5. Najvažnije sigurnosne odluke

| Odluka | Implementacija | Napomena |
|---|---|---|
| **JWT autentikacija** | `JwtService.java` — generisanje i validacija tokena s HMAC-SHA algoritmom | Token se čuva u localStorage na frontendu |
| **BCrypt hashiranje lozinki** | `SecurityConfig.java` → `BCryptPasswordEncoder` | Lozinke u bazi su hashirane, nikad plain text |
| **CORS konfiguracija** | Dozvoljeni origini se čitaju iz env varijable `APP_CORS_ALLOWED_ORIGINS` | Sprečava neovlaštene cross-origin zahtjeve |
| **CSRF onemogućen** | `csrf.disable()` u SecurityConfig | Prihvatljivo za stateless JWT API — nema server-side sessiona |
| **Stateless sessioni** | `SessionCreationPolicy.STATELESS` | Svaki zahtjev nosi JWT; nema server-side session statea |
| **API permitAll** | `authorizeHttpRequests(auth -> auth.anyRequest().permitAll())` | **Poznato ograničenje**: svi endpointi su javno dostupni; JWT se koristi za identifikaciju korisnika, ali Spring Security ne blokira neautorizirane zahtjeve. Frontend kontroliše pristup putem role-based UI-a. Za produkciju preporučuje se dodavanje JWT auth filtera. |

### Sigurnosna ograničenja (poznata)

- **JWT u localStorage** — podložan XSS napadima; sigurnija alternativa je HttpOnly cookie
- **permitAll() na svim rutama** — API ne provjerava autorizaciju na server strani; oslanja se na frontend
- **Seed lozinke u plain textu** — `seed.sql` sadrži plain text lozinke (ne BCrypt hasheve)
- **HTTPS nije konfigurisan** — lokalni Docker deployment koristi HTTP; za produkciju potreban TLS/SSL

---

## 6. Dijagram baze podataka

```
┌───────────┐       ┌──────────────┐       ┌───────────┐
│   users   │       │    teams     │       │ timeslots │
├───────────┤       ├──────────────┤       ├───────────┤
│ userid PK │◄──┐   │ teamid PK    │       │ slotid PK │
│ fullname  │   │   │ teamname     │       │ slotdate  │
│ email     │   │   │ city         │       │ starttime │
│ username  │   │   │ captainuserid│──►┐   │ endtime   │
│ password  │   │   │ sport        │   │   │ location  │
│ role      │   │   │ maxmembers   │   │   │ resource  │
│ sport     │   │   │ status       │   │   │ status    │
│ active    │   │   └──────┬───────┘   │   └─────┬─────┘
└───────────┘   │          │           │         │
                │   ┌──────▼───────┐   │   ┌─────▼──────────┐
                │   │ team_members │   │   │  reservations  │
                │   ├──────────────┤   │   ├────────────────┤
                │   │ id PK        │   │   │ reservationid  │
                │   │ teamid FK    │   │   │ teamid FK ─────┤──► teams
                │   │ userid FK ───┤───┘   │ slotid FK ─────┤──► timeslots
                │   │ jerseynumber │       │ createdby FK ──┤──► users
                │   │ position     │       │ status         │
                │   └──────────────┘       │ note           │
                │                          │ type           │
                │                          └───────┬────────┘
                │                                  │
                │                    ┌─────────────▼──────────┐
                │                    │ reservation_comments   │
                │                    ├────────────────────────┤
                │                    │ id PK                  │
                │                    │ reservationid FK       │
                │                    │ userid FK ─────────────┤──► users
                │                    │ content                │
                │                    │ createdat              │
                │                    └────────────────────────┘

┌───────────┐       ┌──────────────┐       ┌───────────────┐
│  leagues  │       │   matches    │       │  standings    │
├───────────┤       ├──────────────┤       ├───────────────┤
│ leagueid  │◄──┐   │ matchid PK   │       │ standingid PK │
│ leaguename│   ├───│ leagueid FK  │   ┌───│ leagueid FK   │
│ season    │   │   │ hometeamid FK│──►│   │ teamid FK     │
│ status    │   │   │ awayteamid FK│──►│   │ played,wins   │
└───────────┘   │   │ matchdate    │   │   │ draws,losses  │
                │   │ status       │   │   │ goalsfor/ag.  │
┌───────────┐   │   │ homescore    │   │   │ points        │
│league_teams│  │   │ awayscore    │   │   └───────────────┘
├───────────┤   │   └──────┬───────┘   │
│ id PK     │   │          │           │
│ leagueid  │───┘   ┌──────▼───────┐   │
│ teamid    │──►    │    goals     │   │
└───────────┘       ├──────────────┤   │
                    │ id PK        │   │
                    │ matchid FK   │   │
                    │ scoreruserid │───┘
                    │ teamid FK    │
                    │ minute       │
                    └──────────────┘

┌──────────────────┐     ┌─────────────────────────┐
│  notifications   │     │ password_reset_tokens    │
├──────────────────┤     ├─────────────────────────┤
│ id PK            │     │ id PK                   │
│ userid FK ───────┤──►  │ userid FK               │
│ type             │     │ token                   │
│ message          │     │ expiry                  │
│ read             │     └─────────────────────────┘
│ createdat        │
└──────────────────┘
```

---

## 7. Tehnologije — kompletna lista

| Sloj | Tehnologija | Verzija | Svrha |
|---|---|---|---|
| Backend runtime | Java (Eclipse Temurin) | 17 | JVM za Spring Boot |
| Backend framework | Spring Boot | 3.3.5 | REST API, DI, auto-konfiguracija |
| ORM | Hibernate (Spring Data JPA) | 6.x | Mapiranje Java objekata na SQL tabele |
| Security | Spring Security | 6.x | CORS, BCrypt, auth konfiguracija |
| JWT | jjwt (io.jsonwebtoken) | 0.11.5 | Generisanje i validacija JWT tokena |
| Build (backend) | Apache Maven | 3.9.8 | Dependency management i build |
| Baza (produkcija) | PostgreSQL | 15 | Relaciona baza podataka |
| Baza (razvoj) | H2 Database | 2.x | In-memory baza za lokalni razvoj |
| Frontend library | React | 18.3.1 | UI komponente |
| Frontend build | Vite | 5.4.8 | Dev server i produkcijski build |
| Frontend testovi | Vitest | 2.1.3 | Test runner |
| Testing Library | @testing-library/react | 16.0.1 | Component testing |
| Web server | Nginx | Alpine | Serviranje frontend builda i reverse proxy |
| Kontejnerizacija | Docker + Docker Compose | 20+ | Orkestracija svih servisa |
