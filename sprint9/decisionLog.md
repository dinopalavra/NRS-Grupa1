# Decision Log
## Sprint 9

**Datum:** 25.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Odluka #001 — Kapiten kao FK na korisnika umjesto slobodnog tekstualnog polja

| Polje | Opis |
|---|---|
| ID odluke | DL9-001 |
| Datum | 23.05.2026. |
| Kratak naziv odluke | Modeliranje kapitena tima — FK relacija vs. tekstualno polje |
| Opis problema | U prethodnim sprintovima kapiten tima je bio sačuvan kao slobodno tekstualno polje `captainName`. Sa uvođenjem ulogno-svjesnog pristupa potrebno je da kapiten bude stvarni korisnik sistema kako bi se mogla ograničiti njegova prava na uređivanje samo svog tima. |
| Razmatrane opcije | 1. Zadržati `captainName` kao slobodno polje + dodati `captainUserId` kao opcioni FK  2. Zamijeniti `captainName` sa obaveznim FK `captain` na `UserEntity`  3. Many-to-many relacija (više kapitena po timu) |
| Odabrana opcija | Obavezna FK relacija `captain` na `UserEntity`, sa `captainName` zadržanim kao denormalizovano polje (auto-popunjeno iz korisnika) |
| Razlog izbora | FK relacija omogućava enforce-ovanje pravila "jedan kapiten = jedan tim" preko `existsByCaptain_Id`, povezivanje kapitena sa njegovim notifikacijama i ograničenjima u UI. Zadržavanje `captainName` polja čuva nazad kompatibilnost sa starim podacima u bazi i omogućava prikaz imena bez dodatnog join queryja. |
| Posljedice odluke | Pri kreiranju tima admin mora odabrati postojećeg korisnika sa CAPTAIN ulogom i odgovarajućim sportom. Stari podaci sa slobodnim tekstualnim kapitenom ostaju funkcionalni ali nisu povezani sa korisničkim nalogom. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Slobodno polje + opcioni FK | Obavezni FK | Many-to-many |
|---|---|---|---|---|
| Integritet podataka | 5 | 2 | 5 | 4 |
| Ulogno enforce-ovanje | 5 | 2 | 5 | 3 |
| Nazad kompatibilnost | 3 | 5 | 4 | 3 |
| Jednostavnost modela | 4 | 4 | 5 | 2 |
| **Ukupno** | — | **47** | **78** | **49** |

---

## Odluka #002 — Pravilo "jedan igrač pripada samo jednom timu istovremeno"

| Polje | Opis |
|---|---|
| ID odluke | DL9-002 |
| Datum | 23.05.2026. |
| Kratak naziv odluke | Ograničenje pripadnosti igrača timu |
| Opis problema | Bez ograničenja, isti korisnik može biti dodan na rostere više timova istovremeno. Ovo bi dovelo do apsurdnih situacija — npr. utakmica između dva tima u kojima oba imaju istog igrača, ili višestruke notifikacije za istu osobu. |
| Razmatrane opcije | 1. Bez ograničenja — igrač može biti u bilo kom broju timova  2. Ograničenje "jedan tim po sportu" — igrač može biti u više timova ako su različitog sporta  3. Strogo ograničenje — igrač je istovremeno u maksimalno jednom timu |
| Odabrana opcija | Strogo ograničenje "jedan tim po igraču" sa jasnom porukom o konfliktnom timu pri pokušaju dodavanja |
| Razlog izbora | Strogo ograničenje eliminira sve edge case situacije gdje isti igrač učestvuje u utakmici protiv samog sebe. Pošto svaki korisnik već ima dodijeljen sport (US9-3), opcija 2 nema praktičnu vrijednost u kontekstu projekta. Premještanje između timova radi se "remove pa add" obrascem. |
| Posljedice odluke | Kapiten/admin koji želi premjestiti igrača mora ga prvo ukloniti iz starog tima. Backend validacija pri dodavanju daje jasnu poruku sa imenom postojećeg tima. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Bez ograničenja | Jedan po sportu | Strogo jedan |
|---|---|---|---|---|
| Integritet utakmica | 5 | 1 | 4 | 5 |
| Realističnost modela | 4 | 1 | 3 | 5 |
| Korisnička fleksibilnost | 3 | 5 | 4 | 2 |
| Jednostavnost validacije | 4 | 5 | 3 | 5 |
| **Ukupno** | — | **38** | **51** | **67** |

---

## Odluka #003 — Strogo cross-modul filtriranje po sportu

| Polje | Opis |
|---|---|
| ID odluke | DL9-003 |
| Datum | 23.05.2026. |
| Kratak naziv odluke | Sportska konzistentnost kroz korisnika, tim, ligu i utakmicu |
| Opis problema | Sa dodavanjem sport polja na korisnika, postavlja se pitanje koliko strogo treba enforce-ovati podudaranje sporta na različitim mjestima. Da li igrač sport=Fudbal smije biti u timu sport=Košarka? Da li se sport korisnika ikada može promijeniti? |
| Razmatrane opcije | 1. Bez provjere — sport je samo metapodatak  2. Provjera samo na nivou tima (igrač i tim moraju imati isti sport)  3. Strogo enforce-ovanje na svim modulima: igrač↔tim, kapiten↔tim, strijelac↔roster (gdje roster već implicira sport tima) |
| Odabrana opcija | Strogo enforce-ovanje na svim modulima |
| Razlog izbora | Sport je semantički ključ podataka. Mješanje sportova u rosteru, kapitenstvu ili strijelcima vodi do nesmislenih agregacija (npr. tenis statistika sa fudbalskim golovima). Validacija na backendu je jednostavna preko `.equals` poređenja. Frontend dropdownovi prefiltriraju ponuđene opcije, ali backend ostaje druga linija odbrane. |
| Posljedice odluke | Promjena sporta korisnika (trenutno nije podržana u UI) bi zahtijevala uklanjanje sa svih trenutnih timskih veza. Stari podaci bez sporta ostaju problematični za nove filtere. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Bez provjere | Samo tim | Strogo svuda |
|---|---|---|---|---|
| Semantička ispravnost | 5 | 1 | 3 | 5 |
| Dubina validacije | 4 | 1 | 3 | 5 |
| Implementacijska kompleksnost | 3 | 5 | 4 | 3 |
| Korisnička jasnoća greški | 4 | 2 | 4 | 5 |
| **Ukupno** | — | **27** | **47** | **62** |

---

## Odluka #004 — Pojednostavljenje "tip rezervacije" — uklonjeno u korist auto-notifikacija

| Polje | Opis |
|---|---|
| ID odluke | DL9-004 |
| Datum | 24.05.2026. |
| Kratak naziv odluke | Da li uvesti tip rezervacije (REGULAR/TRAINING) ili automatski notifikovati sve članove tima |
| Opis problema | Initijalno je implementiran tip rezervacije sa dropdown selektorom u formi — TRAINING tip bi notifikovao sve članove tima, REGULAR samo admina. Nakon prvih testova zaključeno je da razlika nije semantički opravdana — svaka rezervacija kapitena se de facto tiče njegovih igrača. |
| Razmatrane opcije | 1. Zadržati tip rezervacije sa selektorom  2. Pojednostavljeno: ukloniti tip, ali uvijek notifikovati članove tima  3. Ukloniti i tip i auto-notifikacije — vratiti na originalno ponašanje |
| Odabrana opcija | Pojednostavljeno: tip uklonjen sa UI-ja, ali se notifikacije uvijek šalju svim članovima tima |
| Razlog izbora | Tip rezervacije je dodavao kognitivno opterećenje bez stvarne semantičke razlike — svaka rezervacija tima utiče na njegove igrače. Uniformno auto-notifikovanje pruža istu vrijednost bez UI buke. DB schema (`reservation_type` kolona) je zadržana radi buduće mogućnosti razlikovanja (recurring trainings, friendly matches itd.). |
| Posljedice odluke | Forma za rezervacije je jednostavnija. Svi članovi tima dobijaju notifikacije o svakoj rezervacijskoj akciji bez mogućnosti opt-out. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Sa tipom (selektor) | Bez tipa (auto) | Originalno (bez notifikacija) |
|---|---|---|---|---|
| Jednostavnost UX-a | 5 | 2 | 5 | 5 |
| Informisanost igrača | 5 | 4 | 5 | 1 |
| Granularnost kontrole | 3 | 5 | 2 | 1 |
| Implementacijska kompleksnost | 3 | 2 | 5 | 5 |
| **Ukupno** | — | **44** | **65** | **38** |

---

## Odluka #005 — Frontend role-checkovi vs. backend permission enforcement

| Polje | Opis |
|---|---|
| ID odluke | DL9-005 |
| Datum | 24.05.2026. |
| Kratak naziv odluke | Gdje implementirati ulogno razdvajanje akcija u Ligi i Rezervacijama |
| Opis problema | Sprint 9 uvodi strogo ulogno razdvajanje — kapiten vidi samo svoj tim, igrač samo svoje rezervacije, samo admin kreira lige, samo sudija unosi rezultate. Pitanje je trebaju li ove provjere biti samo na frontendu, samo na backendu, ili na oba mjesta. |
| Razmatrane opcije | 1. Samo frontend — UI sakriva dugmad i filtrira liste, backend bez provjere  2. Samo backend — backend odbija pozive sa pogrešnom ulogom, frontend slobodno renderuje sve  3. Oba — frontend sakriva nedostupne akcije za bolji UX, backend dodatno validira radi sigurnosti |
| Odabrana opcija | Frontend role-checkovi kao prva linija sa naknadnim backend enforcing-om za ključne operacije |
| Razlog izbora | Frontend sakrivanje dugmadi daje čist UX i sprječava korisničke greške. Backend validacije za sport match, jedan tim po igraču i kapiten po timu već postoje i pružaju druga linija odbrane. Striktno backend permission enforcement za sve liga akcije ostavljeno je kao tehnički dug za budući sprint jer trenutno nije kritično (svi korisnici sistema su poznati i nije izložen javnosti). |
| Posljedice odluke | Brz UX, dobar pregled za korisnike, ali postoji teorijska mogućnost da napredan korisnik preko direktnog API poziva izvrši neku admin akciju. Backend validacija integriteta podataka (sport match, jedinstvenost) ostaje zaštita. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Samo frontend | Samo backend | Oba (frontend prvo) |
|---|---|---|---|---|
| UX kvalitet | 4 | 5 | 1 | 5 |
| Sigurnost | 5 | 1 | 5 | 4 |
| Brzina implementacije | 4 | 5 | 3 | 4 |
| Konzistentnost sa MVP fazom | 3 | 5 | 3 | 4 |
| **Ukupno** | — | **52** | **41** | **63** |

---

## Odluka #006 — Preimenovanje DB kolone `minute` zbog SQL rezervisane riječi

| Polje | Opis |
|---|---|
| ID odluke | DL9-006 |
| Datum | 24.05.2026. |
| Kratak naziv odluke | Kako riješiti konflikt imena kolone sa SQL ključnom riječi |
| Opis problema | Pri kreiranju entiteta `GoalEntity` sa kolonom `minute` (vrijeme postizanja gola), H2 baza nije mogla kreirati tabelu jer je `MINUTE` rezervisana ključna riječ u standardnom SQL-u i koristi se kao dio funkcije za ekstrakciju vremena. |
| Razmatrane opcije | 1. Escape-ovati naziv kolone sa navodnicima (`"minute"`)  2. Preimenovati Java property iz `minute` u nešto drugo (`scoredAt`, `goalMinute`)  3. Preimenovati samo DB kolonu u `goalminute` zadržavajući Java property `minute` |
| Odabrana opcija | Preimenovati DB kolonu u `goalminute` zadržavajući Java property `minute` |
| Razlog izbora | Escape-ovanje navodnicima radi u nekim bazama ali nije portabilno (može pasti u Postgresu ili drugim). Preimenovanje Java propertyja bi zahtijevalo izmjene u DTO-ima, frontend kodu i testovima. Preimenovanje samo DB kolone kroz `@Column(name = "goalminute")` je lokalna izmjena bez ripple efekta. |
| Posljedice odluke | DB kolona se zove `goalminute`, ali Java property, JSON serialization i frontend ostaju kao `minute`. JPQL queryji koriste Java naziv tako da rade nepromijenjeni. |
| Status odluke | Aktivna |

### Trade-off analiza

| Kriterij | Težina | Escape navodnicima | Preimenovanje Java propertyja | Preimenovanje DB kolone |
|---|---|---|---|---|
| Portabilnost između baza | 5 | 2 | 5 | 5 |
| Minimalan obim izmjena | 4 | 5 | 2 | 5 |
| Konzistentnost API-ja | 4 | 5 | 2 | 5 |
| Čitljivost koda | 3 | 3 | 5 | 4 |
| **Ukupno** | — | **49** | **45** | **67** |
