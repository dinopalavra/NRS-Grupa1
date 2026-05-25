# Sprint Backlog
## Sprint 9

**Datum:** 25.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Sprint cilj

Uvesti igrača kao prvorazredni entitet sistema (pravi roster, sport po korisniku, jedan tim po igraču) i izgraditi sportsku dubinu modula lige (strijelci utakmica, rang lista najboljih strijelaca). Pojačati ulogno razdvajanje kroz sve module — kapiten radi samo sa svojim timom, igrač gleda samo ono što ga se tiče, sudija unosi rezultate, a kreiranje i administracija liga svodi se isključivo na administratora.

---

## Ključne stavke koje tim želi završiti

- Uvođenje pravog rostera tima (Team Members) sa brojem dresa i pozicijom
- Evidencija strijelaca po utakmici i top scorer lista po ligi
- Sport polje obavezno za korisnike igrače/kapitene/sudije pri registraciji
- Odabir kapitena tima iz padajuće liste i zamjena fiksnog "broja članova" sa "maksimalni broj članova"
- Pravilo: jedan igrač pripada samo jednom timu + provjera sporta kroz sve module
- Automatske notifikacije svim članovima tima pri rezervacijskim akcijama
- Ulogno ograničavanje pristupa: kapiten vidi samo svoj tim, igrač samo svoj tim i svoje rezervacije, Termini sekcija sakrivena za igrače i sudije
- Ulogno ograničavanje akcija u ligi: kreiranje i administracija samo admin, unos rezultata admin + sudija

---

## Rizici i zavisnosti

- Backend zavisi od ispravno konfigurisane baze (DDL auto=update kreira nove tabele `team_members`, `goals` i nove kolone na `users` i `teams`)
- Stari podaci iz baze sa slobodnim tekstualnim imenom kapitena ostaju funkcionalni ali se ne mogu povezati sa korisničkim nalogom dok admin ne preuzme tim
- DB kolona za minutu gola preimenovana u `goalminute` jer je `MINUTE` rezervisana SQL riječ
- Frontend role-checkovi su prva linija odbrane; backend dodatno validira sport match, jedan tim po igraču i kapiten po timu

---

## Sprint backlog

| ID | Naziv stavke (User Story) | Odgovorna osoba | Status | Napomena |
|---|---|---|---|---|
| US9-1 | Kao kapiten ili administrator, želim dodavati i uklanjati igrače u sastav (roster) tima, kako bih imao tačan spisak ko stvarno igra za tim. | Amel Divović | Završeno | Nova tabela `team_members` sa jersey/position; modal "Igrači" na Teams stranici; broj članova se automatski održava |
| US9-2 | Kao osoba koja unosi rezultate, želim pri unosu rezultata utakmice unijeti i strijelce sa minutom, kako bi liga imala automatsku rang listu najboljih strijelaca. | Bakir Hadžialić | Završeno | Nova tabela `goals`; validacija broj strijelaca = rezultat; strijelac mora biti na rosteru; novi tab "Strijelci" u Ligi |
| US9-3 | Kao administrator, želim pri kreiranju igrača, kapitena ili sudije obavezno odabrati sport, kako bi sistem mogao filtrirati za koje timove i lige mogu biti korišteni. | Harun Hodžić | Završeno | Polje `sport` obavezno za non-ADMIN, ne prikazuje se za admina; sport kolona u tabeli korisnika |
| US9-4 | Kao osoba koja kreira novi tim, želim odabrati kapitena iz padajuće liste registrovanih kapitena i definisati maksimalni broj članova, kako bi tim imao stvarnu vezu sa korisnikom i ograničen kapacitet. | Harun Muhić | Završeno | Kapiten je FK na `UserEntity`; dropdown filtriran po sportu i raspoloživosti; jedan tim po kapitenu; `maxMembers` zamijenio bivši `membersCount` |
| US9-5 | Kao administrator sistema, želim spriječiti da isti igrač bude u dva tima istovremeno i osigurati da se sport dosljedno provjerava kroz sve module, kako bi podaci u sistemu bili semantički ispravni. | Dino Palavra | Završeno | Igrač ↔ tim, kapiten ↔ tim, strijelac ↔ roster — sve provjereno na backendu; jasne poruke greške; dropdownovi prefiltrirani po sportu |
| US9-6 | Kao igrač, želim automatski dobijati notifikaciju o rezervacijama mog tima (kreiranje, odobravanje, otkazivanje, premještanje), kako bih bio na vrijeme informisan o aktivnostima tima. | Ernad Prasko | Završeno | Helper `notifyTeamMembers` u `ReservationService`; pokriva sve rezervacijske akcije; preskače kreatora da ne duplira |
| US9-7 | Kao kapiten tima, želim vidjeti i upravljati samo svojim timom i njegovim rezervacijama, kako ne bih slučajno mijenjao podatke tuđih timova. | Tarik Avdović | Završeno | Rezervacije i Timovi stranica filtriraju se po `captainUserId`; forma "Novi tim" sakrivena za kapitena |
| US9-8 | Kao igrač, želim vidjeti sekciju Timovi sa svojim timom i pregled rezervacija svog tima, kako bih znao gdje pripadam i šta je zakazano, dok mi se nepotrebne sekcije (Termini) ne prikazuju. | Miralem Pupalović | Završeno | Novi endpoint `GET /api/teams/by-user/{id}`; `myMembership` u AppContext-u; Timovi nav za PLAYER (read-only modal); rezervacije filtrirane po članstvu; Termini uklonjeno iz navigacije za PLAYER/REFEREE |
| US9-9 | Kao administrator, želim da samo admin može kreirati i administrirati lige (kreiranje, brisanje, dodavanje timova, zakazivanje utakmica), dok sudija može unositi rezultate, a kapiten i igrač samo pregledati ligu. | Amel Divović | Završeno | LeagueListPanel, TeamsTab i MatchesTab koriste `selectedRole`; sva administrativna dugmad sakrivena za non-admin; "Unesi rezultat" dostupan za ADMIN i REFEREE_SCOREKEEPER |

---

## Pregled realizacije

- Ukupno user storyja: 9
- Završeno: 9
- Djelimično završeno: 0
- Nezavršeno: 0

## Komentar

Sprint 9 je sistem podigao iz osnovne CRUD logike na potpuno ulogno-svjesnu aplikaciju. Prva polovina sprinta (US9-1 do US9-5) je uvela igrača kao stvarni entitet sa sportom, rosterom i pravilima o pripadnosti timu. Druga polovina (US9-6 do US9-9) je odgovorila na povratne informacije iz internih testova i zatvorila propuste u dozvolama: kapiteni više ne mogu dirati tuđe timove, igrači vide samo ono što ih se tiče, lige administrira samo admin, a sudija dobija isključivo svoju nadležnost (unos rezultata).

