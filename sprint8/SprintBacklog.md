# Sprint Backlog
## Sprint 8

**Datum:** 20.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Sprint cilj

Proširiti MVP cross-module funkcionalnostima — notifikacije, statistika tima, korisnički profil, pretraga i filtriranje, responsive prikaz i role-aware dashboard. Dodatno, ojačati uvezanost između modula termina, rezervacija i liga: termini dobijaju sport, lige i rezervacije strogo filtriraju slobodne terene po sportu, omogućeno je premještanje i otkazivanje rezervacija uz zaštitu za ligaške termine, te brisanje lige sa kaskadnim oslobađanjem termina.

---

## Ključne stavke koje tim želi završiti

- Otkazivanje i izmjena (reschedule) rezervacije sa zaštitom za ligaške termine
- In-app notifikacije sa zvoncetom, badge brojem nepročitanih i listom obavještenja
- Detaljna statistika tima po ligi (W/D/L, GF/GA, bodovi, forma zadnjih 5)
- Profil korisnika sa izmjenom podataka i promjenom lozinke
- Pretraga i filtriranje na timovima, terminima i ligama
- Responsive prikaz za mobilne uređaje (hamburger meni, kartice umjesto tabela)
- Dashboard prilagođen ulozi (admin/kapiten/igrač/sudija)
- Obavezan sport pri kreiranju lige i termina
- Brisanje lige sa kaskadnim brisanjem utakmica/tabele i oslobađanjem termina
- Zakazivanje utakmice odabirom postojećeg slobodnog termina (sale)
- Cross-modul filtriranje: rezervacije i lige prikazuju samo terene predviđene za odabrani sport
- Dark theme popravka padajućih lista (Svi sportovi / Svi statusi)

---

## Rizici i zavisnosti

- Backend zavisi od ispravno konfigurisane baze (DDL auto=update kreira nove kolone `notifications` tabele i polje `sport` na slotovima)
- Brisanje lige kaskadno briše utakmice i standings — destruktivna akcija bez undo opcije
- Stari termini iz baze bez sporta neće se prikazati u sport-filtriranim dropdown-ovima; potrebno ih je rekreirati ili migrirati

---

## Sprint backlog

| ID | Naziv stavke (User Story) | Odgovorna osoba | Status | Napomena |
|---|---|---|---|---|
| US8-1 | Kao kapiten/admin, želim otkazati ili izmijeniti rezervisani termin, kako bih reagovao na promjene rasporeda bez kreiranja duplikata. | Amel Divović | Završeno | Otkazivanje i reschedule blokirani za rezervacije vezane za ligaške termine; novi endpoint `PATCH /api/reservations/{id}/reschedule` |
| US8-2 | Kao korisnik, želim pregledati statistiku tima po ligi, kako bih analizirao učinak tima kroz sezonu. | Bakir Hadžialić | Završeno | `GET /api/teams/{id}/stats?leagueId=X`; modal sa W/D/L, GF/GA, bodovima i formom zadnjih 5 |
| US8-3 | Kao prijavljeni korisnik, želim urediti svoje podatke i promijeniti lozinku, kako bih održao svoj nalog ažurnim i sigurnim. | Harun Hodžić | Završeno | Endpointi `PATCH /api/users/{id}/profile` i `PATCH /api/users/{id}/password`; nova ProfilePage stranica sa validacijom |
| US8-4 | Kao korisnik, želim pretraživati i filtrirati liste, kako bih brže došao do potrebne informacije. | Dino Palavra | Završeno | Text search + sport/status/date filteri na timovima, terminima i ligama |
| US8-5 | Kao korisnik na mobilnom uređaju, želim koristiti aplikaciju iz mobilnog browsera, kako bih provjeravao termine i rezultate u pokretu. | Miralem Pupalović | Završeno | Hamburger meni, mobilni topbar sa zvoncetom, responsive tabele (skrivanje sekundarnih kolona), 2-kolonski layout postaje 1-kolonski |
| US8-6 | Kao prijavljeni korisnik, želim na dashboardu vidjeti pregled prilagođen mojoj ulozi, kako bih odmah vidio što me se tiče. | Tarik Avdović | Završeno | ADMIN: pending rezervacije + notifikacije; CAPTAIN: moje rezervacije + nadolazeće utakmice; PLAYER: nadolazeće utakmice; REFEREE: utakmice bez rezultata + nedavno odigrane |
| US8-7 | Kao organizator, želim da sport bude obavezan pri kreiranju lige, kako bi se sve kasnije moglo filtrirati po sportovima. | Ernad Prasko | Završeno | Backend `@NotNull` validacija; frontend forma blokira submit dok sport nije odabran |
| US8-8 | Kao organizator, želim obrisati ligu, kako bih ispravio grešku ili zaključio sezonu. | Harun Muhić | Završeno | `DELETE /api/leagues/{id}` sa kaskadnim brisanjem utakmica, standings i league-team veza; svi vezani termini se oslobađaju; confirmation modal |
| US8-9 | Kao organizator, želim zakazati utakmicu odabirom postojećeg slobodnog termina (sale), kako bih obezbijedio rezervaciju i izbjegao konflikte. | Amel Divović | Završeno | Dropdown sa filtriranim slobodnim terminima po sportu lige; polje `slotId` u `CreateMatchRequest`; auto-rezervisanje i linkovanje slot-a |
| US8-10 | Kao admin, želim odabrati sport pri kreiranju termina, kako bi se znalo za koji sport je teren predviđen. | Bakir Hadžialić | Završeno | `sport` polje obavezno u `CreateTimeSlotRequest`; prikaz sport kolone u listi termina; filter po sportu |
| US8-11 | Kao korisnik, želim da mi se pri kreiranju rezervacije/utakmice prikažu samo tereni predviđeni za odabrani sport, kako ne bih rezervisao tenis teren za fudbal. | Amel Divović | Završeno | Cross-modul filtriranje u Rezervacijama (po odabranom sportu) i Ligama (strogo po sportu lige); reschedule modal isto filtrira |
| US8-12 | Kao korisnik, želim primati in-app obavještenja o promjenama mojih rezervacija i utakmica, kako bih bio na vrijeme informisan. | Bakir Hadžialić | Završeno | Notifications modul (entity, repo, service, controller); zvonce sa badge brojem u sidebaru; mark-as-read po jednom i sve odjednom; polling svakih 30s |

---

## Pregled realizacije

- Ukupno user storyja: 12
- Završeno: 12
- Djelimično završeno: 0
- Nezavršeno: 0

## Komentar

Sprint 8 značajno proširuje MVP novim cross-module funkcionalnostima i pojačava uvezanost između tri ključna modula (termini, rezervacije, lige). Sport postaje obavezan na svim mjestima gdje je relevantan (lige, termini), čime se omogućava strogo filtriranje terena po sportu pri rezervaciji ili zakazivanju utakmice. Dodate su i tehničke nadogradnje: kompletan notifications modul, statistika tima, izmjena profila/lozinke, kaskadno brisanje liga, responsive layout i dashboard po ulozi. Sprint je također obuhvatio popravku 58 unit testova (existing + new) — svi prolaze.
