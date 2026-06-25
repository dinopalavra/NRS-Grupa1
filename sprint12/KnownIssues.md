# Known Issues / Limitations

**Projekat:** Sports Manager  
**Datum:** 25.06.2026.

---

## 1. Poznati bugovi

| ID | Bug | Ozbiljnost | Opis | Workaround |
|---|---|---|---|---|
| BUG-001 | Kalendar premale ćelije na <360px | Niska | Na ekranima užim od 360px (rijetki uređaji), kalendarske ćelije su premale za čitanje | Koristiti uređaj sa širim ekranom |
| BUG-002 | Filter čipovi bez scroll indikatora | Niska | Na mobilnom nema vizualnog znaka da se filter čipovi mogu horizontalno skrolati | Korisnik otkriva scrollanjem |
| BUG-003 | Seed lozinke u plain textu | Srednja | `seed.sql` sadrži lozinke u plain text formatu; u produkciji bi trebale biti BCrypt hashevi | Prihvatljivo za demo; u produkciji koristiti BCrypt |
| BUG-004 | Refresh briše navigaciju | Niska | Aplikacija koristi custom routing (ne React Router), pa browser refresh uvijek vraća na Dashboard | Nije moguć deep link na specifičnu stranicu |

---

## 2. Tehnička ograničenja

| Ograničenje | Detalji | Uticaj |
|---|---|---|
| **Klijentska paginacija** | Svi podaci se učitavaju u frontend memoriju; paginacija se radi `Array.slice()` na frontendu, ne `LIMIT/OFFSET` na backendu | Pri stotinama/hiljadama zapisa, inicijalno učitavanje je sporo i troši RAM u browseru |
| **Custom routing** | `AppRouter.jsx` koristi `switch(currentPage)` umjesto React Router-a | Nema URL-based navigacije, nema browser back/forward, nema deep linkinga, nema bookmarkinga stranica |
| **Hibernate DDL auto-update** | Schema se automatski generira/ažurira prema JPA entitetima | Nema verzionisanih migracija; pri promjeni entiteta, stare kolone se ne brišu, samo dodaju nove |
| **Polling za obavijesti** | Frontend periodično poziva API za nove obavijesti | Veći network traffic u odnosu na WebSocket; obavijesti nisu instant |
| **Single-threaded frontend state** | Svi podaci su u jednom React Context | Pri velikom broju korisnika/podataka, rerenderovanje može postati sporo |
| **Nema caching sloja** | Backend ne koristi Redis ni in-memory cache | Svaki API poziv ide direktno na bazu |

---

## 3. Sigurnosna ograničenja

| Ograničenje | Rizik | Detalji |
|---|---|---|
| **API endpointi su permitAll()** | **Visok** | Spring Security konfiguracija koristi `anyRequest().permitAll()`. JWT token se koristi za identifikaciju korisnika, ali backend NE blokira zahtjeve bez tokena ili s pogrešnom ulogom. Frontend kontroliše pristup putem UI-a (skrivanje dugmadi/stranica), ali direktni API pozivi (npr. putem Postman-a) mogu zaobići ovu kontrolu. |
| **JWT u localStorage** | Srednji | JWT token se čuva u `localStorage`, koji je dostupan JavaScript-u. XSS napad može ukrasti token. Sigurnija alternativa je HttpOnly cookie. |
| **HTTPS nije konfigurisan** | Srednji | Docker Compose deployment koristi HTTP. U produkciji, sav promet (uključujući JWT tokene i lozinke) trebao bi ići preko HTTPS/TLS. |
| **CORS dozvoljava wildcard headers** | Nizak | `configuration.setAllowedHeaders(Arrays.asList("*"))` — dozvoljava sve headere. U produkciji bi trebalo ograničiti na specifične headere. |
| **Nema rate limiting-a** | Nizak | Nema zaštite od brute-force napada na login endpoint ili DoS napada prekomjernim zahtjevima. |
| **Nema input sanitizacije na frontendu** | Nizak | Korisnici koji direktno pozivaju API mogu slati nesaniriane podatke; Spring Validation pokriva osnovno, ali nema eksplicitne XSS zaštite. |

---

## 4. Nedovršene funkcionalnosti

| Funkcionalnost | Status | Razlog |
|---|---|---|
| **Email obavijesti** | Nije implementirano | Zahtijeva SMTP servis (SendGrid, Mailgun); van opsega akademskog projekta |
| **Reset lozinke putem emaila** | Djelimično — token se vraća u HTTP response | Isti razlog — nema SMTP-a; produkcijska implementacija dokumentovana kao buduće unapređenje |
| **PDF eksport** | Nije implementirano | Zahtijeva vanjsku biblioteku (iText, OpenPDF); CSV eksport zadovoljava demonstracijsku potrebu |
| **Sedmični/dnevni kalendar** | Nije implementirano | Mjesečni prikaz je prioritiziran; sedmični bi zahtijevao značajan dodatni UI rad |
| **WebSocket obavijesti** | Nije implementirano | Polling je funkcionalan za akademsku skalu; WebSocket zahtijeva Spring WebSocket konfiguraciju |
| **Email verifikacija** | Nije implementirano | Nema SMTP-a |
| **Edit/delete termina** | Nije implementirano | Create i Read su implementirani; Update i Delete odgođeni |
| **Lokalizacija (i18n)** | Nije implementirano | Aplikacija je jednojezična (bosanski) |
| **Cloud deployment** | Nije implementirano | Docker Compose je lokalni deployment; cloud zahtijeva plaćene servise |

---

## 5. Pretpostavke koje sistem pravi

| Pretpostavka | Detalji |
|---|---|
| **Mali obim podataka** | Sistem pretpostavlja akademsku skalu (desetine/stotine zapisa, ne hiljade). Klijentska paginacija i nedostatak server-side optimizacija su prihvatljivi za ovu skalu. |
| **Jedan korisnik = jedan tim** | Igrač može biti član samo jednog tima. Backend to provjerava, ali korisnik nema UI za napuštanje tima. |
| **Jedan sport po korisniku** | Korisnik pri registraciji odabere sport i ne može ga promijeniti. Kapiten ne može voditi tim drugog sporta. |
| **Povjerenje u frontend** | API se oslanja na frontend za kontrolu pristupa (skrivanje dugmadi/stranica po ulozi). Direktni API pozivi nemaju server-side auth provjeru. |
| **Docker je dostupan** | Deployment procedura pretpostavlja da evaluator ima Docker Desktop instaliran. |
| **Portovi 3000, 8080, 5432 su slobodni** | Docker Compose koristi ove portove; ako su zauzeti, korisnik mora ručno promijeniti. |

---

## 6. Dijelovi sistema koji NISU potpuno završeni

Sljedeće stvari ne treba predstavljati kao potpuno završene:

| Dio sistema | Stanje | Objašnjenje |
|---|---|---|
| **Server-side autorizacija** | Nedostaje | Svi endpointi su `permitAll()` — frontend kontroliše pristup, ali API nije zaštićen. Ovo je najznačajnije sigurnosno ograničenje sistema. |
| **Reset lozinke** | MVP | Funkcioniše, ali token se prikazuje na ekranu umjesto slanja na email. Nije produkcijski-spreman. |
| **CRUD za termine** | Djelimičan | Kreiranje i čitanje rade; update i delete nisu implementirani. |
| **Test pokrivenost frontenda** | Minimalna | Samo 2 test fajla za 14 stranica. Backend ima bolju pokrivenost (7 test klasa). |
| **Deployment** | Lokalni | Docker Compose radi lokalno; nema javno dostupnog cloud deployment-a. |
