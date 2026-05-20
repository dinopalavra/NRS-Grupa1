# Sprint Retrospective Summary
## Sprint 8

---

## Šta je išlo dobro

- Tim je uspješno implementirao svih 7 planiranih user storija unutar jednog sprinta, čime je zaokružen funkcionalni MVP sistem.
- Notifikacijski sistem je implementiran konzistentno za sve ključne događaje — kreiranje, odobravanje, odbijanje, otkazivanje i preraspoređivanje rezervacija, zakazivanje utakmica i unos rezultata.
- Mehanizam zaštite ligaških termina od slučajnog preraspoređivanja ili otkazivanja pokazao se kao dobro rješenje — integritet ligaškog rasporeda je sačuvan, a korisnik dobiva jasnu povratnu informaciju.
- Implementacija pretrage i filtriranja u svim modulima značajno je poboljšala upotrebljivost sistema bez potrebe za skrolanjem kroz cijele liste.
- Personalizirani dashboard po ulozi povećao je relevantnost informacija za svakog korisnika — admin vidi operativne stavke, kapiten vlastite aktivnosti, igrač sportski raspored.
- Responzivni layout omogućio je korištenje sistema na mobilnim uređajima bez kompromisa u funkcionalnosti.
- Komparativna analiza s industrijskim platformama provedena uoči ovog sprinta pokazala se korisnom — identificirani nedostaci direktno su pretočeni u backlog i realizovani.

---

## Šta nije išlo dobro

- Notifikacijski sistem koristi polling svakih 30 sekundi umjesto WebSocket pristupa, što znači da obavještenja mogu kasniti i da se backend nepotrebno opterećuje pri velikom broju aktivnih korisnika.
- Pretraga je implementirana isključivo na klijentskoj strani — pri velikom skupu podataka sva se lista učitava odjednom, što može biti sporo i opteretiti memoriju browsera.
- Statistika timova prikazuje agregirane podatke ali ne i historiju po utakmici — korisnik ne može vidjeti detalje (ko je postigao gol, kada).
- Nedostaje paginacija na svim listama — tablice učitavaju sve dostupne zapise što predstavlja tehnički dug koji će postati vidljiv problem s rastom baze podataka.
- Dio CSS-a koji su dodali kolege u Sprintu 8 koristio je fallback vrijednosti boja koje nisu odgovarale luxury dark temi, što je uzrokovalo vizuelne nekonzistentnosti (pogrešne boje na mobilnom toggleu, notifikacijskom dropdownu i modalima).

---

## Šta treba promijeniti

- U narednim sprintovima potrebno je razmisliti o WebSocket pristupu za notifikacije ili SSE (Server-Sent Events) kao bolju alternativu pollingu.
- Treba uvesti server-side pretragu i paginaciju za sve liste koje mogu narasti — posebno za rezervacije, termine i notifikacije.
- Kompleksne CSS promjene u novim komponentama trebaju biti provjeravane u kontekstu postojeće teme, a ne samo funkcionalno.
- Pisanje unit testova za svaki novi servisni modul (NotificationService) treba biti standardna praksa, ne opcionalna.
- Veće zadatke treba razbijati na manje cjeline kako bi se smanjio pritisak na kraju sprinta.

---

## Koje konkretne akcije tim uvodi u narednom sprintu

- Pregledati sve module i identificirati liste koje nemaju paginaciju — dodati na backlog kao tehnički dug.
- Provjeriti vizuelnu konzistentnost svih novih komponenti u odnosu na temu prije svakog commita.
- Dokumentovati sve nova CSS klase koje se dodaju izvan postojećeg design sistema s napomenom o kontekstu korištenja.
- Fokus narednog sprinta postaviti na stabilizaciju sistema, zatvaranje tehničkog duga i provjeru da aplikacija funkcioniše kao konzistentna cjelina.
- Nastaviti s praksom decision logova za sve arhitekturalne odluke — posebno za infrastrukturne promjene.
