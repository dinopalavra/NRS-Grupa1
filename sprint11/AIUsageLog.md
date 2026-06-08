# AI Usage Log
## Sprint 11

**Datum:** 08.06.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Pregled korištenja AI alata

U toku Sprinta 11 tim je koristio AI asistenta (Claude) za implementaciju tehničkih rješenja i generisanje projektne dokumentacije. Sve generisane ili AI-asistovane izmjene opisane su ispod.

---

## Zapisi o korištenju

### AI-001 — Implementacija reusable Pagination komponente

| Polje | Detalji |
|---|---|
| Datum | 08.06.2026. |
| Alat | Claude (claude-sonnet-4-6) |
| Zahvat | `projekat/frontend/src/components/Pagination.jsx` — nova datoteka |
| Opis prompta | Kreiraj reusable React paginacijsku komponentu koja prima `total`, `page`, `pageSize`, `onChange` props, prikazuje max 7 dugmadi s elipsom za velike opsege, i stilizovana je u skladu s luxury dark temom projekta. |
| Opis izlaza | Kompletan JSX za `Pagination` komponentu s logikom za generisanje niza stranica (uključujući `"..."` elipsu), render dugmadi za prethodnu/narednu stranicu i active klasu za trenutnu stranicu. |
| Modifikacije timskim pregledom | Komponenta prihvaćena bez izmjena. |
| Ocjena kvaliteta | 5/5 — funkcionalna i kompletna od prvog pokušaja. |

---

### AI-002 — Integracija paginacije u ReservationsPage

| Polje | Detalji |
|---|---|
| Datum | 08.06.2026. |
| Alat | Claude (claude-sonnet-4-6) |
| Zahvat | `projekat/frontend/src/pages/ReservationsPage.jsx` — modifikacija |
| Opis prompta | Dodaj paginaciju u ReservationsPage komponentu — PAGE_SIZE=10, useMemo za slicovanje filtriranog niza, reset stranice pri promjeni filtera, Pagination komponenta ispod tabele. |
| Opis izlaza | Kod s `page` stateom, `paginated` useMemo, integriranom Pagination komponentom i fragment wrapperom. |
| Modifikacije timskim pregledom | Inicijalni kod imao JSX grešku (dva sibling elementa bez Fragment wrappera u ternarnom grani). Ispravljen dodavanjem `<>...</>` wrappera. |
| Ocjena kvaliteta | 4/5 — logika ispravna, ali potrebna sitna JSX korekcija. |

---

### AI-003 — Integracija paginacije u TimeSlotsPage

| Polje | Detalji |
|---|---|
| Datum | 08.06.2026. |
| Alat | Claude (claude-sonnet-4-6) |
| Zahvat | `projekat/frontend/src/pages/TimeSlotsPage.jsx` — modifikacija |
| Opis prompta | Dodaj paginaciju u TimeSlotsPage — PAGE_SIZE=15, reset stranice pri promjeni search inputa, sporta ili datuma. |
| Opis izlaza | `page` state, `paginated` useMemo, reset pozivi u svim filter handler funkcijama, Pagination ispod tabele. |
| Modifikacije timskim pregledom | Nema izmjena — ispravno od prvog pokušaja. |
| Ocjena kvaliteta | 5/5 |

---

### AI-004 — Pretraga, filter i paginacija u UserModule

| Polje | Detalji |
|---|---|
| Datum | 08.06.2026. |
| Alat | Claude (claude-sonnet-4-6) |
| Zahvat | `projekat/frontend/src/modules/users/UserModule.jsx` — modifikacija |
| Opis prompta | Dodaj search input i role dropdown filter na stranicu korisnika, uz paginaciju po 10. Pretraga filtrira po firstName, lastName i username. Role filter po PLAYER/MANAGER/ADMIN. Subtitle prikazuje "X od Y korisnika". |
| Opis izlaza | `search`, `roleFilter`, `page` stateovi; `filteredUsers` i `paginatedUsers` useMemo; filter bar iznad tabele; Pagination ispod. |
| Modifikacije timskim pregledom | Nema izmjena. |
| Ocjena kvaliteta | 5/5 |

---

### AI-005 — Popravka dizajna select elemenata na Login stranici

| Polje | Detalji |
|---|---|
| Datum | 08.06.2026. |
| Alat | Claude (claude-sonnet-4-6) |
| Zahvat | `projekat/frontend/src/styles.css` — dodavanje `select.input` pravila |
| Opis prompta | Select elementi na Login stranici imaju bijeli prikaz koji ne odgovara dark temi. Dodaj CSS pravilo da select.input ima tamnu pozadinu opcija, zlatnu custom strelicu i color-scheme: dark. |
| Opis izlaza | CSS blok `select.input` s `appearance: none`, SVG zlatnom strelicom kao background-image, `color-scheme: dark` i `background-color` za `option` elemente. |
| Modifikacije timskim pregledom | Nema izmjena — vizualno ispravno. |
| Ocjena kvaliteta | 5/5 |

---

### AI-006 — Migracija CalendarPage na CSS klase

| Polje | Detalji |
|---|---|
| Datum | 08.06.2026. |
| Alat | Claude (claude-sonnet-4-6) |
| Zahvat | `projekat/frontend/src/pages/CalendarPage.jsx` i `styles.css` |
| Opis prompta | CalendarPage koristi inline stilove za grid layout što sprečava media query override na mobilnom. Migriraj na CSS klase cal-header-row, cal-day-label, cal-grid, cal-cell, cal-day-num, cal-event-chip i dodaj responzivne breakpointe u styles.css. |
| Opis izlaza | JSX komponenta s className zamjenama (bez inline stilova na grid sekcijama). CSS klase u styles.css. Media queries na 520px za kompaktnu veličinu ćelija. |
| Modifikacije timskim pregledom | Nema izmjena. |
| Ocjena kvaliteta | 5/5 |

---

### AI-007 — Popravka responzivnosti tabela, liga kartica i filter čipova

| Polje | Detalji |
|---|---|
| Datum | 08.06.2026. |
| Alat | Claude (claude-sonnet-4-6) |
| Zahvat | `projekat/frontend/src/styles.css` — media query sekcije |
| Opis prompta | Popravi responzivnost: tabele trebaju horizontalni scroll umjesto skrivanja kolona; liga match kartice ne smiju preći rubove na 768px; filter čipovi trebaju horizontalni scroll umjesto preloma u novi red; dashboard stat kartice trebaju biti kompaktnije na 768px. |
| Opis izlaza | Uklonjena stara `nth-child` pravila za skrivanje kolona. Dodane `.liga-match-teams` izmjene za mobilni prikaz (gap/padding). `overflow-x: auto; flex-wrap: nowrap` za filter čipove. Smanjeni padding na `.dash-card` i `.dash-card-value`. |
| Modifikacije timskim pregledom | Inicijalni pokušaj za `.liga-match-teams` koristio `flex-direction: column` ali je selector zapravo `display: grid`. Ispravkeno na `gap` i `padding` pristup bez mijenjanja display tipa. |
| Ocjena kvaliteta | 4/5 — jedna iteracija korekcije za grid vs flex razliku. |

---

### AI-008 — Sprint dokumentacija (SprintBacklog, DecisionLog, IzvjestajTestiranja, AIUsageLog, SprintRetrospectiveSummary)

| Polje | Detalji |
|---|---|
| Datum | 08.06.2026. |
| Alat | Claude (claude-sonnet-4-6) |
| Zahvat | `sprint11/` folder — svi `.md` fajlovi |
| Opis prompta | Kreiraj kompletnu sprint dokumentaciju za Sprint 11 — backlog bez kolone s imenima, decision log za 3 ključne odluke, izvještaj testiranja za sve US, AI usage log, sprint retrospective summary. |
| Opis izlaza | Pet Markdown fajlova s punom dokumentacijom sprinta. |
| Modifikacije timskim pregledom | Sadržaj provjeren i odobren. |
| Ocjena kvaliteta | 5/5 |

---

### AI-009 — Sprint 10 Review Summary

| Polje | Detalji |
|---|---|
| Datum | 08.06.2026. |
| Alat | Claude (claude-sonnet-4-6) |
| Zahvat | `sprint10/SprintReviewSummary.md` — nova datoteka |
| Opis prompta | Napravi SprintReviewSummary.md za Sprint 10 koji pokriva sve 8 user storija, demonstrirane funkcionalnosti, probleme i blokere, ključne odluke i feedback product ownera. |
| Opis izlaza | Kompletan review summary za Sprint 10. |
| Modifikacije timskim pregledom | Nema izmjena. |
| Ocjena kvaliteta | 5/5 |

---

## Sažetak

| Metrika | Vrijednost |
|---|---|
| Ukupno AI interakcija | 9 |
| Generisani fajlovi | 7 (Pagination.jsx, 5× sprint11 md, sprint10 md) |
| Modificirani fajlovi | 4 (ReservationsPage.jsx, TimeSlotsPage.jsx, UserModule.jsx, CalendarPage.jsx, styles.css) |
| Interakcije bez korekcije | 7 od 9 (78%) |
| Interakcije s korekcijom | 2 od 9 (22%) — JSX Fragment wrapper i grid vs flex korekcija |

Zaključak: AI asistent je bio produktivan alat u ovom sprintu, posebno za brzo generisanje reusable komponenti i CSS stilova. Sve korekcije su bile male tehničke ispravke, a ne konceptualne greške.
