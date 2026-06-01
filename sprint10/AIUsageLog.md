# AI Usage Log
## Sprint 10

**Datum:** 31.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

| Polje | Opis |
|---|---|
| Datum | 31.05.2026. |
| Sprint broj | 10 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Implementacija US10-1 do US10-4: sport pri registraciji, reset lozinke, kalendar, CSV eksport |
| Kratak opis zadatka | Dodavanje sport dropdowna na LoginPage registracijsku formu (vidljiv samo za ne-admin uloge); backend `PasswordResetTokenEntity`, `forgotPassword` i `resetPassword` metode u UserService, novi AuthController endpointi i frontend forgot/reset forma u LoginPage; nova CalendarPage s prikazom utakmica i rezervacija u mreži po danima; backend CSV endpointi u ResultsController i download dugmad u LigaPage StandingsTab |
| Šta je AI generisao | `PasswordResetTokenEntity`, `PasswordResetTokenRepository`, logiku generisanja i validacije tokena, forgot/reset frontend formu, kompletnu CalendarPage s React state-om za navigaciju po mjesecima i agregacijom događaja, CSV controller metode, eksport funkcije u api.js |
| Šta je tim prihvatio | Kompletnu implementaciju svih 4 user storija; arhitekturalne odluke (polling naspram event-drivennog eksporta, MVP token-in-response naspram email) |
| Šta je tim izmijenio | Prilagođen CSV format (naslovi kolona na bosanskom); prilagođen stil forgot/reset forme u skladu s luxury dark temom; Calendar ikona izmijenjena da se razlikuje od rezervacijske ikone |
| Šta je tim odbacio | PDF eksport (zahtijeva iText/PDFBox biblioteku — odloženo za budući razvoj); email SMTP servis za reset lozinke (zamijenjen direktnim tokenом u response za MVP) |
| Rizici, problemi ili greške | Token za reset lozinke vraća se direktno u response za MVP — u produkciji obavezno zamijeniti SMTP email servisom; CSV ne sadrži BOM za UTF-8 što može uzrokovati probleme u starijim verzijama Microsoft Excela |
| Ko je koristio alat | Cijeli tim |

---

**Napomena:** AI je korišten u skladu s akademskom politikom — implementacija je analizirana, razumljena i verificirana od strane svakog člana tima zaduženog za određeni dio.
