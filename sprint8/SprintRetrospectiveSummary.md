# Sprint Retrospective Summary
## Sprint 8

**Datum:** 18.05.2026.
**Projekat:** Sistem za upravljanje sportskim terminima i ligama

## Šta je prošlo dobro

### 1. Kompletna isporuka svih 7 user storija
Svi planirani user storiji su implementirani i validirani unutar sprinta. Tim je nastavio trend kompletne isporuke iz prethodnih sprintova.

### 2. Primijenjene lekcije komparativne analize
Identifikovani nedostaci sistema u odnosu na industrijske platforme direktno su pretočeni u sprint backlog. Notifikacije, pretraga, profil i personalizirani dashboard bili su top prioriteti prema analizi.

### 3. Dobar arhitektonski pristup za notifikacije
Odluka za polling umjesto WebSocket bila je svjesna i dokumentovana. Sistem radi ispravno unutar zadatih ograničenja.

### 4. Blokada liga-vezanih termina
Mehanizam zaštite integriteta ligaškog rasporeda funkcioniše ispravno i korisnik dobiva jasnu povratnu informaciju.

### 5. Responzivnost aplikacije
Mobilni prikaz je implementiran konzistentno s ostatkom dizajna.

## Šta nije prošlo dobro

### 1. Notifikacije nisu real-time
Polling od 30s nije pravi real-time. Korisnik može propustiti događaj do 30 sekundi. Za produkcijsku primjenu WebSocket bi bio neophodan.

### 2. Statistika timova bez historijskog prikaza
Statistika prikazuje agregirane podatke ali ne i historiju utakmica. Korisnik ne može vidjeti ko je postigao gol u kojoj utakmici.

### 3. Pretraga je samo klijentska
Pretraga radi na učitanim podacima. Za veće skupove podataka bio bi potreban server-side search s paginacijom.

### 4. Nedostaje paginacija na listama
Sve liste učitavaju sve podatke odjednom. Ovo je tehnički dug koji će postati problem s većim brojem podataka.

## Šta ćemo raditi drugačije

- Implementirati WebSocket ako se sistem razvija dalje od akademskog konteksta
- Dodati server-side paginaciju i pretragu
- Razmotriti historijski prikaz rezultata po igraču/utakmici
- Pisati unit testove za sve nove servise (NotificationService, stats endpoint)

## Akcioni koraci

- Dokumentovati poznata ograničenja i tehnički dug u product backlogu
- Koristiti statistiku komparativne analize kao osnovu za buduće sprintove (ako semestar to dozvoli)

## Zaključak

Sprint 8 uspješno zaokružuje funkcionalni MVP sistema. Sve planirane stavke su realizovane. Ključna ograničenja (polling, klijentska pretraga, nedostatak paginacije) su dokumentovana kao tehnički dug. Sistem je spreman za finalnu demonstraciju i odbranu.
