# Sprint Retrospective Summary
## Sprint 10

---

## Šta je išlo dobro

- Sve 4 planirane stavke su implementirane i validirane u jednom sprintu.
- Tim je efikasno prepoznao koje funkcionalnosti imaju visoku vrijednost za demonstraciju (forgot password, kalendar) i prioritizovao ih ispravno.
- Custom implementacija kalendara bez vanjske biblioteke pokazala se kao dobra odluka — vizualno je potpuno usklađena s luxury dark temom.
- CSV eksport je implementiran brzo i funkcionira bez dodatnih zavisnosti.
- Sport pri registraciji je jednostavan ali važan detalj koji zatvara prazninu u korisničkom toku.
- Sistem je završio sprint u potpuno demonstrabilnom stanju za finalnu odbranu.

---

## Šta nije išlo dobro

- PDF eksport nije implementiran — zahtijevao bi iText/PDFBox biblioteku što je odloženo. Organizatori koji žele printabilni dokument moraju koristiti CSV i formatirati ga sami.
- Reset lozinke vraća token u HTTP response umjesto na email — ovo je funkcionalno za demonstraciju ali nije produkcijski prihvatljivo.
- Kalendar nema tjedni ili dnevni prikaz, samo mjesečni. Ograničeno za korisnike koji žele detaljniji pregled dana.
- Sprint je bio kratak s manjim brojem user storija nego prethodni — dio planiranih stavki (autocomplete za igrače, napredna pretraga) ostao je na backlogu.

---

## Šta treba promijeniti

- Za produkcijsku verziju: SMTP email servis za reset lozinke obavezan.
- PDF eksport trebalo bi dodati u narednom sprintu (ili kao post-semestarsko poboljšanje).
- Kalendar bi trebalo proširiti s tjednim prikazom i boljim mobile UX-om.
- Autocomplete pri dodavanju igrača u tim bi značajno poboljšao UX za kapitene.

---

## Koje konkretne akcije tim uvodi

- Dokumentovati sve tehničke dugove (MVP vs produkcija razlike) u product backlogu.
- Provjeriti da sistem funkcioniše end-to-end na produkcijskom okruženju (Render/Railway).
- Pripremiti demo scenarij za odbranu: registracija → rezervacija → liga → kalendar → eksport.
- Nastaviti s bugfix-ovima ako se pronađu tokom finalnog testiranja.
