# AI Usage Log
## Sprint 9

**Datum:** 25.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

| Polje | Opis |
|---|---|
| Datum | 23.05.2026. |
| Sprint broj | 9 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Implementacija US9-1 i US9-2: roster tima sa brojem dresa i pozicijom, te evidencija strijelaca utakmica sa top scorer listom |
| Kratak opis zadatka | Backend `TeamMemberEntity` sa repository/service/controller; novi endpointi `GET/POST/DELETE /api/teams/{id}/members`; backend `GoalEntity` sa agregacionim queryjem za top scorers; proširen `RecordResultRequest` sa opcionalnom listom golova; frontend "Igrači" modal na Teams stranici; sekcija "Strijelci" u formi za unos rezultata sa dropdownom rostera; novi "Strijelci" tab u detalju lige sa rang listom |
| Šta je AI generisao | TeamMemberEntity/Repository/Service metode za add/remove/get sa validacijom jersey jedinstvenosti, GoalEntity sa JPQL queryjem za agregaciju top scorera, frontend modal komponentu sa add formom i listom igrača, sekciju za unos strijelaca u rezultat formi sa filterom po rosteru tima, "Strijelci" tab sa medaljama |
| Šta je tim prihvatio | Kompletnu implementaciju oba user story-ja, arhitektonsku odluku idempotentnog upisivanja golova (delete + insert), validaciju da broj strijelaca odgovara rezultatu |
| Šta je tim izmijenio | Imenovanje DB kolone sa `minute` na `goalminute` nakon otkrivanja konflikta sa SQL rezervisanom riječi |
| Šta je tim odbacio | Pristup gdje se strijelci unose kao zaseban korak nakon spremanja rezultata — zamijenjen integrisanim pristupom unutar iste forme |
| Rizici, problemi ili greške | H2 baza nije inicijalno kreirala `goals` tabelu zbog rezervisane riječi `MINUTE`; problem riješen preimenovanjem kolone uz zadržavanje istog Java property naziva |
| Ko je koristio alat | Cijeli tim |


| Polje | Opis |
|---|---|
| Datum | 23.05.2026. |
| Sprint broj | 9 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Refaktorisanje modela korisnika i tima: sport polje obavezno za non-admin role, kapiten kao FK na User, maxMembers umjesto fiksnog brojanja, jedan tim po igraču, cross-modul validacija sporta |
| Kratak opis zadatka | Dodavanje `sport` polja na `UserEntity` sa validacijom (admin bez sporta, ostali obavezno); transformacija `captainName` iz string polja u `captain` FK na `UserEntity` sa dropdownom filtriranim po sportu i raspoloživosti; zamjena `membersCount` (user-entered) sa `maxMembers` i automatskim brojanjem trenutnog stanja; pravilo da igrač može biti samo u jednom timu; provjera podudaranja sporta na svim mjestima dodavanja (member, captain, scorer) |
| Šta je AI generisao | UserEntity sport polje sa validacijama u UserService, TeamEntity captain FK i maxMembers, TeamService.createTeam sa validacijama (CAPTAIN role, sport match, jedan tim po kapitenu), TeamService.addMember sa validacijama (one-team-per-player, sport match, max capacity), frontend kapiten dropdown sa filterom i automatskim resetom pri promjeni sporta |
| Šta je tim prihvatio | Sve validacijske grane, FK pristup za kapitena, derivat trenutnog brojanja članova |
| Šta je tim izmijenio | Poruke grešaka prilagođene na bosanski jezik sa konkretnim nazivom konfliktnog tima ("već je u timu X") |
| Šta je tim odbacio | Ideju da kapiten može upravljati timom sa drugog sporta — strogo enforcing podudaranja sporta |
| Rizici, problemi ili greške | Stari podaci u bazi sa slobodnim tekstualnim imenom kapitena ostaju funkcionalni ali se ne mogu povezati sa korisnikom dok admin ne ponovo kreira tim; redoslijed dropdownova (sport pa kapiten) je morao biti preuređen u UI-ju |
| Ko je koristio alat | Cijeli tim |


| Polje | Opis |
|---|---|
| Datum | 23.05.2026. |
| Sprint broj | 9 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Automatske notifikacije svim članovima tima pri rezervacijskim akcijama i strogi roster check za strijelce |
| Kratak opis zadatka | Inicijalno implementiran tip rezervacije (REGULAR/TRAINING) sa dropdown selektorom — zatim, na zahtjev korisnika, pojednostavljeno: tip selektor uklonjen, ali se notifikacije šalju svim članovima tima na svaku rezervacijsku akciju (create/approve/reject/cancel/reschedule); dodatno, backend strogo validira da je svaki strijelac stvarno na rosteru tima za koji se gol bilježi |
| Šta je AI generisao | ReservationType enum, type polje na entitetu i request/response, `notifyTeamMembers` helper koji preskače kreatora, integracija sa svim rezervacijskim akcijama; nakon pojednostavljenja — uniformna logika notifikacije bez razlikovanja tipa |
| Šta je tim prihvatio | Pojednostavljeni pristup gdje sve rezervacije automatski notifikuju članove tima; roster validaciju za strijelce |
| Šta je tim izmijenio | Inicijalno predloženi tip rezervacije ocijenjen kao suvišan jer ne donosi semantičku razliku u ponašanju; zadržan u bazi (DB schema), ali uklonjen sa UI-ja i iz uvjetne logike |
| Šta je tim odbacio | Dropdown selektor "Tip rezervacije" i "Trening" badge — zamijenjeni uniformnim ponašanjem |
| Rizici, problemi ili greške | Polling notifikacija svakih 30s i dalje znači mogućnost kašnjenja od pola minute — tehnički dug iz prethodnog sprinta |
| Ko je koristio alat | Cijeli tim |


| Polje | Opis |
|---|---|
| Datum | 24.05.2026. |
| Sprint broj | 9 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Implementacija ulogno-svjesnog pristupa: kapiten vidi samo svoj tim, igrač dobija sekciju Timovi sa svojim timom i rezervacije svog tima, uklonjena sekcija Termini za igrača i sudiju |
| Kratak opis zadatka | Backend endpoint `GET /api/teams/by-user/{id}` za pronalaženje članstva korisnika; AppContext state `myMembership` koji se učitava pri loginu; filter rezervacija po `captainUserId` za kapitena; filter teams stranice po istom; sakrivanje forme "Novi tim" za kapitena; PLAYER pristup Teams stranici sa read-only roster modalom; ReservationsPage filter po `myMembership.teamId` za igrača; uklanjanje "Termini" nav stavke za PLAYER i REFEREE |
| Šta je AI generisao | Backend service metodu getMembershipOfUser, AppContext loadMyMembership callback sa polling-friendly cache, frontend logiku scopedTeams, sve role-based uvjetne renderinge u TeamModule i ReservationsPage, empty states za korisnike bez tima |
| Šta je tim prihvatio | Sve role-based filtere i uvjetne renderinge, empty state poruke za korisnike bez dodijeljenog tima/člana |
| Šta je tim izmijenio | Subtitle stranica prilagođen ulozi ("Moj tim" za kapitena/igrača umjesto "Lista timova") |
| Šta je tim odbacio | Pristup gdje bi se backend strogo provjeravao ownership pri svakom pozivu — zaključeno da je frontend filter dovoljan za MVP, backend već radi strogu sport i one-team-per-player validaciju |
| Rizici, problemi ili greške | Player koji ne pripada nijednom timu vidi empty state — UX poruke usmjeravaju ga da kontaktira admina ili kapitena |
| Ko je koristio alat | Cijeli tim |


| Polje | Opis |
|---|---|
| Datum | 24.05.2026. |
| Sprint broj | 9 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Ulogno razdvajanje akcija u modulu lige: kreiranje, brisanje i administracija samo admin; unos rezultata admin i sudija; kapiten i igrač samo pregled |
| Kratak opis zadatka | Frontend uvjetni rendering svih akcijskih dugmadi u LigaPage komponenti — LeagueListPanel (kreiranje/brisanje), TeamsTab (add/remove timova), MatchesTab (zakazivanje utakmice, unos rezultata sa strijelcima); fokus na permission matrix gdje sudija dobija eksplicitno pravo unosa rezultata kao njegov osnovni zadatak |
| Šta je AI generisao | selectedRole hookove u podkomponentama, uvjetne renderinge svih akcijskih dugmadi, prilagođene subtitle/empty state poruke za korisnike sa različitim ulogama |
| Šta je tim prihvatio | Permission matrix u potpunosti — admin sve, sudija unos rezultata, ostali samo gledaju |
| Šta je tim izmijenio | — |
| Šta je tim odbacio | Pristup gdje bi se sudija mogao baviti administracijom liga — strogo odvojena uloga sa specifičnim ograničenim setom akcija |
| Rizici, problemi ili greške | Frontend role checkovi su prva linija odbrane; backend i dalje treba enforce-ovati ako neko zaobiđe frontend (trenutno nije strogo enforcovano za liga akcije — tehnički dug za budući sprint) |
| Ko je koristio alat | Cijeli tim |


| Polje | Opis |
|---|---|
| Datum | 25.05.2026. |
| Sprint broj | 9 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Pisanje unit testova za sve nove Sprint 9 funkcionalnosti |
| Kratak opis zadatka | Proširenje postojećih test klasa novim testovima (TeamServiceTest +17, ResultsServiceTest +11, ReservationServiceTest +3) i kreiranje novog UserServiceTest fajla (+10 testova) za sport validacije; pokrivene su sve grane validacija (sport match, one-team-per-player, max capacity, jersey jedinstvenost, role validation, scorer roster check, goal count match) |
| Šta je AI generisao | Sve mock setupove sa Mockito @Mock i @InjectMocks, ReflectionTestUtils za postavljanje id polja kroz reflexiju, helper metode za kreiranje test entiteta, sve assertion grane za happy i error path |
| Šta je tim prihvatio | Sve dodate testove (41 novi test); ukupna pokrivenost porasla sa 58 na 99 testova |
| Šta je tim izmijenio | Uklonjeni suvišni Mockito stubovi koji su uzrokovali UnnecessaryStubbing greške u striktnom modu |
| Šta je tim odbacio | — |
| Rizici, problemi ili greške | Postojeći testovi nisu kompajlirali nakon dodavanja `goals` polja na `RecordResultRequest` — riješeno dopunom poziva sa `null` kao trećim argumentom |
| Ko je koristio alat | Cijeli tim |

---

**Napomena:** AI je korišten u skladu s akademskom politikom — implementacija je analizirana, razumljena i verificirana od strane svakog člana tima zaduženog za određeni dio.
