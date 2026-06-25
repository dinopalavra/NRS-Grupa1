# Finalni Product Backlog — Status

**Projekat:** Sports Manager  
**Datum:** 25.06.2026.  
**Verzija:** 1.0 (finalna isporuka)

---

## Legenda statusa

| Status | Značenje |
|---|---|
| **Done** | Potpuno implementirano, testirano i funkcionalno |
| **Partially Done** | Implementirano s ograničenjima ili pojednostavljenjima |
| **Not Done** | Nije implementirano |
| **Deferred** | Svjesno odgođeno za budući razvoj |

---

## Autentikacija i korisnici

| ID | Stavka | Status | Napomena |
|---|---|---|---|
| PB-01 | Prijava korisnika (login) s JWT tokenima | **Done** | — |
| PB-02 | Registracija novog korisnika (self-registration) | **Done** | S odabirom uloge i sporta |
| PB-03 | Uloge: ADMIN, CAPTAIN, PLAYER, MANAGER | **Done** | Role-based pristup svim stranicama |
| PB-04 | Reset zaboravljene lozinke | **Partially Done** | Token se vraća u HTTP response, ne šalje se emailom — MVP pristup bez SMTP servisa |
| PB-05 | Profil korisnika (pregled i uređivanje) | **Done** | Promjena imena, emaila i lozinke |
| PB-06 | ADMIN: pregled, pretraga i brisanje korisnika | **Done** | Search + filter po ulozi + paginacija |
| PB-07 | Email verifikacija pri registraciji | **Not Done** | Nije bilo u opsegu projekta |

---

## Timovi

| ID | Stavka | Status | Napomena |
|---|---|---|---|
| PB-10 | Kreiranje tima s nazivom, gradom, sportom i kapitenom | **Done** | Validacija: kapiten mora imati ispravan sport i ulogu CAPTAIN |
| PB-11 | Prikaz liste timova s pretragom i filtriranjem | **Done** | Search po nazivu/gradu/kapitenu, filter po sportu, paginacija po 10 |
| PB-12 | Roster management — dodavanje igrača u tim | **Done** | Autocomplete pretraga po imenu, usernameu i sportu |
| PB-13 | Roster management — uklanjanje igrača iz tima | **Done** | ADMIN i CAPTAIN mogu ukloniti |
| PB-14 | Statistika tima (pobjede, porazi, gol-razlika, forma) | **Done** | Filtriranje po ligi |
| PB-15 | CAPTAIN vidi samo svoj tim | **Done** | — |
| PB-16 | PLAYER vidi samo tim u kojem je član | **Done** | Koristi myMembership iz konteksta |

---

## Termini (Time Slots)

| ID | Stavka | Status | Napomena |
|---|---|---|---|
| PB-20 | Kreiranje novih termina (datum, vrijeme, lokacija, resurs) | **Done** | ADMIN only |
| PB-21 | Prikaz liste termina s pretragom | **Done** | Filter po tekstu, sportu, datumu + paginacija po 15 |
| PB-22 | Prikaz statusa termina (dostupan/zauzet) | **Done** | Automatski se ažurira pri kreiranju rezervacije |
| PB-23 | Brisanje ili editovanje termina | **Not Done** | CRUD read i create implementirani; update/delete odgođeni |

---

## Rezervacije

| ID | Stavka | Status | Napomena |
|---|---|---|---|
| PB-30 | Kreiranje rezervacije terena | **Done** | — |
| PB-31 | Ponavljajuće rezervacije (sedmično/dvosedmično) | **Done** | Interval i broj ponavljanja |
| PB-32 | Tok odobrenja: Na čekanju → Odobrena/Odbijena/Otkazana | **Done** | ADMIN odobrava/odbija |
| PB-33 | Preraspodjela (reschedule) rezervacije | **Done** | Na drugi slobodan termin |
| PB-34 | Filtriranje rezervacija po statusu | **Done** | Filter čipovi s horizontalnim scrollom na mobilnom |
| PB-35 | Komentari na rezervacijama | **Done** | Asinhrono učitavanje |
| PB-36 | Paginacija rezervacija | **Done** | 10 po stranici |
| PB-37 | Email obavijest pri promjeni statusa rezervacije | **Not Done** | In-app obavijesti postoje, ali email integracija nije implementirana |

---

## Lige i natjecanja

| ID | Stavka | Status | Napomena |
|---|---|---|---|
| PB-40 | Kreiranje liga s nazivom, sezonom i statusom | **Done** | — |
| PB-41 | Dodavanje/uklanjanje timova iz lige | **Done** | — |
| PB-42 | Kreiranje utakmica između timova u ligi | **Done** | — |
| PB-43 | Unos rezultata utakmice | **Done** | S individualnim golovima i strijelcima |
| PB-44 | Automatski izračun tabele (bodovi, W/D/L, GD) | **Done** | Pobjeda=3 boda, remi=1, poraz=0 |
| PB-45 | Prikaz top strijelaca po ligi | **Done** | Tab "Strijelci" |
| PB-46 | CSV eksport rasporeda i tabele | **Done** | Download dugmadi na LigaPage |
| PB-47 | PDF eksport rasporeda | **Deferred** | Odgođeno — zahtijeva vanjsku biblioteku (iText/OpenPDF); CSV zadovoljava potrebe |

---

## Kalendar

| ID | Stavka | Status | Napomena |
|---|---|---|---|
| PB-50 | Mjesečni kalendarski prikaz utakmica i rezervacija | **Done** | Zlatne oznake za utakmice, zelene za rezervacije |
| PB-51 | Navigacija po mjesecima | **Done** | Strelice + dugme "Danas" |
| PB-52 | Detalji događaja pri kliku na dan | **Done** | Lista s tipom, nazivom i statusom |
| PB-53 | Sedmični/dnevni prikaz kalendara | **Deferred** | Implementiran samo mjesečni prikaz; dovoljan za akademsku demonstraciju |

---

## Obavijesti

| ID | Stavka | Status | Napomena |
|---|---|---|---|
| PB-60 | In-app obavijesti za promjene statusa | **Done** | Bell ikona s badge brojem |
| PB-61 | Označavanje obavijesti kao pročitane | **Done** | Pojedinačno i "označi sve" |
| PB-62 | Push notifikacije (WebSocket) | **Deferred** | Koristi se polling; WebSocket odgođen |
| PB-63 | Email obavijesti | **Not Done** | Nema SMTP integracije |

---

## UI/UX

| ID | Stavka | Status | Napomena |
|---|---|---|---|
| PB-70 | Responzivni dizajn za mobilne uređaje | **Done** | Breakpointi na 900px, 768px, 520px |
| PB-71 | Paginacija na svim stranicama s dugim listama | **Done** | Rezervacije (10), Termini (15), Korisnici (10), Timovi (10) |
| PB-72 | Dark tema (luxury gold/cream) | **Done** | CSS custom properties |
| PB-73 | Dashboard sa statistikama | **Done** | Role-aware prikazivanje |
| PB-74 | Lokalizacija (višejezičnost) | **Not Done** | Samo bosanski jezik |

---

## Deployment i infrastruktura

| ID | Stavka | Status | Napomena |
|---|---|---|---|
| PB-80 | Docker Compose za lokalni deployment | **Done** | PostgreSQL + Backend + Frontend |
| PB-81 | Deployment skripta (deploy.sh) | **Done** | Automatski build, pokretanje i provjera |
| PB-82 | Cloud deployment (javno dostupan URL) | **Not Done** | Sistem se pokreće lokalno; cloud hosting zahtijeva plaćene servise |
| PB-83 | CI/CD pipeline (GitHub Actions) | **Deferred** | Odgođeno; Docker Compose ispunjava zahtjev za ponovljiv deployment |

---

## Ukupni pregled

| Status | Broj stavki | Procenat |
|---|---|---|
| **Done** | 34 | 77% |
| **Partially Done** | 1 | 2% |
| **Not Done** | 5 | 11% |
| **Deferred** | 4 | 9% |
| **Ukupno** | **44** | 100% |
