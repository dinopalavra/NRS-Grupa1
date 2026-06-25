# Final AI Usage Summary

**Projekat:** Sports Manager  
**Datum:** 25.06.2026.  
**Korišteni AI alat:** Claude (Anthropic) — modeli claude-sonnet-4-6

---

## 1. Za šta je AI korišten

AI asistent je korišten u sljedećim kategorijama:

### A. Generisanje koda
- React komponente (Pagination, kalendar CSS klase, filter UI)
- CSS stilovi (dark tema, responzivni breakpointi, select dropdown popravke)
- Integracija paginacije u postojeće stranice (ReservationsPage, TimeSlotsPage, UserModule, TeamModule)
- Docker konfiguracija (docker-compose.yml, frontend Dockerfile, nginx.conf, deploy.sh)

### B. Refaktorisanje koda
- Migracija CalendarPage s inline stilova na CSS klase
- Zamjena column-hiding CSS pravila s overflow-x scroll pristupom za responzivnost

### C. Savjetovanje i planiranje
- Savjeti za sadržaj Sprint 11 (šta još uraditi prije završetka projekta)
- Odabir deployment strategije (Docker Compose vs GitHub Actions vs shell skripta)
- Trade-off analize za tehničke odluke

---

## 2. Šta je prihvaćeno bez izmjena

| Stavka | Opis |
|---|---|
| Pagination.jsx komponenta | Reusable komponenta s ellipsis logikom, prihvaćena kompletno od prvog pokušaja |
| Paginacija u TimeSlotsPage | Import, state, useMemo, reset — sve ispravno |
| Paginacija u UserModule | Search + role filter + paginacija — kompletno ispravno |
| Paginacija u TeamModule | Search + sport filter + paginacija — kompletno ispravno |
| Login select CSS fix | `select.input` sa zlatnom SVG strelicom i `color-scheme: dark` — ispravno od prvog pokušaja |
| CalendarPage CSS migracija | Zamjena inline stilova CSS klasama — ispravno |
| Docker Compose setup | Kompletna orkestracija 3 servisa — ispravno |

---

## 3. Šta je izmijenjeno nakon AI generisanja

| Stavka | AI izlaz | Korekcija | Razlog |
|---|---|---|---|
| Paginacija u ReservationsPage | Ternarna grana s dva JSX siblinga bez wrappera | Dodat `<>...</>` Fragment wrapper | JSX zahtijeva jedan root element; AI je propustio ovo u kompleksnoj ternarnoj strukturi |
| Responzivnost liga-match-teams | AI primijenio `flex-direction: column` | Promijenjeno na `gap` i `padding` pristup | Selektor koristi `display: grid`, ne `display: flex` — flex direktive nemaju efekta na grid |

---

## 4. Šta je odbačeno

| Stavka | Razlog odbacivanja |
|---|---|
| Skrivanje kolona tabele na mobilnom | AI inicijalno predložio `nth-child(n+4) { display: none }` za mobilni prikaz, ali to je sakrivalo Status kolonu koja je bitna korisniku. Umjesto toga korišten `overflow-x: auto` horizontalni scroll. |
| Skrivanje away tima na mobilnom | AI predložio da se sakrije gostujući tim u liga kartici radi uštede prostora. Odbačeno jer prikazivanje obje ekipe je esencijalna informacija. |

---

## 5. Greške koje je AI napravio

| Greška | Kontekst | Uticaj | Kako je otkrivena |
|---|---|---|---|
| JSX multiple siblings bez Fragment-a | Dodavanje `pagination-info` div-a i `Pagination` komponente u ternarnu granu koja već ima `<div>` | Build error: `Expected "}" but found "."` | Vite build odmah prijavio sintaksnu grešku |
| Pogrešan CSS pristup (flex na grid elementu) | `.liga-match-teams` koristi `display: grid`, ali AI primijenio `flex-direction: column` | Nema vizuelnog efekta — CSS pravilo se ignorira jer element nije flex | Vizualna inspekcija u browseru — kartice su ostale nepromijenjene |

Obje greške su male tehničke propuste, ne konceptualni problemi. Ispravljene su u istoj sesiji bez gubitka funkcionalnosti.

---

## 6. Dijelovi sistema razvijani uz AI pomoć

Sljedeći dijelovi sistema su potpuno ili djelimično generisani uz AI pomoć i tim ih mora znati objasniti:

### Potpuno AI-generirano (uz pregled tima)

| Fajl / Komponenta | Što radi | Ključni koncepti za objašnjenje |
|---|---|---|
| `components/Pagination.jsx` | Reusable paginacija s ellipsis | `Math.ceil(total/pageSize)`, niz stranica s `"..."`, `disabled` prop na granicama |
| `frontend/Dockerfile` | Multi-stage build: Node → Nginx | `ARG` za build-time varijablu, `COPY --from=build`, Nginx config |
| `frontend/nginx.conf` | Reverse proxy za API | `proxy_pass` na backend kontejner, `try_files` za SPA fallback |
| `docker-compose.yml` | Orkestracija 3 servisa | `healthcheck`, `depends_on` s `condition`, Docker volumes, environment variables |
| `deploy.sh` | Automatizovani deployment | `set -euo pipefail`, health check loop, `curl` provjera |

### AI-asistirane modifikacije postojećeg koda

| Fajl | Promjena | Ključni koncepti |
|---|---|---|
| `ReservationsPage.jsx` | Dodana paginacija | `useState`, `useMemo` s `slice()`, reset `page` pri filteru |
| `TimeSlotsPage.jsx` | Dodana paginacija | Isti pattern kao Reservations |
| `UserModule.jsx` | Search + filter + paginacija | `filteredUsers` chain: search → role filter → paginate |
| `TeamModule.jsx` | Paginacija | `paginatedTeams = useMemo(slice)` |
| `CalendarPage.jsx` | Inline → CSS klase | `className` umjesto `style={{}}`, omogućava media query override |
| `styles.css` | Responzivni breakpointi | `@media (max-width: 768px)` i `520px` pravila za kalendar, tabele, kartice |

---

## 7. Transparentnost i kritički osvrt

### Prednosti korištenja AI-ja
- **Brzina** — paginacija na 4 stranice implementirana za ~30 minuta umjesto ručnih 2-3 sata
- **Konzistentnost** — isti pattern (PAGE_SIZE, useMemo, reset) primjenjen uniformno
- **Docker setup** — kompletan multi-container deployment konfigurisan bez prethodnog Docker iskustva

### Ograničenja i rizici
- AI ne poznaje specifičnu CSS strukturu projekta — pretpostavio je `flex` umjesto `grid` za liga kartice
- AI ponekad propusti JSX sintaksna pravila u kompleksnim ternarnim izrazima
- **Tim MORA razumjeti svaki generirani kod** — AI je alat, ne zamjena za razumijevanje

### Statistika korištenja

| Metrika | Vrijednost |
|---|---|
| Ukupno AI sesija | ~15 |
| Generisani fajlovi | 10+ (komponente, CSS, Docker) |
| Modificirani postojeći fajlovi | 8 |
| Korekcije potrebne | 2 od ~15 interakcija (~13%) |
| Odbačeni prijedlozi | 2 |
