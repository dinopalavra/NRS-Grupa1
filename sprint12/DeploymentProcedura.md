# Deployment procedura

**Projekat:** Sports Manager — Sistem za upravljanje sportskim terminima i ligama  
**Datum:** 25.06.2026.

---

## 1. Naziv aplikacije i arhitektura

**Sports Manager** je web aplikacija s troslojnom arhitekturom:

- **Frontend** — React 18 SPA (Single Page Application), servirana putem Nginx-a
- **Backend** — Spring Boot 3.3.5 REST API (Java 17)
- **Baza podataka** — PostgreSQL 15

Sva tri sloja se pokreću kao Docker kontejneri orkestrirani putem Docker Compose.

---

## 2. Tehnologije

| Komponenta | Tehnologija | Verzija |
|---|---|---|
| Backend | Java (Eclipse Temurin) | 17 |
| Backend framework | Spring Boot | 3.3.5 |
| Build tool | Apache Maven | 3.9.8 |
| Frontend | React | 18.3.1 |
| Frontend build | Vite | 5.4.8 |
| Baza podataka | PostgreSQL | 15 |
| Kontejnerizacija | Docker + Docker Compose | 20+ |
| Web server (frontend) | Nginx | Alpine |
| Autentikacija | JWT (jjwt) | 0.11.5 |

---

## 3. Potrebni alati i verzije

Za pokretanje kompletnog sistema potrebno je instalirati:

| Alat | Minimalna verzija | Download |
|---|---|---|
| **Docker Desktop** | 4.0+ | https://www.docker.com/products/docker-desktop |
| **Git** | 2.0+ | https://git-scm.com/downloads |

Docker Desktop uključuje Docker Engine i Docker Compose — ništa drugo nije potrebno za pokretanje.

Za **lokalni razvoj bez Docker-a** dodatno su potrebni:
| Alat | Verzija |
|---|---|
| Java JDK | 17+ |
| Node.js | 18+ |
| npm | 9+ |
| Maven | 3.9+ (ili koristiti ugrađeni `mvnw`) |

---

## 4. Environment varijable

### Backend (Spring Boot)

| Varijabla | Opis | Primjer | Obavezna |
|---|---|---|---|
| `SPRING_DATASOURCE_URL` | JDBC URL za PostgreSQL | `jdbc:postgresql://db:5432/sportsmanager` | Da |
| `SPRING_DATASOURCE_USERNAME` | Korisničko ime za bazu | `sportsmanager` | Da |
| `SPRING_DATASOURCE_PASSWORD` | Lozinka za bazu | `sportsmanager123` | Da |
| `JWT_SECRET` | Tajni ključ za JWT potpisivanje (min 32 znaka) | `my-secret-key-at-least-32-chars` | Da |
| `JWT_EXPIRATION` | Trajanje JWT tokena u milisekundama | `86400000` (24h) | Ne (default: 86400000) |
| `PORT` | Port na kojem backend sluša | `8080` | Ne (default: 8080) |
| `APP_CORS_ALLOWED_ORIGINS` | Dozvoljeni CORS origini | `http://localhost:3000` | Ne (default: http://localhost:5173) |

### Frontend (Vite)

| Varijabla | Opis | Primjer | Obavezna |
|---|---|---|---|
| `VITE_API_BASE_URL` | Base URL za backend API | `http://localhost:8080` | Ne (default: http://localhost:8080) |

**Napomena:** U Docker Compose setup-u frontend koristi Nginx reverse proxy (`/api/` → backend:8080), pa `VITE_API_BASE_URL` treba biti prazan string (`""`).

---

## 5. Pokretanje putem Docker Compose (preporučeno)

Ovo je najjednostavniji način da se pokrene kompletni sistem.

### Korak 1 — Klonirati repozitorij

```bash
git clone https://github.com/dinopalavra/NRS-Grupa1.git
cd NRS-Grupa1/projekat
```

### Korak 2 — Pokrenuti deploy skriptu

**Linux/macOS:**
```bash
chmod +x deploy.sh
./deploy.sh
```

**Windows (Git Bash):**
```bash
bash deploy.sh
```

**Ili direktno putem Docker Compose:**
```bash
docker compose up --build -d
```

### Korak 3 — Pristupiti aplikaciji

| Servis | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:8080 |
| PostgreSQL | localhost:5432 (baza: `sportsmanager`) |

### Korak 4 — Prijaviti se

Demo kredencijali (kreirani iz seed podataka):

| Uloga | Username | Password |
|---|---|---|
| ADMIN | admin | admin123 |
| MANAGER | manager | manager123 |

Ili se registrovati putem forme na Login stranici.

### Zaustavljanje sistema

```bash
cd projekat
docker compose down
```

Za brisanje svih podataka (uključujući bazu):
```bash
docker compose down -v
```

---

## 6. Lokalno pokretanje backend-a (bez Docker-a)

### Opcija A: S H2 in-memory bazom (najjednostavnije)

```bash
cd projekat/backend
mvn spring-boot:run -Dspring-boot.run.profiles=local
```

Backend će koristiti H2 in-memory bazu (prazna pri svakom pokretanju).  
H2 Console dostupna na: http://localhost:8080/h2-console  
JDBC URL: `jdbc:h2:mem:sportsmanager`

### Opcija B: S lokalnim PostgreSQL-om

1. Instalirati PostgreSQL i kreirati bazu:
```sql
CREATE DATABASE sportsmanager;
CREATE USER sportsmanager WITH PASSWORD 'sportsmanager123';
GRANT ALL PRIVILEGES ON DATABASE sportsmanager TO sportsmanager;
```

2. Pokrenuti init skriptu:
```bash
psql -U sportsmanager -d sportsmanager -f projekat/database/schema/init.sql
psql -U sportsmanager -d sportsmanager -f projekat/database/seeds/seed.sql
```

3. Postaviti environment varijable i pokrenuti:
```bash
export SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/sportsmanager
export SPRING_DATASOURCE_USERNAME=sportsmanager
export SPRING_DATASOURCE_PASSWORD=sportsmanager123
export JWT_SECRET=local-dev-only-secret-key-must-be-at-least-32-chars-long-1234567890

cd projekat/backend
mvn spring-boot:run
```

Backend dostupan na: http://localhost:8080

---

## 7. Lokalno pokretanje frontend-a (bez Docker-a)

```bash
cd projekat/frontend
npm install
npm run dev
```

Frontend dostupan na: http://localhost:5173

Vite dev server automatski proxy-ira API pozive na `http://localhost:8080` (konfigurirano u `.env.local`).

Za produkcijski build:
```bash
npm run build
npm run preview    # Pregled build-a na http://localhost:4173
```

---

## 8. Pokretanje baze podataka

### Putem Docker Compose (uključeno u `docker compose up`)

Baza se automatski kreira i inicijalizira pomoću:
- `database/schema/init.sql` — kreira tabele
- `database/seeds/seed.sql` — ubacuje početne podatke

### Ručno pokretanje PostgreSQL kontejnera

```bash
docker run -d \
  --name sportsmanager-db \
  -e POSTGRES_DB=sportsmanager \
  -e POSTGRES_USER=sportsmanager \
  -e POSTGRES_PASSWORD=sportsmanager123 \
  -p 5432:5432 \
  -v ./database/schema/init.sql:/docker-entrypoint-initdb.d/01-schema.sql \
  -v ./database/seeds/seed.sql:/docker-entrypoint-initdb.d/02-seed.sql \
  postgres:15-alpine
```

---

## 9. Migracije i seed podaci

**Migracije:**  
Hibernate koristi `ddl-auto=update` strategiju — automatski kreira i ažurira tabele prema JPA entitetima. Inicijalni SQL schema (`init.sql`) koristi se samo za prvi setup baze u Docker-u.

**Seed podaci:**  
Fajl `database/seeds/seed.sql` sadrži:
- 3 demo korisnika (admin, manager, amel)
- 3 tima (FK Akademija, KK Centar, OK Mostar)
- 3 vremenska termina
- 1 liga (Studentska liga FBiH 2025/2026)
- 2 zakazane utakmice

Seed koristi `ON CONFLICT DO NOTHING` za idempotentne inserte — može se pokrenuti više puta bez duplikata.

---

## 10. Pokretanje testova

### Backend testovi (JUnit 5 + Mockito)

```bash
cd projekat/backend
mvn test
```

Testovi koriste H2 in-memory bazu i ne zahtijevaju PostgreSQL.

Postojeći test fajlovi:
- `LeagueServiceTest.java`
- `NotificationServiceTest.java`
- `ReservationServiceTest.java`
- `ResultsServiceTest.java`
- `TeamServiceTest.java`
- `TimeSlotServiceTest.java`
- `UserServiceTest.java`

### Frontend testovi (Vitest + Testing Library)

```bash
cd projekat/frontend
npm test          # Watch mode
npm run test:run  # Jedanput pokreni sve testove
```

Postojeći test fajlovi:
- `AppRouter.test.jsx`
- `ReservationsPage.test.jsx`

---

## 11. Produkcijski / Cloud deployment

Sistem je primarno dizajniran za Docker Compose lokalni deployment. Za cloud deployment moguće opcije:

| Servis | Backend | Frontend | Baza |
|---|---|---|---|
| **Railway** | Docker container | Static site | Managed PostgreSQL |
| **Render** | Docker web service | Static site | Managed PostgreSQL |
| **AWS** | EC2 + Docker | S3 + CloudFront | RDS PostgreSQL |
| **DigitalOcean** | App Platform | App Platform | Managed Database |

Za cloud deployment potrebno je:
1. Kreirati managed PostgreSQL instancu
2. Deployati backend Docker image s env varijablama za bazu
3. Buildati frontend s `VITE_API_BASE_URL` koji pokazuje na backend URL
4. Konfigurirati CORS na backendu da dozvoli frontend domain

---

## 12. Link na deployment

Trenutno ne postoji javno dostupan cloud deployment. Sistem se pokreće lokalno putem Docker Compose.

---

## 13. Poznata ograničenja deploymenta

- **Docker Desktop** je potreban na korisnikovom računaru (nije preinstaliran na svim sistemima)
- **Port konflikti** — ako je port 3000, 8080 ili 5432 zauzet drugim servisima, potrebno je promijeniti portove u `docker-compose.yml`
- **Prvi build traje dugo** — Maven download zavisnosti (~5-10 min prvi put); naknadni buildovi su brži zahvaljujući Docker cacheu
- **RAM** — Docker Compose s tri kontejnera zahtijeva ~2GB RAM-a
- **Seed podaci** koriste plain text lozinke u bazi (akademski setup) — u produkciji bi se koristili BCrypt hashevi

---

## 14. Najčešći problemi pri pokretanju i rješenja

| Problem | Uzrok | Rješenje |
|---|---|---|
| `port is already allocated` | Port 3000/8080/5432 zauzet | Zaustaviti konfliktirajući servis ili promijeniti port u `docker-compose.yml` |
| Backend ne može spojiti na bazu | DB kontejner nije spreman | Docker Compose `healthcheck` rješava ovo automatski; ako ručno pokrenete, sačekajte 10s |
| `mvn: command not found` | Maven nije instaliran | Koristiti `./mvnw` (wrapper) umjesto `mvn` ili instalirati Maven |
| Frontend prikazuje "Backend nedostupan" | Backend nije pokrenut ili CORS blokira | Provjeriti da backend radi na :8080; provjeriti `APP_CORS_ALLOWED_ORIGINS` |
| Docker build pada na Maven | Nedovoljno RAM-a za Docker | Povećati Docker Desktop memory limit na minimum 4GB |
| `npm install` pada | Stara verzija Node.js | Instalirati Node.js 18+ |
| H2 baza prazna nakon restarta | H2 je in-memory (local profil) | Očekivano ponašanje; koristiti PostgreSQL za perzistenciju |
