# Sprint Review Summary
## Sprint 8

**Datum:** 18.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

## Sprint cilj

Proširiti sistem ključnim funkcionalnostima koje povećavaju upotrebljivost: notifikacije, preraspoređivanje rezervacija, statistika timova, upravljanje profilom, pretraga i filtriranje, responzivni prikaz i personalizirani dashboard.

## Isporučeno u sprintu

### US8-1 — Preraspoređivanje rezervacija
Korisnici mogu prerasporediti rezervaciju na drugi slobodan termin putem modalnog prozora s dropdownom dostupnih termina. Stari termin se automatski oslobađa, a novi rezerviše. Rezervacije vezane za ligaške utakmice su blokirane za reschedule i cancel, uz jasnu Liga badge poruku.

### US8-2 — Notifikacijski sistem
Implementiran kompletni notifikacijski modul. Notifikacije se generišu za sve ključne događaje: kreiranje, odobravanje, odbijanje, otkazivanje i preraspoređivanje rezervacije, zakazivanje utakmice i unos rezultata. NotificationBell u headeru prikazuje unread badge, dropdown listu notifikacija, mark-as-read po stavci i mark-all-read. Polling svake 30 sekunde s trenutnim osvježavanjem nakon akcija.

### US8-3 — Statistika timova
Backend endpoint agregira statistiku tima po ligi iz odigranih utakmica: odigrano, pobjede, remiji, porazi, golovi za/protiv, gol-razlika, bodovi, forma (zadnjih 5 utakmica). Frontend prikazuje statistiku u modalnom prozoru s league selektorom i vizualnim stat tiles.

### US8-4 — Upravljanje profilom
Nova ProfilePage omogućava uređivanje punog imena i emaila korisnika, te promjenu lozinke uz validaciju stare lozinke. Svi podaci se odmah reflektuju u sidebaru i kontekstu aplikacije.

### US8-5 — Pretraga i filtriranje
Timovi: pretraga po nazivu/gradu/kapitenu + filter po sportu. Termini: pretraga po lokaciji/resursu + filter po datumu. Lige: pretraga po nazivu + filter po sportu i statusu. Sve pretrage su klijentske (bez API poziva) za brzu responsivnost.

### US8-6 — Responzivni layout
Mobilni hamburger menu s backdrop-om, topbar za notification bell na malim ekranima, tablice skrivaju sekundarne kolone na telefonima, stats grid kolapsira na 2 kolone. Aplikacija je upotrebljiva na uređajima od 360px širine.

### US8-7 — Personalizirani dashboard
Admin: widget s rezervacijama na čekanju i nedavnim notifikacijama. Kapiten: vlastite rezervacije i nadolazeće utakmice. Igrač: nadolazeće utakmice. Svaka uloga vidi samo sebi relevantne informacije.

## Demonstrirane funkcionalnosti

- Preraspoređivanje rezervacije i blokada liga-veze
- Primanje i pregled notifikacija u realnom vremenu
- Pregled statistike tima s formom
- Uređivanje profila i lozinke
- Pretraga i filtriranje timova, termina, liga
- Mobilni prikaz aplikacije
- Personalizirani dashboard po ulozi

## Ostvareni rezultat

Sprint 8 predstavlja posljednji funkcionalni sprint MVP faze. Sistem je sada kompletan: registracija, autentifikacija, upravljanje korisnicima, timovima, terminima, rezervacijama, ligama, utakmicama, rezultatima, tabeli, notifikacijama i profilom.

## Problemi i odstupanja

WebSocket pristup za notifikacije je razmatran ali zamijenjen polling mehanizmom zbog složenosti integracije u kratkom roku. Polling intervala 30s je prihvatljiv za akademski kontekst. Statistika timova u obliku forme (zadnjih 5 utakmica) je implementirana kao vizualni indikator bez detaljnog prikaza svake utakmice.

## Zaključak

Sprint 8 je uspješno zaokružio MVP sistem dodavanjem svih planiranih funkcionalnosti. Komparativna analiza s industrijskim platformama provedena u prethodnom periodu identificirala je ključne nedostatke koji su adresovani u ovom sprintu.
