# Sprint Backlog — Sprint 7

## Sprint cilj

Implementirati kompletan modul za upravljanje ligama: kreiranje, dodavanje timova, zakazivanje i evidencija utakmica, unos rezultata i automatsko ažuriranje tabele.

## Sprint backlog

| ID | Zadatak | Odgovorna osoba | Status | Napomena |
|---|---|---|---|---|
| SB7-1 | Backend — LeagueTeamEntity i LeagueTeamRepository | Bakir Hadžialić | Završeno | Join table liga-tim |
| SB7-2 | Backend — LeagueService: addTeam, removeTeam, getTeams | Bakir Hadžialić | Završeno | |
| SB7-3 | Backend — LeagueController: novi endpointi za timove | Harun Hodžić | Završeno | GET/POST/DELETE /api/leagues/{id}/teams |
| SB7-4 | Backend — MatchRepository: findByLeague_Id | Amel Divović | Završeno | |
| SB7-5 | Backend — ResultsService: getMatchesByLeague, ispravka rezultata | Amel Divović | Završeno | Undo + reapply stats |
| SB7-6 | Backend — ResultsController: GET /leagues/{id}/matches | Harun Hodžić | Završeno | |
| SB7-7 | Frontend — api.js: sve funkcije za lige, utakmice, tabelu | Dino Palavra | Završeno | |
| SB7-8 | Frontend — AppContext: leagues state i liga akcije | Miralem Pupalović | Završeno | |
| SB7-9 | Frontend — LigaPage: lista liga, kreiranje | Tarik Avdović | Završeno | |
| SB7-10 | Frontend — TeamsTab: dodavanje/uklanjanje timova | Tarik Avdović | Završeno | |
| SB7-11 | Frontend — MatchesTab: zakazivanje i unos rezultata | Ernad Prasko | Završeno | |
| SB7-12 | Frontend — StandingsTab: tabela sa rangiranjem | Harun Muhić | Završeno | |
| SB7-13 | Frontend — CSS: Liga modul stilovi | Harun Muhić | Završeno | |
| SB7-14 | AI Usage Log | Harun Muhić | Završeno | |
| SB7-15 | Decision Log | Bakir Hadžialić | Završeno | |
| SB7-16 | Sprint Review Summary | Harun Hodžić | Završeno | |
| SB7-17 | Sprint Retrospective Summary | Tarik Avdović | Završeno | |
| SB7-18 | Ažurirani Product Backlog | Dino Palavra | Završeno | |
| SB7-19 | Test evidencija | Ernad Prasko + Miralem Pupalović | Završeno | |

## Pregled realizacije

- Ukupno user storyja: 10
- Završeno: 10
- Djelimično završeno: 0
- Nezavršeno: 0

## Komentar

Sprint 7 je završio kompletni MVP ciklus sistema. Svi backlog itemi planiranog opsega su realizovani. Liga modul je u potpunosti funkcionalan: kreiranje liga, upravljanje timovima, zakazivanje i evidencija utakmica, automatska tabela sa ispravnim bodovanjem. Retrospektiva Sprint 6 je primijenjena — end-to-end tok je validiran ranije u sprintu.