# Decision Log
## Sprint 11

**Datum:** 08.06.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Odluka #001 — Klijentska paginacija umjesto server-side paginacije

| Polje | Opis |
|---|---|
| ID odluke | DL11-001 |
| Datum | 08.06.2026. |
| Kratak naziv odluke | Paginacija implementirana na frontend strani (slice niza) umjesto backend paginacije |
| Opis problema | Stranice s dugačkim listama (Rezervacije, Termini, Korisnici) prikazivale su sve podatke odjednom, što je pri većem broju unosa rezultiralo dugim skrolovanjem i lošom preglednošću. |
| Razmatrane opcije | 1. Server-side paginacija — `Page<T>` u Spring-u, `?page=0&size=10` parametri, backend vraća samo traženi subset  2. Klijentska paginacija — svi podaci se učitaju jednom, frontend slicuje niz po stranicama |
| Odabrana opcija | Klijentska paginacija (frontend slice) |
| Razlog izbora | Sistem je akademskog karaktera s malim skupom podataka. Svi podaci se već učitavaju pri pokretanju aplikacije i čuvaju u kontekstu. Klijentska paginacija ne zahtijeva promjene na backend API-ju, nema novih endpointa, nema složene koordinacije između filtera i page parametara. Implementacija je trivijalna i potpuno funkcionalna za demonstracijsku skalu. |
| Posljedice odluke | Pri velikom broju podataka (stotine stavki) svi se i dalje šalju s backend-a u jednom zahtjevu. Za produkcijsku primjenu preporučena je migracija na Spring Page s `Pageable` parametrima. |
| Status odluke | Aktivna (MVP) |

### Trade-off analiza

| Kriterij | Težina | Server-side paginacija | Klijentska paginacija |
|---|---|---|---|
| Performanse pri velikom skupu podataka | 4 | 5 | 2 |
| Brzina implementacije | 5 | 2 | 5 |
| Konzistentnost s postojećom arhitekturom | 4 | 2 | 5 |
| Složenost koda | 3 | 4 | 5 |
| **Ukupno** | — | **47** | **67** |

---

## Odluka #002 — Migracija CalendarPage s inline stilova na CSS klase

| Polje | Opis |
|---|---|
| ID odluke | DL11-002 |
| Datum | 08.06.2026. |
| Kratak naziv odluke | Kalendarski grid i ćelije migrirani s inline stilova na CSS klase radi responzivnosti |
| Opis problema | Kalendarski prikaz koristio je isključivo React inline stilove za grid layout i dimenzije ćelija. Inline stilovi imaju viši prioritet od CSS media query pravila, što je onemogućavalo responzivno prilagođavanje veličine ćelija na mobilnim ekranima. |
| Razmatrane opcije | 1. Zadržati inline stilove i koristiti JavaScript za detekciju širine ekrana — dodavati različite stilske objekte ovisno o breakpointu  2. Migrirati na CSS klase — premjestiti sve stilove u `styles.css` i koristiti media queries |
| Odabrana opcija | Migracija na CSS klase (`cal-cell`, `cal-grid`, `cal-day-num`, `cal-event-chip`...) |
| Razlog izbora | CSS media queries su standardni i deklarativni pristup responzivnom dizajnu. JavaScript window resize listener dodaje nepotrebnu kompleksnost i ne reaguje ispravno na promjene orijentacije uređaja. Migracija na klase ujedno čini kod čitljivijim i konzistentnim s ostatkom aplikacije. |
| Posljedice odluke | Sve buduće stilske promjene kalendara vrše se u `styles.css` umjesto u JSX komponenti. Ćelije na ekranima manjim od 520px dobivaju kompaktniju visinu (52px umjesto 80px). |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | JS breakpoint detekcija | CSS klase + media query |
|---|---|---|---|
| Standardnost pristupa | 5 | 2 | 5 |
| Čitljivost koda | 4 | 2 | 5 |
| Performanse | 3 | 3 | 5 |
| Brzina implementacije | 3 | 3 | 4 |
| **Ukupno** | — | **37** | **68** |

---

## Odluka #003 — Horizontalni scroll filter čipova umjesto wrapping-a na mobilnom

| Polje | Opis |
|---|---|
| ID odluke | DL11-003 |
| Datum | 08.06.2026. |
| Kratak naziv odluke | Filter čipovi na mobilnom horizontalno skrolaju umjesto da se prelome u novi red |
| Opis problema | Filter čipovi (Sve / Na čekanju / Odobrene / Odbijene / Otkazane) na uskim ekranima su se prelomili u dva ili više redova, uzimajući previše vertikalnog prostora i vizualno kvareći raspored stranice. |
| Razmatrane opcije | 1. `flex-wrap: wrap` — čipovi prelaze u novi red (postojeće ponašanje)  2. `overflow-x: auto; flex-wrap: nowrap` — čipovi horizontalno skrolaju u jednom redu |
| Odabrana opcija | Horizontalni scroll (`overflow-x: auto; flex-wrap: nowrap`) |
| Razlog izbora | Horizontalni scroll čuva vertikalni prostor i daje konzistentno iskustvo — korisnik vidi sve čipove odjednom ili ih skroluje u jednom potezu. Mobilni korisnici su navikli na horizontalni scroll za tabove i filtere (pattern koji koriste većina modernih aplikacija). Wrapping remeti vizualnu hijerarhiju stranice. |
| Posljedice odluke | Na ekranima gdje ne stanu svi čipovi, korisnik mora horizontalno skrolati da vidi sve opcije — može biti neintuitivan bez vizualnog indikatora. |
| Status odluke | Aktivna |
