# Sprint Review Summary
## Sprint 8

**Sprint broj:** 8
**Datum:** 20.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Planirani sprint goal

Proširiti MVP cross-module funkcionalnostima — notifikacije, statistika tima, korisnički profil, pretraga i filtriranje, responsive prikaz i role-aware dashboard. Dodatno, ojačati uvezanost između modula termina, rezervacija i liga: termini dobijaju sport, lige i rezervacije strogo filtriraju slobodne terene po sportu, omogućeno je premještanje i otkazivanje rezervacija uz zaštitu za ligaške termine, te brisanje lige sa kaskadnim oslobađanjem termina.

---

## Šta je završeno

Planirane aktivnosti koje su završene u ovom sprintu su:

- implementacija otkazivanja i izmjene rezervacije sa zaštitom za ligaški-vezane termine (US8-1)
- implementacija in-app notifikacija sa zvoncetom, badge brojem nepročitanih i listom obavještenja (US8-2)
- implementacija detaljne statistike tima po ligi sa W/D/L, GF/GA, formom zadnjih 5 utakmica (US8-3)
- implementacija profila korisnika i promjene lozinke sa validacijom (US8-4)
- implementacija pretrage i filtriranja na timovima, terminima i ligama (US8-5)
- implementacija responsive prikaza sa mobilnim hamburger menijem i adaptivnim tabelama (US8-6)
- implementacija dashboard-a prilagođenog ulozi (admin/kapiten/igrač/sudija) sa relevantnim widgetima (US8-7)
- implementacija obaveznog sporta pri kreiranju lige (US8-8)
- implementacija brisanja lige sa kaskadnim brisanjem utakmica, tabele i oslobađanjem termina (US8-9)
- implementacija zakazivanja utakmice odabirom postojećeg slobodnog termina (sale) iz dropdowna (US8-10)
- implementacija obaveznog sporta pri kreiranju termina sa prikazom u listi termina (US8-11)
- implementacija cross-modul filtriranja terena po sportu u rezervacijama i ligama (US8-12)
- ispravka padajućih lista (Svi sportovi / Svi statusi) za usklađenost sa dark dizajnom (US8-13)
- popravka i proširenje backend testova nakon promjena DTO struktura (58/58 testova prolazi)

---

## Šta nije završeno

Sve stavke koje su planirane u okviru Sprinta 8 su završene.

---

## Demonstrirane funkcionalnosti ili artefakti

U ovom sprintu demonstrirane su sljedeće funkcionalnosti i artefakti:

- AI Usage Log
- Decision Log
- Sprint Backlog
- Izvještaj testiranja
- otkazivanje i premještanje rezervacija sa Liga badge zaštitom
- notifikacijski zvonce sa unread badgeom, dropdown listom i mark-as-read
- statistika tima u modalnom prikazu sa filterom po ligi i prikazom forme zadnjih 5
- profilna stranica korisnika sa izmjenom imena/emaila i promjenom lozinke
- pretraga i filtriranje liste timova, termina i liga sa višestrukim kriterijima
- responzivni mobilni layout sa hamburger menijem i adaptivnim karticama
- personalizirani dashboard po ulozi sa različitim sekcijama za admin/kapitena/igrača/sudiju
- brisanje lige iz UI sa confirmation modalom i kaskadnim čišćenjem
- zakazivanje utakmice odabirom slobodnog termina iz dropdowna umjesto ručnog unosa
- sport polje na terminima i strogo cross-modul filtriranje terena
- dark styling padajućih lista kroz cijeli sistem

---

## Glavni problemi i blokeri

- Notifikacije su implementirane kroz polling svake 30 sekunde umjesto WebSocket pristupa — odluka donesena radi jednostavnosti integracije sa postojećom REST arhitekturom, dokumentovana u Decision Log-u (DL8-001).
- Pretraga je u potpunosti klijentska — svi podaci se učitavaju i filtriraju u browseru, što je trenutno prihvatljivo ali predstavlja tehnički dug pri rastu skupa podataka.
- Prilikom dodavanja sport polja na termin, postojeći termini bez sporta nisu se pojavljivali u sport-filtriranim dropdownovima, što je očekivano ponašanje ali zahtijeva re-kreiranje legacy podataka.
- Identifikovan je propust gdje su novi CSS-stilovi (notifikacijski dropdown, modal, mobilni nav) koristili fallback boje van luxury dark teme — ispravljeno naknadnim prolaskom kroz `styles.css`.
- Sprint je obuhvatio značajno veći broj user storija od planiranog (13 umjesto 7) jer je tokom razvoja identifikovano da pretrage i sport-filtriranja zahtijevaju pratiće promjene na više modula.

---

## Ključne odluke donesene u sprintu

- **Polling svake 30 sekunde za notifikacije** — odabran umjesto WebSocket-a radi jednostavnosti i konzistentnosti sa REST arhitekturom (DL8-001).
- **Blokada cancel i reschedule akcija za ligaški-vezane rezervacije** — radi integriteta ligaškog rasporeda; korisnik dobija jasnu poruku zašto akcija nije dozvoljena (DL8-002).
- **Jedan dashboard sa dinamičkim sekcijama po ulozi** — umjesto zasebnih stranica za svaku rolu (DL8-003).
- **Hard delete sa kaskadnim čišćenjem za brisanje lige** — uz confirmation modal i oslobađanje vezanih termina (DL8-004).
- **Cross-modul filtriranje termina po sportu na klijentskoj strani** — radi brzine implementacije i nepotrebne backend kompleksnosti za trenutnu skalu (DL8-005).

---

## Povratna informacija Product Ownera

Product Owner je istakao zadovoljstvo obimom realizovanih funkcionalnosti — sistem je iz osnovnog MVP-a podignut na razinu konzistentne aplikacije sa stvarnom upotrebljivošću za sve uloge. Posebno je istaknuta vrijednost role-aware dashboarda, notifikacijskog sistema i odabira sale pri zakazivanju utakmice. Naglašena je potreba da se u narednim sprintovima fokus stavi na entitet igrača — trenutno su igrači samo brojevno polje, a sistem bi imao više vrijednosti kada bi se mogli realno povezati sa timom i pratiti njihova statistika.

---

## Zaključak za naredni sprint

Sa zaokruženim MVP-om i ojačanim cross-module vezama, naredni sprint može se fokusirati na dubinu igrača kao entiteta sistema — pravi roster tima, evidencija strijelaca utakmica, sport po korisniku i pojačano ulogno razdvajanje pristupa kroz sve module.
