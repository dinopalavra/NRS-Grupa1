# Decision Log — Sprint 7

*Sprint broj:* 7  
*Projekat:* Sistem za upravljanje sportskim terminima i ligama

---

## DL7-1: Join table za vezu Liga–Tim

*Datum:* 12.05.2026.  
*Naziv:* Odabir pristupa za many-to-many vezu između liga i timova  
*Opis problema:* Liga i Tim su entiteti koji imaju many-to-many vezu. Pitanje je kako tu vezu modelirati u bazi i kodu.  
*Razmatrane opcije:*
- A: @ManyToMany anotacija direktno na LeagueEntity
- B: Eksplicitni join entitet LeagueTeamEntity sa svojom tabelom

*Odabrana opcija:* B — eksplicitni join entitet  
*Razlog:* Eksplicitni entitet daje bolju kontrolu nad validacijom (sprječava duplikate kroz unique constraint), jednostavniji je za query (findByLeague_Id), i lakše proširiv u budućnosti (npr. datum pridruživanja, status).  
*Posljedice:* Nešto više koda, ali čistija arhitektura i bolji SQL.  
*Status:* Aktivna

---

## DL7-2: Ispravka rezultata — undo + reapply

*Datum:* 12.05.2026.  
*Naziv:* Postupanje s ponovnim unosom rezultata za već završenu utakmicu  
*Opis problema:* Ako se rezultat unese pogrešno i ponovo unese ispravan, stara statistika treba biti poništena.  
*Razmatrane opcije:*
- A: Zabraniti ispravku — rezultat je konačan
- B: Poništiti staru statistiku, primijeniti novu

*Odabrana opcija:* B — undo + reapply  
*Razlog:* Greška u unosu je realna situacija (sudija može pogriješiti). Zabrana bi zahtijevala brisanje utakmice što je destruktivno. Undo logika je implementirana kroz removeStats metodu koja koristi Math.max(0, ...) radi zaštite od negativnih vrijednosti.  
*Posljedice:* Kompleksnija servisna logika, ali pravilno ponašanje sistema.  
*Status:* Aktivna

---

## DL7-3: Arhitektura Liga modula na frontendu — single-page layout

*Datum:* 12.05.2026.  
*Naziv:* Organizacija Liga stranice — posebne rute ili single-page s tabovima  
*Opis problema:* Liga modul ima više pogleda: lista liga, timovi u ligi, utakmice, tabela. Pitanje je strukturirati to kao zasebne rute ili kao jedan prikaz s tabovima.  
*Razmatrane opcije:*
- A: Zasebne stranice s rutama (/liga/1/timovi, /liga/1/tabela, itd.)
- B: Jedan LigaPage s master-detail layoutom i tabovima

*Odabrana opcija:* B — master-detail s tabovima  
*Razlog:* Projekat koristi custom page-based navigaciju (nema React Router). Tabovi su konzistentni s ostatkom UI-a i smanjuju broj navigacijskih koraka za korisnika.  
*Posljedice:* Malo kompleksniji component tree, ali konzistentno UX iskustvo.  
*Status:* Aktivna
