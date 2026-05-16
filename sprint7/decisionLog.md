# Decision Log
## Sprint 7

**Datum:** 12.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Odluka #001 — Eksplicitni join entitet za vezu Liga–Tim

| Polje | Opis |
|---|---|
| ID odluke | DL7-001 |
| Datum | 12.05.2026. |
| Kratak naziv odluke | Join table za many-to-many vezu Liga–Tim |
| Opis problema | Liga i Tim imaju many-to-many vezu. Pitanje je kako tu vezu modelirati u bazi i kodu. |
| Razmatrane opcije | 1. `@ManyToMany` anotacija direktno na `LeagueEntity` — manje koda, Spring automatski kreira join tabelu  2. Eksplicitni join entitet `LeagueTeamEntity` sa svojom tabelom i unique constraintom |
| Odabrana opcija | Eksplicitni join entitet `LeagueTeamEntity` |
| Razlog izbora | Eksplicitni entitet omogućava postavljanje unique constrainta na paru (leagueid, teamid) koji sprječava duplikate na nivou baze, ne samo servisa. Lakše je dodati dodatne kolone u budućnosti (datum pridruživanja, status) i čitljiviji je JPA query (`findByLeague_Id`). `@ManyToMany` gubi kontrolu nad join tabelom čim treba custom logika. |
| Posljedice odluke | Nešto više koda (poseban entitet, poseban repozitorij), ali čistija arhitektura, bolja validacija i bolji SQL. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | @ManyToMany | Explicit join entity |
|---|---|---|---|
| Kontrola nad duplikatima | 5 | 2 | 5 |
| Proširivost u budućnosti | 4 | 2 | 5 |
| Brzina implementacije | 3 | 5 | 3 |
| Čitljivost querija | 4 | 3 | 5 |
| **Ukupno** | — | **49** | **74** |

---

## Odluka #002 — Ispravka rezultata: undo + reapply statistike

| Polje | Opis |
|---|---|
| ID odluke | DL7-002 |
| Datum | 12.05.2026. |
| Kratak naziv odluke | Postupanje s ponovnim unosom rezultata za već završenu utakmicu |
| Opis problema | Ako je rezultat unesen pogrešno i sudija unosi ispravak, stara statistika u tabeli treba biti poništena prije primjene novog rezultata. |
| Razmatrane opcije | 1. Zabraniti ispravku — rezultat je konačan nakon unosa  2. Poništiti staru statistiku (`removeStats`), zatim primijeniti novu (`applyStats`) |
| Odabrana opcija | Undo + reapply: `removeStats` → `applyStats` |
| Razlog izbora | Greška pri unosu rezultata je realna situacija u sportskim ligama. Zabrana ispravke zahtijevala bi ručno brisanje utakmice što je destruktivno i gubi historiju. Undo logika je čista i deterministička: `Math.max(0, ...)` osigurava da statistika nikad ne ode na negativne vrijednosti. |
| Posljedice odluke | Servisna logika je nešto kompleksnija (dva prolaza po standings tablici za COMPLETED utakmice), ali sistem se ponaša ispravno u realnim scenarijima. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Zabrana ispravke | Undo + reapply |
|---|---|---|---|
| Ispravnost podataka u realnim scenarijima | 5 | 2 | 5 |
| Kompleksnost implementacije | 3 | 5 | 3 |
| Sigurnost od negativne statistike | 5 | 5 | 4 |
| Korisnička iskustvo | 4 | 1 | 5 |
| **Ukupno** | — | **50** | **73** |

---

## Odluka #003 — Single-page master-detail layout za Liga modul

| Polje | Opis |
|---|---|
| ID odluke | DL7-003 |
| Datum | 12.05.2026. |
| Kratak naziv odluke | Organizacija Liga stranice — zasebne rute vs. tabovi |
| Opis problema | Liga modul ima više pogleda: lista liga, timovi u ligi, utakmice, tabela. Pitanje je treba li to biti više stranica s rutama ili jedna stranica s tabovima. |
| Razmatrane opcije | 1. Zasebne stranice s rutama (`/liga/1/timovi`, `/liga/1/tabela`, itd.) — zahtijeva React Router  2. Jedan `LigaPage` s master-detail layoutom i tabovima |
| Odabrana opcija | Master-detail s tabovima u jednom `LigaPage` |
| Razlog izbora | Projekat koristi custom page-based navigaciju bez React Router-a. Uvođenje Router-a samo za ligu bi bilo nekonzistentno s ostatkom sistema. Tabovi su konzistentni s ostatkom UI-a, smanjuju broj klikova za promjenu pogleda i zadržavaju kontekst odabrane lige pri prelasku između tabova. |
| Posljedice odluke | Nešto kompleksniji state management unutar jednog komponent stabla, ali konzistentno UX iskustvo i konzistentan arhitektonski pristup. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Zasebne rute | Master-detail tabovi |
|---|---|---|---|
| Konzistentnost s arhitekturom | 5 | 2 | 5 |
| UX — broj klikova | 4 | 3 | 5 |
| Zadržavanje konteksta | 4 | 2 | 5 |
| Kompleksnost implementacije | 3 | 4 | 3 |
| **Ukupno** | — | **53** | **80** |

---

## Odluka #004 — Automatska rezervacija termina pri zakazivanju ligaške utakmice

| Polje | Opis |
|---|---|
| ID odluke | DL7-004 |
| Datum | 14.05.2026. |
| Kratak naziv odluke | Vezivanje ligaških utakmica s modulom termina |
| Opis problema | Kad se zakaže ligaška utakmica na određenom terenu u određeno vrijeme, taj termin treba biti nedostupan za rezervacije kako ne bi došlo do kolizije. |
| Razmatrane opcije | 1. Ručno — korisnik mora zasebno kreirati rezervaciju i zasebno zakazati utakmicu  2. Automatski — pri zakazivanju utakmice sistem automatski traži ili kreira timeslot i označava ga kao RESERVED |
| Odabrana opcija | Automatska rezervacija termina (`find-or-create` + RESERVED) |
| Razlog izbora | Ručni pristup zahtijeva dva koraka i podložan je grešci (zaboravljena rezervacija, pogrešno uneseni podaci). Automatski pristup garantuje konzistentnost između liga modula i modula termina. Logika je: pronađi timeslot za tu lokaciju/teren/datum/startTime — ako postoji i slobodan je, rezerviši ga; ako ne postoji, kreiraj novi i rezerviši odmah. |
| Posljedice odluke | Jača veza između ResultsService i TimeSlotRepository (cross-module), ali bolji UX i garantovana konzistentnost. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Ručna rezervacija | Automatska rezervacija |
|---|---|---|---|
| Konzistentnost podataka | 5 | 2 | 5 |
| Korisnička iskustvo | 4 | 2 | 5 |
| Arhitekturalna čistoća | 3 | 5 | 3 |
| Rizik kolizije termina | 5 | 4 | 5 |
| **Ukupno** | — | **53** | **80** |
