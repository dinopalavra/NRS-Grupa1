# Izvještaj testiranja
## Sprint 9

**Datum:** 25.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama
**Branch:** amel-dev

---

## 1. Cilj testiranja

Provjeriti ispravnost svih funkcionalnosti uvedenih u Sprintu 9 — pravo upravljanje rosterom tima, evidenciju strijelaca utakmica i top scorer listu, sport po korisniku, izbor kapitena iz registrovanih korisnika, maksimalni broj članova tima, pravilo "jedan tim po igraču", cross-modul validaciju sporta, automatske notifikacije svim članovima tima, te ulogno razdvajanje (kapiten vidi samo svoj tim, igrač samo svoj tim i njegove rezervacije, a u ligi samo admin administrira i samo sudija unosi rezultate).

---

## 2. Obim testiranja

| Modul / klasa | Tip testa | Pokrivenost |
|---|---|---|
| `TeamService` — roster, captain, maxMembers, sport-match, one-team-per-player, getMembershipOfUser | Unit (JUnit + Mockito) + Manuelni | Visoka |
| `ResultsService` — strijelci utakmice, validacija broja golova, validacija rostera strijelca, top scorers | Unit + Manuelni | Visoka |
| `ReservationService` — automatske notifikacije svim članovima tima | Unit + Manuelni | Visoka |
| `UserService` — sport obavezan za non-admin, admin bez sporta, duplikati | Unit + Manuelni | Visoka |
| Ulogno razdvajanje (kapiten / igrač / sudija / admin) | Manuelni | Srednja |
| `Layout` — Termini nav uklonjen za PLAYER/REFEREE | Manuelni | Srednja |
| `LigaPage` — read/write dozvole po ulozi | Manuelni | Srednja |
| `TeamsPage` — PLAYER pristup, read-only roster modal | Manuelni | Srednja |

---

## 3. Vrste testova

### 3.1 Unit testovi (JUnit 5 + Mockito)

| Test klasa | Broj testova | Status |
|---|---|---|
| `LeagueServiceTest` | 13 | ✅ |
| `NotificationServiceTest` | 8 | ✅ |
| `ReservationServiceTest` | 18 | ✅ |
| `ResultsServiceTest` | 22 | ✅ |
| `TeamServiceTest` | 23 | ✅ |
| `TimeSlotServiceTest` | 5 | ✅ |
| `UserServiceTest` (novi fajl u Sprintu 9) | 10 | ✅ |
| **Ukupno** | **99** | **99/99 prolazi** |

Od 99 testova, **41 je novo dodato u Sprintu 9** (17 u `TeamServiceTest`, 11 u `ResultsServiceTest`, 3 u `ReservationServiceTest`, 10 u novom `UserServiceTest`).

### 3.2 Manuelni testovi (smoke + acceptance)

Izvedeni kroz UI lokalno pokrenuta backenda (Spring Boot + H2) i frontenda (Vite dev server) na `http://localhost:5173`. Testirano sa 4 različite uloge (ADMIN, CAPTAIN, PLAYER, REFEREE_SCOREKEEPER).

---

## 4. Pokrivenost user storyja

| User Story | Sprint 9 ID | Pokriveno unit testovima | Pokriveno manuelno |
|---|---|---|---|
| Upravljanje sastavom tima (roster) | US9-1 | `TeamServiceTest`: 9 testova za addMember/removeMember/getMembers | ✅ |
| Strijelci utakmica + top scorers | US9-2 | `ResultsServiceTest`: 11 testova za goals + topscorers | ✅ |
| Sport korisnika pri registraciji | US9-3 | `UserServiceTest`: 10 testova (sport po ulozi) | ✅ |
| Kapiten dropdown + maxMembers | US9-4 | `TeamServiceTest`: 5 testova za createTeam validacije | ✅ |
| Jedan tim po igraču + cross-modul sport | US9-5 | `TeamServiceTest`: 4 testa za addMember sport/one-team | ✅ |
| Auto-notifikacije svim članovima tima | US9-6 | `ReservationServiceTest`: 3 testa za team-member notifikacije | ✅ |
| Kapiten scope (samo svoj tim) | US9-7 | — (frontend-only logika) | ✅ |
| Igrač vidi sekciju Timovi i rezervacije svog tima | US9-8 | `TeamServiceTest`: 2 testa za getMembershipOfUser | ✅ |
| Ulogno razdvajanje u Ligi i Terminima | US9-9 | — (frontend-only logika) | ✅ |

---

## 5. Detalji značajnijih unit testova

### `TeamServiceTest` (Sprint 9 dodatak)
- `createTeam_Successful_SavesTeamWithCaptain` — happy path, kapiten pravilno postavljen, `membersCount=0`
- `createTeam_WhenUserIsNotCaptainRole_ThrowsBadRequest` — ne dozvoljava PLAYER-a kao kapitena
- `createTeam_WhenCaptainSportMismatch_ThrowsBadRequest` — sport tima i kapitena se moraju poklapati
- `createTeam_WhenCaptainAlreadyOwnsAnotherTeam_ThrowsBadRequest` — jedan kapiten = jedan tim
- `addMember_Successful_SavesAndUpdatesCount` — happy path, brojač članova se ažurira
- `addMember_WhenUserAlreadyInAnotherTeam_ThrowsBadRequest` — sa jasnom porukom "već u timu X"
- `addMember_WhenSportMismatch_ThrowsBadRequest` — igrač drugog sporta odbijen
- `addMember_WhenTeamIsFull_ThrowsBadRequest` — poštuje `maxMembers`
- `addMember_WhenJerseyNumberTaken_ThrowsBadRequest` — broj dresa jedinstven u timu
- `getMembershipOfUser_WhenInTeam_ReturnsMembership` / `_WhenNotInAnyTeam_ReturnsNull`

### `ResultsServiceTest` (Sprint 9 dodatak)
- `recordResult_WithValidGoals_SavesGoalsAndDeletesOldOnes` — idempotentno re-recording
- `recordResult_WhenGoalCountForHomeMismatch_ThrowsBadRequest` / `_ForAwayMismatch_` — broj strijelaca = rezultat
- `recordResult_WhenScorerNotOnRoster_ThrowsBadRequest` — strijelac mora biti član tog tima
- `recordResult_WhenGoalTeamNotInMatch_ThrowsBadRequest` — tim mora učestvovati u utakmici
- `recordResult_WithEmptyGoalsList_StillWorksAndSkipsValidation` — backwards-compat (rezultat bez strijelaca)
- `getTopScorers_AggregatesAndMapsRows` — agregacija + sortiranje
- `getTopScorers_WhenNoGoals_ReturnsEmptyList`
- `getGoalsForMatch_ReturnsMappedList` / `_WhenMatchNotFound_`

### `UserServiceTest` (novi fajl)
- `createUser_PlayerWithSport_SuccessfullySaves` (+ Captain, Referee analogno)
- `createUser_AdminWithoutSport_SuccessfullySaves` — admin smije bez sporta
- `createUser_AdminWithSport_ThrowsBadRequest` — admin ne smije imati sport
- `createUser_PlayerWithoutSport_ThrowsBadRequest` (+ Captain, Referee analogno)
- `createUser_DuplicateEmail/Username_ThrowsBadRequest`

### `ReservationServiceTest` (Sprint 9 dodatak)
- `create_NotifiesAllTeamMembersExceptCreator` — provjeren skip kreatora kako se ne bi dupliralo
- `approve_NotifiesTeamMembers` — članovi obaviješteni o odobravanju
- `cancel_NotifiesTeamMembers` — isto za otkazivanje

---

## 6. Manuelni test scenariji

| # | Scenarij | Uloga | Očekivani rezultat | Status |
|---|---|---|---|---|
| 1 | Kreiranje korisnika tipa PLAYER bez sporta | ADMIN | Forma blokira submit + backend vraća grešku | ✅ |
| 2 | Kreiranje admin korisnika sa sportom | ADMIN | Backend baca grešku da admin ne smije imati sport | ✅ |
| 3 | Kreiranje tima bez sporta | ADMIN | Validacija — sport obavezan, kapiten dropdown disabled dok se ne odabere sport | ✅ |
| 4 | Pokušaj postaviti igrača kao kapitena | ADMIN | Dropdown ga ne prikazuje; backend odbija ako se zaobiđe | ✅ |
| 5 | Isti kapiten u dva tima | ADMIN | Drugi pokušaj odbijen sa porukom | ✅ |
| 6 | Dodavanje igrača u 2 tima | ADMIN/CAPTAIN | Drugi pokušaj odbijen, navodi naziv prvog tima | ✅ |
| 7 | Dodavanje fudbalskog igrača u košarkaški tim | ADMIN/CAPTAIN | Greška: sport se ne podudara | ✅ |
| 8 | Dodavanje (maxMembers+1)-og igrača | ADMIN/CAPTAIN | Greška: tim je popunjen X/Y | ✅ |
| 9 | Unos rezultata sa strijelcima — broj golova = rezultat | ADMIN/REFEREE | Uspjeh, golovi spremljeni, top scorer lista ažurirana | ✅ |
| 10 | Unos rezultata sa pogrešnim brojem strijelaca | ADMIN/REFEREE | Greška: broj strijelaca ne odgovara rezultatu | ✅ |
| 11 | Strijelac koji nije na rosteru | ADMIN/REFEREE | Backend odbija (frontend dropdown ga i ne prikazuje) | ✅ |
| 12 | Ispravka već unesenog rezultata | ADMIN/REFEREE | Stari golovi obrisani, novi spremljeni, tabela poništava staru statistiku | ✅ |
| 13 | Tab "Strijelci" u Ligi | sve uloge | Lista sa medaljama 🥇🥈🥉, sortirano po broju golova | ✅ |
| 14 | Kreiranje rezervacije za tim | ADMIN/CAPTAIN | Svi članovi tog tima dobijaju notifikaciju, admin također | ✅ |
| 15 | Odobravanje/odbijanje/otkazivanje/premještanje | ADMIN | Svi članovi tima obaviješteni o svakoj promjeni | ✅ |
| 16 | Kapiten kreira rezervaciju za drugi tim | CAPTAIN | Tim dropdown sadrži samo njegov tim — nemoguće | ✅ |
| 17 | Kapiten vidi rezervacije tuđih timova | CAPTAIN | Lista filtrirana — vidi samo svog tima | ✅ |
| 18 | Kapiten upravlja rosterom tuđih timova | CAPTAIN | Lista timova prikazuje samo njegov; forma "Novi tim" sakrivena | ✅ |
| 19 | Igrač vidi sekciju Termini | PLAYER | Sidebar nema stavku Termini ✅ | ✅ |
| 20 | Igrač u sekciji Timovi | PLAYER | Vidi samo svoj tim, modal "Igrači" je read-only (bez add/remove) | ✅ |
| 21 | Igrač u sekciji Rezervacije | PLAYER | Vidi rezervacije svog tima (ne samo svoje kreacije) | ✅ |
| 22 | Igrač bez tima | PLAYER | Empty state poruke u Timovi i Rezervacije | ✅ |
| 23 | Kapiten/igrač u sekciji Liga | CAPTAIN/PLAYER | Vidi sve tabove, nema akcijskih dugmadi (kreiranje, brisanje, dodavanje timova, zakazivanje, unos rezultata) | ✅ |
| 24 | Sudija u sekciji Liga | REFEREE | Može unositi rezultate (olovka aktivna), ne može kreirati ligu, dodavati timove, zakazati utakmicu | ✅ |
| 25 | Sudija u sidebaru | REFEREE | Nema Korisnici, Timovi, Termini stavke | ✅ |

---

## 7. Identifikovani problemi i rješenja tokom testiranja

| # | Problem | Rješenje |
|---|---|---|
| 1 | H2 baza ne kreira `goals` tabelu zbog kolone imena `minute` (rezervisana SQL riječ) | Kolona preimenovana u `goalminute` u `GoalEntity` |
| 2 | Sprint 8 testovi su pucali nakon promjene konstruktora `RecordResultRequest` (dodano polje `goals`) | Testovi ažurirani da pošalju `null` kao treći argument |
| 3 | UnnecessaryStubbing greška u Mockito striktnom modu | Uklonjeni suvišni stub-ovi iz `recordResult_WhenGoalTeamNotInMatch` testa |
| 4 | Kapiten je mogao kreirati rezervaciju za bilo koji tim | Frontend filter dropdown-a po `captainUserId` |
| 5 | Igrač nije vidio rezervacije iako je dobijao notifikacije | `visibleReservations` za PLAYER ulogu filtrira po `myMembership.teamId` |
| 6 | Igraču je bila vidljiva sekcija Termini bez ikakve mogućnosti rezervisanja | Stavka uklonjena iz navigacije za PLAYER i REFEREE |

---

## 8. Tehničke napomene

- **Baza:** lokalno H2 in-memory (profile `local`); produkcija PostgreSQL (Render).
- **DDL:** `spring.jpa.hibernate.ddl-auto=update` — sve nove tabele (`team_members`, `goals`) i kolone (`users.sport`, `teams.captain_user_id`, `teams.max_members`) kreirane automatski pri startu.
- **Backend build:** `./mvnw clean test` — sve 99 testova prolazi u **~8 sekundi**.
- **Frontend build:** `npx vite build` — 47 modula transformisano, ~261 kB JS (gzip 70.6 kB).
- **Pokriveni alati:** JUnit 5, Mockito 5, Spring Boot Test, ReflectionTestUtils (za postavljanje `id` polja kroz reflexiju).

---

## 9. Zaključak

Svi planirani user storiji Sprinta 9 su funkcionalno verifikovani i kroz automatske unit testove i kroz manuelne acceptance scenarije. **Sve 99 backend unit testova prolazi**, frontend build je uspješan. Sistem je sada potpuno ulogno-svjestan — svaka uloga (ADMIN, CAPTAIN, PLAYER, REFEREE_SCOREKEEPER) ima jasno definisan i tehnički ograničen pristup, a igrač je postao prvorazredan entitet sistema kroz pravi roster, sport po korisniku i pravilo "jedan tim po igraču".
