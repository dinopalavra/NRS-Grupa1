# Sprint Backlog
## Sprint 11

**Datum:** 08.06.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

---

## Sprint cilj

Finalizirati i ispolirati platformu — uvesti paginaciju na stranicama s dugačkim listama, poboljšati pretragu i filtriranje u modulu korisnika, ispraviti vizualne nedosljednosti u dizajnu te osigurati uredan responzivni prikaz na mobilnim uređajima kroz sve stranice aplikacije.

---

## Ključne stavke koje tim želi završiti

- Paginacija na stranicama Rezervacije, Termini i Korisnici
- Pretraga i filtriranje po ulozi na stranici Korisnici
- Popravka dizajna padajućih lista na Login stranici (uloga i sport)
- Responzivni prikaz: kalendar, tabele, liga kartice i filter čipovi na mobilnim ekranima

---

## Rizici i zavisnosti

- Paginacija je implementirana na klijentskoj strani — pri velikom broju stavki nema server-side optimizacije (prihvatljivo za akademsku skalu)
- Responzivne promjene ne smiju narušiti izgled na desktop rezolucijama
- Kalendarski prikaz koristi inline stilove — za responzivnost potrebno migrirati na CSS klase

---

## Sprint backlog

| ID | Naziv stavke (User Story) | Status | Napomena |
|---|---|---|---|
| US11-1 | Kao korisnik, želim da duge liste rezervacija budu podijeljene na stranice, kako bih lakše pregledao podatke bez dugog skrolanja. | Završeno | Paginacija po 10 stavki, info o trenutnom rasponu, reset na prvu stranicu pri promjeni filtera |
| US11-2 | Kao korisnik, želim da duge liste termina budu podijeljene na stranice uz pretragu i filtriranje, kako bih brzo pronašao željeni termin. | Završeno | Paginacija po 15 stavki; reset stranice pri promjeni pretrage, sporta ili datuma |
| US11-3 | Kao administrator, želim pretraživati korisnike po imenu ili korisničkom imenu i filtrirati ih po ulozi, kako bih brzo pronašao određenog korisnika u sistemu. | Završeno | Search input + role dropdown filter + paginacija po 10 stavki na stranici Korisnici |
| US11-4 | Kao korisnik koji se registruje, želim da padajuće liste za odabir uloge i sporta budu vizualno usklađene s ostatkom stranice, kako bih imao konzistentan doživljaj. | Završeno | Dodata zlatna strelica i dark color-scheme na `select.input` klasu; opcije imaju tamnu pozadinu |
| US11-5 | Kao korisnik koji pristupa sistemu s mobilnog uređaja, želim da kalendar, tabele i liga kartice budu čitljivi i upotrebljivi na malom ekranu, kako bih mogao koristiti sistem bez horizontalnog overflow-a. | Završeno | CalendarPage migrirana na CSS klase s responzivnim breakpointima; tabele dobivaju kompaktniji padding; liga match kartice ne prelaze rubove; filter čipovi horizontalno skrolaju |

---

## Pregled realizacije

- Ukupno user storyja: 5
- Završeno: 5
- Djelimično završeno: 0
- Nezavršeno: 0

## Komentar

Sprint 11 je finalni sprint projekta. Fokus je bio isključivo na polish-u i UX poboljšanjima — nema novih poslovnih funkcionalnosti, već se zaokružuje korisnički doživljaj kroz paginaciju dugih lista, poboljšanu pretragu i ispravan prikaz na mobilnim uređajima. Sistem je u potpunosti spreman za finalnu odbranu.
