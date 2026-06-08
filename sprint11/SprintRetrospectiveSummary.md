# Sprint Retrospective Summary
## Sprint 11

**Datum:** 08.06.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama
**Tip sprinta:** Finalni sprint — polish i UX

---

## Pregled sprinta

Sprint 11 bio je finalni sprint projekta. Za razliku od prethodnih sprintova koji su donosili nove poslovne funkcionalnosti, ovaj sprint fokusirao se na zaokruživanje korisničkog iskustva — paginacija dugih lista, poboljšanje pretrage i filtriranja, ispravka vizualnih nedosljednosti i responzivni prikaz na mobilnim uređajima.

---

## Što je išlo dobro (Keep)

**Jasno definisan opseg sprinta**
Sprint goal je bio konkretan i mjerljiv: paginacija, search/filter za korisnike, popravka selectova i responzivnost. Nije bilo scope creep-a ni novih ideja na pola sprinta. Fokus je ostao na kvalitetu, ne na kvantitetu funkcionalnosti.

**Reusable Pagination komponenta**
Umjesto kopiranja logike u svaku stranicu, kreirana je jedna `Pagination.jsx` komponenta koja se koristi na svim trima stranicama. Pristup je štedio vrijeme i osigurao konzistentno ponašanje i izgled paginacije kroz aplikaciju.

**Brza identifikacija CSS limitacija inline stilova**
Prepoznat je rani uzrok zašto CalendarPage nije bio responzivan — inline stilovi imaju viši prioritet od media query pravila. Migracija na CSS klase rješila je problem korjenito umjesto workaroundima.

**AI asistent kao produktivni alat**
AI je korišten efikasno za generisanje koda i dokumentacije, s 78% interakcija bez potrebe za korekcijom. Preostale 22% su bile male tehničke ispravke, ne konceptualne greške.

---

## Što je trebalo biti bolje (Improve)

**Istraživanje CSS strukture prije implementacije**
U jednom slučaju (liga match kartice) inicijalno rješenje je ciljalo `.liga-match-teams` s `flex-direction: column`, ali je selektor koristio `display: grid`, pa flex direktiva nije imala efekta. Provjera CSS klase u DevToolsima ili codebaseu prije pisanja rješenja bi spriječila potrebu za korekcijom.

**Veće prisustvo manualnoh testiranja ranije**
Responzivne promjene su testirane pretežno na kraju implementacije. U budućnosti bi testiranje u DevTools-mobile emulaciji tokom implementacije (ne samo na kraju) smanjilo broj iteracija korekcija.

**Dokumentacija mogla biti ranim artefaktom**
Sprint dokumentacija (backlog, decision log) generisana je zajedno s implementacijom a ne paralelno. U budućnosti, postavljanje backlog stavki i decision log odmah pri donošenju odluka (ne na kraju) bi dalo bolji uvid u tijek razmišljanja tima.

---

## Što se treba zaustaviti (Stop)

**Inline stilovi u JSX komponentama za layout sekcije**
Ovaj sprint je jasno pokazao zašto inline stilovi u React komponentama su anti-pattern kada je u pitanju responzivni dizajn — media queries ih ne mogu pregaziti. Za sve buduće komponente treba koristiti CSS klase za layout, a inline stilove samo za dinamične vrijednosti koje dolaze iz state-a ili propsa.

---

## Ključni zaključci

| Tema | Zaključak |
|---|---|
| Paginacija | Klijentska paginacija je ispravna odluka za MVP skalu; server-side je preporuka za produkciju |
| Responzivnost | CSS klase + media queries su jedini pristup koji funkcioniše — inline stilovi blokiraju overridanje |
| Reusability | Jedna dobra komponenta ušteđuje više nego 3 brze kopije |
| AI alati | Korisni za ubrzanje implementacije; tim treba razumjeti izlaz i korigovati gdje treba |
| Finalni status | Sistem je funkcionalno kompletan i spreman za odbranu |

---

## Ocjena sprinta

| Metrika | Ocjena |
|---|---|
| Ispunjenje sprint goala | 5/5 — sva 5 US završena |
| Kvalitet koda | 4/5 — male JSX i CSS korekcije potrebne |
| Timska komunikacija | 5/5 — jasno definisani zadaci i isporuka |
| Dokumentacija | 5/5 — kompletna sprint dokumentacija |
| **Ukupno** | **4.75/5** |

---

## Završna napomena

Sprint 11 je zatvorio projektni ciklus. Platforma za upravljanje sportskim terminima i ligama sada ima zaokružen UX s funkcionalnom paginacijom, pretragom, konzistentnim dizajnom formi i urednim prikazom na mobilnim uređajima. Svih 11 sprintova je isporučilo funkcionalan i testiran softver. Tim je spreman za finalnu odbranu projekta.
