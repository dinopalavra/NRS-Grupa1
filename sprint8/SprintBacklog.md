# Sprint Backlog
## Sprint 8

**Datum:** 18.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Sprint cilj

Proširiti sistem ključnim funkcionalnostima koje povećavaju upotrebljivost i kompletnost platforme: notifikacije u realnom vremenu, preraspoređivanje rezervacija, statistika timova, upravljanje korisničkim profilom, pretraga i filtriranje u svim modulima, responzivni prikaz za mobilne uređaje i personalizirani dashboard prema ulozi korisnika.

---

## Ključne stavke koje tim želi završiti

- Implementacija notifikacijskog sistema za sve ključne događaje u sistemu
- Preraspoređivanje rezervacija s blokadom za ligu-vezane termine
- Statistika timova agregirana iz rezultata utakmica
- Upravljanje korisničkim profilom i promjena lozinke
- Pretraga i filtriranje u modulima timova, termina i liga
- Responzivni layout za mobilne uređaje
- Personalizirani dashboard prema korisničkoj ulozi

---

## Rizici i zavisnosti

- Notifikacijski sistem zahtijeva polling mehanizam koji može opteretiti backend ako interval nije dobro podešen
- Preraspoređivanje rezervacija mora biti blokirano za termine vezane za ligaške utakmice
- Statistika timova ovisi o ispravno unesenim rezultatima utakmica u ligama
- Responzivni prikaz zahtijeva testiranje na više veličina ekrana

---

## Sprint backlog

| ID | Naziv stavke (User Story) | Odgovorna osoba | Status | Napomena |
|---|---|---|---|---|
| US8-1 | Kao korisnik, želim prerasporediti rezervaciju na drugi slobodan termin, uz automatsko oslobađanje starog termina i blokadu preraspoređivanja ligu-vezanih termina. | Amel Divović | Završeno | Backend PATCH /api/reservations/{id}/reschedule; UI modal s dropdownom slobodnih termina; Liga badge s tooltipom |
| US8-2 | Kao korisnik, želim primati notifikacije o svim važnim događajima u sistemu (kreiranje, odobravanje, odbijanje, otkazivanje rezervacije, zakazivanje utakmice, unos rezultata), kako bih bio pravovremeno informisan. | Amel Divović | Završeno | NotificationBell s unread badge-om; dropdown lista; mark-as-read po stavci i mark-all-read; polling svakih 30s |
| US8-3 | Kao korisnik, želim pregledati detaljnu statistiku tima u odabranoj ligi, uključujući broj odigranih utakmica, pobjedu, remija, poraza, golova i forme, kako bih pratio performanse tima. | Amel Divović | Završeno | Backend GET /api/teams/{id}/stats?leagueId=X; frontend modal sa stat tiles i form prikazom |
| US8-4 | Kao korisnik, želim uređivati vlastiti profil (ime, email) i mijenjati lozinku, kako bih održavao tačne i sigurne podatke o svom nalogu. | Amel Divović | Završeno | PATCH /api/users/{id}/profile i /password; nova ProfilePage; validacija stare lozinke |
| US8-5 | Kao korisnik, želim pretraživati i filtrirati timove, termine i lige prema različitim kriterijima, kako bih brzo pronašao relevantne podatke bez skrolanja kroz cijele liste. | Amel Divović | Završeno | Timovi: tekst + sport filter; Termini: tekst + datum filter; Lige: tekst + sport + status filter |
| US8-6 | Kao korisnik na mobilnom uređaju, želim da aplikacija bude potpuno upotrebljiva s responzivnim navigacijskim menijem i prilagođenim prikazom tablica, kako bih koristio sistem s pametnog telefona. | Amel Divović | Završeno | Mobile nav toggle s backdrop-om; topbar za zvono na malim ekranima; tablice skrivaju sekundarne kolone |
| US8-7 | Kao korisnik, želim vidjeti personalizirani dashboard koji prikazuje informacije relevantne za moju ulogu: admin vidi rezervacije na čekanju i notifikacije, kapiten vlastite rezervacije i nadolazeće utakmice, a igrač nadolazeće utakmice. | Amel Divović | Završeno | Tri varijante dashboarda po ulozi; role-aware sekcije s quick-action karticama |

---

## Pregled realizacije

- Ukupno user storyja: 7
- Završeno: 7
- Djelimično završeno: 0
- Nezavršeno: 0

## Komentar

Sprint 8 zaokružuje sistem s funkcionalnostima koje nedostaju u prethodnim sprintovima a identificirane su komparativnom analizom s industrijskim sistemima. Notifikacijski sistem, pretraživanje i personalizirani dashboard značajno povećavaju upotrebljivost platforme. Sistem je sada potpuno funkcionalan za sve korisničke uloge.
