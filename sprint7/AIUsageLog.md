# AI Usage Log
## Sprint 7

**Datum:** 12.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

| Polje | Opis |
|---|---|
| Datum | 12.05.2026. |
| Sprint broj | 7 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Implementacija kompletnog liga modula — backend entiteti, servisi, kontroleri, frontend stranica i CSS stilovi |
| Kratak opis zadatka | Kreiranje LeagueTeamEntity i LeagueTeamRepository za many-to-many vezu liga-tim, proširenje LeagueService i LeagueController novim endpointima, implementacija ResultsService s undo+reapply logikom za ispravku rezultata, potpuna LigaPage sa tri taba (Timovi, Utakmice, Tabela) i kompletni CSS stilovi za liga modul |
| Šta je AI generisao | Arhitekturalni prijedlog za explicit join entity, implementaciju undo+reapply statistike s Math.max(0,...) zaštitom, React master-detail layout s tabovima, API funkcije, AppContext actions i kompletne CSS klase za liga modul |
| Šta je tim prihvatio | Kompletnu implementaciju backend i frontend sloja, arhitekturalne odluke (explicit join entity, undo+reapply), UI dizajn s tabovima i master-detail panelima |
| Šta je tim izmijenio | Prilagođeno imenovanje varijabli prema konvencijama projekta, sitne stilske dorade u skladu s postojećim dizajn sistemom, ažurirani nazivi odgovornih osoba prema timu |
| Šta je tim odbacio | — |
| Rizici, problemi ili greške | Identifikovan bug s ne-osvježavanjem liste timova pri prelasku na tab utakmica — ispravljen u istoj iteraciji |
| Ko je koristio alat | Cijeli tim |


| Polje | Opis |
|---|---|
| Datum | 12.05.2026. |
| Sprint broj | 7 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Kreiranje sprint 7 dokumentacije — sprint backlog, decision log, izvještaj testiranja, sprint review i retrospektiva |
| Kratak opis zadatka | Generisanje svih sprint 7 artefakata u formatu konzistentnom s prethodnim sprintovima; sprint backlog s user story formatom, decision log s 3 odluke, izvještaj testiranja s automatskim i manualnim scenarijima |
| Šta je AI generisao | Sprint backlog s 12 user storija, decision log sa 3 arhitekturalne odluke i obrazloženjima, izvještaj testiranja s 28 automatskih i 22 manuelnih testova, sprint review i retrospektiva |
| Šta je tim prihvatio | Sve dokumente u predloženoj formi, uz manje leksičke prilagodbe |
| Šta je tim izmijenio | Ažurirani nazivi odgovornih osoba, prilagođen format sprint backloga da odgovara formatu koji koristi tim |
| Šta je tim odbacio | Horizontalni tabularni format AI loga (zamijenjen vertikalnim tabelama po unosu) |
| Rizici, problemi ili greške | — |
| Ko je koristio alat | Cijeli tim |


| Polje | Opis |
|---|---|
| Datum | 14.05.2026. |
| Sprint broj | 7 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Proširenje sistema odabirom vrste sporta, vezivanjem termina uz ligaške utakmice i kompletni Apple Glass redesign frontenda |
| Kratak opis zadatka | Dodavanje SportType enum-a i sport polja na TimeSlotEntity i LeagueEntity; dodavanje polja lokacije, terena i vremena na MatchEntity; automatska rezervacija termina pri zakazivanju utakmice; kompletni redesign styles.css u Apple Liquid Glass stilu sa sport temom |
| Šta je AI generisao | SportType enum, izmjene Java entiteta i record-a, logiku auto-rezervacije u ResultsService, dropdownove za sport i venue u frontendskim formama, kompletno novi styles.css s glassmorphism efektima |
| Šta je tim prihvatio | Arhitekturalni pristup auto-rezervacije (find-or-create slot), Apple dizajn sa zelenim sport akcentom, sport dropdown u formama |
| Šta je tim izmijenio | Prilagođen redoslijed polja u formama, sitne CSS korekcije nakon vizuelnog pregleda |
| Šta je tim odbacio | Potpuno različit raspored elemenata na ekranu; kompleksni sport-specifični bodovni sistem (ostavlja se za budući razvoj) |
| Rizici, problemi ili greške | DDL auto=update dodaje nove kolone bez migracije — provjera konzistentnosti starih podataka je potrebna |
| Ko je koristio alat | Cijeli tim |

---

**Napomena:** AI je korišten u skladu s akademskom politikom — implementacija je analizirana, razumljena i verificirana od strane svakog člana tima zaduženog za određeni dio.
