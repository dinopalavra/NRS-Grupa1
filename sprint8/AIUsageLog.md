# AI Usage Log
## Sprint 8

**Datum:** 18.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

| Polje | Opis |
|---|---|
| Datum | 18.05.2026. |
| Sprint broj | 8 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Implementacija US8-1: preraspoređivanje rezervacija s blokadom liga-vezanih termina |
| Kratak opis zadatka | Backend PATCH endpoint za reschedule rezervacije, blokada cancel/reschedule za league-linked slotove, frontend modal s dropdownom slobodnih termina, Liga badge s tooltipom |
| Šta je AI generisao | RescheduleReservationRequest record, logiku provjere liga-veze slota, frontend Reschedule modal komponentu, CSS za badge i tooltip |
| Šta je tim prihvatio | Kompletnu implementaciju rescheduling logike i frontend modal komponente |
| Šta je tim izmijenio | Prilagođeno imenovanje varijabli i poruke grešaka prema konvencijama projekta |
| Šta je tim odbacio | — |
| Rizici, problemi ili greške | Potrebna provjera da reschedule ne narušava konzistentnost statusa rezervacije |
| Ko je koristio alat | Cijeli tim |


| Polje | Opis |
|---|---|
| Datum | 18.05.2026. |
| Sprint broj | 8 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Implementacija US8-2 do US8-7: notifikacije, statistika timova, profil, pretraga, responzivnost, role dashboard |
| Kratak opis zadatka | Kompletni notifikacijski modul (entitet, repozitorij, servis, kontroler, frontend bell); statistika tima s modalnim prikazom; ProfilePage s promjenom lozinke; pretraga i filtriranje u timovima, terminima i ligama; mobilni responzivni layout s nav toggleom; personalizirani dashboard po ulozi |
| Šta je AI generisao | NotificationEntity, NotificationService s triggerima za sve događaje, NotificationBell React komponentu s pollingom, backend stats endpoint, ProfilePage, search/filter logiku za sve module, mobile navigation CSS i JS, role-aware dashboard sekcije |
| Šta je tim prihvatio | Kompletnu implementaciju svih 6 user storija, arhitektonske odluke (polling svake 30s, mark-as-read per item), UI dizajn modal-ova i filtara |
| Šta je tim izmijenio | Sitne prilagodbe CSS-a za konsistentnost s luxury temom, prijevodi poruka notifikacija na bosanski |
| Šta je tim odbacio | WebSocket pristup za notifikacije (zamijenjen polling-om zbog složenosti konfiguracije) |
| Rizici, problemi ili greške | Polling svakih 30s može opteretiti backend pri velikom broju korisnika — razmotriti WebSocket u budućem razvoju |
| Ko je koristio alat | Cijeli tim |


| Polje | Opis |
|---|---|
| Datum | 18.05.2026. |
| Sprint broj | 8 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Frontend polish: luxury dark redesign, pozadinske slike, logo, animacije, fontovi |
| Kratak opis zadatka | Kompletni CSS redesign u luxury dark stilu (Cormorant Garamond + Montserrat, zlatni akcenti, krem tekst, tamni paneli); per-page sport fotografije kao pozadine; originalni SVG logo (sportski teren odozgo); Montserrat uppercase naslovi; per-page background CSS s gradient overlay-em |
| Šta je AI generisao | Kompletni styles.css u luxury temi, SVG logo komponentu, Google Fonts import, per-page layout-bg-- CSS klase, overlay logiku |
| Šta je tim prihvatio | Luxury dark dizajn, zlatnu paletu, Montserrat font u uppercase, originalni logo |
| Šta je tim izmijenio | Prilagođena paleta boja (gold #c9a87c, cream #f2ece2), veličine fontova, background-size s contain na cover |
| Šta je tim odbacio | Splash screen s animacijom (na zahtjev korisnika uklonjen), liquid glass efekti |
| Rizici, problemi ili greške | Portretne lokalne slike ne stanu dobro kao background — riješeno prelaskom na landscape Unsplash fotografije |
| Ko je koristio alat | Cijeli tim |

| Polje | Opis |
|---|---|
| Datum | 20.05.2026. |
| Sprint broj | 8 |
| Alat koji je korišten | Claude Code (claude-sonnet-4-6) |
| Svrha korištenja | Implementacija US8-8 do US8-12: kaskadno brisanje liga, obavezan sport na terminima, odabir termina pri zakazivanju, cross-modul filtriranje i dark dropdown styling |
| Kratak opis zadatka | Backend `DELETE /api/leagues/{id}` sa kaskadnim brisanjem utakmica, standings i league-team veza uz oslobađanje vezanih termina; `@NotNull` validacija sporta na `CreateTimeSlotRequest`; `slotId` polje u `CreateMatchRequest` za odabir slobodnog termina iz dropdowna; frontend filtriranje termina po sportu u rezervacijama i ligama; `color-scheme: dark` na sve select elemente |
| Šta je AI generisao | `deleteLeague` metodu u `LeagueService` s kaskadnom logikom, `slotId` validaciju u `ResultsService`, frontend sport-filter logiku u `ReservationsPage` i `LigaPage`, CSS `color-scheme: dark` za native dropdown styling |
| Šta je tim prihvatio | Kompletnu implementaciju svih 5 user storija, kaskadnu logiku brisanja, cross-modul filtriranje |
| Šta je tim izmijenio | Redoslijed kaskadnog brisanja prilagođen FK constraint ograničenjima baze; frontend dropdown filtriranje spojeno s postojećim state management pristupom |
| Šta je tim odbacio | Soft-delete pristup za brisanje liga (zamijenjen hard delete jer season closure ne zahtijeva historiju) |
| Rizici, problemi ili greške | Kaskadno brisanje je destruktivno bez undo — confirmation modal je obavezan; stari termini bez sporta ne pojavljuju se u filtriranim dropdownovima |
| Ko je koristio alat | Cijeli tim |

---

**Napomena:** AI je korišten u skladu s akademskom politikom — implementacija je analizirana, razumljena i verificirana od strane svakog člana tima zaduženog za određeni dio.
